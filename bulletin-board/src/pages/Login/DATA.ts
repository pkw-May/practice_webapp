export const PAGE_CONFIGS = {
  title: '로그인',
};

export const BUTTON_CONFIGS = [
  {
    type: 'login',
    btnName: 'Login',
    btnStyle: {
      bgColor: 'skyblue',
      fontColor: 'white',
    },
  },
  {
    type: 'signup',
    btnName: 'Sign Up',
    btnStyle: {
      fontColor: 'skyblue',
      hoverBgColor: 'orange',
      hoverColor: 'white',
    },
  },
];

export const WARNINGS = {
  check: '이메일 주소를 작성해주세요',
  length: '4자 이상 작성해주세요',
  addNum: '숫자를 하나 이상 작성해주세요',
  addSym: '특수문자를 하나 이상 작성해주세요',
};

export const INPUT_CONFIGS = [
  { type: 'text', title: 'ID', name: 'userId' },
  { type: 'password', title: 'Password', name: 'password' },
];
