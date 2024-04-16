import { CognitoUser } from 'amazon-cognito-identity-js';
import UserPool from '../UserPool';
import { authService } from '../apis/authService';

export interface DataForUserCreation {
  email: string;
  oauthId: string;
}

export const useCreateUser = () => {
  const callCognitoSignUp = async (
    email: string,
    password: string,
    afterCallSignUp: (
      result: boolean,
      dataForUserCreation?: DataForUserCreation,
    ) => void,
  ) => {
    try {
      UserPool.signUp(email, password, [], [], (err, data) => {
        if (err) {
          console.error(err);
          afterCallSignUp(false, null);
        } else {
          if (data) {
            const dataForUserCreation = {
              email: data.user.getUsername(),
              oauthId: data.userSub,
            };
            afterCallSignUp(true, dataForUserCreation);
          }
        }
      });
    } catch (err) {
      console.error(err);
      alert('회원가입에 실패했습니다.');
    }
  };

  const insertNewUserToDB = async (
    userData: DataForUserCreation,
  ): Promise<boolean> => {
    try {
      const response = await authService.insertNewUser(userData);

      const { status, data } = response;
      if (status === 201) {
        return true;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const callCognitoVerify = async (
    dataForUserCreation: DataForUserCreation,
    verificationCode: string,
    afterVerification: (result: boolean) => void,
  ) => {
    const userData = {
      Username: dataForUserCreation.email,
      Pool: UserPool,
    };
    const cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmRegistration(
      verificationCode,
      true,
      async function (err, result) {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        } else if (result === 'SUCCESS') {
          try {
            const result = await insertNewUserToDB(dataForUserCreation);
            afterVerification(result);
          } catch (err) {
            console.error(err);
            window.alert('회원가입에 실패했습니다.');
          }
        }
      },
    );
  };

  return { callCognitoSignUp, callCognitoVerify };
};
