import React, { useEffect, useState } from 'react';
import { Modal, Button, message, Checkbox } from 'antd';
import UploaderImage from '../Uploaders/UploaderImage';
import UploaderVideo from '../Uploaders/UploaderVideo';
import ReactMarkdown from 'react-markdown';
import { getAdressFromCoordinates, getCoordinatesFromAdress } from '../../service/coordinatesApi';
import { YMaps, Map, Placemark, ZoomControl } from 'react-yandex-maps';
import CommentsSection from '../Commentaries/CommentSection';
import TaskTable from '../TaskTable/TaskTable';
import EditBlockType from '../EditBlock/EditBlock';
import { TASK_TYPES } from '../../constants/taskTypes';

const Task: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isMentor, setIsMentor] = useState(true);
  const [haveFeedback, setHaveFeedback] = useState(true);
  const [address, setAdress] = useState('Минск');
  const [coords, setCoords] = useState<number[]>([]);
  const [description, setDescription] = useState('Description will be added later...');
  const [materials, setMaterials] = useState('Materials will be added later...');
  const [videoSrc, setVideoSrc] = useState('');
  const [imgSrc, setImgSrc] = useState('');

  const type = TASK_TYPES.jstask.name;
  const deadline = '25 - 05 - 2018';

  const showModal = async () => {
    console.log(!!address);
    if (address) {
      const geometry = await getCoordinatesFromAdress(address);
      console.log(geometry);
      const ARRAY_COORDS: number[] = [];
      ARRAY_COORDS[0] = geometry.lat;
      ARRAY_COORDS[1] = geometry.lng;
      setCoords(ARRAY_COORDS);
      console.log(coords);
      setVisible(true);
    }
  };

  const onChange = (event) => {
    setHaveFeedback(event.target.checked);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const title: string = 'schedulue';
  const isOnline = true;

  async function clickOnMap(event) {
    setCoords(event.get('coords'));
    const ADRESS = await getAdressFromCoordinates(coords);
    console.log(ADRESS);
    setAdress(ADRESS);
  }
  const createLectureTask = () => {
    return (
      <>
        <h3>Lector: Pavel</h3>
        {isMentor ? <UploaderVideo videoSrc={videoSrc} setVideoSrc={setVideoSrc} isMentor={isMentor} /> : null}
        <h2 className="task-modal__title">Description</h2>
        <EditBlockType
          value={description}
          onChange={(value) => {
            if (value) {
              setDescription(value);
            }
          }}
          isMentor={isMentor}
        ></EditBlockType>
        <h2>Materials</h2>
        <EditBlockType
          value={materials}
          onChange={(value) => {
            if (value) {
              setMaterials(value);
            }
          }}
          isMentor={isMentor}
        ></EditBlockType>
      </>
    );
  };

  const createInterviewTask = () => {
    return (
      <>
        <h3>Deadline: {deadline}</h3>
        {isMentor ? <h2 className="task-modal__title">Description interview</h2> : null}
        <EditBlockType
          value={description}
          onChange={(value) => {
            if (value) {
              setDescription(value);
            }
          }}
          isMentor={isMentor}
        ></EditBlockType>
        <h2>Materials for the preparation</h2>
        <EditBlockType
          value={materials}
          onChange={(value) => {
            if (value) {
              setMaterials(value);
            }
          }}
          isMentor={isMentor}
        ></EditBlockType>
      </>
    );
  };

  const createHTMLandJSTask = () => {
    return (
      <>
        <TaskTable title={title} deadline={deadline} />
        <UploaderImage imageSrc={imgSrc} setImageSrc={setImgSrc} isMentor={isMentor} />
        <h2 className="task-modal__title">Description</h2>
        <EditBlockType
          value={description}
          onChange={(value) => {
            if (value) {
              setDescription(value);
            }
          }}
          isMentor={isMentor}
        ></EditBlockType>
        <h2>Materials</h2>
        <EditBlockType
          value={materials}
          onChange={(value) => {
            if (value) {
              setMaterials(value);
            }
          }}
          isMentor={isMentor}
        ></EditBlockType>
      </>
    );
  };

  const createDefaultTask = () => {
    return (
      <>
        <h2 className="task-modal__title">Description</h2>
        <EditBlockType
          value={description}
          onChange={(value) => {
            if (value) {
              setDescription(value);
            }
          }}
          isMentor={isMentor}
        ></EditBlockType>
      </>
    );
  };

  const createTestTask = () => {
    useEffect(() => {
      setDescription('Link will be added later...');
    }, []);
    return (
      <div className="test-task">
        <p>The link will be in Discord.</p>
        <h2 className="task-modal__title">Link to test</h2>
        <EditBlockType
          value={description}
          onChange={(value) => {
            if (value) {
              setDescription(value);
            }
          }}
          isMentor={isMentor}
        ></EditBlockType>
        <h2>Materials for the preparation</h2>
        <EditBlockType
          value={materials}
          onChange={(value) => {
            if (value) {
              setMaterials(value);
            }
          }}
          isMentor={isMentor}
        ></EditBlockType>
      </div>
    );
  };

  const createCodewarsTask = () => {
    setDescription('Task \n Scoring criteria');
    return (
      <>
        <EditBlockType
          value={description}
          onChange={(value) => {
            if (value) {
              setDescription(value);
            }
          }}
          isMentor={isMentor}
        ></EditBlockType>
      </>
    );
  };

  const createTasks = () => {
    switch (type) {
      case 'lecture':
        return createLectureTask();
      case 'test':
        return createTestTask();
      case 'interview':
        useEffect(() => {
          setDescription('### Questions \n');
        });
        return createInterviewTask();
      case 'codewars':
        return createCodewarsTask();
      case 'js task':
      case 'html task':
        return createHTMLandJSTask();
      default:
        return createDefaultTask();
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Task
      </Button>
      <Modal
        visible={visible}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Save
          </Button>,
        ]}
      >
        <div className="task-modal">
          <div className="task-modal__checkboxes">
            <Checkbox disabled={false} checked={haveFeedback} onChange={onChange}>
              Add feedback
            </Checkbox>
            <Checkbox disabled={true} checked={isOnline}>
              Online
            </Checkbox>
          </div>
          {createTasks()}
          {isOnline ? (
            <YMaps>
              <div className="map">
                <h2>Location</h2>
                <p>{address}</p>
                <Map width="100%" height="70vh" onClick={clickOnMap} defaultState={{ center: coords, zoom: 16 }}>
                  <Placemark geometry={coords} />
                  <ZoomControl />
                </Map>
              </div>
            </YMaps>
          ) : null}
          {haveFeedback ? <CommentsSection /> : null}
        </div>
      </Modal>
    </>
  );
};
export default Task;
