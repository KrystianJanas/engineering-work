import { EstateModel } from '~/models/estates.model';

export const getEstatesOptions = (
  queryID: string,
  dataEstate: EstateModel,
  personID: string
) => {
  return {
    2: [
      {
        href: `management/estates/${queryID}`,
        name: 'Nieruchomość',
        placeholder: 'Szczegóły nieruchomości',
      },
      dataEstate.person._id === personID
        ? {
            href: `management/estates/${queryID}/renter`,
            name: 'Lokatorzy',
            placeholder: 'Zarządzaj lokatorami',
          }
        : { href: '', name: '', placeholder: '' },
      {
        href: `management/estates/${queryID}/settlement`,
        name: 'Rozliczenia',
        placeholder: 'Zarządzaj rozliczeniami',
      },
      {
        href: `management/estates/${queryID}/invoices`,
        name: 'Faktury',
        placeholder: 'Zarządzaj fakturami',
      },
      {
        href: `management/estates/${queryID}/messages`,
        name: 'Wiadomości',
        placeholder: 'Osoby z nieruchomości',
      },
      {
        href: 'management',
        name: 'Powrót do menu głownego',
        placeholder: '',
      },
    ],
  };
};
