import { MenuItem, TextField } from '@mui/material';
import Link from 'next/link';

import { Button } from '~/components/compounds/Button';
import { Layout } from '~/components/molecules/layout';
import { useForm } from '~/hooks/useForm';

import { TypesEstates } from 'modules/management/new/new.constants';

import { AnnouncementsInitialState } from '../announcements-form.constants';
import { AnnouncementsFormTypes } from '../announcements-form.types';

export const AnnouncementsForm = ({
  announcement,
  onSubmit,
}: AnnouncementsFormTypes) => {
  const { handleChange, formData } = useForm(
    announcement || AnnouncementsInitialState
  );

  return (
    <Layout display="flex" justifyContent="center" marginTop={15}>
      <Layout
        borderRadius="6px"
        width="75%"
        minWidth="800px"
        display="flex"
        direction="column"
        alignItems="center"
        justifyContent="center"
        boxShadow="0 0 16px rgba(0, 0, 0, 0.24)"
        padding={[25]}
        wrap="wrap"
        gap="15px"
      >
        <Layout width={750}>
          <TextField
            id="outlined-basic"
            label="Tytuł ogłoszenia"
            variant="outlined"
            fullWidth
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            size="medium"
          />
        </Layout>
        <Layout width={750}>
          <TextField
            id="outlined-basic"
            type="number"
            label="Czynsz"
            variant="outlined"
            fullWidth
            value={formData.rent}
            onChange={(e) => handleChange('rent', +e.target.value)}
            size="medium"
          />
        </Layout>
        <Layout width={750}>
          <TextField
            id="outlined-basic"
            type="number"
            label="Odstępne"
            variant="outlined"
            fullWidth
            value={formData.fee}
            onChange={(e) => handleChange('fee', +e.target.value)}
            size="medium"
          />
        </Layout>
        <Layout width={750}>
          <TextField
            id="outlined-basic"
            type="number"
            label="Metraż nieruchomości"
            variant="outlined"
            fullWidth
            value={formData.size}
            onChange={(e) => handleChange('size', +e.target.value)}
            size="medium"
          />
        </Layout>
        <Layout width={750}>
          <TextField
            id="outlined-basic"
            type="number"
            label="Ilość pokoi"
            variant="outlined"
            fullWidth
            value={formData.rooms}
            onChange={(e) => handleChange('rooms', +e.target.value)}
            size="medium"
          />
        </Layout>
        <Layout width={750}>
          <TextField
            id="outlined-basic"
            label="Lokalizacja"
            variant="outlined"
            fullWidth
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            size="medium"
          />
        </Layout>
        <Layout width={750}>
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
        <Layout width={750}>
          <TextField
            id="outlined-multiline-static"
            label="Opis"
            multiline
            rows={4}
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            fullWidth
          />
        </Layout>
        <Layout width={750}>
          / here add option to choose default profile photo to our estate \
        </Layout>
        <Layout width={250} display="flex" wrap="wrap" gap="15px">
          <Link
            href={{
              pathname: `/announcements`,
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
