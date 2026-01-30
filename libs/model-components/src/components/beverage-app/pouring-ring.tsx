import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

interface PouringRingProps {
  isPouring: boolean;
  brandColor: string;
  size: number;
}

export const PouringRing: React.FC<PouringRingProps> = observer(
  ({ isPouring, brandColor, size }) => {
    if (!isPouring) {
      return null;
    }

    return (
      <RingContainer size={size}>
        <Ring brandColor={brandColor} size={size} />
      </RingContainer>
    );
  }
);

const pulseRing = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.15);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

interface RingContainerProps {
  size: number;
}

const RingContainer = styled.div<RingContainerProps>`
  position: absolute;
  width: ${({ size }) => size + 40}px;
  height: ${({ size }) => size + 40}px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  will-change: transform, opacity;
  transform: translateZ(0);
`;

interface RingProps {
  brandColor: string;
  size: number;
}

const Ring = styled.div<RingProps>`
  width: ${({ size }) => size + 30}px;
  height: ${({ size }) => size + 30}px;
  border-radius: 50%;
  border: 6px solid ${({ brandColor }) => brandColor};
  box-shadow: 0 0 20px ${({ brandColor }) => brandColor}80,
    inset 0 0 20px ${({ brandColor }) => brandColor}40;
  animation: ${pulseRing} 1.2s ease-in-out infinite;
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
`;
