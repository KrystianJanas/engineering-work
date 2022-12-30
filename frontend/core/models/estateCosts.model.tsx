export interface EstateCostsModel {
  estate: string;

  // prąd
  current_fixedCosts: number;
  current_costPerOne: number;

  // gaz
  gas_fixedCosts: number;
  gas_costPerOne: number;

  // woda
  water_fixedCosts: number;
  water_costPerOne: number;

  created_at: string;
  updated_at: string;
}

export const EstateCostsModelInitialState = {
  estate: '',

  // prąd
  current_fixedCosts: 0,
  current_costPerOne: 0,

  // gaz
  gas_fixedCosts: 0,
  gas_costPerOne: 0,

  // woda
  water_fixedCosts: 0,
  water_costPerOne: 0,

  created_at: '',
  updated_at: '',
};
