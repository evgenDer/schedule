import React from 'react';
import services from '../../services/services';

async function func () {
  console.log(await services.addEvent({
    "name": "Markdown & Git",
    "description": "",
    "descriptionUrl": "https://github.com/rolling-scopes-school/tasks/blob/master/tasks/git-markdown.md",
    "type": "cv:markdown",
    "timeZone": "Asia/Tashkent",
    "dateTime": "2020-09-04T10:24:00",
    "place": "",
    "comment": "",
}));
}
func();

const App: React.FC = () => {
  return <React.Fragment></React.Fragment>;
};

export default App;
