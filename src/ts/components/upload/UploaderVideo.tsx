import React, { useState } from 'react';
import { UploadOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Button, notification, Input } from 'antd';
import VideoPlayer from 'react-video-js-player';

const UploaderVideo: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [isDownald, setIsDownald] = useState<boolean>(false);

  const isMentor = true;
  let videoElement: JSX.Element | null = null;

  function uploadVideo() {
    setIsDownald(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  const onChange = (event) => {
    setValue(event.target.value);
    setIsDownald(false);
  };

  return (
    <React.Fragment>
      {isDownald && value ? (
        <iframe
          src={value.replace('watch?v=', 'embed/')}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="video"
          className="video"
        />
      ) : null}
      {isMentor ? (
        <form className="uploader-video" onSubmit={handleSubmit}>
          <Input className="uload-video__input" placeholder={'Input video link'} value={value} onChange={onChange} />
          <div className="uload-video__btn" onClick={() => uploadVideo()}>
            <input type="submit" className="input input__video" multiple />
            <label htmlFor="input__file" className="input__button">
              <span className="input__icon-wrapper">
                <UploadOutlined />
              </span>
              <span className="input__button-text">{'Upload video'}</span>
            </label>
          </div>
        </form>
      ) : null}
    </React.Fragment>
  );
};

export default UploaderVideo;
