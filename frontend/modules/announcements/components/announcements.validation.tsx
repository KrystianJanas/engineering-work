import { AnnouncementModel } from '~/models/announcement.model';

export const AnnouncementsValidation = (data: AnnouncementModel) => {
  if (data.title.trim().length <= 4 || data.title.trim().length >= 128) {
    return {
      error:
        'Tytuł ogłoszenia powinien być dłuższy niż 4 znaki, ale krótszy niż 128 znaków.',
    };
  }
  if (data.rent <= 10 || data.rent >= 100000) {
    return {
      error: 'Czynsz powinien być większy niż 10zł, ale mniejsza niż 100000zł.',
    };
  }
  if (data.fee <= 10 || data.fee >= 100000) {
    return {
      error:
        'Odstępne powinno być większe niż 10zł, ale mniejsza niż 100000zł.',
    };
  }
  if (data.size <= 0 || data.size >= 10000) {
    return {
      error: 'Metraż powinien być większy niż 0m, ale mniejszy niż 10000m.',
    };
  }
  if (data.rooms <= 0 || data.rooms >= 100) {
    return {
      error: 'Liczba pokoi powinna być większa niż 0, ale mniejsza niż 100.',
    };
  }
  if (data.location.trim().length < 4 || data.location.trim().length >= 48) {
    return {
      error: 'Nie wybrano lokalizacji nieruchomości.',
    };
  }
  if (data.state.length <= 0) {
    return { error: 'Wybierz stan wyposażenia nieruchomości.' };
  }
  if (data.description.trim().length <= 16) {
    return { error: 'Opis ogłoszenia powinien być dłuższy niż 16 znaków.' };
  }

  return { error: null };
};
