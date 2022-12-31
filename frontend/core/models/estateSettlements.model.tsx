import {
  PersonLoginIdModel,
  PersonLoginIdModelInitialState,
} from '~/models/person.model';

export interface EstateSettlementsModel {
  _id: string;

  estate: string;
  person: PersonLoginIdModel;

  data: string; // year-month

  current_use: string;
  gas_use: string;
  water_use: string;

  current_cost_one: string;
  gas_cost_one: string;
  water_cost_one: string;

  current_fixed_costs: string;
  gas_fixed_costs: string;
  water_fixed_costs: string;

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
  _id: '',

  estate: '',
  person: PersonLoginIdModelInitialState,

  data: '', // year-month

  current_use: '',
  gas_use: '',
  water_use: '',

  current_cost_one: '',
  gas_cost_one: '',
  water_cost_one: '',

  created_at: '',

  current_fixed_costs: '',
  gas_fixed_costs: '',
  water_fixed_costs: '',
};

export const EstateSettlementNewModelInitialState: EstateSettlementNewModel = {
  estate: '',
  person: '',
  created_at: '',
  data: '',
};
