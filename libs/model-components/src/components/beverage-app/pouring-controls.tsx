import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

import { PouringRing } from './pouring-ring';
import type { BeverageModelLike } from './types';

interface PouringControlsProps {
  beverage: BeverageModelLike;
  onBack: () => void;
  isVisible: boolean;
}

const BEVERAGE_SIZE = 400;

export const PouringControls: React.FC<PouringControlsProps> = observer(
  ({ beverage, onBack, isVisible }) => {
    const handlePour = () => {
      if (!beverage.pouring) {
        beverage.pour();
      }
    };

    if (!isVisible) {
      return null;
    }

    return (
      <ControlsOverlay>
        <RingContainer>
          <PouringRing
            isPouring={beverage.pouring}
            brandColor={beverage.brandColour}
            size={BEVERAGE_SIZE}
          />
        </RingContainer>

        <ButtonContainer>
          <PourButton
            onClick={handlePour}
            disabled={beverage.pouring}
            brandColor={beverage.brandColour}
            textColor={beverage.textColour}
          >
            {beverage.pouring ? 'Pouring...' : 'Pour'}
          </PourButton>

          <BackButton onClick={onBack} disabled={beverage.pouring}>
            Back
          </BackButton>
        </ButtonContainer>
      </ControlsOverlay>
    );
  }
);

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
`;

const ControlsOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 99;
`;

const RingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s ease-out 0.4s forwards;
  opacity: 0;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 8%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  pointer-events: auto;
  animation: ${slideUp} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s forwards;
  opacity: 0;
`;

interface PourButtonProps {
  brandColor: string;
  textColor: string;
}

const PourButton = styled.button<PourButtonProps>`
  padding: 16px 48px;
  font-size: 20px;
  font-weight: 600;
  color: ${({ textColor }) => textColor};
  background-color: ${({ brandColor }) => brandColor};
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
  will-change: transform;
  transform: translateZ(0);

  &:hover:not(:disabled) {
    transform: scale(1.05);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const BackButton = styled.button`
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  background-color: transparent;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  will-change: transform;
  transform: translateZ(0);

  &:hover:not(:disabled) {
    transform: scale(1.05);
    border-color: rgba(255, 255, 255, 0.5);
    color: rgba(255, 255, 255, 0.9);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
