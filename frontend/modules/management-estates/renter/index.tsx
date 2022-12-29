import toast from 'react-hot-toast';

import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import { deleteQuery } from '~/api/delete';
import { updateQuery } from '~/api/update';
import { Text } from '~/components/atoms/typography';
import { AddButton } from '~/components/compounds/AddButton/components/add-button';
import { LeftSidebar } from '~/components/compounds/Left-Sidebar';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { Layout } from '~/components/molecules/layout';
import { useAuth } from '~/hooks/useContextProvider';
import { useGetData } from '~/hooks/useGetData';
import {
  EstateInvitationsModel,
  EstateInvitationsModelInitialState,
} from '~/models/estateInvitations.model';
import { EstateModel, EstatesModelInitialState } from '~/models/estates.model';
import { getEstatesOptions } from '~/renterOptions';
import { getRem } from '~/styles/utils';

const StyledText = styled(Text)`
  &:hover {
    cursor: pointer;
  }
`;

export const ManagementEstatesRenter = () => {
  const router = useRouter();
  const { personID } = useAuth();

  const { data: dataEstate, isLoading: isLoadingEstate } =
    useGetData<EstateModel>(
      EstatesModelInitialState,
      'estates',
      `${router.query.id}`
    );

  const { data: dataEstateInvitations, isLoading: isLoadingEstateInvitations } =
    useGetData<EstateInvitationsModel[]>(
      [EstateInvitationsModelInitialState],
      'estatesInvitations',
      `estate/${router.query.id}` // estate id here
    );

  if (isLoadingEstate || isLoadingEstateInvitations) {
    return <SpinnerLoading />;
  }

  const options = getEstatesOptions(
    router.query.id ? router.query.id.toString() : '',
    dataEstate,
    personID.toString()
  );

  const rejectInvitation = async (estateInvitationID: string) => {
    const response = await deleteQuery(
      'estatesInvitations',
      `${estateInvitationID}`
    );
    if (response) {
      window.location.reload();
      toast.success(
        'Pomyślnie wycofano zaproszenie lokatora do nieruchomości.'
      );
    }
  };

  const removeRenter = async (personRenterID: string) => {
    const estate = [dataEstate].find((cos) =>
      cos.renter.find((cos2) => cos2._id === personRenterID)
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
      }
    } else {
      toast.error('Coś poszło nie tak... Odśwież stronę i spróbuj ponownie.');
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
            {' '}
            &nbsp;
            <Text weight={700} size={getRem(16)}>
              Osoby wynajmujące
            </Text>
            {dataEstate.renter.map((renterPerson, index) => {
              return (
                <Layout
                  display="flex"
                  direction="row"
                  gap="25px"
                  key={renterPerson._id}
                >
                  <Text size={getRem(16)}>
                    {index + 1}) {renterPerson.name}, telefon kontaktowy:{' '}
                    {renterPerson.phone_number || 'nie podano'}
                  </Text>
                  -
                  <StyledText
                    size={getRem(16)}
                    onClick={() => removeRenter(renterPerson._id)}
                  >
                    USUŃ LOKATORA
                  </StyledText>
                </Layout>
              );
            })}
          </Layout>
        )}
        &nbsp;
        {dataEstateInvitations.length > 0 && (
          <Layout>
            {' '}
            &nbsp;
            <Text weight={700} size={getRem(16)}>
              Wysłane prośby o dołączenie do nieruchomości:
            </Text>
            {dataEstateInvitations.map((estateInvitation, index) => {
              return (
                <Layout
                  display="flex"
                  direction="row"
                  gap="25px"
                  key={estateInvitation._id}
                >
                  <Text size={getRem(16)}>
                    {index + 1}) {estateInvitation.person.name}, telefon
                    kontaktowy:{' '}
                    {estateInvitation.person.phone_number || 'nie podano'}
                  </Text>
                  -
                  <StyledText
                    size={getRem(16)}
                    onClick={() => rejectInvitation(estateInvitation._id)}
                  >
                    COFNIJ ZAPROSZENIE
                  </StyledText>
                </Layout>
              );
            })}
          </Layout>
        )}
      </Layout>
    </Layout>
  );
};
