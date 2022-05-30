import { useState } from 'react';

import Button from 'components/Button';

import Modal from './Modal';
import type { ModalProps } from './Modal';

const ARGS = {
  children: "Hi, I'm a demo modal!",
  darkenBackground: false,
  title: 'Demo Modal',
};

export function Default(props: ModalProps) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setModalVisible(true)} type="primary">
        Open Modal
      </Button>
      <Modal {...props} id="demo-modal" setVisible={setModalVisible} visible={modalVisible} />
    </>
  );
}

Default.args = ARGS;
