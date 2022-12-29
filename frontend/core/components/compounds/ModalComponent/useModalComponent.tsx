import { useState } from 'react';

export const useModalComponent = () => {
  const [modalActive, setModalActive] = useState(false);
  const [modalData, setModalData] = useState<{
    id: string;
    description: string;
    other_id?: string;
  }>({ id: '', description: '' });

  return { modalActive, setModalActive, modalData, setModalData };
};
