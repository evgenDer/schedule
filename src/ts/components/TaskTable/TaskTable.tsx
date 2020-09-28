import React from 'react';

type TaskTableType = {
  deadline: string;
  title: string;
};

const TaskTable: React.FC<TaskTableType> = ({ deadline, title }) => {
  return (
    <table className="table-task">
      <tbody>
        <tr>
          <th>Deadline</th>
          <th>Folder name</th>
          <th>Branch name</th>
        </tr>
        <tr>
          <td>{deadline}</td>
          <td>{title.toLowerCase()}</td>
          <td>{title.toLowerCase()}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default TaskTable;
