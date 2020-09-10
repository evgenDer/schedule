import React from 'react';
import services from '../../services/services';

async function func () {
  console.log(await services.updateEvent({
    "description": "",
    "comment": "",
    "place": "",
    "dateTime": "2020-09-04T10:24:00",
    "timeZone": "Europe/Minsk",
    "name": "Markdown & Git",
    "type": "cv:markdown",
    "descriptionUrl": "https://github.com/rolling-scopes-school/tasks/blob/master/tasks/git-markdown.md",
    "id": "08b67h2LXPox6UkNdooh"
  }));
}
func();

const App: React.FC = () => {
  return <React.Fragment></React.Fragment>;
};

export default App;
