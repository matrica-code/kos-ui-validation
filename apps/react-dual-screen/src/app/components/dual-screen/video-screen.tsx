import styled from '@emotion/styled';
import { kosComponent } from '@kosdev-code/kos-ui-sdk';

interface VideoScreenProps {
  videoUrl: string;
}

export const VideoScreen: React.FC<VideoScreenProps> = kosComponent(
  ({ videoUrl }) => {
    return (
      <VideoContainer>
        <Video
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
        />
      </VideoContainer>
    );
  }
);

const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #000;
  overflow: hidden;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
