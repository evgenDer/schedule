import React from 'react';
import { Menu, Dropdown, Button, message } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// import

enum FormatFiles {
  png = 'png',
  pdf = 'pdf',
}

const SaveFile: React.FC = () => {
  function handleMenuClick(e) {
    const downloadElement = document.querySelector('.header') as HTMLElement;
    console.log(downloadElement.innerHTML);
    let canvasPage;
    html2canvas(downloadElement).then(function (canvas) {
      canvasPage = canvas;
      console.log(canvas);
      const FILE: Blob = new Blob([canvasPage]);
      console.log(FILE);
      if (e.key === FormatFiles.png) {
        canvas.toBlob((blob) => {
          if (blob) {
            saveAs(blob, 'image.png');
          }
        });
      }
      if (e.key === FormatFiles.pdf) {
        const doc = new jsPDF();
        doc.addImage(canvas.toDataURL(), 'JPEG', 15, 40, 180, 180);
        doc.save();
        // html2pdf(downloadElement);
      }
    });
    console.log('click', e.key);
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
        Save file
      </Button>
    </Dropdown>
  );
};

export default SaveFile;
