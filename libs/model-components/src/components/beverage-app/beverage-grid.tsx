import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

import { BeverageDisc } from './beverage-disc';
import type { BeverageModelLike } from './types';

interface BeverageGridProps {
  beverages: BeverageModelLike[];
  onSelectBeverage: (beverage: BeverageModelLike) => void;
  exitingBeverage: BeverageModelLike | null;
  returningBeverage: BeverageModelLike | null;
}

const COLS = 3;

export const BeverageGrid: React.FC<BeverageGridProps> = observer(
  ({ beverages, onSelectBeverage, exitingBeverage, returningBeverage }) => {
    return (
      <GridContainer>
        {beverages.map((beverage) => (
          <BeverageDisc
            key={beverage.id}
            beverage={beverage}
            onClick={onSelectBeverage}
            isExiting={exitingBeverage !== null && exitingBeverage.id !== beverage.id}
            isSelected={exitingBeverage?.id === beverage.id}
            isReturning={returningBeverage?.id === beverage.id}
            isAppearing={returningBeverage !== null && returningBeverage.id !== beverage.id}
          />
        ))}
      </GridContainer>
    );
  }
);

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${COLS}, 120px);
  grid-auto-rows: 120px;
  gap: 20px;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
`;
