import React, { useState, createContext, ReactNode } from 'react';

interface UserStatus {
  userSignedIn: boolean;
  userTokenCorrect: boolean;
}

interface AccountContextType {
  sessionJWT: string;
  userStatus: UserStatus;
  authenticate: (userName: string, password: string) => Promise<boolean>;
  getSession: () => Promise<boolean>;
  logout: () => void;
}

interface AccountProviderProps {
  children: ReactNode;
}

const USER_NAME = 'may@gmail.com';
const PASSWORD = 'qwer1234!';

const defaultContextValue: AccountContextType = {
  sessionJWT: '',
  userStatus: {
    userSignedIn: false,
    userTokenCorrect: false,
  },
  authenticate: async () => false,
  getSession: async () => false,
  logout: () => {},
};

const AccountContext = createContext<AccountContextType>(defaultContextValue);

const AccountProvider: React.FC<AccountProviderProps> = ({ children }) => {
  const [sessionJWT, setSessionJWT] = useState<string>('');
  const [userStatus, setUserStatus] = useState<UserStatus>({
    userSignedIn: false,
    userTokenCorrect: false,
  });

  const getSession = async () => {
    return await new Promise<boolean>((resolve, reject) => {
      let JWT = window.sessionStorage.getItem('JWT');
      if (JWT) {
        setSessionJWT(JWT);
        setUserStatus(prev => ({ ...prev, userSignedIn: true }));
        resolve(true);
      } else {
        setUserStatus(prev => ({ ...prev, userSignedIn: false }));
        resolve(false);
      }
    });
  };

  const authenticate = async (userName: string, password: string) => {
    return await new Promise<boolean>((resolve, reject) => {
      if (userName === USER_NAME && password === PASSWORD) {
        let JWT = 'JWT_SAMPLE';
        setSessionJWT(JWT);
        window.sessionStorage.setItem('JWT', JWT);
        setUserStatus(prev => ({ ...prev, userTokenCorrect: true }));
        resolve(true);
      } else {
        setUserStatus(prev => ({ ...prev, userTokenCorrect: false }));
        resolve(false);
      }
    });
  };

  const logout = () => {
    window.sessionStorage.clear();
    setSessionJWT('');
    setUserStatus({
      userSignedIn: false,
      userTokenCorrect: false,
    });
  };

  return (
    <AccountContext.Provider
      value={{
        sessionJWT,
        userStatus,
        authenticate,
        getSession,
        logout,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export { AccountProvider, AccountContext };
