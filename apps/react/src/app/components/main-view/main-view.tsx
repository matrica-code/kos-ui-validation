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

const log = KosLog.createLogger({ name: 'main-view' });
log.debug('main-view component loaded');

export const MainView: React.FunctionComponent = kosComponent(() => {
  const { model: beverageContainer } = useBeverageContainer();
  const [selectedBeverage, setSelectedBeverage] = useState<BeverageModelLike | null>(null);
  const [returningBeverage, setReturningBeverage] = useState<BeverageModelLike | null>(null);
  const [showControls, setShowControls] = useState(false);

  const handleSelectBeverage = useCallback((beverage: BeverageModelLike) => {
    setSelectedBeverage(beverage);
    // Delay showing controls until disc animation is partway through
    setTimeout(() => {
      setShowControls(true);
    }, 300);
  }, []);

  const handleBack = useCallback(() => {
    // Hide controls immediately
    setShowControls(false);

    // Start the return animation
    setReturningBeverage(selectedBeverage);
    setSelectedBeverage(null);

    // After disc finishes shrinking back, clear returning state
    // This triggers other items to fade back in
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
      <Main>
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
      </Main>
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

const Main = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
  overflow: hidden;
`;
