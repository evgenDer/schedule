import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import { CommentProps } from 'antd/lib/comment';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={(props: CommentProps) => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const CommentsSection: React.FC = () => {
  const [value, setValue] = useState('');
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    console.log(value);
    if (!value) {
      return;
    }

    const newComment = {
      author: 'Github Id',
      content: <p>{value}</p>,
      datetime: moment().fromNow(),
      avatar: 'https://avatars1.githubusercontent.com/u/9919?s=200&v=4',
    };

    setTimeout(() => {
      setSubmitting(false);
      setValue(value);
      setComments([...comments, newComment]);
    }, 1000);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className="comment-section">
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        avatar={<Avatar src="https://avatars1.githubusercontent.com/u/9919?s=200&v=4" alt="Han Solo" />}
        content={<Editor onChange={handleChange} onSubmit={handleSubmit} submitting={submitting} value={value} />}
      />
    </div>
  );
};

export default CommentsSection;
