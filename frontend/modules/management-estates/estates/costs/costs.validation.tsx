import { priceRegex } from '~/regex.rules';

import { CostsValidationTypes } from './costs.validation.types';

export const validateCostsEstate = (
  current: CostsValidationTypes,
  gas: CostsValidationTypes,
  water: CostsValidationTypes
) => {
  if (
    !current.fixed_costs.toString().match(priceRegex) ||
    current.fixed_costs.toString() === '0'
  ) {
    return 'Popraw koszt stały dla prądu.';
  }
  if (
    !current.cost_per_one.toString().match(priceRegex) ||
    current.cost_per_one.toString() === '0'
  ) {
    return 'Popraw koszt średniej ceny 1kWh dla prądu.';
  }

  if (
    !gas.fixed_costs.toString().match(priceRegex) ||
    gas.fixed_costs.toString() === '0'
  ) {
    return 'Popraw koszt stały dla gazu.';
  }
  if (
    !gas.cost_per_one.toString().match(priceRegex) ||
    gas.cost_per_one.toString() === '0'
  ) {
    return 'Popraw koszt średniej ceny 1m³ dla gazu.';
  }

  if (
    !water.fixed_costs.toString().match(priceRegex) ||
    water.fixed_costs.toString() === '0'
  ) {
    return 'Popraw koszt stały dla wody.';
  }
  if (
    !water.cost_per_one.toString().match(priceRegex) ||
    water.cost_per_one.toString() === '0'
  ) {
    return 'Popraw koszt średniej ceny 1m³ dla wody.';
  }
};
