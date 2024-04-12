const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider({ region: 'MY_REGION' });

exports.signup = async (userId, password) => {
	// Cognito 회원가입 로직
};

exports.signin = async (userId, password) => {
	// Cognito 로그인 로직
};
