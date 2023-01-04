import { useState } from 'react';

import { TextField } from '@mui/material';

import { Button } from '~/components/compounds/Button';
import { SendMessageSectionTypes } from '~/components/compounds/Send-Message-Section/index.types';
import { Layout } from '~/components/molecules/layout';

export const SendMessageSection = ({ ...types }: SendMessageSectionTypes) => {
  const [content, setContent] = useState('');

  const minLengthInContent = 4;

  return (
    <Layout
      width="100%"
      boxShadow={types.boxShadow || '0 0 5px 1px var(--border-black)'}
      borderRadius={types.borderRadius || '8px'}
      padding={[10]}
    >
      <Layout display="flex" direction="column" gap="5px">
        <TextField
          id="outlined-multiline-static"
          label={types.label}
          multiline
          rows={3}
          fullWidth
          value={content}
          onChange={(e) => setContent(e.target.value)}
          error={content.length < minLengthInContent && content.length > 0}
          helperText={
            content.length > 0 &&
            content.length < minLengthInContent &&
            'Treść wiadomości musi mieć co najmniej 4 znaki.'
          }
        />
        <Layout display="flex" justifyContent="right">
          <Button
            text="Wyślij wiadomość"
            onSubmit={() => {
              if (content.length >= minLengthInContent) {
                types.onSubmit(content);
                setContent('');
              }
            }}
            disabled={types.disabledButton}
          />
        </Layout>
      </Layout>
    </Layout>
  );
};
