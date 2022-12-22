import { Form } from 'react-bootstrap';
import toast from 'react-hot-toast';

import { updateQuery } from '~/api/update';
import { Text } from '~/components/atoms/typography';
import { Button } from '~/components/compounds/Button/components/button';
import { DropdownWindow } from '~/components/compounds/Dropdown-Window';
import { FormTextfieldComponent } from '~/components/compounds/Form-Textfield';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { Layout } from '~/components/molecules/layout';
import { useForm } from '~/hooks/useForm';
import { useGetData } from '~/hooks/useGetData';
import { AccountModel, AccountModelInitialState } from '~/models/account.model';

import { AccountValidationPersonalData } from '../account.validation';

export const Account = () => {
  const { formData: userData, handleChange: handleChangeUserData } =
    useForm<AccountModel>(AccountModelInitialState);

  const personID = '638fb4c573eedbc3f53f214e'; // todo: change personID (person_id)

  const { data, isLoading, updateState, setUpdateState } =
    useGetData<AccountModel>(AccountModelInitialState, `people/${personID}`);

  if (isLoading) {
    return <SpinnerLoading />;
  }

  if (!updateState) {
    setUpdateState(true);
    handleChangeUserData('name', data.name);
    handleChangeUserData('zip_code', data.zip_code);
    handleChangeUserData('city', data.city);
    handleChangeUserData('phone_number', data.phone_number);
  }

  const changePersonalData = async () => {
    const { error } = AccountValidationPersonalData(userData);
    if (error) {
      return toast.error(error);
    }
    console.log('Dane prawidłowe...');

    const result = await updateQuery(`people/${personID}`, userData);
    if (result) {
      window.location.reload();
      toast.success('Dane zostały prawidłowo zaktualizowane.');
    }

    return null;
  };

  // todo: add avatar url? change possibility

  return (
    <Layout
      display="flex"
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <DropdownWindow name="Dane kontaktowe">
        <Layout marginBottom={20}>
          <Text weight={600}>Osoba kontaktowa</Text>
          <FormTextfieldComponent
            value={userData.name}
            placeholder="Osoba kontaktowa"
            onChange={(text) => handleChangeUserData('name', text)}
          />
        </Layout>
        <Layout marginBottom={20}>
          <Text weight={600}>Kod pocztowy</Text>
          <FormTextfieldComponent
            value={userData.zip_code}
            placeholder="Kod pocztowy"
            onChange={(text) => handleChangeUserData('zip_code', text)}
          />
        </Layout>
        <Layout marginBottom={20}>
          <Text weight={600}>Miejscowość</Text>
          <FormTextfieldComponent
            value={userData.city}
            placeholder="Miejscowość"
            onChange={(text) => handleChangeUserData('city', text)}
          />
        </Layout>
        <Layout marginBottom={20}>
          <Text weight={600}>Numer telefonu do kontaktu</Text>
          <FormTextfieldComponent
            value={userData.phone_number}
            placeholder="Numer telefonu"
            onChange={(text) => handleChangeUserData('phone_number', text)}
          />
        </Layout>
        <Layout display="flex">
          <Button
            text="Zapisz dane kontaktowe"
            onSubmit={() => changePersonalData()}
          />
        </Layout>
      </DropdownWindow>
      <DropdownWindow name="Hasło">
        <Layout marginBottom={20}>
          <Text weight={600}>Aktulne hasło</Text>
          <FormTextfieldComponent
            placeholder="Aktualne hasło"
            onChange={(text) => console.log('Aktualne hasło: ', text)}
          />
        </Layout>
        <Layout marginBottom={20}>
          <Text weight={600}>Nowe hasło</Text>
          <FormTextfieldComponent
            placeholder="Nowe hasło"
            onChange={(text) => console.log('Nowe hasło: ', text)}
          />
        </Layout>
        <Layout marginBottom={20}>
          <Text weight={600}>Powtórz nowe hasło</Text>
          <Form.Control
            type="password"
            placeholder="Powtórz nowe hasło"
            onChange={(text) => console.log('Powtórz nowe hasło: ', text)}
          />
        </Layout>
        <Layout display="flex">
          <Button
            text="Zmień hasło"
            onSubmit={() => console.log('zmień hasło!')} // todo: add possibility to change password
          />
        </Layout>
      </DropdownWindow>
    </Layout>
  );
};
