import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import { useLayoutEffect, useRef, useState } from 'react';

import type { BeverageModelLike } from './types';

interface BeverageDiscProps {
  beverage: BeverageModelLike;
  onClick: (beverage: BeverageModelLike) => void;
  isExiting?: boolean;
  isSelected?: boolean;
  isReturning?: boolean;
  isAppearing?: boolean;
}

const DISC_SIZE = 120;
const SELECTED_SIZE = 400;

// Find the closest positioned ancestor (for calculating relative positions)
const findPositionedAncestor = (element: HTMLElement): HTMLElement | null => {
  let parent = element.parentElement;
  while (parent) {
    const position = getComputedStyle(parent).position;
    if (position === 'relative' || position === 'absolute' || position === 'fixed') {
      return parent;
    }
    parent = parent.parentElement;
  }
  return document.body;
};

export const BeverageDisc: React.FC<BeverageDiscProps> = observer(
  ({
    beverage,
    onClick,
    isExiting = false,
    isSelected = false,
    isReturning = false,
    isAppearing = false,
  }) => {
    const discRef = useRef<HTMLDivElement>(null);
    const [targetPosition, setTargetPosition] = useState<{
      x: number;
      y: number;
      startX: number;
      startY: number;
      containerWidth: number;
      containerHeight: number;
    } | null>(null);

    useLayoutEffect(() => {
      if (isSelected && discRef.current && !targetPosition) {
        const rect = discRef.current.getBoundingClientRect();
        const container = findPositionedAncestor(discRef.current);
        const containerRect = container?.getBoundingClientRect() ?? {
          left: 0,
          top: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };

        // Calculate positions relative to the container
        const relativeStartX = rect.left - containerRect.left;
        const relativeStartY = rect.top - containerRect.top;
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;

        setTargetPosition({
          startX: relativeStartX,
          startY: relativeStartY,
          x: (containerWidth - SELECTED_SIZE) / 2,
          y: (containerHeight - SELECTED_SIZE) / 2,
          containerWidth,
          containerHeight,
        });
      }

      // Clear position when fully deselected
      if (!isSelected && !isReturning) {
        setTargetPosition(null);
      }
    }, [isSelected, isReturning, targetPosition]);

    const handleClick = () => {
      if (!isExiting && !isReturning) {
        onClick(beverage);
      }
    };

    // When returning, animate from center back to grid position
    if (isReturning && targetPosition) {
      return (
        <ReturningDisc
          startX={targetPosition.startX}
          startY={targetPosition.startY}
          endX={targetPosition.x}
          endY={targetPosition.y}
        >
          <DiscImage src={beverage.logoUrl} alt={beverage.id} draggable={false} />
        </ReturningDisc>
      );
    }

    // When selected, render as absolute position element that animates to center
    if (isSelected && targetPosition) {
      return (
        <SelectedDisc
          startX={targetPosition.startX}
          startY={targetPosition.startY}
          endX={targetPosition.x}
          endY={targetPosition.y}
        >
          <DiscImage src={beverage.logoUrl} alt={beverage.id} draggable={false} />
        </SelectedDisc>
      );
    }

    return (
      <DiscContainer
        ref={discRef}
        onClick={handleClick}
        isExiting={isExiting}
        isReturning={isReturning}
        isAppearing={isAppearing}
      >
        <DiscImage src={beverage.logoUrl} alt={beverage.id} draggable={false} />
      </DiscContainer>
    );
  }
);

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.8);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

interface SelectedDiscProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

const SelectedDisc = styled.div<SelectedDiscProps>`
  position: absolute;
  width: ${DISC_SIZE}px;
  height: ${DISC_SIZE}px;
  border-radius: 50%;
  overflow: hidden;
  z-index: 100;
  will-change: left, top, width, height;
  transform: translateZ(0);
  backface-visibility: hidden;

  left: ${({ startX }) => startX}px;
  top: ${({ startY }) => startY}px;

  animation: growToCenter 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;

  @keyframes growToCenter {
    0% {
      left: ${({ startX }) => startX}px;
      top: ${({ startY }) => startY}px;
      width: ${DISC_SIZE}px;
      height: ${DISC_SIZE}px;
    }
    100% {
      left: ${({ endX }) => endX}px;
      top: ${({ endY }) => endY}px;
      width: ${SELECTED_SIZE}px;
      height: ${SELECTED_SIZE}px;
    }
  }
`;

const ReturningDisc = styled.div<SelectedDiscProps>`
  position: absolute;
  border-radius: 50%;
  overflow: hidden;
  z-index: 100;
  will-change: left, top, width, height;
  transform: translateZ(0);
  backface-visibility: hidden;

  /* Start at center (large) */
  left: ${({ endX }) => endX}px;
  top: ${({ endY }) => endY}px;
  width: ${SELECTED_SIZE}px;
  height: ${SELECTED_SIZE}px;

  animation: shrinkToGrid 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;

  @keyframes shrinkToGrid {
    0% {
      left: ${({ endX }) => endX}px;
      top: ${({ endY }) => endY}px;
      width: ${SELECTED_SIZE}px;
      height: ${SELECTED_SIZE}px;
    }
    100% {
      left: ${({ startX }) => startX}px;
      top: ${({ startY }) => startY}px;
      width: ${DISC_SIZE}px;
      height: ${DISC_SIZE}px;
    }
  }
`;

interface DiscContainerProps {
  isExiting: boolean;
  isReturning: boolean;
  isAppearing: boolean;
}

const DiscContainer = styled.div<DiscContainerProps>`
  width: ${DISC_SIZE}px;
  height: ${DISC_SIZE}px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  ${({ isExiting }) =>
    isExiting &&
    css`
      animation: ${fadeOut} 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      pointer-events: none;
    `}

  ${({ isReturning }) =>
    isReturning &&
    css`
      opacity: 0;
      pointer-events: none;
    `}

  ${({ isAppearing }) =>
    isAppearing &&
    css`
      animation: ${fadeIn} 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.35s forwards;
      opacity: 0;
      pointer-events: none;
    `}
`;

const DiscImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  pointer-events: none;
`;
