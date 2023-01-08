import { useState } from 'react';
import toast from 'react-hot-toast';

import { TextField } from '@mui/material';
import { useRouter } from 'next/router';

import { postQuery } from '~/api/post';
import { Text } from '~/components/atoms/typography';
import { Button } from '~/components/compounds/Button';
import { LeftSidebar } from '~/components/compounds/Left-Sidebar';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { useAuth } from '~/components/contexts/useContextProvider';
import { Layout } from '~/components/molecules/layout';
import { useActivity } from '~/hooks/useActivity';
import { useGetData } from '~/hooks/useGetData';
import {
  EstateSettlementNewModel,
  EstateSettlementNewModelInitialState,
} from '~/models/estateSettlements.model';
import { EstateModel, EstatesModelInitialState } from '~/models/estates.model';
import { mediaError, mediaRegex } from '~/regex.rules';
import { getEstatesOptions } from '~/renterOptions';
import { getRem } from '~/styles/utils';

import { newSettlementValidation } from './new.validation';

export const SettlementNew = () => {
  const router = useRouter();
  const { personID } = useAuth();

  const { activity, setActivity } = useActivity();

  const [current, setCurrent] = useState(0);
  const [gas, setGas] = useState(0);
  const [water, setWater] = useState(0);

  const { data, isLoading } = useGetData<EstateModel>(
    EstatesModelInitialState,
    'estates',
    `${router.query.id}`,
    0,
    0,
    { personID, typeView: 'view' }
  );

  const { data: dataThisMonth, isLoading: isLoadingThisMonth } =
    useGetData<EstateSettlementNewModel>(
      EstateSettlementNewModelInitialState,
      'estates',
      `settlements/thisMonth/${router.query.id}`,
      0,
      0,
      { personID, typeView: 'view' }
    );

  const redirectedFunction = () => {
    if (router.isReady) {
      router.push('/management/estates');
    }
  };

  if (isLoading || isLoadingThisMonth) {
    return <SpinnerLoading />;
  }

  if (!data && !isLoading) {
    redirectedFunction();
    return <SpinnerLoading />;
  }

  const options = getEstatesOptions(
    router.query.id ? router.query.id.toString() : '',
    data,
    personID.toString()
  );

  const sendNewSettlement = async () => {
    if (activity) {
      return null;
    }
    setActivity(true);
    const error = newSettlementValidation(current, gas, water);
    if (error) {
      toast.error(error);
      setActivity(false);
    } else {
      const response = await postQuery('estates/settlements', {
        estate_id: router.query.id,
        person_id: personID,
        current_use: current,
        gas_use: gas,
        water_use: water,
      });
      if (response) {
        await router.push(`/management/estates/${router.query.id}/settlements`);
        setActivity(false);
        toast.success(
          'Pozytywnie wprowadzono zużycie prądu, gazu oraz wody w tym miesiącu.'
        );
      } else {
        toast.error('Coś poszło nie tak...');
        setActivity(false);
      }
    }
    return null;
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
      >
        {dataThisMonth && dataThisMonth.estate ? (
          <Layout display="flex" direction="column" alignItems="center">
            <Text size={getRem(16)}>
              W tym miesiącu kalendarzowym podano już zużycie prądu, gazu oraz
              wody.
            </Text>
            <Text size={getRem(16)}>
              Aby podać zużycie ponownie, poproś osobę zarządzającą
              nieruchomością o cofnięcie odczytów.
            </Text>
            &nbsp;
            <Button
              text="Powrót do menu poprzedniego"
              onSubmit={() =>
                router.push(
                  `/management/estates/${router.query.id}/settlements`
                )
              }
            />
          </Layout>
        ) : (
          <Layout display="flex" direction="column" alignItems="center">
            <Text size={getRem(18)} weight={800}>
              WAŻNA INFORMACJA
            </Text>
            <Text size={getRem(16)}>
              Podaj jedynie{' '}
              <b>
                <u>ZUŻYCIE</u>
              </b>{' '}
              prądu/gazu/wody w stosunku do ubiegłego miesiąca, a nie odczyt
              licznika.
            </Text>
            <Text size={getRem(16)}>
              Na podstawie zużycia zostanie wyprognozowana kwota, z
              uwzględnieniem kosztów stałych podanych przez zarządce
              nieruchomości.
            </Text>
            &nbsp;
            <Layout display="flex" direction="column" width={350} gap="25px">
              <TextField
                id="outlined-basic"
                label="Zużycie prądu (kWh)"
                variant="outlined"
                size="small"
                type="number"
                fullWidth
                error={!current.toString().match(mediaRegex)}
                helperText={!current.toString().match(mediaRegex) && mediaError}
                value={current === 0 ? '' : current}
                onChange={(e) => setCurrent(Number(e.target.value))}
              />
              <TextField
                id="outlined-basic"
                label="Zużycie gazu (m³)"
                variant="outlined"
                size="small"
                type="number"
                fullWidth
                error={!gas.toString().match(mediaRegex)}
                helperText={!gas.toString().match(mediaRegex) && mediaError}
                value={gas === 0 ? '' : gas}
                onChange={(e) => setGas(Number(e.target.value))}
              />
              <TextField
                id="outlined-basic"
                label="Zużycie wody (m³)"
                variant="outlined"
                size="small"
                type="number"
                fullWidth
                error={!water.toString().match(mediaRegex)}
                helperText={!water.toString().match(mediaRegex) && mediaError}
                value={water === 0 ? '' : water}
                onChange={(e) => setWater(Number(e.target.value))}
              />
              <Button
                text="Wyślij zużycie"
                disabled={activity}
                onSubmit={() => sendNewSettlement()}
              />
            </Layout>
          </Layout>
        )}
      </Layout>
    </Layout>
  );
};
