import { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Text } from '~/components/atoms/typography';
import { Layout } from '~/components/molecules/layout';
import AuthContext from '~/hooks/useContextProvider';
import { useForm } from '~/hooks/useForm';
import { getRem } from '~/styles/utils';

import { signIn, signUp } from '../api/conversations';
import { signInitialState } from '../sign.constants';
import { Sign, SignTypes } from '../sign.types';

const StyledButton = styled(Button)`
  background-color: var(--background-light-blue);
  color: var(--white);
  text-decoration: none;
  font-weight: 600;

  &:hover {
    background-color: var(--background-medium-blue);
    color: var(--white);
  }
`;

export const SignIn = ({ type }: SignTypes) => {
  const router = useRouter();
  const { formData, handleChange } = useForm<Sign>(signInitialState);
  const { saveTokens, isLogged } = useContext(AuthContext);

  useEffect(() => {
    console.log(isLogged);
    if (!isLogged) {
      return;
    }
    router.push('/');
  }, [saveTokens]);

  const handleLogin = async (data: Sign, typeView: string) => {
    if (typeView === 'login') {
      const { errors, user } = await signIn(data.login, data.password);
      if (errors && errors.length > 0) {
        toast.error(errors);
      }
      if (user) {
        saveTokens({
          userId: user.user_id,
          personId: user.person_id,
          accessToken: user.accessToken,
        });
        toast.success('Pomyślnie zalogowano.');
      }
    }
  };
  const handleRegister = async (data: Sign, typeView: string) => {
    if (typeView === 'register') {
      const { errors, success } = await signUp(
        data.login,
        data.password,
        data.rePassword
      );

      if (errors && errors.length === 0) {
        await router.push('/auth/sign-in');
        toast.success('Udało się zarejestrować! Możesz się zalogować.');
      } else {
        toast.error(errors);
      }
    }
  };

  const SignUpButton = ({
    data,
    typeView,
  }: {
    data: Sign;
    typeView: string;
  }) => {
    return (
      <Link href="/auth/sign-up" passHref>
        <StyledButton
          variant="contained"
          onClick={() => handleRegister(data, typeView)}
        >
          Zarejestruj się
        </StyledButton>
      </Link>
    );
  };

  const SignInButton = ({
    data,
    typeView,
  }: {
    data: Sign;
    typeView: string;
  }) => {
    return (
      <Link href="/auth/sign-in" passHref>
        <StyledButton
          variant="contained"
          onClick={() => handleLogin(data, typeView)}
        >
          {typeView === 'register' ? 'Powrót' : 'Zaloguj się'}
        </StyledButton>
      </Link>
    );
  };

  return (
    <Layout
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Layout
        width={640}
        height={480}
        background="var(--background-white)"
        borderRadius="16px"
        boxShadow="0 0 16px rgba(0, 0, 0, 0.24)"
      >
        <Layout
          height="100%"
          display="flex"
          direction="column"
          padding={[25, 0]}
          gap="15px"
          alignItems="center"
          justifyContent="space-between"
        >
          <Layout>
            <Text
              fontFamily="Inter"
              weight={600}
              size={getRem(22)}
              color="var(--text-black)"
              textAlign="center"
            >
              {type === 'login' ? 'Zaloguj' : 'Zarejestruj'} się do serwisu
              nieruchomości
            </Text>
          </Layout>
          <Layout
            width="50%"
            gap="15px"
            alignItems="center"
            display="flex"
            direction="column"
          >
            <TextField
              id="login"
              label="Adres e-mail"
              variant="outlined"
              value={formData.login}
              onChange={(e) => handleChange('login', e.target.value)}
              fullWidth
            />
            <TextField
              id="password"
              label="Hasło"
              variant="outlined"
              type="password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              fullWidth
            />
            {type === 'register' && (
              <TextField
                id="rePassword"
                label="Powtórz hasło"
                variant="outlined"
                type="password"
                value={formData.rePassword}
                onChange={(e) => handleChange('rePassword', e.target.value)}
                fullWidth
              />
            )}
          </Layout>
          <Layout display="flex" gap="25px">
            {type === 'login' ? (
              <>
                <SignUpButton data={formData} typeView={type} />
                <SignInButton data={formData} typeView={type} />
              </>
            ) : (
              <>
                <SignInButton data={formData} typeView={type} />
                <SignUpButton data={formData} typeView={type} />
              </>
            )}
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
};
