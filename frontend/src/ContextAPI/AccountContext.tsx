import React, { useState, createContext, ReactNode } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Pool from '../UserPool';

interface UserStatus {
  userSignedIn: boolean;
  userTokenCorrect: boolean;
}

export interface DataForUserCreation {
  email: string;
  oauthId: string;
}

export interface CheckEmailResponse {
  success: boolean;
  isExist: boolean;
}

interface AccountContextType {
  sessionJWT: string;
  userStatus: UserStatus;
  checkEmail: (email: string) => Promise<CheckEmailResponse>;
  createUser: (userData: DataForUserCreation) => Promise<boolean>;
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
  checkEmail: async () => ({ success: false, isExist: false }),
  createUser: async () => false,
  authenticate: async () => false,
  getSession: async () => ({ userSignedIn: false, userTokenCorrect: false }),
  logout: () => {},
};

const AccountContext = createContext<AccountContextType>(defaultContextValue);

const AccountProvider: React.FC<AccountProviderProps> = ({ children }) => {
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
            setUserStatus(prev => ({ ...prev, userSignedIn: false }));
            console.error(err);
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
          console.log('로그인 성공:: ', data);
          resolve(true);
        },
        onFailure: err => {
          console.log('Failure: ', err);
          reject(err);
        },
        newPasswordRequired: data => {
          // console.log('newPasswordRequired: ', data);
          // resolve(data);
        },
      });
    });
  };

  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      setSessionJWT('');
      setUserStatus({ userSignedIn: false, userTokenCorrect: false });
      user.signOut();
    }
  };

  const checkEmail = async (email: string): Promise<CheckEmailResponse> => {
    let result = { success: false, isExist: false };
    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/checkEmail?email=${email}`,
      );
      const isExist = await response.json();

      result.success = true;
      result.isExist = isExist;

      return result;
    } catch (err) {
      console.error(err);
      result.success = false;
      return result;
    }
  };

  // function to Post newely signed up user to the backend
  const createUser = async (
    userData: DataForUserCreation,
  ): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userData }),
      });

      const data = await response.json();
      if (data.success === true) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return (
    <AccountContext.Provider
      value={{
        sessionJWT,
        userStatus,
        checkEmail,
        createUser,
        getSession,
        authenticate,
        logout,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export { AccountProvider, AccountContext };
