import { Form } from 'react-bootstrap';

import { Text } from '~/components/atoms/typography';
import { Button } from '~/components/compounds/Button/components/button';
import { DropdownWindow } from '~/components/compounds/Dropdown-Window';
import { FormTextfieldComponent } from '~/components/compounds/Form-Textfield';
import { Layout } from '~/components/molecules/layout';

export const Account = () => {
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
            placeholder="Osoba kontaktowa"
            onChange={(text) => console.log('Osoba kontaktowa: ', text)}
          />
        </Layout>
        <Layout marginBottom={20}>
          <Text weight={600}>Kod pocztowy</Text>
          <FormTextfieldComponent
            placeholder="Kod pocztowy"
            onChange={(text) => console.log('kod pocztowy: ', text)}
          />
        </Layout>
        <Layout marginBottom={20}>
          <Text weight={600}>Miejscowość</Text>
          <FormTextfieldComponent
            placeholder="Miejscowość"
            onChange={(text) => console.log('miejscowość: ', text)}
          />
        </Layout>
        <Layout marginBottom={20}>
          <Text weight={600}>Numer telefonu do kontaktu</Text>
          <FormTextfieldComponent
            placeholder="Numer telefonu"
            onChange={(text) => console.log('numer telefonu: ', text)}
          />
        </Layout>
        <Layout display="flex">
          <Button
            text="Zapisz dane kontaktowe"
            onSubmit={() => console.log('zmień dane kontaktowe!')}
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
            onSubmit={() => console.log('zmień hasło!')}
          />
        </Layout>
      </DropdownWindow>
    </Layout>
  );
};
