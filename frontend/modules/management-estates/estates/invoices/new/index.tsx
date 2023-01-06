import { useState } from 'react';
import toast from 'react-hot-toast';

import { Button, TextField } from '@mui/material';
import { useRouter } from 'next/router';

import { postFileQuery } from '~/api/post';
import { Text } from '~/components/atoms/typography';
import { Button as ButtonSend } from '~/components/compounds/Button';
import { LeftSidebar } from '~/components/compounds/Left-Sidebar';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { useAuth } from '~/components/contexts/useContextProvider';
import { Layout } from '~/components/molecules/layout';
import { useActivity } from '~/hooks/useActivity';
import { parseDataUploadFiles } from '~/hooks/useDateParser';
import { useForm } from '~/hooks/useForm';
import { useGetData } from '~/hooks/useGetData';
import { EstateModel, EstatesModelInitialState } from '~/models/estates.model';
import {
  InvoicesModel,
  InvoicesModelInitialState,
} from '~/models/invoices.model';
import { getEstatesOptions } from '~/renterOptions';
import { getRem } from '~/styles/utils';

export const ManagementEstatesInvoicesNew = () => {
  const router = useRouter();
  const { personID } = useAuth();

  const { data, isLoading } = useGetData<EstateModel>(
    EstatesModelInitialState,
    'estates',
    `${router.query.id}`,
    0,
    0,
    { personID, typeView: 'view' }
  );

  const { formData, handleChange } = useForm<InvoicesModel>(
    InvoicesModelInitialState
  );
  const { activity, setActivity } = useActivity();
  const [filename, setFilename] = useState('Nie wybrano pliku');
  const [file, setFile] = useState('');

  if (isLoading) {
    return <SpinnerLoading />;
  }

  const redirectedFunction = () => {
    if (router.isReady) {
      router.push('/management/estates');
    }
  };

  if (!data && !isLoading) {
    redirectedFunction();
    return <SpinnerLoading />;
  }

  const options = getEstatesOptions(
    router.query.id ? router.query.id.toString() : '',
    data,
    personID.toString()
  );

  const addInvoice = async () => {
    if (activity) {
      return null;
    }
    if (formData.description.length <= 4) {
      return toast.error('Opis pliku musi mieć co najmniej 5 znaków.');
    }

    if (!file || filename.length <= 4) {
      return toast.error('Nie załączono pliku.');
    }

    setActivity(true);

    const formDataToApi = new FormData();
    formDataToApi.append('file', file);
    formDataToApi.append('person', `${personID}`);
    formDataToApi.append('estate', `${router.query.id}`);
    formDataToApi.append('description', formData.description);
    formDataToApi.append(
      'datetime',
      parseDataUploadFiles(new Date().toLocaleString())
    );

    const response = await postFileQuery(
      `estates/invoices/${router.query.id}`,
      formDataToApi
    );
    if (response) {
      await router.push(`/management/estates/${router.query.id}/invoices`);
      toast.success('Pomyślnie dodano fakturę.');
    }

    return null;
  };

  const onChangeFile = (e: any) => {
    if (e.target.files && e.target.files[0].name.length > 0) {
      setFile(e.target.files[0]);
      setFilename(e.target.files[0].name);
    } else {
      toast.error('Nie załączono pliku.');
    }
  };

  return (
    <Layout display="flex" direction="row" minWidth="100%" paddingTop={15}>
      <LeftSidebar options={options[2]} />
      <Layout
        background="var(--background-white)"
        width="100%"
        borderRadius="8px"
        marginRight={15}
        padding={[10, 20]}
        boxShadow="0 0 5px 1px var(--border-black)"
        display="flex"
        direction="column"
      >
        {/* invoice_name: string; */}
        {/* description: string; */}
        <Layout
          display="flex"
          direction="column"
          alignItems="center"
          gap="15px"
        >
          <Layout>
            <Text textAlign="center" size={getRem(16)}>
              Przyciśnij w przycisk poniżej, aby dodać fakturę
            </Text>
            <Text textAlign="center" size={getRem(16)}>
              Wymagany format pliku: <b>PDF</b>
            </Text>
          </Layout>
          <Button variant="outlined" component="label">
            {filename.length < 72 ? filename : `${filename.slice(0, 72)}...`}
            <input
              hidden
              accept="application/pdf"
              type="file"
              onChange={onChangeFile}
            />
          </Button>
          <Layout width={600}>
            <TextField
              label="Opis pliku"
              fullWidth
              type="text"
              variant="outlined"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={4}
              multiline
              id="outlined-multiline-static"
              size="small"
            />
          </Layout>
        </Layout>
        <Layout display="flex" justifyContent="center" marginTop={15}>
          <ButtonSend
            text="Dodaj fakturę"
            disabled={activity}
            onSubmit={() => addInvoice()}
          />
        </Layout>
      </Layout>
    </Layout>
  );
};
