import { AccountModel, AccountPasswordModel } from '~/models/account.model';
import { zipCodeRegex } from '~/regex.rules';

export const AccountValidationPersonalData = (formData: AccountModel) => {
  let error;

  if (formData) {
    if (formData.name.trim().length < 2) {
      return {
        error: 'Osoba kontaktowa powinna posiadać co najmniej 2 znaki.',
      };
    }

    if (!formData.zip_code.match(zipCodeRegex)) {
      return {
        error: 'Kod pocztowy powinien mieć następujący schemat: 12-345.',
      };
    }

    if (formData.city.trim().length < 2) {
      return { error: 'Miejscowość powinna zawierać co najmniej 2 znaki.' };
    }

    if (
      formData.phone_number.trim().length !== 9 ||
      !Number(formData.phone_number)
    ) {
      return { error: 'Numer telefonu powinien zawierać 9 cyfr.' };
    }
  } else {
    error = 'Nie znaleziono formularza. Spróbuj ponownie.';
  }

  return { error };
};

export const AccountValidatePassword = (formData: AccountPasswordModel) => {
  let error;

  if (formData) {
    if (formData.password.trim().length < 5) {
      return {
        error: 'Hasło powinno zawierać co najmniej 5 znaków.',
      };
    }

    if (formData.newPassword.trim().length < 5) {
      return {
        error: 'Nowe hasło powinno zawierać co najmniej 5 znaków.',
      };
    }

    if (formData.repeatNewPassword.trim().length < 5) {
      return {
        error:
          'Powtórzenie nowego hasła powinno zawierać co najmniej 5 znaków.',
      };
    }

    if (formData.newPassword.trim() !== formData.repeatNewPassword.trim()) {
      return {
        error: 'Nowe hasło i jego powtórzenie powinny być identyczne.',
      };
    }

    if (formData.password.trim() === formData.newPassword.trim()) {
      return {
        error: 'Nowe hasło powinno się różnić od poprzednio używanego hasła.',
      };
    }
  } else {
    error = 'Nie znaleziono formularza. Spróbuj ponownie.';
  }

  return { error };
};
