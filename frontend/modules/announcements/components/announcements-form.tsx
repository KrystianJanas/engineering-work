import { useState } from 'react';
import toast from 'react-hot-toast';

import { Autocomplete, TextField, Button } from '@mui/material';
import Link from 'next/link';

import { Text } from '~/components/atoms/typography';
import { Button as ButtonSend } from '~/components/compounds/Button';
import { Images } from '~/components/compounds/Images';
import { Layout } from '~/components/molecules/layout';
import { CITIES } from '~/constants/CITIES.constants';
import { STATES } from '~/constants/STATES.contants';
import { useForm } from '~/hooks/useForm';
import { AnnouncementEdit } from '~/models/announcement.model';
import {
  AnnouncementsModel,
  AnnouncementsModelInitialState,
} from '~/models/announcements.model';
import { getRem } from '~/styles/utils';

export const AnnouncementsForm = ({
  announcement,
  onSubmit,
}: AnnouncementEdit) => {
  const { handleChange, formData } = useForm<AnnouncementsModel>(
    announcement || AnnouncementsModelInitialState
  );

  const [files, setFiles] = useState([]);

  const onChange = (e: any) => {
    if (e.target.files) {
      if (e.target.files.length <= 6) {
        setFiles(e.target.files);
      } else {
        toast.error('Możesz dodać maksymalnie 6 zdjęć.');
        setFiles([]);
      }
    }
  };

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
        <Layout display="flex" direction="column">
          <Text textAlign="center" size={getRem(18)} weight={700}>
            Formularz
          </Text>
          <Text textAlign="center" size={getRem(16)}>
            {announcement ? 'Edycja' : 'Tworzenie nowego'} ogłoszenia
          </Text>
        </Layout>
        <Layout width={750}>
          <TextField
            id="outlined-basic"
            label="Tytuł ogłoszenia"
            variant="outlined"
            fullWidth
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            size="small"
          />
        </Layout>
        <Layout display="flex" gap="25px" width={750}>
          <TextField
            id="outlined-basic"
            type="number"
            label="Czynsz (miesięcznie, w PLN)"
            variant="outlined"
            fullWidth
            value={formData.rent}
            onChange={(e) => handleChange('rent', +e.target.value)}
            size="small"
          />
          <TextField
            id="outlined-basic"
            type="number"
            label="Odstępne (miesięcznie, w PLN)"
            variant="outlined"
            fullWidth
            value={formData.fee}
            onChange={(e) => handleChange('fee', +e.target.value)}
            size="small"
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
            onChange={(e) => handleChange('size', +e.target.value)}
            size="small"
          />
          <TextField
            id="outlined-basic"
            type="number"
            label="Ilość pokoi"
            variant="outlined"
            fullWidth
            value={formData.rooms}
            onChange={(e) => handleChange('rooms', +e.target.value)}
            size="small"
          />
        </Layout>
        <Layout width={750}>
          <Autocomplete
            size="small"
            options={CITIES.map((city) => `${city.city}`)}
            value={formData.location}
            onChange={(event, newValue) => {
              handleChange('location', newValue || '');
            }}
            noOptionsText="Nie znaleziono dopasowanych wyników..."
            renderInput={(params) => (
              <TextField {...params} label="Miejscowość" />
            )}
            disablePortal
          />
        </Layout>
        <Layout width={750}>
          <Autocomplete
            size="small"
            options={STATES}
            value={formData.state}
            onChange={(event, newValue) => {
              handleChange('state', newValue || '');
            }}
            noOptionsText="Nie znaleziono dopasowanych wyników..."
            renderInput={(params) => (
              <TextField {...params} label="Wyposażenie / stan nieruchomości" />
            )}
            disablePortal
          />
        </Layout>
        <Layout width={750}>
          <TextField
            id="outlined-multiline-static"
            label="Opis ogłoszenia"
            multiline
            rows={4}
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            fullWidth
          />
        </Layout>
        <Layout
          width={750}
          display="flex"
          direction="column"
          justifyContent="center"
          gap="10px"
        >
          {formData.images.length > 0 && (
            <>
              <Text
                size={getRem(16)}
                color="var(--text-black)"
                textAlign="center"
              >
                Aktualne zdjęcia nieruchomości:
              </Text>
              <Layout display="flex" justifyContent="center">
                <Images
                  images={formData.images}
                  imageURL="/uploads/pictures/"
                  maxWidth="600px"
                  deletePossibility
                  deletePossibilityAction={() => {
                    handleChange('images', []);
                  }}
                />
              </Layout>
            </>
          )}
          {formData.images.length > 0 ? (
            <Text textAlign="center" color="var(--text-black)" weight={600}>
              Aby dodać nowe zdjęcia do nieruchomości, usuń najpierw
              dotychczasowe.
            </Text>
          ) : (
            <Button variant="outlined" component="label">
              {files && files.length > 0
                ? `Załączono ${files.length} szt. zdjęć do nieruchomości`
                : 'Przyciśnij tutaj, aby dodać zdjęcia do nieruchomości'}
              <input
                multiple
                hidden
                accept="image/*"
                type="file"
                onChange={onChange}
              />
            </Button>
          )}
        </Layout>
        <Layout width={250} display="flex" wrap="wrap" gap="15px">
          <Link
            href={{
              pathname: announcement
                ? `/management/announcements`
                : `/announcements`,
            }}
            passHref
          >
            <a>
              <ButtonSend text="Anuluj" onSubmit={() => null} />
            </a>
          </Link>
          <ButtonSend
            text="Zatwierdź zmiany"
            onSubmit={() => {
              if (onSubmit) {
                onSubmit(formData, files);
              }
            }}
          />
        </Layout>
      </Layout>
    </Layout>
  );
};
