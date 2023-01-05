export interface CitiesModel {
  kod: string;
  miejscowosc: string;
  ulica: string;
  wojewodztwo: string;
}

export const CitiesModelInitialState: CitiesModel = {
  kod: '',
  miejscowosc: '',
  ulica: '',
  wojewodztwo: '',
};
