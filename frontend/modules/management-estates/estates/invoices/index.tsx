import toast from 'react-hot-toast';

import FileDownload from 'js-file-download';
import { useRouter } from 'next/router';

import { deleteQuery } from '~/api/delete';
import { getFileDownload } from '~/api/get';
import { updateQuery } from '~/api/update';
import { Text } from '~/components/atoms/typography';
import { Button } from '~/components/compounds/Button';
import { LeftSidebar } from '~/components/compounds/Left-Sidebar';
import { ModalComponent } from '~/components/compounds/ModalComponent';
import { useModalComponent } from '~/components/compounds/ModalComponent/useModalComponent';
import { SpinnerLoading } from '~/components/compounds/Spinner';
import { useAuth } from '~/components/contexts/useContextProvider';
import {
  CustomDeleteIcon,
  CustomDownloadIcon,
  CustomInfoIcon,
} from '~/components/icons/global';
import { Layout } from '~/components/molecules/layout';
import { useActivity } from '~/hooks/useActivity';
import { makeFullDataHour } from '~/hooks/useDateParser';
import { useGetData } from '~/hooks/useGetData';
import { EstateModel, EstatesModelInitialState } from '~/models/estates.model';
import {
  InvoicesModel,
  InvoicesModelInitialState,
} from '~/models/invoices.model';
import { PersonLoginIdModel } from '~/models/person.model';
import { getEstatesOptions } from '~/renterOptions';
import { getRem } from '~/styles/utils';

