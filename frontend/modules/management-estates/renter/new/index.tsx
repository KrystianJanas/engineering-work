import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { TextField } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { postQuery } from '~/api/post';
import { Text } from '~/components/atoms/typography';
import { Button } from '~/components/compounds/Button';
import { LeftSidebar } from '~/components/compounds/Left-Sidebar';
import SpinnerLoading from '~/components/compounds/Spinner';
import { Layout } from '~/components/molecules/layout';
import { useAuth } from '~/hooks/useContextProvider';
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
    `${router.query.id}`
  );

  const options = getEstatesOptions(
    router.query.id ? router.query.id.toString() : '',
    data,
    personID.toString()
  );

  // const [mail, setMail] = useState('');
  const [helperText, setHelperText] = useState('');
  const [mail, setMail] = useState('');

  useEffect(() => {
    if (mail.length > 0) {
      if (!validateEmail(mail)) {
        setHelperText('Niepoprawny format adresu e-mail.');
      } else if (helperText.length > 0) {
        setHelperText('');
      }
    }
  }, [mail]);

  if (isLoading || !router.isReady) {
    return <SpinnerLoading />;
  }

  const sendInvitation = async () => {
    if (helperText.length === 0) {
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
              error={!!helperText}
              helperText={helperText}
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
            <Link
              href={{
                pathname: `/management/estates/${router.query.id}/renter`,
              }}
              passHref
            >
              <a>
                <Button text="Powrót" onSubmit={() => null} />
              </a>
            </Link>
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
