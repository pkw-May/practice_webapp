import React, { useState, createContext, ReactNode, useEffect } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Pool from '../UserPool';

interface UserStatus {
  userSignedIn: boolean;
  userTokenCorrect: boolean;
}

interface AccountContextType {
  sessionJWT: string;
  userStatus: UserStatus;
  authenticate: (Username: string, Password: string) => Promise<boolean>;
  getSession: () => Promise<UserStatus>;
  logout: () => void;
}

interface AccountProviderProps {
  children: ReactNode;
}

const defaultContextValue: AccountContextType = {
  sessionJWT: '',
  userStatus: {
    userSignedIn: false,
    userTokenCorrect: false,
  },
  authenticate: async () => false,
  getSession: async () => ({ userSignedIn: false, userTokenCorrect: false }),
  logout: () => {},
};

const AccountContext = createContext<AccountContextType>(defaultContextValue);

const AccountContextProvider: React.FC<AccountProviderProps> = ({
  children,
}) => {
  const [sessionJWT, setSessionJWT] = useState<string>('');
  const [userStatus, setUserStatus] = useState<UserStatus>({
    userSignedIn: false,
    userTokenCorrect: false,
  });

  const getSession = async (): Promise<UserStatus> => {
    return await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession((err: any, session: any) => {
          if (err) {
            console.error(err);
            setUserStatus(prev => ({ ...prev, userSignedIn: false }));
            resolve({ userSignedIn: false, userTokenCorrect: false });
          } else {
            // check if the token is valid
            if (session.isValid()) {
              setUserStatus({
                userSignedIn: true,
                userTokenCorrect: true,
              });
              setSessionJWT(session.getIdToken().getJwtToken());
              resolve({ userSignedIn: true, userTokenCorrect: true });
            } else {
              setUserStatus(prev => ({ ...prev, userTokenCorrect: false }));
              resolve({ userSignedIn: true, userTokenCorrect: false });
            }
          }
        });
      } else {
        setUserStatus(prev => ({ ...prev, userSignedIn: false }));
        resolve({ userSignedIn: false, userTokenCorrect: false });
      }
    });
  };

  const authenticate = async (
    Username: string,
    Password: string,
  ): Promise<boolean> => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool });

      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: data => {
          setUserStatus({ userSignedIn: true, userTokenCorrect: true });
          resolve(true);
        },
        onFailure: err => {
          console.error(err);
          // check if the user is not confirmed
          if (err.code === 'UserNotConfirmedException') {
            // send new confirmation code to user
            // user.resendConfirmationCode((err, result) => {
            //   if (err) {
            //     console.error(err);
            //     reject(err);
            //   } else {
            //     console.log(result);
            //     resolve(false);
            //   }
          }
          reject(err);
        },
        newPasswordRequired: data => {
          // console.log('newPasswordRequired: ', data);
          // resolve(data);
        },
      });
    });
  };

  const removeCognitoLocalStorage = () => {
    const prefix = 'CognitoIdentityServiceProvider.';
    for (const key of Object.keys(window.localStorage)) {
      if (key.startsWith(prefix)) {
        window.localStorage.removeItem(key);
      }
    }
  };

  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      setSessionJWT('');
      setUserStatus({ userSignedIn: false, userTokenCorrect: false });
      removeCognitoLocalStorage();
      user.signOut();
    }
  };

  useEffect(() => {
    getSession();
  }, []);

  return (
    <AccountContext.Provider
      value={{
        sessionJWT,
        userStatus,
        getSession,
        authenticate,
        logout,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export { AccountContextProvider, AccountContext };
