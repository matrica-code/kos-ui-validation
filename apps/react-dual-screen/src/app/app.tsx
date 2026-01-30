import {
  ErrorBoundaryWithFallback,
  LoadingMessage,
  getLogLevel,
  KosTranslationProvider,
} from '@kosdev-code/kos-ui-sdk';
import log from 'loglevel';
import { Suspense } from 'react';
import { KosCoreContextProvider } from './registration';
import './app.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { MainView } from './components/main-view';

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
