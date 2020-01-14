import React, {useMemo} from 'react';
import ReactDOM from 'react-dom';

import Sidebar from './Sidebar';
import sidebarConfig from './config';
import parseSidebar from './parseSidebar';

import './index.css';

function App() {
  const routes = useMemo(() => parseSidebar(sidebarConfig), []);

  return (
    <main>
      <Sidebar routes={routes} />
    </main>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
