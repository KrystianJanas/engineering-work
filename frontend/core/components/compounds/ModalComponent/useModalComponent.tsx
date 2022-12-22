import { useState } from 'react';

export const useModalComponent = () => {
  const [modalActive, setModalActive] = useState(false);
  const [modalData, setModalData] = useState<{
    id: string;
    description: string;
  }>({ id: '', description: '' });

  return { modalActive, setModalActive, modalData, setModalData };
};
