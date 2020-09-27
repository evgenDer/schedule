import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { IData } from '../../constants/types-interfaces';

type ModalEvent = {
  dayData: IData;
};

const ModalEvent: React.FC<ModalEvent> = ( {dayData} ) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        description
      </Button>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <p>Some contents...</p>
        <p>{dayData.name}</p>
      </Modal>
    </>
  );
}

export default ModalEvent;
