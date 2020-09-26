import React from 'react';
import { Menu, Dropdown, Button, message } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FormatFiles } from './FormatFiles';

const SaveFile: React.FC = () => {
  function handleMenuClick(event) {
    let downloadElement = document.querySelector('.ant-table-container') as HTMLElement;
    if (!downloadElement) {
      downloadElement = document.querySelector('.saving-content') as HTMLElement;
    }
    let canvasPage;
    const scroll = document.querySelector('.ant-table-sticky-scroll');
    scroll?.classList.add('hidden');
    html2canvas(downloadElement).then(function (canvas) {
      canvasPage = canvas;
      const FILE: Blob = new Blob([downloadElement.innerHTML], {
        type: 'image/svg+xml;charset=utf-8',
      });
      if (event.key === FormatFiles.png) {
        canvas.toBlob((blob) => {
          if (blob) {
            saveAs(blob, 'image.png');
          }
        });
      }
      if (event.key === FormatFiles.pdf) {
        const docPdf = new jsPDF();
        docPdf.addImage(canvas.toDataURL(), 'JPEG', 5, 5, 200, 100);
        docPdf.save();
      }
      scroll?.classList.remove('hidden');
    });
  }

  const formatFilesMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key={FormatFiles.pdf}>{FormatFiles.pdf}</Menu.Item>
      <Menu.Item key={FormatFiles.png}>{FormatFiles.png}</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={formatFilesMenu}>
      <Button>
        <SaveOutlined />
        Save to file
      </Button>
    </Dropdown>
  );
};

export default SaveFile;
