import React, { useEffect, useState } from 'react';
import { Modal, Button, Checkbox, Tag } from 'antd';
import UploaderImage from '../Uploaders/UploaderImage';
import UploaderVideo from '../Uploaders/UploaderVideo';
import { getAdressFromCoordinates, getCoordinatesFromAdress } from '../../services/coordinatesApi';
import { YMaps, Map, Placemark, ZoomControl } from 'react-yandex-maps';
import CommentsSection from '../Commentaries/CommentSection';
import TaskTable from '../TaskTable/TaskTable';
import EditBlockType from '../EditBlock/EditBlock';
import { TASK_TYPES } from '../../constants/taskTypes';
import Services from '../../services/services';
import { RsSchoolEvent } from '../../constants/types-interfaces';
import { CommentProps } from 'antd/lib/comment';

type TaskProps = {
  id: string;
  name: string;
  deadline: string;
  isMentor?: boolean;
  type?: string;
};

const Task: React.FC<TaskProps> = ({ id, name, deadline, isMentor = false, type = TASK_TYPES.jstask.name }) => {
  const [visible, setVisible] = useState(false);
  const [haveFeedback, setHaveFeedback] = useState(true);
  const [address, setAdress] = useState('Минск');
  const [isOnline, setIsOnline] = useState(false);
  const [coords, setCoords] = useState<number[]>([]);
  const [description, setDescription] = useState('Will be added later...');
  const [materials, setMaterials] = useState('Will be added later...');
  const [videoSrc, setVideoSrc] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [resEvent, setResEvent] = useState<RsSchoolEvent>();

  useEffect(() => {
    Services.getEvent(id).then((res: RsSchoolEvent) => {
      if (res) {
        const data = res.taskData;
        setResEvent(res);
        setAdress(data.address);
        setIsOnline(!['-', '', 'Place'].includes(data.address));
        if (!isOnline) {
          getCoordinates();
        }
        setDescription(data.description);
        setMaterials(data.materials);
        setVideoSrc(data.videoSrc);
        setImgSrc(data.imgSrc);
        setHaveFeedback(data.haveFeedback);
        setComments(data.comments);
      }
    });
  }, [visible === true]);

  async function getCoordinates() {
    if (address) {
      const geometry = await getCoordinatesFromAdress(address);
      const arrayCoords: number[] = [];
      arrayCoords[0] = geometry.lat;
      arrayCoords[1] = geometry.lng;
      setCoords(arrayCoords);
    }
  }

  const showModal = () => {
    setVisible(true);
  };

  const onChange = (event) => {
    setHaveFeedback(event.target.checked);
  };

  const handleOk = () => {
    if (resEvent) {
      const savedEvent = resEvent;
      savedEvent.taskData = {
        ...resEvent.taskData,
        description,
        materials,
        haveFeedback,
        videoSrc,
        imgSrc,
        address,
        comments,
      };
      savedEvent.tableData.place = address;
      Services.updateEvent(savedEvent);
    }
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  async function clickOnMap(event) {
    setCoords(event.get('coords'));
    const ADRESS = await getAdressFromCoordinates(coords);
    setAdress(ADRESS);
  }
  const createLectureTask = () => {
    return (
      <>
        <UploaderVideo videoSrc={videoSrc} setVideoSrc={setVideoSrc} isMentor={isMentor} />
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
        <h2 className="task-modal__title">Questions</h2>
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
        <TaskTable title={name} deadline={deadline} />
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
      <span className="task-modal-toggler" onClick={showModal}>
        {name}
      </span>
      {visible ? (
        <Modal
          className="modal"
          visible={visible}
          title={name}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={
            isMentor
              ? [
                  <Button key="back" onClick={handleCancel}>
                    Return
                  </Button>,
                  <Button key="submit" type="primary" onClick={handleOk}>
                    Save
                  </Button>,
                ]
              : []
          }
        >
          <div className="task-modal modal">
            <div className="task-modal__checkboxes">
              <Checkbox disabled={false} checked={haveFeedback} onChange={onChange}>
                Add feedback
              </Checkbox>
              <Tag color={isOnline ? 'green' : 'volcano'}>{isOnline ? 'online' : 'offline'}</Tag>
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
            {haveFeedback ? <CommentsSection comments={comments} setComments={setComments} /> : null}
          </div>
        </Modal>
      ) : null}
    </>
  );
};

export default Task;
