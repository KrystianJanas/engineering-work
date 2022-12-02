import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import Link from 'next/link';

import { getTestData } from '~/api/get';
import { Text } from '~/components/atoms/typography';
import { Layout } from '~/components/molecules/layout';
import { useForm } from '~/hooks/useForm';
import { getRem } from '~/styles/utils';

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
  const { formData, handleChange } = useForm<Sign>(signInitialState);

  const handleLogin = async (data: Sign, typeView: string) => {
    if (typeView === 'login') {
      const response = await getTestData();
      console.log(response?.data);
    }
  };
  const handleRegister = (data: Sign, typeView: string) => {
    if (typeView === 'register') {
      console.log('register to: ', data);
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
