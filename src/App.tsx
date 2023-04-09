import { FC } from 'react';

import { Slider } from './components';

import { data } from './common/mocks/data';

export const App: FC = () => {
  return (
    <div className="App">
      <Slider data={data} />
    </div>
  );
};
