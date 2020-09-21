import React, { useState } from 'react';
import { Modal, Input } from 'antd';

interface IInnerParams {
  showInput: boolean,
  createNewType: Function
}

function CreateTypeModal( {showInput, createNewType}: IInnerParams ) {
  let nameType = '';
  let newType = {};

  const handleInnerNameNewType = (e: any): void => {
    nameType = e.value;
    newType = {
      [nameType]: { 
        name: nameType, color: '', fontColor: '', descriptionBackgroundColor: '#fff', descriptionFontColor: '#000' 
      }
    }
  }

  return (
    <>
      <Modal
        title="Enter a new type name"
        visible={showInput}
        onOk={() => createNewType(newType)}
        onCancel={() => createNewType({})}
        destroyOnClose={true}
      >
        <Input 
          placeholder="Enter a new type name"
          maxLength={25} 
          onChange={() => handleInnerNameNewType(event?.target)}
        />
      </Modal>
    </>
  );
}

export default CreateTypeModal;
