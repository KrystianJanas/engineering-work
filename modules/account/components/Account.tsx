import { DropdownWindow } from '~/components/compounds/Dropdown-Window';
import { FormTextfieldComponent } from '~/components/compounds/Form-Textfield';
import { Layout } from '~/components/molecules/layout';

export const Account = () => {
  return (
    <>
      <DropdownWindow name="Dane kontaktowe">
        <Layout marginBottom={20}>
          Osoba kontaktowa
          <Layout>here</Layout>
        </Layout>
        <Layout marginBottom={20}>
          Kod pocztowy lub miejscowość
          <Layout>here</Layout>
        </Layout>
        <Layout marginBottom={20}>
          Numer telefonu do kontaktu
          <FormTextfieldComponent
            placeholder="Numer telefonu"
            onChange={(text) => console.log(text)}
          />
        </Layout>
      </DropdownWindow>
      <DropdownWindow name="Hasło">
        <div>tu cos</div>
        <div>tu cos2</div>
      </DropdownWindow>
    </>
  );
};
