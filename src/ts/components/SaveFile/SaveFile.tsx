import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FormatFiles } from './FormatFiles';
import Services from '../../services/services';
import { RsSchoolEvent } from '../../constants/types-interfaces';
import * as Storage from '../../helpers/storage';
import * as Download from '../../helpers/downaload';

const SaveFile: React.FC = () => {
  function saveFile() {
    let txtData: string = '';
    Services.getAllEvents().then((res: RsSchoolEvent[]) => {
      const visibleFields = Storage.getSelectedColumns();

      const doneElement = visibleFields.indexOf('taskDone');
      visibleFields.splice(doneElement, 1);
      const deleteElement = visibleFields.indexOf('deleteRow');
      visibleFields.splice(deleteElement, 1);

      txtData += `${visibleFields.join(' ')}\n`;
      const dataKeys = Object.keys(res[0].tableData);
      const data = res
        .map((event) => ({ ...event.tableData, key: event.id }))
        .map((element) => {
          const obj = {};
          dataKeys.forEach((key) => {
            if (visibleFields.includes(key)) {
              obj[key] = element[key];
            }
          });
          return obj;
        });

      data.forEach((item: object) => {
        const tempArray: string[] = [];
        visibleFields.forEach((field: string) => {
          if (field === 'isCompleted') {
            item[field] = Boolean(item[field]) ? 'yes' : 'no';
          }
          tempArray.push(field === 'type' ? item[field].name : item[field]);
        });
        txtData += `${tempArray.join(' ')}\n`;
      });

      Download.download('table', txtData);
    });
  }
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
      switch (event.key) {
        case FormatFiles.png:
          canvas.toBlob((blob) => {
            if (blob) {
              saveAs(blob, 'image.png');
            }
          });
          break;
        case FormatFiles.pdf:
          const docPdf = new jsPDF();
          docPdf.addImage(canvas.toDataURL(), 'JPEG', 5, 5, 200, 100);
          docPdf.save();
          break;
        case FormatFiles.txt:
          saveFile();
          break;
      }
    });
    scroll?.classList.remove('hidden');
  }

  const formatFilesMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key={FormatFiles.pdf}>{FormatFiles.pdf}</Menu.Item>
      <Menu.Item key={FormatFiles.png}>{FormatFiles.png}</Menu.Item>
      <Menu.Item key={FormatFiles.txt}>{FormatFiles.txt}</Menu.Item>
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
