export interface MessageCardTypes {
  person: string;
  data: string;
  content: string;

  additional?: {
    estate_owner: string;
    personID: string;
  };
}

export const MessageCardTypesInitialState = {
  person: '',
  data: '',
  content: '',

  additional: {
    estate_owner: '',
    personID: '',
  },
};
