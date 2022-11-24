export interface Estate {
  name: string;
  price: number;
  fee: number;
  caution: number;
  size: number;
  location: string;
  photo_url: string;
  date: string;
  type: string; // stan deweloperski / umeblowane
  information: string;
}

export interface NewManagemenetEstates {
  estate?: Estate;
  onSubmit?: (data: Estate) => void;
}
