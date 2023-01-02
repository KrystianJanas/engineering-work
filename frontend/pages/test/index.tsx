import React, { useState } from 'react';

import { Input, InputLabel } from '@mui/material';

import { postFileQuery } from '~/api/post';
import { Layout } from '~/components/molecules/layout';

export const TestPage = () => {
  // const { page, maxPage, onPreviousPage, onNextPage } = usePagination(5, 1);

  const [files, setFiles] = useState([]);
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const uploadImage = async (e: any, formData: any) => {
    const response = await postFileQuery('upload/pictures', formData);
    if (response) {
      console.log(response.data.message);
    }
  };

  const onChange = (e: any) => {
    if (e.target.files) {
      setFiles(e.target.files);

      for (let i = 0; i < e.target.files.length; i += 1) {
        const formData = new FormData();
        formData.append('estate_id', 'tustringnieruchomosciid');
        formData.append('file', e.target.files[i]);
        uploadImage(e, formData);
      }
    }
  };

  return (
    <Layout
      display="flex"
      alignItems="center"
      justifyContent="center"
      margin={[50]}
      direction="column"
      gap="25px"
    >
      <Input type="file" onChange={onChange} inputProps={{ multiple: true }} />
      <InputLabel>files name here...</InputLabel>

      {/* <Images pictures={files} maxWidth="450px" /> */}

      {/* {file && file.name && <Image src={file.name} />} */}

      {/* <Pagination */}
      {/*  maxPage={maxPage} */}
      {/*  page={page} */}
      {/*  onPreviousPage={onPreviousPage} */}
      {/*  onNextPage={onNextPage} */}
      {/* /> */}

      {/* <ModalComponent */}
      {/*  title="Usuwanie ogłoszenia" */}
      {/*  description="Czy na pewno chcesz usunąć ogłoszenie: testowe ogloszenie nr 2?" */}
      {/*  onHide={() => console.log('cofaj')} */}
      {/*  onConfirm={() => console.log('potwierdzenie')} */}
      {/*  cancelButton */}
      {/*  cancelText="Anuluj" */}
      {/*  confirmButton */}
      {/*  confirmText="Usuń" */}
      {/* /> */}
    </Layout>
  );
};
export default TestPage;
