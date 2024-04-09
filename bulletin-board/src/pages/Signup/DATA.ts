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

export const WARNINGS = {
  check: '아이디 중복을 확인해주세요',
  length: '4자 이상 작성해주세요',
  addNum: '숫자를 하나 이상 작성해주세요',
  addSym: '특수문자를 하나 이상 작성해주세요',
};

export const INPUT_CONFIGS = [
  { type: 'text', title: 'ID', name: 'userId' },
  { type: 'password', title: 'Password', name: 'password' },
  { type: 'password', title: 'Check Password', name: 'checkPassword' },
];
