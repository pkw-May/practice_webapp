export const PAGE_CONFIGS = {
  title: '회원가입',
};

export const CHECK_BTN_CONFIG = {
  type: 'check',
  btnName: '중복 확인',
  btnStyle: {
    bgColor: 'skyblue',
    fontColor: 'white',
    smallFont: true,
  },
};

export const SIGNUP_BTN_CONFIG = {
  type: 'signup',
  btnName: '가입 하기',
  btnStyle: {
    bgColor: 'skyblue',
    fontColor: 'white',
  },
};

export const INPUT_CONFIGS = [
  { type: 'text', title: 'Email', name: 'userId' },
  { type: 'password', title: 'Password', name: 'password' },
  { type: 'password', title: 'Check Password', name: 'checkPassword' },
];
