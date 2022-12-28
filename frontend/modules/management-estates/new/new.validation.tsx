import { EstateModel } from '~/models/estates.model';

export const ManagementEstatesFormValidation = ({ ...data }: EstateModel) => {
  if (data) {
    if (data.title.length <= 4) {
      return 'Tytuł nieruchomości powinien być dłuższy niż 4 znaki.';
    }
    if (data.fee <= 100) {
      return 'Odstępne powinno być większe niż 100 PLN.';
    }
    if (data.fee >= 100000) {
      return 'Odstępne powinno być mniejsze niż 100000 PLN.';
    }
    if (data.rent <= 50) {
      return 'Czynsz powinien być większy niż 50 PLN.';
    }
    if (data.rent >= 50000) {
      return 'Czynsz powinien być mniejszy niż 50000 PLN.';
    }
    if (data.caution <= 0) {
      return 'Kaucja zwrotna powinna być większa niż 0 PLN.';
    }
    if (data.caution >= 50000) {
      return 'Kaucja zwrotna powinna być mniejsza niż 50000 PLN.';
    }
    if (data.size <= 1) {
      return 'Metraż nieruchomości powinien być większy niż 1 metr.';
    }
    if (data.size >= 5000) {
      return 'Metraż nieruchomości powinien być mniejszy niż 5000 metrów.';
    }
    if (data.rooms < 1) {
      return 'Liczba pokoi nie może być mniejsza niż 1.';
    }
    if (data.rooms >= 50) {
      return 'Liczba pokoi nie może być większa niż 50.';
    }
    if (data.location.length <= 2) {
      return 'Lokalizacja nieruchomości nie została wybrana.';
    }
    if (data.state.length < 1) {
      return 'Wybierz stan wyposażenia nieruchomości.';
    }
  } else return 'Nie znaleziono danych!';

  return null;
};
