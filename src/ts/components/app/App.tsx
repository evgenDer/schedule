import React from 'react';
import services from '../../services/services';

async function func () {
  console.log(await services.getOrganizer('EI1McST8k35FjfI9f4wa'));
}
func();

const App: React.FC = () => {
  return <React.Fragment></React.Fragment>;
};

export default App;
