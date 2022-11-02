import { MessagesTypes, MessageType } from '~/types/messages.types';

export const MessagesInitialState: MessagesTypes[] = [
  {
    id: 1,
    from: {
      id: 1,
      name: 'Krystianek',
    },
    to: {
      id: 2,
      name: 'Testerek',
    },
    announcement: {
      id: 1,
      advertiser: {
        id: 1,
        name: 'Krystianek',
      },
      title: 'Testowe ogłoszenie - tytuł',
      description: 'Tu bedzie opis ogloszenia.......',
      image_url:
        'https://waskiel.pl/wp-content/uploads/2019/11/pomysly-na-zdjecia-obraz-wyrozniajacy.jpg',
    },
    type: 'send',
    date: '2022-11-02',
    messages: 2,
  },
  {
    id: 2,
    from: {
      id: 1,
      name: 'Krystianek',
    },
    to: {
      id: 2,
      name: 'Testerek',
    },
    announcement: {
      id: 1,
      advertiser: {
        id: 1,
        name: 'Krystianek',
      },
      title: 'Testowe ogłoszenie - tytuł',
      description: 'Tu bedzie opis ogloszenia.......',
      image_url:
        'https://gfx.podroze.radiozet.pl/var/radiozetpodroze/storage/images/polska/tatry-niezwykle-zdjecie-gor-podbija-siec-idealne-na-tapete/18072517-1-pol-PL/Niezwykle-zdjecie-Tatr-podbija-siec.-Idealne-na-tapete_article.jpg',
    },
    type: 'send',
    date: '2022-11-01',
    messages: 5,
  },
  {
    id: 3,
    from: {
      id: 1,
      name: 'Krystianek',
    },
    to: {
      id: 2,
      name: 'Testerek',
    },
    announcement: {
      id: 1,
      advertiser: {
        id: 1,
        name: 'Krystianek',
      },
      title: 'Testowe ogłoszenie - tytuł',
      description: 'Tu bedzie opis ogloszenia.......',
      image_url:
        'https://waskiel.pl/wp-content/uploads/2019/11/pomysly-na-zdjecia-obraz-wyrozniajacy.jpg',
    },
    type: 'received',
    date: '2022-11-03',
    messages: 10,
  },
];

export const MessageInitialState: MessageType = {
  messages_id: 1,
  announcement_id: 1,
  messages: [
    {
      id: 1,
      from: 'Testowa osoba',
      message:
        'Testowa wiadomość od Lorem Ipsum w sprawie mieszkania. To testowe zapytanie.' +
        'Testowa wiadomość od Lorem Ipsum w sprawie mieszkania. To testowe zapytanie.' +
        'Testowa wiadomość od Lorem Ipsum w sprawie mieszkania. To testowe zapytanie.' +
        'Testowa wiadomość od Lorem Ipsum w sprawie mieszkania. To testowe zapytanie.' +
        'Testowa wiadomość od Lorem Ipsum w sprawie mieszkania. To testowe zapytanie.',
      date: '2022-11-02',
    },
    {
      id: 2,
      from: 'Testowa osoba',
      message:
        'Testowa wiadomość od Lorem Ipsum w sprawie mieszkania. To testowe zapytanie.' +
        'Testowa wiadomość od Lorem Ipsum w sprawie mieszkania. To testowe zapytanie.' +
        'Testowa wiadomość od Lorem Ipsum w sprawie mieszkania. To testowe zapytanie.' +
        'Testowa wiadomość od Lorem Ipsum w sprawie mieszkania. To testowe zapytanie.' +
        'Testowa wiadomość od Lorem Ipsum w sprawie mieszkania. To testowe zapytanie.',
      date: '2022-11-02',
    },
    {
      id: 3,
      from: 'Testowa osoba',
      message:
        'Testowa wiadomość od Lorem Ipsum w sprawie mieszkania. To testowe zapytanie.' +
        'Testowa wiadomość od Lorem Ipsum w sprawie mieszkania. To testowe zapytanie.' +
        'Testowa wiadomość od Lorem Ipsum w sprawie mieszkania. To testowe zapytanie.' +
        'Testowa wiadomość od Lorem Ipsum w sprawie mieszkania. To testowe zapytanie.' +
        'Testowa wiadomość od Lorem Ipsum w sprawie mieszkania. To testowe zapytanie.',
      date: '2022-11-02',
    },
  ],
};
