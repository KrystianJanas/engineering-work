import toast from 'react-hot-toast';

import { useRouter } from 'next/router';

import { deleteQuery } from '~/api/delete';
import { updateQuery } from '~/api/update';
import { Text } from '~/components/atoms/typography';
import { AddButton } from '~/components/compounds/AddButton/components/add-button';
import { LeftSidebar } from '~/components/compounds/Left-Sidebar';
import { ModalComponent } from '~/components/compounds/ModalComponent';
import { useModalComponent } from '~/components/compounds/ModalComponent/useModalComponent';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { useAuth } from '~/components/contexts/useContextProvider';
import { CustomDeleteIcon } from '~/components/icons/global';
import { Layout } from '~/components/molecules/layout';
import { useActivity } from '~/hooks/useActivity';
import { useGetData } from '~/hooks/useGetData';
import {
  EstateInvitationsModel,
  EstateInvitationsModelInitialState,
} from '~/models/estateInvitations.model';
import { EstateModel, EstatesModelInitialState } from '~/models/estates.model';
import { getEstatesOptions } from '~/renterOptions';
import { getRem } from '~/styles/utils';

export const ManagementEstatesRenter = () => {
  const router = useRouter();
  const { personID } = useAuth();

  const { activity, setActivity } = useActivity();
  const { modalActive, setModalActive, modalData, setModalData } =
    useModalComponent();
  const {
    modalActive: modalActiveInvitation,
    setModalActive: setModalActiveInvitation,
    modalData: modalDataInvitation,
    setModalData: setModalDataInvitation,
  } = useModalComponent();

  const { data: dataEstate, isLoading: isLoadingEstate } =
    useGetData<EstateModel>(
      EstatesModelInitialState,
      'estates',
      `${router.query.id}`,
      0,
      0,
      { personID, typeView: 'view' }
    );

  const { data: dataEstateInvitations, isLoading: isLoadingEstateInvitations } =
    useGetData<EstateInvitationsModel[]>(
      [EstateInvitationsModelInitialState],
      'estatesInvitations',
      `estate/${router.query.id}`,
      0,
      0,
      { personID, typeView: 'view' }
    );

  const redirectedFunction = () => {
    if (router.isReady) {
      router.push('/management/estates');
    }
  };

  if (isLoadingEstate || isLoadingEstateInvitations) {
    return <SpinnerLoading />;
  }

  if (
    (!dataEstate && !isLoadingEstate) ||
    (!dataEstateInvitations && !isLoadingEstateInvitations)
  ) {
    redirectedFunction();
    return <SpinnerLoading />;
  }

  const options = getEstatesOptions(
    router.query.id ? router.query.id.toString() : '',
    dataEstate,
    personID.toString()
  );

  const rejectInvitation = async (estateInvitationID: string) => {
    if (activity) {
      return null;
    }
    setActivity(true);
    const response = await deleteQuery(
      'estatesInvitations',
      `${estateInvitationID}`
    );
    if (response) {
      window.location.reload();
      toast.success(
        'Pomyślnie wycofano zaproszenie lokatora do nieruchomości.'
      );
      return null;
    }
    return setActivity(false);
  };

  const removeRenter = async (personRenterID: string) => {
    if (activity) {
      return null;
    }
    setActivity(true);
    const estate = [dataEstate].find((oneEstate) =>
      oneEstate.renter.find((person) => person._id === personRenterID)
    );
    if (estate) {
      const response = await updateQuery(
        `/estates/remove_renter/${estate._id}`,
        {
          person_id: personRenterID,
        }
      );
      if (response) {
        window.location.reload();
        toast.success('Pomyślnie usunięto lokatora z nieruchomości.');
        return null;
      }
    } else {
      toast.error('Coś poszło nie tak... Odśwież stronę i spróbuj ponownie.');
    }
    return setActivity(false);
  };

  return (
    <Layout display="flex" direction="row" minWidth="100%" paddingTop={15}>
      <LeftSidebar options={options[2]} />
      <Layout
        background="var(--background-white)"
        width="100%"
        minWidth="850px"
        borderRadius="8px"
        marginRight={15}
        padding={[10, 20]}
        boxShadow="0 0 5px 1px var(--border-black)"
      >
        <Text textAlign="center" size={getRem(20)}>
          {dataEstate.title}
          {!dataEstate.title.includes(dataEstate.location) &&
            `, ${dataEstate.location}`}
        </Text>
        <Layout
          background="var(--border-grey)"
          width="100%"
          height="2px"
          borderRadius="2px"
          marginBottom={15}
        />
        <Layout display="flex" justifyContent="center" marginBottom={20}>
          <AddButton
            text="Dodaj lokatora"
            onClick={() =>
              router.push(`/management/estates/${router.query.id}/renter/new`)
            }
          />
        </Layout>
        {dataEstate.renter.length === 0 && dataEstateInvitations.length === 0 && (
          <>
            <Text textAlign="center" size={getRem(16)}>
              Nie znaleziono osób, dla których wynajęta jest nieruchomość.
            </Text>
            <Text textAlign="center" size={getRem(16)}>
              Nie znaleziono również wysłanych zaproszeń do wynajmu
              nieruchomości.
            </Text>
          </>
        )}
        {dataEstate.renter.length > 0 && (
          <Layout>
            <Text weight={700} size={getRem(16)}>
              Lokatorzy, którzy obecnie są przypisani do mieszkania:
            </Text>
            <Layout boxShadow="0 0 4px var(--border-black)" marginTop={10}>
              {dataEstate.renter.map((renterPerson, index) => {
                return (
                  <Layout
                    display="flex"
                    direction="row"
                    gap="25px"
                    key={renterPerson._id}
                    padding={[10]}
                    background={
                      index % 2 === 0
                        ? 'var(--border-white)'
                        : 'var(--background-light-grey)'
                    }
                  >
                    <Text size={getRem(16)} flex={1}>
                      {index + 1}) {renterPerson.name}, telefon kontaktowy:{' '}
                      {renterPerson.phone_number || 'nie podano'}
                    </Text>
                    <CustomDeleteIcon
                      onClick={() => {
                        setModalData({
                          id: renterPerson._id,
                          description: `Czy na pewno chcesz usunąć osobę: ${renterPerson.name}?`,
                        });
                        setModalActive(true);
                      }}
                    />
                  </Layout>
                );
              })}
            </Layout>
          </Layout>
        )}
        &nbsp;
        {dataEstateInvitations.length > 0 && (
          <Layout>
            &nbsp;
            <Text weight={700} size={getRem(16)}>
              Wysłane zaproszenia dotyczące dołączenia do nieruchomości:
            </Text>
            <Layout boxShadow="0 0 5px 1px var(--border-black)" marginTop={10}>
              {dataEstateInvitations.map((estateInvitation, index) => {
                return (
                  <Layout
                    display="flex"
                    direction="row"
                    gap="25px"
                    key={estateInvitation._id}
                    padding={[10]}
                    background={
                      index % 2 === 0
                        ? 'var(--border-white)'
                        : 'var(--background-light-grey)'
                    }
                  >
                    <Text size={getRem(16)} flex={1}>
                      {index + 1}) {estateInvitation.person.name}, telefon
                      kontaktowy:{' '}
                      {estateInvitation.person.phone_number || 'nie podano'}
                    </Text>
                    <CustomDeleteIcon
                      onClick={() => {
                        setModalDataInvitation({
                          id: estateInvitation._id,
                          description: `Czy na pewno chcesz usunąć zaproszenie dla: ${estateInvitation.person.name}?`,
                        });
                        setModalActiveInvitation(true);
                      }}
                    />
                  </Layout>
                );
              })}
            </Layout>
          </Layout>
        )}
      </Layout>
      {modalActive && (
        <ModalComponent
          title="USUWANIE LOKATORA"
          description={modalData.description}
          cancelButton
          cancelText="Nie, nie chcę"
          confirmButton
          confirmText="Tak, chcę usunąć"
          onHide={() => setModalActive(false)}
          onConfirm={() => removeRenter(modalData.id)}
        />
      )}
      {modalActiveInvitation && (
        <ModalComponent
          title="USUWANIE ZAPROSZENIA"
          description={modalDataInvitation.description}
          cancelButton
          cancelText="Nie, nie chcę"
          confirmButton
          confirmText="Tak, chcę usunąć"
          onHide={() => setModalActiveInvitation(false)}
          onConfirm={() => rejectInvitation(modalDataInvitation.id)}
        />
      )}
    </Layout>
  );
};
