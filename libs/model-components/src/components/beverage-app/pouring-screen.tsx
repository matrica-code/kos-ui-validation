import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import type { BeverageModel } from '@kos-ui-validation/kos-ui-validation-models';
import { kosComponent } from '@kosdev-code/kos-ui-sdk';

import { PouringRing } from './pouring-ring';

interface PouringScreenProps {
  beverage: BeverageModel;
  onBack: () => void;
  isEntering: boolean;
  isExiting: boolean;
}

const BEVERAGE_SIZE = 400;

export const PouringScreen: React.FC<PouringScreenProps> = kosComponent(
  ({ beverage, onBack, isEntering, isExiting }) => {
    const handlePour = () => {
      if (!beverage.pouring) {
        beverage.pour();
      }
    };

    return (
      <ScreenContainer isEntering={isEntering} isExiting={isExiting}>
        <BeverageContainer>
          <PouringRing
            isPouring={beverage.pouring}
            brandColor={beverage.brandColour}
            size={BEVERAGE_SIZE}
          />
          <BeverageImage
            src={beverage.logoUrl}
            alt={beverage.id}
            draggable={false}
          />
        </BeverageContainer>

        <ButtonContainer isEntering={isEntering} isExiting={isExiting}>
          <PourButton
            onClick={handlePour}
            disabled={beverage.pouring}
            brandColor={beverage.brandColour}
          >
            {beverage.pouring ? 'Pouring...' : 'Pour'}
          </PourButton>

          <BackButton onClick={onBack} disabled={beverage.pouring}>
            Back
          </BackButton>
        </ButtonContainer>
      </ScreenContainer>
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

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const scaleIn = keyframes`
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const scaleOut = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.5);
    opacity: 0;
  }
`;

interface ScreenContainerProps {
  isEntering: boolean;
  isExiting: boolean;
}

const ScreenContainer = styled.div<ScreenContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 40px;
  will-change: opacity;
  transform: translateZ(0);

  ${({ isEntering, isExiting }) => {
    if (isEntering) {
      return css`
        animation: ${fadeIn} 0.3s ease-out forwards;
      `;
    }
    if (isExiting) {
      return css`
        animation: ${fadeOut} 0.3s ease-out forwards;
      `;
    }
    return '';
  }}
`;

const BeverageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${BEVERAGE_SIZE + 50}px;
  height: ${BEVERAGE_SIZE + 50}px;
`;

const BeverageImage = styled.img`
  width: ${BEVERAGE_SIZE}px;
  height: ${BEVERAGE_SIZE}px;
  border-radius: 50%;
  object-fit: cover;
  will-change: transform;
  transform: translateZ(0);
`;

interface ButtonContainerProps {
  isEntering: boolean;
  isExiting: boolean;
}

const ButtonContainer = styled.div<ButtonContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  will-change: transform, opacity;
  transform: translateZ(0);

  ${({ isEntering, isExiting }) => {
    if (isEntering) {
      return css`
        animation: ${scaleIn} 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards;
        opacity: 0;
      `;
    }
    if (isExiting) {
      return css`
        animation: ${scaleOut} 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      `;
    }
    return '';
  }}
`;

interface PourButtonProps {
  brandColor: string;
}

const PourButton = styled.button<PourButtonProps>`
  padding: 16px 48px;
  font-size: 20px;
  font-weight: 600;
  color: white;
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
  color: #666;
  background-color: transparent;
  border: 2px solid #ccc;
  border-radius: 25px;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  will-change: transform;
  transform: translateZ(0);

  &:hover:not(:disabled) {
    transform: scale(1.05);
    border-color: #999;
    color: #333;
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
