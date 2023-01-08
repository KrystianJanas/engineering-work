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
import { useGetData } from '~/hooks/useGetData';
import { validateEmail } from '~/mail.rules';
import { EstateModel, EstatesModelInitialState } from '~/models/estates.model';
import { getEstatesOptions } from '~/renterOptions';
import { getRem } from '~/styles/utils';

export const NewRenter = () => {
  const router = useRouter();
  const { personID } = useAuth();

  const { data, isLoading } = useGetData<EstateModel>(
    EstatesModelInitialState,
    'estates',
    `${router.query.id}`,
    0,
    0,
    { personID, typeView: 'edit' }
  );

  const options = getEstatesOptions(
    router.query.id ? router.query.id.toString() : '',
    data,
    personID.toString()
  );

  const [mail, setMail] = useState('');

  const redirectedFunction = () => {
    if (router.isReady) {
      router.push('/management/estates');
    }
  };

  if (!data && !isLoading) {
    redirectedFunction();
    return <SpinnerLoading />;
  }

  const sendInvitation = async () => {
    if (validateEmail(mail)) {
      const response = await postQuery('estatesInvitations', {
        user_email: mail,
        estate_id: `${router.query.id}`,
        person_sender_id: personID,
      });
      await router.push(`/management/estates/${router.query.id}/renter`);
      if (response) {
        toast.success(response.data.message, { duration: 5000 });
      }
    } else {
      toast.error('Wprowadzono zły format adresu e-mail.');
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
        <Layout
          display="flex"
          direction="column"
          alignItems="center"
          gap="10px"
        >
          <Layout>
            <Text textAlign="center" size={getRem(16)}>
              Aby zaprosić lokatora do wynajmu nieruchomości, uzyskaj najpierw
              od niego adres e-mail.
            </Text>
            <Text textAlign="center" size={getRem(16)}>
              Gdy już uzyskasz adres e-mail, wpisz go poniżej.
            </Text>
          </Layout>
          <Layout width="35%" marginLeft="auto" marginRight="auto">
            <TextField
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              label="Wprowadź e-mail"
              size="small"
              fullWidth
              type="email"
              error={!validateEmail(mail) && mail.length >= 5}
              helperText={
                !validateEmail(mail) &&
                mail.length >= 5 &&
                'Niepoprawny format adresu e-mail.'
              }
            />
          </Layout>
          <Layout>
            <Text textAlign="center" size={getRem(16)}>
              Upewnij się, że wpisany <b>adres e-mail</b> jest prawidłowy.
            </Text>
            <Text textAlign="center" size={getRem(16)}>
              Po wysłaniu zaproszenia,{' '}
              <b>jeśli znajdziemy użytkownika w naszej bazie danych</b>, otrzyma
              on zaproszenie do zaakceptowania.
            </Text>
            <Text textAlign="center" size={getRem(16)}>
              Monitoruj efekty akceptacji w zakładce <b>Lokatorzy</b>.
            </Text>
          </Layout>
          <Layout display="flex" gap="20px">
            <Button
              text="Powrót"
              onSubmit={() =>
                router.push(`/management/estates/${router.query.id}/renter`)
              }
            />
            <Button
              text="Wyślij zaproszenie"
              onSubmit={() => sendInvitation()}
            />
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
};
