import React, { useState } from 'react';
import { UploadOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { notification } from 'antd';

const UploaderImage: React.FC = () => {
  const [urlImg, setUrlImage] = useState<string>('');
  const isMentor = true;
  function handleImageChange(event) {
    event.preventDefault();

    let reader = new FileReader();
    let file = event.target.files[0];
    const result: string = JSON.stringify(reader.result);

    reader.onloadend = () => {
      const TYPE_FILE: string = file.type;
      if (TYPE_FILE.indexOf('image') !== -1) {
        setUrlImage(result as string);
      } else {
        notification.open({
          placement: 'topLeft',
          duration: 3000,
          message: `It's not an image`,
          description: 'You can only upload images',
          icon: <CloseCircleOutlined style={{ color: 'red' }} />,
        });
      }
    };
    reader.readAsDataURL(file);
  }

  let imagePreview: null | JSX.Element = null;
  if (urlImg) {
    imagePreview = <img src={urlImg} className="upload__img" />;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <React.Fragment>
      {imagePreview}
      {isMentor ? (
        <form onSubmit={handleSubmit}>
          <div className="image">
            <input
              name="file"
              type="file"
              className="input input__img"
              onChange={(event) => handleImageChange(event)}
            />
            <label htmlFor="input__file" className="input__button">
              <span className="input__icon-wrapper">
                <UploadOutlined />
              </span>
              <span className="input__button-text">{'Upload image'}</span>
            </label>
          </div>
        </form>
      ) : null}
    </React.Fragment>
  );
};

export default UploaderImage;
