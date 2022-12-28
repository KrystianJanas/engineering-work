export const options = {
  // sekcja: ogolne
  1: [
    {
      href: 'management/announcements',
      name: 'Twoje ogłoszenia',
      placeholder: 'Wybierz z listy',
    },
    {
      href: 'management/estates',
      name: 'Twoje nieruchomości',
      placeholder: 'Wybierz z listy',
    },
    {
      href: 'management/other-estates',
      name: 'Inne nieruchomości',
      placeholder: 'Wybierz z listy',
    },
    {
      href: 'management/account',
      name: 'Dane osobowe',
      placeholder: 'Wybierz z listy',
    },
  ],

  // sekcja: nieruchomosc do wynajecia
  2: [
    {
      href: 'management/estates/:id/renter',
      name: 'Lokatorzy',
      placeholder: 'Zarządzaj lokatorami',
    },
    {
      href: 'management/estates/:id/settlement',
      name: 'Rozliczenia',
      placeholder: 'Zarządzaj rozliczeniami',
    },
    {
      href: 'management/estates/:id/invoices',
      name: 'Faktury',
      placeholder: 'Zarządzaj fakturami',
    },
    {
      href: 'management/estates',
      name: 'Powrót do menu głownego',
      placeholder: '',
    },
  ],
};
