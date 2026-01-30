import { Suspense } from 'react';

import './app.css';
import { MainView } from './components/main-view';

const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#1a1a2e',
    color: 'white'
  }}>
    Loading...
  </div>
);

const App = () => (
  <Suspense fallback={<LoadingFallback />}>
    <div className="App">
      <MainView />
    </div>
  </Suspense>
);

export default App;
