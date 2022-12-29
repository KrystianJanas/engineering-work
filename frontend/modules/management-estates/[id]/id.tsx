import toast from 'react-hot-toast';

import { useRouter } from 'next/router';

import { updateQuery } from '~/api/update';
import { Text } from '~/components/atoms/typography';
import { Button } from '~/components/compounds/Button';
import { LeftSidebar } from '~/components/compounds/Left-Sidebar';
import { ModalComponent } from '~/components/compounds/ModalComponent';
import { useModalComponent } from '~/components/compounds/ModalComponent/useModalComponent';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { Layout } from '~/components/molecules/layout';
import { useAuth } from '~/hooks/useContextProvider';
import { useGetData } from '~/hooks/useGetData';
import { EstateModel, EstatesModelInitialState } from '~/models/estates.model';
import { getEstatesOptions } from '~/renterOptions';
import { getRem } from '~/styles/utils';

export const ManagementEstateIDDetails = () => {
  const { personID } = useAuth();
  const router = useRouter();

  // TODO: check person permissions -> is associated with this estate?
  // person or renter...

  const { modalActive, setModalActive, modalData, setModalData } =
    useModalComponent();

  const redirectedFunction = () => {
    if (router.isReady) {
      router
        .push('/management/estates')
        .then(() => toast.error('Nie masz tu dostępu.'));
    }
  };

  const { data, isLoading } = useGetData<EstateModel>(
    EstatesModelInitialState,
    'estates',
    `${router.query.id}`
  );

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (!data) {
    redirectedFunction();
    return <SpinnerLoading />;
  }

  const options = getEstatesOptions(
    router.query.id ? router.query.id.toString() : '',
    data,
    personID.toString()
  );

  const leaveEstateByRenter = async (estateID: string) => {
    const response = await updateQuery(`/estates/remove_renter/${estateID}`, {
      person_id: personID,
    });
    if (response) {
      await router.push('/management');
      toast.success('Pomyślnie opuszczono nieruchomość.');
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
      >
        <Text textAlign="center" size={getRem(20)}>
          {data.title}
        </Text>
        &nbsp;
        <Text weight={700} size={getRem(16)}>
          Kontakt z zarządcą nieruchomości
        </Text>
        <Text size={getRem(16)}>
          {data.person.name}, telefon kontaktowy:{' '}
          {data.person.phone_number || 'nie podano'}
        </Text>
        &nbsp;
        <Text weight={700} size={getRem(16)}>
          Informacje dotyczące kosztów wynajmu
        </Text>
        <Text size={getRem(16)}>Czynsz: {data.rent}</Text>
        <Text size={getRem(16)}>Odstępne: {data.fee}</Text>
        <Text size={getRem(16)}>Kaucja zwrotna: {data.caution}</Text>
        &nbsp;
        <Text weight={700} size={getRem(16)}>
          Informacje dotyczące nieruchomości
        </Text>
        <Text size={getRem(16)}>Ilość pokoi: {data.rooms}</Text>
        <Text size={getRem(16)}>Liczba metrów kwadratowych: {data.size}</Text>
        <Text size={getRem(16)}>Lokalizacja: {data.location}</Text>{' '}
        <Text size={getRem(16)}>Stan wyposażenia: {data.state}</Text>
        {data.renter.length > 0 && (
          <Layout>
            {' '}
            &nbsp;
            <Text weight={700} size={getRem(16)}>
              Osoby wynajmujące
            </Text>
            {data.renter.map((renterPerson, index) => {
              return (
                <Text size={getRem(16)}>
                  {index + 1}) {renterPerson.name}, telefon kontaktowy:{' '}
                  {renterPerson.phone_number || 'nie podano'}
                </Text>
              );
            })}
          </Layout>
        )}
        {data.info && (
          <Layout>
            &nbsp;
            <Text weight={700} size={getRem(16)}>
              Dodatkowe informacje
            </Text>
            <Text size={getRem(16)}>{data.info}</Text>
          </Layout>
        )}
        {data.person._id !== personID ? (
          <Layout display="flex" justifyContent="center" marginTop={20}>
            <Button
              text="Opuść nieruchomość"
              onSubmit={() => {
                setModalData({
                  id: `${router.query.id}`,
                  description:
                    'Czy na pewno chcesz opuścić tą nieruchomość? Podejmij decyzję poniżej.',
                });
                setModalActive(true);
              }}
            />
          </Layout>
        ) : (
          <Layout display="flex" justifyContent="center" marginTop={20}>
            <Button
              text="Usuń nieruchomość"
              onSubmit={() => {
                setModalData({
                  id: `${router.query.id}`,
                  description:
                    'Czy na pewno chcesz usunąć tą nieruchomość? Podejmij decyzję poniżej.',
                });
                setModalActive(true);
              }}
            />
          </Layout>
        )}
        {modalActive && (
          <ModalComponent
            title="OPUSZCZANIE NIERUCHOMOŚCI"
            description={modalData.description}
            cancelButton
            cancelText="Nie chcę opuszczać"
            onHide={() => setModalActive(false)}
            confirmButton
            confirmText="Opuszczam"
            onConfirm={() => leaveEstateByRenter(`${router.query.id}`)}
          />
        )}
      </Layout>
    </Layout>
  );
};
