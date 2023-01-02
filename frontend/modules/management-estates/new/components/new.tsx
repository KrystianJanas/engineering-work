import toast from 'react-hot-toast';

import { MenuItem, TextField } from '@mui/material';
import Link from 'next/link';

import { Button } from '~/components/compounds/Button';
import { Layout } from '~/components/molecules/layout';
import { useForm } from '~/hooks/useForm';
import {
  EstatesModelInitialState,
  ManagementEstateForm,
} from '~/models/estates.model';

import { TypesEstates } from '../new.constants';
import { ManagementEstatesFormValidation } from '../new.validation';

export const ManagementEstatesForm = ({
  estate,
  onSubmit,
}: ManagementEstateForm) => {
  const { handleChange, formData } = useForm(
    estate || EstatesModelInitialState
  );

  const onValidate = () => {
    const error = ManagementEstatesFormValidation(formData);
    if (error) {
      return toast.error(error);
    }
    if (onSubmit) {
      onSubmit(formData);
    }
    return null;
  };

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
            label="Tytuł nieruchomości"
            variant="outlined"
            fullWidth
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            size="medium"
          />
        </Layout>
        <Layout width={500}>
          <TextField
            id="outlined-basic"
            type="number"
            label="Odstępne (miesięcznie, w PLN)"
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
            label="Czynsz (miesięcznie, w PLN)"
            variant="outlined"
            fullWidth
            value={formData.rent}
            onChange={(e) => handleChange('rent', e.target.value)}
            size="medium"
          />
        </Layout>
        <Layout width={500}>
          <TextField
            id="outlined-basic"
            type="number"
            label="Kaucja zwrotna (jednorazowo, w PLN)"
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
            label="Metraż nieruchomości (w metrach)"
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
            type="number"
            label="Ilość pokoi"
            variant="outlined"
            fullWidth
            value={formData.rooms}
            onChange={(e) => handleChange('rooms', e.target.value)}
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
            value={formData.state}
            onChange={(e) => handleChange('state', e.target.value)}
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
          <TextField
            id="filled-multiline-flexible"
            label="Dodatkowe informacje"
            variant="outlined"
            maxRows={4}
            fullWidth
            multiline
            value={formData.info}
            onChange={(e) => handleChange('info', e.target.value)}
            size="medium"
          />
        </Layout>
        <Layout width={250} display="flex" wrap="wrap" gap="15px">
          <Link
            href={{
              pathname: `/management/estates`,
            }}
            passHref
          >
            <a>
              <Button text="Anuluj" onSubmit={() => null} />
            </a>
          </Link>
          <Button text="Zatwierdź zmiany" onSubmit={() => onValidate()} />
        </Layout>
      </Layout>
    </Layout>
  );
};
