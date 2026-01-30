import styled from '@emotion/styled';
import { createContext, useContext, type ReactNode } from 'react';

import {
  defaultDualScreenConfig,
  type DualScreenConfig,
  type ScreenRegion,
} from './screen-config';

interface DualScreenLayoutProps {
  config?: DualScreenConfig;
  children: ReactNode;
}

const ScreenConfigContext = createContext<DualScreenConfig>(defaultDualScreenConfig);

export const useScreenConfig = () => useContext(ScreenConfigContext);

export const DualScreenLayout: React.FC<DualScreenLayoutProps> = ({
  config = defaultDualScreenConfig,
  children,
}) => {
  return (
    <ScreenConfigContext.Provider value={config}>
      <LayoutContainer>{children}</LayoutContainer>
    </ScreenConfigContext.Provider>
  );
};

interface ScreenRegionProps {
  screenId: string;
  children: ReactNode;
}

export const ScreenRegionContainer: React.FC<ScreenRegionProps> = ({
  screenId,
  children,
}) => {
  const config = useScreenConfig();
  const screen = config.screens[screenId];

  if (!screen) {
    console.warn(`Screen region "${screenId}" not found in configuration`);
    return null;
  }

  return (
    <RegionContainer screen={screen}>
      {children}
    </RegionContainer>
  );
};

const LayoutContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #000;
`;

interface RegionContainerProps {
  screen: ScreenRegion;
}

const RegionContainer = styled.div<RegionContainerProps>`
  position: absolute;
  left: ${({ screen }) => screen.x}px;
  top: ${({ screen }) => screen.y}px;
  width: ${({ screen }) => screen.width}px;
  height: ${({ screen }) => screen.height}px;
  overflow: hidden;
`;
