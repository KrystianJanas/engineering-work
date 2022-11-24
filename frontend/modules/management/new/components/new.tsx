import { MenuItem, TextField } from '@mui/material';
import Link from 'next/link';

import { Button } from '~/components/compounds/Button';
import { Layout } from '~/components/molecules/layout';
import { useForm } from '~/hooks/useForm';

import { EstateFormInitialState, TypesEstates } from '../new.constants';
import { NewManagemenetEstates } from '../new.types';

//   estate,
//   onSubmit
export const ManagementEstatesForm = ({
  estate,
  onSubmit,
}: NewManagemenetEstates) => {
  const { handleChange, formData } = useForm(estate || EstateFormInitialState);

  return (
    <Layout display="flex" justifyContent="center" marginTop={15}>
      <Layout
        borderRadius="6px"
        width={640}
        display="flex"
        justifyContent="center"
        boxShadow="0 0 16px rgba(0, 0, 0, 0.24)"
        padding={[25]}
        wrap="wrap"
        gap="15px"
      >
        <Layout width={500}>
          <TextField
            id="outlined-basic"
            label="Nazwa nieruchomości"
            variant="outlined"
            fullWidth
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            size="medium"
          />
        </Layout>
        <Layout width={500}>
          <TextField
            id="outlined-basic"
            type="number"
            label="Odstępne"
            variant="outlined"
            fullWidth
            value={formData.price}
            onChange={(e) => handleChange('price', e.target.value)}
            size="medium"
          />
        </Layout>
        <Layout width={500}>
          <TextField
            id="outlined-basic"
            type="number"
            label="Czynsz"
            variant="outlined"
            fullWidth
            value={formData.fee}
            onChange={(e) => handleChange('fee', e.target.value)}
            size="medium"
          />
        </Layout>
        <Layout width={500}>
          <TextField
            id="outlined-basic"
            type="number"
            label="Kaucja zwrotna"
            variant="outlined"
            fullWidth
            value={formData.caution}
            onChange={(e) => handleChange('caution', e.target.value)}
            size="medium"
          />
        </Layout>
        <Layout width={500}>
          <TextField
            id="outlined-basic"
            type="number"
            label="Metraż nieruchomości"
            variant="outlined"
            fullWidth
            value={formData.size}
            onChange={(e) => handleChange('size', e.target.value)}
            size="medium"
          />
        </Layout>
        <Layout width={500}>
          <TextField
            id="outlined-basic"
            label="Lokalizacja mieszkania"
            variant="outlined"
            fullWidth
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            size="medium"
          />
        </Layout>
        <Layout width={500}>
          <TextField
            id="outlined-select-currency"
            select
            label="Stan wyposażenia nieruchomości"
            value={formData.type}
            onChange={(e) => handleChange('type', e.target.value)}
            fullWidth
            size="medium"
          >
            {TypesEstates.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Layout>
        <Layout width={500}>
          / here add option to choose default profile photo to our estate \
        </Layout>
        <Layout width={500}>
          <TextField
            id="filled-multiline-flexible"
            label="Dodatkowe informacje"
            variant="outlined"
            maxRows={4}
            fullWidth
            multiline
            value={formData.information}
            onChange={(e) => handleChange('information', e.target.value)}
            size="medium"
          />
        </Layout>
        <Layout width={250} display="flex" wrap="wrap" gap="15px">
          <Link
            href={{
              pathname: `/management`,
            }}
            passHref
          >
            <a>
              <Button text="Anuluj" onSubmit={() => null} />
            </a>
          </Link>
          <Button
            text="Zatwierdź zmiany"
            onSubmit={() => (onSubmit ? onSubmit(formData) : null)}
          />
        </Layout>
      </Layout>
    </Layout>
  );
};
