export interface EstateSettlementsModel {
  estate: string;
  person: string;

  data: string; // year-month

  current_use: string;
  gas_use: string;
  water_use: string;

  current_cost_one: string;
  gas_cost_one: string;
  water_cost_one: string;

  created_at: string;
}

export interface EstateSettlementNewModel {
  estate: string;
  person: string;
  created_at: string;
  data: string;
}

// initial states

export const EstateSettlementsModelInitialState: EstateSettlementsModel = {
  estate: '',
  person: '',

  data: '', // year-month

  current_use: '',
  gas_use: '',
  water_use: '',

  current_cost_one: '',
  gas_cost_one: '',
  water_cost_one: '',

  created_at: '',
};

export const EstateSettlementNewModelInitialState: EstateSettlementNewModel = {
  estate: '',
  person: '',
  created_at: '',
  data: '',
};
