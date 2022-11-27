export interface SignTypes {
  type: 'login' | 'register';
  onSubmit?: () => void;
}
