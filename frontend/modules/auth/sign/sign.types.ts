export interface SignTypes {
  type: 'login' | 'register';
  onSubmit?: () => void;
}

export interface Sign {
  login: string;
  password: string;
  rePassword: string;
}
