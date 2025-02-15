import React from 'react';
import Router from './src/Router';

import {LocalizationProvider} from '@providers/index';
import CommonProvider from '@providers/CommonProvider';

const App = () => (
  <CommonProvider>
    <LocalizationProvider>
      <Router />
    </LocalizationProvider>
  </CommonProvider>
);

export default App;
