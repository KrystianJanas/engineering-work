import { AccountModel } from '~/models/account.model';

export const AccountValidationPersonalData = (formData: AccountModel) => {
  let error;

  if (formData) {
    if (formData.name.trim().length < 2) {
      return {
        error: 'Osoba kontaktowa powinna posiadać co najmniej 2 znaki.',
      };
    }

    if (
      formData.zip_code.trim().length !== 6 ||
      !formData.zip_code.includes('-') ||
      !(
        formData.zip_code.split('-')[0] &&
        formData.zip_code.split('-')[0].length === 2
      )
    ) {
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
