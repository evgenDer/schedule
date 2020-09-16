import React from 'react';
import { Menu, Dropdown, Button, message } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

enum FormatFiles {
  png = 'png',
  pdf = 'pdf',
}

const SaveFile: React.FC = () => {
  function handleMenuClick(event) {
    const downloadElement = document.querySelector('.header') as HTMLElement;
    let canvasPage;
    html2canvas(downloadElement).then(function (canvas) {
      canvasPage = canvas;
      const FILE: Blob = new Blob([canvasPage]);
      if (event.key === FormatFiles.png) {
        canvas.toBlob((blob) => {
          if (blob) {
            saveAs(blob, 'image.png');
          }
        });
      }
      if (event.key === FormatFiles.pdf) {
        const docPdf = new jsPDF();
        docPdf.addImage(canvas.toDataURL(), 'JPEG', 15, 40, 180, 180);
        docPdf.save();
        // html2pdf(downloadElement);
      }
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
