import { useRouter } from 'next/router';

import { Text } from '~/components/atoms/typography';
import { Button } from '~/components/compounds/Button';
import { LeftSidebar } from '~/components/compounds/Left-Sidebar';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { Layout } from '~/components/molecules/layout';
import { useAuth } from '~/hooks/useContextProvider';
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

export const ManagementEstateSettlement = () => {
  const router = useRouter();
  const { personID } = useAuth();

  const { data, isLoading } = useGetData<EstateModel>(
    EstatesModelInitialState,
    'estates',
    `${router.query.id}`
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
      `${router.query.id}`
    );

  const { data: dataSettlements, isLoading: isLoadingSettlements } = useGetData<
    EstateSettlementsModel[]
  >(
    [EstateSettlementsModelInitialState],
    'estates/settlements',
    `${router.query.id}`
  );

  if (isLoading || isLoadingCosts || isLoadingSettlements) {
    return <SpinnerLoading />;
  }

  if (
    !data ||
    !(
      data.person._id === personID ||
      data.renter.find((rent) => rent._id === personID)
    )
  ) {
    redirectedFunction();
    return <SpinnerLoading />;
  }

  const options = getEstatesOptions(
    router.query.id ? router.query.id.toString() : '',
    data,
    personID.toString()
  );

  return (
    <Layout display="flex" direction="row" minWidth="100%" paddingTop={15}>
      <LeftSidebar options={options[2]} />
      <Layout
        background="var(--background-white)"
        width="100%"
        borderRadius="8px"
        marginRight={15}
        padding={[10, 20]}
      >
        <Layout display="flex" justifyContent="right">
          <Button
            text="Dodaj nowe odczyty liczników"
            onSubmit={() =>
              router.push(
                `/management/estates/${router.query.id}/settlements/new`
              )
            }
          />
        </Layout>
        {dataCosts ? (
          <Layout>
            {dataSettlements.length > 0 ? (
              <Layout>tu sa dane gdy jest settlements...</Layout>
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
    </Layout>
  );
};
