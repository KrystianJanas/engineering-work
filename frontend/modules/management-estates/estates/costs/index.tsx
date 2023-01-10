import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import { useRouter } from 'next/router';

import { postQuery } from '~/api/post';
import { Text } from '~/components/atoms/typography';
import { Button } from '~/components/compounds/Button';
import { LeftSidebar } from '~/components/compounds/Left-Sidebar';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { useAuth } from '~/components/contexts/useContextProvider';
import { Layout } from '~/components/molecules/layout';
import { useGetData } from '~/hooks/useGetData';
import {
  EstateCostsModel,
  EstateCostsModelInitialState,
} from '~/models/estateCosts.model';
import { EstateModel, EstatesModelInitialState } from '~/models/estates.model';
import { priceError, priceRegex } from '~/regex.rules';
import { getEstatesOptions } from '~/renterOptions';
import { getRem } from '~/styles/utils';

import { validateCostsEstate } from './costs.validation';

const StyledLayout = styled(Layout)`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 240px;
`;

export const ManagementEstateFixedCosts = () => {
  const router = useRouter();
  const { personID } = useAuth();

  const [current, setCurrent] = useState({ fixed_costs: 0, cost_per_one: 0 });
  const [gas, setGas] = useState({ fixed_costs: 0, cost_per_one: 0 });
  const [water, setWater] = useState({ fixed_costs: 0, cost_per_one: 0 });

  const { data, isLoading } = useGetData<EstateModel>(
    EstatesModelInitialState,
    'estates',
    `${router.query.id}`,
    0,
    0,
    { personID, typeView: 'edit' }
  );

  const { data: dataCosts, isLoading: isLoadingCosts } =
    useGetData<EstateCostsModel>(
      EstateCostsModelInitialState,
      'estates/costs',
      `${router.query.id}`,
      0,
      0,
      { personID, typeView: 'edit' }
    );

  useEffect(() => {
    if (dataCosts && dataCosts.estate?.length > 0) {
      setCurrent({
        fixed_costs: dataCosts.current_fixedCosts,
        cost_per_one: dataCosts.current_costPerOne,
      });
      setGas({
        fixed_costs: dataCosts.gas_fixedCosts,
        cost_per_one: dataCosts.gas_costPerOne,
      });
      setWater({
        fixed_costs: dataCosts.water_fixedCosts,
        cost_per_one: dataCosts.water_costPerOne,
      });
    }
  }, [dataCosts]);

  const redirectedFunction = () => {
    if (router.isReady) {
      router.push('/management/estates');
    }
  };

  if (isLoading || isLoadingCosts) {
    return <SpinnerLoading />;
  }

  if ((!data && !isLoading) || (!dataCosts && !isLoadingCosts)) {
    redirectedFunction();
    return <SpinnerLoading />;
  }

  const options = getEstatesOptions(
    router.query.id ? router.query.id.toString() : '',
    data,
    personID.toString()
  );

  const saveEstateCosts = async () => {
    const error = validateCostsEstate(current, gas, water);

    if (error) {
      toast.error(error);
    } else {
      const response = await postQuery('/estates/costs', {
        estate_id: router.query.id,
        current_fixedCosts: current.fixed_costs,
        current_costPerOne: current.cost_per_one,
        gas_fixedCosts: gas.fixed_costs,
        gas_costPerOne: gas.cost_per_one,
        water_fixedCosts: water.fixed_costs,
        water_costPerOne: water.cost_per_one,
      });
      if (response) {
        window.location.reload();
        toast.success('Pomyślnie zapisano koszty stałe dla nieruchomości.');
      }
    }
  };

  return (
    <Layout display="flex" direction="row" minWidth="100%" paddingTop={15}>
      <LeftSidebar options={options[2]} />
      <Layout
        background="var(--background-white)"
        width="100%"
        borderRadius="8px"
        marginRight={15}
        padding={[10, 20]}
        boxShadow="0 0 5px 1px var(--border-black)"
        display="flex"
        direction="column"
        minWidth="850px"
      >
        <Layout display="flex" direction="row" justifyContent="space-between">
          <StyledLayout>
            <Text size={getRem(18)} weight={800}>
              PRĄD
            </Text>
            <TextField
              id="outlined-basic"
              label="Koszty stałe (PLN)"
              variant="outlined"
              fullWidth
              size="small"
              type="number"
              error={!current.fixed_costs.toString().match(priceRegex)}
              helperText={
                !current.fixed_costs.toString().match(priceRegex) && priceError
              }
              value={current.fixed_costs === 0 ? '' : current.fixed_costs}
              onChange={(e) =>
                setCurrent({
                  fixed_costs: Number(e.target.value),
                  cost_per_one: current.cost_per_one,
                })
              }
              inputProps={{ maxLength: 3 }}
            />
            <TextField
              id="outlined-basic"
              label="Średnia cena za 1kWh (PLN)"
              variant="outlined"
              fullWidth
              size="small"
              type="number"
              error={!current.cost_per_one.toString().match(priceRegex)}
              helperText={
                !current.cost_per_one.toString().match(priceRegex) && priceError
              }
              value={current.cost_per_one === 0 ? '' : current.cost_per_one}
              onChange={(e) =>
                setCurrent({
                  fixed_costs: current.fixed_costs,
                  cost_per_one: Number(e.target.value),
                })
              }
            />
          </StyledLayout>
          <StyledLayout>
            <Text size={getRem(18)} weight={800}>
              GAZ
            </Text>
            <TextField
              id="outlined-basic"
              label="Koszty stałe (PLN)"
              variant="outlined"
              fullWidth
              size="small"
              type="number"
              error={!gas.fixed_costs.toString().match(priceRegex)}
              helperText={
                !gas.fixed_costs.toString().match(priceRegex) && priceError
              }
              value={gas.fixed_costs === 0 ? '' : gas.fixed_costs}
              onChange={(e) =>
                setGas({
                  fixed_costs: Number(e.target.value),
                  cost_per_one: gas.cost_per_one,
                })
              }
            />
            <TextField
              id="outlined-basic"
              label="Średnia cena za 1m³ (PLN)"
              variant="outlined"
              fullWidth
              size="small"
              type="number"
              error={!gas.cost_per_one.toString().match(priceRegex)}
              helperText={
                !gas.cost_per_one.toString().match(priceRegex) && priceError
              }
              value={gas.cost_per_one === 0 ? '' : gas.cost_per_one}
              onChange={(e) =>
                setGas({
                  fixed_costs: gas.fixed_costs,
                  cost_per_one: Number(e.target.value),
                })
              }
            />
          </StyledLayout>
          <StyledLayout>
            <Text size={getRem(18)} weight={800}>
              WODA
            </Text>
            <TextField
              id="outlined-basic"
              label="Koszty stałe (PLN)"
              variant="outlined"
              fullWidth
              size="small"
              type="number"
              error={!water.fixed_costs.toString().match(priceRegex)}
              helperText={
                !water.fixed_costs.toString().match(priceRegex) && priceError
              }
              value={water.fixed_costs === 0 ? '' : water.fixed_costs}
              onChange={(e) =>
                setWater({
                  fixed_costs: Number(e.target.value),
                  cost_per_one: water.cost_per_one,
                })
              }
            />
            <TextField
              id="outlined-basic"
              label="Średnia cena za 1m³ (PLN)"
              variant="outlined"
              fullWidth
              size="small"
              type="number"
              error={!water.cost_per_one.toString().match(priceRegex)}
              helperText={
                !water.cost_per_one.toString().match(priceRegex) && priceError
              }
              value={water.cost_per_one === 0 ? '' : water.cost_per_one}
              onChange={(e) =>
                setWater({
                  fixed_costs: water.fixed_costs,
                  cost_per_one: Number(e.target.value),
                })
              }
            />
          </StyledLayout>
        </Layout>
        <Layout display="flex" justifyContent="center" marginTop={25}>
          <Button text="Zapisz koszty stałe" onSubmit={saveEstateCosts} />
        </Layout>
      </Layout>
    </Layout>
  );
};
