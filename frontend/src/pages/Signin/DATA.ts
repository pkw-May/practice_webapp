export const PAGE_CONFIGS = {
  title: '로그인',
};

export const BUTTON_CONFIGS = [
  {
    type: 'signin',
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
      bgColor: 'transparent',
      hoverBgColor: 'orange',
      hoverColor: 'white',
    },
  },
];

export const INPUT_CONFIGS = [
  { type: 'text', title: 'Email', name: 'email' },
  { type: 'password', title: 'Password', name: 'password' },
];
