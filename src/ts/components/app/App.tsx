import React from 'react';
import services from '../../services/services';

async function func () {
  console.log(await services.getEvent("82MCS5XD4FogsuFJi7Iv"));
}
func();

const App: React.FC = () => {
  return <React.Fragment></React.Fragment>;
};

export default App;
