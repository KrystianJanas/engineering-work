import toast from 'react-hot-toast';

import { Autocomplete, TextField } from '@mui/material';

import { updateQuery } from '~/api/update';
import { Text } from '~/components/atoms/typography';
import { Button } from '~/components/compounds/Button/components/button';
import { DropdownWindow } from '~/components/compounds/Dropdown-Window';
import { LeftSidebar, options } from '~/components/compounds/Left-Sidebar';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { CITIES } from '~/components/constants/CITIES.constants';
import api from '~/components/contexts/api';
import { useAuth } from '~/components/contexts/useContextProvider';
import { Layout } from '~/components/molecules/layout';
import { useActivity } from '~/hooks/useActivity';
import { useForm } from '~/hooks/useForm';
import { useGetData } from '~/hooks/useGetData';
import {
  AccountModel,
  AccountModelInitialState,
  AccountPasswordModel,
  AccountPasswordModelInitialState,
} from '~/models/account.model';
import { zipCodeError, zipCodeRegex } from '~/regex.rules';

import {
  AccountValidatePassword,
  AccountValidationPersonalData,
} from '../account.validation';

export const Account = () => {
  const { formData, handleChange } = useForm<AccountModel>(
    AccountModelInitialState
  );

  const { formData: formDataPassword, handleChange: handleChangePassword } =
    useForm<AccountPasswordModel>(AccountPasswordModelInitialState);

  const { personID } = useAuth();

  const { data, isLoading, updateState, setUpdateState } =
    useGetData<AccountModel>(AccountModelInitialState, `people/${personID}`);

  const { activity, setActivity } = useActivity();

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (!updateState) {
    setUpdateState(true);
    handleChange('name', data.name);
    handleChange('zip_code', data.zip_code);
    handleChange('city', data.city);
    handleChange('phone_number', data.phone_number);
  }

  const changePersonalData = async () => {
    const { error } = AccountValidationPersonalData(formData);
    if (error) {
      return toast.error(error);
    }

    const result = await updateQuery(`people/${personID}`, formData);
    if (result) {
      window.location.reload();
      toast.success('Dane zostały prawidłowo zaktualizowane.');
    }

    return null;
  };

  const changePassword = async () => {
    if (activity) {
      return null;
    }
    setActivity(true);
    const { error } = AccountValidatePassword(formDataPassword);
    if (error) {
      setActivity(false);
      return toast.error(error);
    }

    try {
      const { data: dataPassword } = await api.put('/auth/updatePassword', {
        ...formDataPassword,
        personID,
      });
      if (dataPassword) {
        window.location.reload();
        toast.success('Pomyślnie zmieniono hasło do konta.');
      }
    } catch (err) {
      // @ts-ignore
      toast.error(err.response.data);
    }

    setActivity(false);
    return null;
  };

  return (
    <Layout display="flex" direction="row" minWidth="100%" paddingTop={15}>
      <LeftSidebar options={options[1]} />
      <Layout width="100%" marginRight={15}>
        <Layout
          background="var(--background-white)"
          width="100%"
          borderRadius="8px"
          padding={[10, 0]}
          boxShadow="0 0 5px 1px var(--border-black)"
          display="flex"
          direction="column"
        >
          <DropdownWindow
            name="Dane kontaktowe"
            boxShadow="0 0 4px var(--border-black)"
            borderRadius="8px"
          >
            <Layout marginBottom={20}>
              <Text weight={600}>Nazwa użytkownika - osoba kontaktowa</Text>

              <TextField
                sx={{ width: 450 }}
                size="small"
                placeholder="Osoba kontaktowa"
                value={formData.name}
                InputProps={{
                  inputProps: {
                    maxLength: 32,
                  },
                }}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </Layout>
            <Layout marginBottom={20}>
              <Text weight={600}>Miejscowość</Text>
              <Autocomplete
                sx={{ width: 450 }}
                size="small"
                options={CITIES.map((city) => `${city.city}`)}
                value={formData.city}
                onChange={(event, newValue) => {
                  handleChange('city', newValue || '');
                  handleChange(
                    'zip_code',
                    CITIES.find((city) => city.city === newValue)?.zipCode || ''
                  );
                }}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Miejscowość" />
                )}
                disablePortal
              />
            </Layout>
            <Layout marginBottom={20}>
              <Text weight={600}>Kod pocztowy</Text>
              <TextField
                sx={{ width: 150 }}
                size="small"
                placeholder="Kod pocztowy"
                error={!formData.zip_code.match(zipCodeRegex)}
                helperText={
                  !formData.zip_code.match(zipCodeRegex) && zipCodeError
                }
                InputProps={{
                  inputProps: {
                    maxLength: 6,
                  },
                }}
                value={formData.zip_code}
                onChange={(e) => handleChange('zip_code', e.target.value)}
              />
            </Layout>
            <Layout marginBottom={20}>
              <Text weight={600}>Numer telefonu do kontaktu</Text>
              <TextField
                sx={{ width: 150 }}
                size="small"
                placeholder="Numer telefonu"
                InputProps={{
                  inputProps: {
                    maxLength: 11,
                  },
                }}
                value={formData.phone_number}
                onChange={(e) => handleChange('phone_number', e.target.value)}
              />
            </Layout>
            <Layout display="flex">
              <Button
                text="Zapisz dane kontaktowe"
                onSubmit={() => changePersonalData()}
              />
            </Layout>
          </DropdownWindow>
          <DropdownWindow
            name="Zarządzanie hasłem"
            boxShadow="0 0 4px var(--border-black)"
            borderRadius="8px"
          >
            <Layout marginBottom={20}>
              <Text weight={600}>Aktulne hasło</Text>
              <TextField
                sx={{ width: 250 }}
                size="small"
                type="password"
                placeholder="Aktualne hasło"
                value={formDataPassword.password}
                onChange={(e) =>
                  handleChangePassword('password', e.target.value)
                }
                InputProps={{
                  inputProps: {
                    maxLength: 32,
                  },
                }}
              />
            </Layout>
            <Layout marginBottom={20}>
              <Text weight={600}>Nowe hasło</Text>
              <TextField
                sx={{ width: 250 }}
                size="small"
                type="password"
                placeholder="Nowe hasło"
                value={formDataPassword.newPassword}
                onChange={(e) =>
                  handleChangePassword('newPassword', e.target.value)
                }
                InputProps={{
                  inputProps: {
                    maxLength: 32,
                  },
                }}
              />
            </Layout>
            <Layout marginBottom={20}>
              <Text weight={600}>Powtórz nowe hasło</Text>
              <TextField
                sx={{ width: 250 }}
                size="small"
                type="password"
                placeholder="Powtórz nowe hasło"
                value={formDataPassword.repeatNewPassword}
                onChange={(e) =>
                  handleChangePassword('repeatNewPassword', e.target.value)
                }
                InputProps={{
                  inputProps: {
                    maxLength: 32,
                  },
                }}
              />
            </Layout>
            <Layout display="flex">
              <Button text="Zmień hasło" onSubmit={changePassword} />
            </Layout>
          </DropdownWindow>
        </Layout>
      </Layout>
    </Layout>
  );
};
