import toast from 'react-hot-toast';

import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import { deleteQuery } from '~/api/delete';
import { Text } from '~/components/atoms/typography';
import { Button } from '~/components/compounds/Button';
import { LeftSidebar } from '~/components/compounds/Left-Sidebar';
import { ModalComponent } from '~/components/compounds/ModalComponent';
import { useModalComponent } from '~/components/compounds/ModalComponent/useModalComponent';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { useAuth } from '~/components/contexts/useContextProvider';
import { Layout } from '~/components/molecules/layout';
import { parseDateSettlement } from '~/hooks/useDateParser';
import { useGetData } from '~/hooks/useGetData';
import {
  EstateCostsModel,
  EstateCostsModelInitialState,
} from '~/models/estateCosts.model';
import {
  EstateSettlementsModel,
  EstateSettlementsModelInitialState,
} from '~/models/estateSettlements.model';
import { EstateModel, EstatesModelInitialState } from '~/models/estates.model';
import { getEstatesOptions } from '~/renterOptions';
import { getRem } from '~/styles/utils';

const StyledLayout = styled(Layout)`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const ManagementEstateSettlement = () => {
  const router = useRouter();
  const { personID } = useAuth();

  const {
    modalActive,
    setModalActive,
    modalData,
    setModalData,
    activity,
    setActivity,
  } = useModalComponent();

  const { data, isLoading } = useGetData<EstateModel>(
    EstatesModelInitialState,
    'estates',
    `${router.query.id}`,
    0,
    0,
    { personID, typeView: 'view' }
  );

  const redirectedFunction = () => {
    if (router.isReady) {
      router.push('/management/estates');
    }
  };

  const { data: dataCosts, isLoading: isLoadingCosts } =
    useGetData<EstateCostsModel>(
      EstateCostsModelInitialState,
      'estates/costs',
      `${router.query.id}`,
      0,
      0,
      { personID, typeView: 'view' }
    );

  const { data: dataSettlements, isLoading: isLoadingSettlements } = useGetData<
    EstateSettlementsModel[]
  >(
    [EstateSettlementsModelInitialState],
    'estates/settlements',
    `${router.query.id}`,
    0,
    0,
    { personID, typeView: 'view' }
  );

  if (isLoading || isLoadingCosts || isLoadingSettlements) {
    return <SpinnerLoading />;
  }

  if (
    (!data && !isLoading) ||
    (!dataCosts && !isLoadingCosts) ||
    (!dataSettlements && !isLoadingSettlements)
  ) {
    console.log('data: ', data, ', isLoading: ', isLoading);
    console.log('dataCosts: ', dataCosts, ', isLoadingCosts: ', isLoadingCosts);
    console.log(
      'dataSettlements: ',
      dataSettlements,
      ', isLoadingSettlements: ',
      isLoadingSettlements
    );
    redirectedFunction();
    return <SpinnerLoading />;
  }

  const options = getEstatesOptions(
    router.query.id ? router.query.id.toString() : '',
    data,
    personID.toString()
  );

  const deleteSettlement = async (id: string) => {
    if (activity) {
      return null;
    }
    const response = await deleteQuery('estates/settlements', id);
    if (response && response.status === 204) {
      window.location.reload();
      toast.success('Pomyślnie usunięto rozliczenie.');
    }
    setTimeout(() => {
      setActivity(false);
    }, 10000);
    return null;
  };

  return (
    <Layout display="flex" direction="row" minWidth="100%" paddingTop={15}>
      <LeftSidebar options={options[2]} />
      <Layout
        background="var(--background-white)"
        width="100%"
        borderRadius="8px"
        boxShadow="0 0 5px 1px var(--border-black)"
        marginRight={15}
        marginBottom={15}
        padding={[10, 20, 20, 20]}
        minWidth="950px"
      >
        {dataCosts && dataCosts.estate?.length > 0 && (
          <Layout display="flex" justifyContent="center">
            <Button
              text="Dodaj nowe odczyty liczników"
              onSubmit={() =>
                router.push(
                  `/management/estates/${router.query.id}/settlements/new`
                )
              }
            />
          </Layout>
        )}

        {dataCosts && dataCosts.estate?.length > 0 ? (
          <Layout marginTop={15}>
            {dataSettlements &&
            dataSettlements.length > 0 &&
            dataSettlements[0]._id.length > 0 ? (
              <Layout display="flex" direction="column" gap="25px">
                {dataSettlements.map((settlement) => (
                  <Layout
                    display="flex"
                    background="var(--background-white)"
                    boxShadow="0 0 4px var(--border-black)"
                    padding={[10]}
                    key={settlement._id}
                    direction="column"
                  >
                    <Layout display="flex" direction="row">
                      <Layout
                        flex={1}
                        marginLeft={data.person._id === personID ? 143.5 : 0}
                      >
                        <Text textAlign="center" size={getRem(16)}>
                          {parseDateSettlement(settlement.data)}
                        </Text>
                        <Text textAlign="center" size={getRem(16)} flex={1}>
                          Rozliczenie zgłoszone przez: {settlement.person.name}{' '}
                          {settlement.person._id === data.person._id &&
                            `( zarządca nieruchomości )`}
                        </Text>
                      </Layout>
                      {data.person._id === personID && (
                        <Button
                          disabled={activity}
                          text="Usuń rozliczenie"
                          onSubmit={() => {
                            setModalData({
                              id: settlement._id,
                              description: `Czy na pewno chcesz usunąć rozliczenie z daty: ${settlement.data} ?`,
                            });
                            setModalActive(true);
                          }}
                        />
                      )}
                    </Layout>
                    &nbsp;
                    <Layout
                      display="flex"
                      direction="row"
                      justifyContent="space-between"
                      gap="25px"
                    >
                      <StyledLayout>
                        <Text size={getRem(18)} weight={700}>
                          PRĄD
                        </Text>
                        <Text>
                          Zużycie: <i>{settlement.current_use} kWh</i>
                        </Text>
                        <Text>
                          Prognozowany koszt:{' '}
                          <i>
                            {(
                              Number(settlement.current_use) *
                                Number(settlement.current_cost_one) +
                              Number(settlement.current_fixed_costs)
                            ).toFixed(2)}{' '}
                            PLN
                          </i>
                        </Text>
                        &nbsp;
                        <Text>Przy cenach:</Text>
                        <Text>
                          Średnie koszty stałe:{' '}
                          <i>{settlement.current_fixed_costs} PLN</i>
                        </Text>
                        <Text>
                          Średnia cena za 1kWh:{' '}
                          <i>{settlement.current_cost_one} PLN</i>
                        </Text>
                      </StyledLayout>
                      <StyledLayout>
                        <Text size={getRem(18)} weight={700}>
                          GAZ
                        </Text>
                        <Text>
                          Zużycie: <i>{settlement.gas_use} m³</i>
                        </Text>
                        <Text>
                          Prognozowany koszt:{' '}
                          <i>
                            {(
                              Number(settlement.gas_use) *
                                Number(settlement.gas_cost_one) +
                              Number(settlement.gas_fixed_costs)
                            ).toFixed(2)}{' '}
                            PLN
                          </i>
                        </Text>
                        &nbsp;
                        <Text>Przy cenach:</Text>
                        <Text>
                          Średnie koszty stałe:{' '}
                          <i>{settlement.gas_fixed_costs} PLN</i>
                        </Text>
                        <Text>
                          Średnia cena za 1m³:{' '}
                          <i>{settlement.gas_cost_one} PLN</i>
                        </Text>
                      </StyledLayout>
                      <StyledLayout>
                        <Text size={getRem(18)} weight={700}>
                          WODA
                        </Text>
                        <Text>
                          Zużycie: <i>{settlement.water_use} m³</i>
                        </Text>
                        <Text>
                          Prognozowany koszt:{' '}
                          <i>
                            {(
                              Number(settlement.water_use) *
                                Number(settlement.water_cost_one) +
                              Number(settlement.water_fixed_costs)
                            ).toFixed(2)}{' '}
                            PLN
                          </i>
                        </Text>
                        &nbsp;
                        <Text>Przy cenach:</Text>
                        <Text>
                          Średnie koszty stałe:{' '}
                          <i>{settlement.water_fixed_costs} PLN</i>
                        </Text>
                        <Text>
                          Średnia cena za 1m³:{' '}
                          <i>{settlement.water_cost_one} PLN</i>
                        </Text>
                      </StyledLayout>
                    </Layout>
                    &nbsp;
                    <Text textAlign="center" size={getRem(16)}>
                      Łączna szacunkowa kwota rachunków za prąd, gaz i wodę:{' '}
                    </Text>
                    <Text textAlign="center" size={getRem(16)} weight={700}>
                      {(
                        Number(settlement.current_use) *
                          Number(settlement.current_cost_one) +
                        Number(settlement.current_fixed_costs) +
                        (Number(settlement.gas_use) *
                          Number(settlement.gas_cost_one) +
                          Number(settlement.gas_fixed_costs)) +
                        (Number(settlement.water_use) *
                          Number(settlement.water_cost_one) +
                          Number(settlement.water_fixed_costs))
                      ).toFixed(2)}{' '}
                      PLN
                    </Text>
                  </Layout>
                ))}
              </Layout>
            ) : (
              <Layout marginTop={25}>
                <Text textAlign="center" size={getRem(16)}>
                  Nie odnotowano do tej pory wcześniejszych zgłoszeń rozliczeń.
                </Text>
                <Text textAlign="center" size={getRem(16)}>
                  Aby dodać nowe rozliczenie, skorzystaj z przycisku{' '}
                  <i>Dodaj nowe odczyty liczników</i>.
                </Text>
                <Text textAlign="center" size={getRem(16)}>
                  Pamiętaj, że sprawozdanie z liczników możesz podać jedynie raz
                  w miesiącu.
                </Text>
                <Text textAlign="center" size={getRem(16)}>
                  Zarządca nieruchomości może takie sprawozdanie wycofać - wtedy
                  jest możliwość ponownego dodania sprawozdania.
                </Text>
              </Layout>
            )}
          </Layout>
        ) : (
          <>
            <Text textAlign="center" size={getRem(16)}>
              Zarządca nieruchomości <b>nie wprowadził</b> danych dotyczących
              kosztów stałych (szacunkowych stałych miesięcznych opłat) za prąd,
              gaz oraz wodę. W związku z tym dostęp do zakładki{' '}
              <i>Rozliczenia</i> jest aktualnie <b>ograniczony</b>.
            </Text>
            &nbsp;
            <Text textAlign="center" size={getRem(16)}>
              Po wprowadzeniu danych przez zarządce nieruchomości, dostęp do
              niniejszej sekcji zostanie odblokowany, a odpowiednie informacje z
              tej sekcji pojawią się na ekranie.
            </Text>
          </>
        )}
      </Layout>
      {modalActive && (
        <ModalComponent
          title="USUWANIE ROZLICZENIA"
          description={modalData.description}
          cancelButton
          cancelText="Nie, nie chcę"
          onHide={() => setModalActive(false)}
          confirmButton
          confirmText="Tak, chcę usunąć"
          onConfirm={() => {
            setActivity(true);
            setModalActive(false);
            deleteSettlement(modalData.id);
          }}
        />
      )}
    </Layout>
  );
};