export const ManagementEstatesInvoices = () => {
  const router = useRouter();
  const { personID } = useAuth();
  const { modalData, setModalData, modalActive, setModalActive } =
    useModalComponent();
  const {
    modalData: modalDataInfo,
    setModalData: setModalDataInfo,
    modalActive: modalActiveInfo,
    setModalActive: setModalActiveInfo,
  } = useModalComponent();
  const { activity, setActivity } = useActivity();

  const { data, isLoading } = useGetData<EstateModel>(
    EstatesModelInitialState,
    'estates',
    `${router.query.id}`,
    0,
    0,
    { personID, typeView: 'view' }
  );

  const { data: dataInvoices, isLoading: isLoadingInvoices } = useGetData<
    InvoicesModel[]
  >([InvoicesModelInitialState], 'estates/invoices', `${router.query.id}`);

  const redirectedFunction = () => {
    if (router.isReady) {
      router.push('/management/estates');
    }
  };

  if (isLoading || isLoadingInvoices) {
    return <SpinnerLoading />;
  }

  if ((!data && !isLoading) || (!dataInvoices && !isLoadingInvoices)) {
    redirectedFunction();
    return <SpinnerLoading />;
  }

  const options = getEstatesOptions(
    router.query.id ? router.query.id.toString() : '',
    data,
    personID.toString()
  );

  const onDeleteInvoice = async () => {
    if (activity) {
      return null;
    }
    setActivity(true);
    setModalActive(false);

    const response = await deleteQuery('estates/invoices', modalData.id);
    if (response && response.status === 204) {
      window.location.reload();
      toast.success('Pomyślnie usunięto fakturę.');
    }
    return null;
  };

  const onFileDownload = async (filename: string) => {
    const response = await getFileDownload(
      `estates/invoices/download/${filename}`
    );
    if (response) {
      FileDownload(response.data, 'faktura.pdf');
    }
  };

  const onInfoAboutPayment = async () => {
    if (activity) {
      return null;
    }
    setActivity(true);
    const response = await updateQuery(
      `estates/invoices/payment/${modalDataInfo.id}`,
      { person_id: personID }
    );
    if (response && response.status === 204) {
      window.location.reload();
      toast.success('Pomyślnie poinformowano o opłaceniu faktury.');
    } else {
      toast.error('Coś poszło nie tak... Odśwież stronę i spróbuj ponownie.');
      setActivity(false);
    }
    return null;
  };

  const getInfoAboutInvoice = (invoice: InvoicesModel) => {
    let text = '';

    if (Number(invoice.renters.length) === 0) {
      text = `W chwili dodania faktury do nieruchomości, liczba lokatorów wynosiła 0. Uznaje się więc, że nikt nie mógł jej opłacić.`;
    } else {
      text = `Fakturę opłaciło ${invoice.paid_renters.length} z ${invoice.renters.length} osób.`;
      if (invoice.paid_renters.find((person) => person._id === personID)) {
        text = `${text} Wszystko wskazuje na to, ze ta faktura została już przez Ciebie opłacona.`;
      } else if (invoice.person !== personID) {
        text = `${text} Niestety, w Twoim przypadku nie opłacono jeszcze tej faktury. Jeśli wcześniej zapłacono za tą fakturę, a widzisz ten komunikat, użyj przycisku powiadomienia o płatności dla zarządcy budynku.`;
      } else if (invoice.person === personID) {
        if (invoice.paid_renters.length > 0) {
          text = `${text} Osoby, które opłaciły fakturę: ${invoice.paid_renters.map(
            (person) => ` ${person.name}`
          )}`;
        }
      }
    }
    return text;
  };

  const checkPermissionsInfoButton = () => {
    if (data.person._id === personID) {
      return false;
    }
    if (modalDataInfo.other_id === personID) {
      return false;
    }
    if (modalDataInfo.other_data) {
      if (modalDataInfo.other_data.renters.length === 0) {
        return false;
      }
      if (
        modalDataInfo.other_data.paid_renters.find(
          (person: PersonLoginIdModel) => person._id === personID
        )
      ) {
        return false;
      }
    }

    return true;
  };

  return (
    <Layout display="flex" direction="row" minWidth="100%" paddingTop={15}>
      <LeftSidebar options={options[2]} />
      <Layout
        background="var(--background-white)"
        width="100%"
        borderRadius="8px"
        marginRight={15}
        padding={[10, 0]}
        boxShadow="0 0 5px 1px var(--border-black)"
        display="flex"
        direction="column"
        minWidth="850px"
      >
        {data.person._id === personID && (
          <Layout display="flex" justifyContent="center">
            <Button
              text="Dodaj fakturę"
              onSubmit={() =>
                router.push(
                  `/management/estates/${router.query.id}/invoices/new`
                )
              }
            />
          </Layout>
        )}

        <Layout marginTop={0}>
          {dataInvoices && dataInvoices.length > 0 ? (
            <Layout marginTop={25}>
              <Text textAlign="center" size={getRem(16)}>
                Wykaz faktur udostępnionych przez zarządce nieruchomości
                znajdują się poniżej.
              </Text>
              <Layout
                margin={[10, 10, 0, 10]}
                boxShadow="0 0 4px var(--border-black)"
              >
                {dataInvoices.map((invoice, index) => (
                  <Layout
                    key={invoice._id}
                    display="flex"
                    padding={[10]}
                    background={index % 2 && 'var(--background-light-grey)'}
                  >
                    <Layout flex={1}>
                      <Text size={getRem(16)}>
                        {`${makeFullDataHour(invoice.created_at, '')} - ${
                          invoice.description
                        }`}
                      </Text>
                    </Layout>
                    <Layout display="flex" alignItems="center" gap="10px">
                      <CustomDownloadIcon
                        onClick={() => onFileDownload(invoice.invoice_name)}
                      />
                      <Layout>
                        <CustomInfoIcon
                          onClick={() => {
                            setModalDataInfo({
                              id: invoice._id,
                              description: getInfoAboutInvoice(invoice),
                              other_id: `${invoice.paid_renters.find(
                                (person) => person._id === personID
                              )}`,
                              other_data: invoice,
                            });
                            setModalActiveInfo(true);
                          }}
                        />
                      </Layout>
                      {data.person._id === personID && (
                        <CustomDeleteIcon
                          onClick={() => {
                            setModalData({
                              id: invoice._id,
                              description: `Czy na pewno chcesz usunąć fakturę z daty: ${makeFullDataHour(
                                invoice.created_at,
                                ''
                              )}?`,
                            });
                            setModalActive(true);
                          }}
                        />
                      )}
                    </Layout>
                  </Layout>
                ))}
              </Layout>
            </Layout>
          ) : (
            <>
              <Text size={getRem(16)} textAlign="center">
                Zarządca nieruchomości nie wprowadził do tej pory żadnej faktury
                do systemu.
              </Text>
              <Text size={getRem(16)} textAlign="center">
                Jeśli faktura zostanie umieszczona w systemie, zostanie ona
                wyświetlona w tym miejscu.
              </Text>
            </>
          )}
        </Layout>
      </Layout>
      {modalActive && (
        <ModalComponent
          title="Usuwanie faktury"
          description={modalData.description}
          cancelButton
          cancelText="Nie chcę usunąć"
          confirmButton
          confirmText="Chcę usunąć"
          onHide={() => setModalActive(false)}
          onConfirm={() => onDeleteInvoice()}
        />
      )}
      {modalActiveInfo && (
        <ModalComponent
          title="Informacje o płatnościach"
          description={modalDataInfo.description}
          cancelButton
          cancelText="Zamknij"
          onHide={() => setModalActiveInfo(false)}
          confirmButton={checkPermissionsInfoButton()}
          confirmText="Chcę poinformować o płatności faktury"
          onConfirm={() => onInfoAboutPayment()}
          minWidth="500px"
          minHeight="250px"
        />
      )}
    </Layout>
  );
};
