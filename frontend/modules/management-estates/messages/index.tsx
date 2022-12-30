import toast from 'react-hot-toast';

import { useRouter } from 'next/router';

import { postQuery } from '~/api/post';
import { Text } from '~/components/atoms/typography';
import { LeftSidebar } from '~/components/compounds/Left-Sidebar';
import { MessageCardComponent } from '~/components/compounds/Message-Card/messageCard.component';
import { SendMessageSection } from '~/components/compounds/Send-Message-Section';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { Layout } from '~/components/molecules/layout';
import { useAuth } from '~/hooks/useContextProvider';
import { useGetData } from '~/hooks/useGetData';
import {
  EstateMessagesModel,
  EstateMessagesModelInitialState,
} from '~/models/estateMessages.model';
import { EstateModel, EstatesModelInitialState } from '~/models/estates.model';
import { getEstatesOptions } from '~/renterOptions';
import { getRem } from '~/styles/utils';

export const ManagementEstatesIDMessages = () => {
  const router = useRouter();
  const { personID } = useAuth();

  const { data, isLoading } = useGetData<EstateModel>(
    EstatesModelInitialState,
    'estates',
    `${router.query.id}`
  );

  const { data: dataMessages, isLoading: isLoadingMessages } = useGetData<
    EstateMessagesModel[]
  >(
    [EstateMessagesModelInitialState],
    'estates',
    `messages/${router.query.id}`
  );

  const redirectedFunction = () => {
    if (router.isReady) {
      router.push('/management/estates');
    }
  };

  if (isLoading || isLoadingMessages) {
    return <SpinnerLoading />;
  }

  if (
    !(
      data.person._id === personID ||
      data.renter.find((rent) => rent._id === personID)
    )
  ) {
    redirectedFunction();
    return <SpinnerLoading />;
  }

  const options = getEstatesOptions(
    router.query.id ? router.query.id.toString() : '',
    data,
    personID.toString()
  );

  let isSaving = false;
  const saveMessage = async (message: string) => {
    if (isSaving) return null;
    isSaving = true;
    const response = await postQuery('estates/messages', {
      estate: router.query.id,
      person: personID,
      content: message,
    });

    if (response) {
      window.location.reload();
      toast.success('Pomyślnie dodano wiadomość.');
    }
    return null;
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
        <Layout display="flex" direction="column" flex={1}>
          {dataMessages.length > 0 && dataMessages[0].content.length > 0 ? (
            <>
              <Text textAlign="center" size={getRem(16)}>
                Wiadomości posegregowane: <b>od najnowszej, do najstarszej</b>
              </Text>
              {dataMessages.map((message) => (
                <Layout
                  key={message._id}
                  display="flex"
                  justifyContent="center"
                >
                  <MessageCardComponent
                    person={message.person.name}
                    data={message.created_at}
                    content={message.content}
                    additional={{
                      estate_owner: data.person._id,
                      personID: message.person._id || '',
                    }}
                  />
                </Layout>
              ))}
            </>
          ) : (
            <>
              <Text textAlign="center" size={getRem(16)} width="100%">
                W historii nieruchomości nie ma żadnych wiadomości od
                mieszkańców do tej pory.
              </Text>
              <Text textAlign="center" size={getRem(16)} width="100%">
                Możesz napisać wiadomość w sekcji poniżej.
              </Text>
            </>
          )}
        </Layout>
        <Layout
          display="flex"
          direction="column"
          width="100%"
          margin={[20, 0, 10, 0]}
          gap="10px"
        >
          <Text textAlign="center" size={getRem(16)}>
            Jeśli chcesz <b>napisać wiadomość</b>, skorzystaj z sekcji poniżej.
          </Text>
          <SendMessageSection
            label="Wiadomość"
            onSubmit={(message) => saveMessage(message)}
            disabledButton={isSaving}
          />
        </Layout>
      </Layout>
    </Layout>
  );
};
