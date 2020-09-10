import React from 'react';
import services from '../../services/services';

async function func () {
  console.log(await services.getAllOrganizers());
}
func();

const App: React.FC = () => {
  return <React.Fragment></React.Fragment>;
};

export default App;
