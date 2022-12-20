export interface AccountModel {
  name: string;
  zip_code: string;
  city: string;
  phone_number: string;
}

export const AccountModelInitialState: AccountModel = {
  name: '',
  zip_code: '',
  city: '',
  phone_number: '',
};
