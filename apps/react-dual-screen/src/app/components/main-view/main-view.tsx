import { useCallback, useState } from 'react';

import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import {
  BeverageGrid,
  PouringControls,
  type BeverageModelLike,
} from '@kos-ui-validation/model-components';
import { useBeverageContainer } from '@kos-ui-validation/model-components/kos';
import { kosComponent, KosLog } from '@kosdev-code/kos-ui-sdk';

import {
  DualScreenLayout,
  ScreenRegionContainer,
  VideoScreen,
} from '../dual-screen';

const log = KosLog.createLogger({ name: 'main-view' });
log.debug('main-view component loaded');

export const MainView: React.FunctionComponent = kosComponent(() => {
  const { model: beverageContainer } = useBeverageContainer();
  const [selectedBeverage, setSelectedBeverage] = useState<BeverageModelLike | null>(null);
  const [returningBeverage, setReturningBeverage] = useState<BeverageModelLike | null>(null);
  const [showControls, setShowControls] = useState(false);

  const handleSelectBeverage = useCallback((beverage: BeverageModelLike) => {
    setSelectedBeverage(beverage);
    setTimeout(() => {
      setShowControls(true);
    }, 300);
  }, []);

  const handleBack = useCallback(() => {
    setShowControls(false);
    setReturningBeverage(selectedBeverage);
    setSelectedBeverage(null);
    setTimeout(() => {
      setReturningBeverage(null);
    }, 500);
  }, [selectedBeverage]);

  const isInPouringMode = selectedBeverage !== null || returningBeverage !== null;

  return (
    <>
      <Global
        styles={css`
          .kos-theme-dark {
            --kos-component-logo-url: url('./assets/kos-logo.svg');
          }

          .kos-theme-light {
            --kos-component-logo-url: url('./assets/kos-logo-light.svg');
          }
        `}
      />
      <DualScreenLayout>
        {/* Main screen - Beverage selection and pouring */}
        <ScreenRegionContainer screenId="main">
          <MainScreen>
            {beverageContainer && (
              <GridWrapper isHidden={isInPouringMode}>
                <BeverageGrid
                  beverages={beverageContainer.limitedBeverages}
                  onSelectBeverage={handleSelectBeverage}
                  exitingBeverage={selectedBeverage}
                  returningBeverage={returningBeverage}
                />
              </GridWrapper>
            )}

            {selectedBeverage && (
              <PouringControls
                beverage={selectedBeverage}
                onBack={handleBack}
                isVisible={showControls}
              />
            )}
          </MainScreen>
        </ScreenRegionContainer>

        {/* Video screen - Looping advertisement */}
        <ScreenRegionContainer screenId="video">
          {beverageContainer && (
            <VideoScreen videoUrl={beverageContainer.videoUrl} />
          )}
        </ScreenRegionContainer>
      </DualScreenLayout>
    </>
  );
});

interface GridWrapperProps {
  isHidden: boolean;
}

const GridWrapper = styled.div<GridWrapperProps>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ isHidden }) =>
    isHidden &&
    css`
      pointer-events: none;
    `}
`;

const MainScreen = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
  overflow: hidden;
`;
