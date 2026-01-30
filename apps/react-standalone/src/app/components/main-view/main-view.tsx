import { useCallback, useState } from 'react';

import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import {
  BeverageGrid,
  PouringControls,
  type BeverageModelLike,
} from '@kos-ui-validation/model-components';
import { useStandaloneBeverageContainer } from '@kos-ui-validation/model-components/standalone';
import { observer } from 'mobx-react-lite';

export const MainView: React.FunctionComponent = observer(() => {
  const { model: beverageContainer, loading } =
    useStandaloneBeverageContainer();
  const [selectedBeverage, setSelectedBeverage] =
    useState<BeverageModelLike | null>(null);
  const [returningBeverage, setReturningBeverage] =
    useState<BeverageModelLike | null>(null);
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

  const isInPouringMode =
    selectedBeverage !== null || returningBeverage !== null;

  if (loading || !beverageContainer) {
    return (
      <LoadingContainer>
        <LoadingText>Loading beverages...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
          }
          body {
            margin: 0;
            padding: 0;
          }
        `}
      />
      <Main>
        <GridWrapper isHidden={isInPouringMode}>
          <BeverageGrid
            beverages={beverageContainer.limitedBeverages}
            onSelectBeverage={handleSelectBeverage}
            exitingBeverage={selectedBeverage}
            returningBeverage={returningBeverage}
          />
        </GridWrapper>

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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
`;

const LoadingText = styled.div`
  color: white;
  font-size: 18px;
`;

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
