import {
  ErrorBoundaryWithFallback,
  getLogLevel,
  KosTranslationProvider,
  LoadingMessage,
} from '@kosdev-code/kos-ui-sdk';
import log from 'loglevel';
import { Suspense } from 'react';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import './app.css';
import { MainView } from './components/main-view';
import { KosCoreContextProvider } from './registration';

const level = getLogLevel();

log.setLevel(level);

const App = () => (
  <ErrorBoundaryWithFallback>
    <Suspense fallback={<LoadingMessage></LoadingMessage>}>
      <KosCoreContextProvider>
        <KosTranslationProvider>
          <div className="App">
            <Router window={window}>
              <Routes>
                <Route index element={<MainView />} />
                <Route path="/main" element={<MainView />} />
              </Routes>
            </Router>
          </div>
        </KosTranslationProvider>
      </KosCoreContextProvider>
    </Suspense>
  </ErrorBoundaryWithFallback>
);

export default App;
