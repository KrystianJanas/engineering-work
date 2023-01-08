import toast from 'react-hot-toast';

import { Autocomplete, TextField } from '@mui/material';
import Link from 'next/link';

import { Text } from '~/components/atoms/typography';
import { Button } from '~/components/compounds/Button';
import { Layout } from '~/components/molecules/layout';
import { CITIES } from '~/constants/CITIES.constants';
import { STATES } from '~/constants/STATES.contants';
import { useForm } from '~/hooks/useForm';
import {
  EstatesModelInitialState,
  ManagementEstateForm,
} from '~/models/estates.model';
import { getRem } from '~/styles/utils';

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
        width={800}
        display="flex"
        justifyContent="center"
        boxShadow="0 0 16px rgba(0, 0, 0, 0.24)"
        padding={[25]}
        wrap="wrap"
        gap="15px"
      >
        <Layout display="flex" direction="column">
          <Text textAlign="center" size={getRem(18)} weight={700}>
            Formularz
          </Text>
          <Text textAlign="center" size={getRem(16)}>
            {estate ? 'Edycja' : 'Tworzenie nowej'} nieruchomości
          </Text>
        </Layout>
        <Layout width={750}>
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
        <Layout display="flex" gap="25px" width={750}>
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
        <Layout display="flex" gap="25px" width={750}>
          <TextField
            id="outlined-basic"
            type="number"
            label="Metraż nieruchomości (w m²)"
            variant="outlined"
            fullWidth
            value={formData.size}
            onChange={(e) => handleChange('size', e.target.value)}
            size="medium"
          />
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
        <Layout width={750}>
          <Autocomplete
            size="medium"
            options={CITIES.map((city) => `${city.city}`)}
            value={formData.location}
            onChange={(event, newValue) => {
              handleChange('location', newValue || '');
            }}
            renderInput={(params) => (
              <TextField {...params} label="Miejscowość" />
            )}
            disablePortal
          />
        </Layout>
        <Layout width={750}>
          <Autocomplete
            size="medium"
            options={STATES}
            value={formData.state}
            onChange={(event, newValue) => {
              handleChange('state', newValue || '');
            }}
            renderInput={(params) => (
              <TextField {...params} label="Wyposażenie / stan nieruchomości" />
            )}
            disablePortal
          />
        </Layout>
        <Layout width={750}>
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
