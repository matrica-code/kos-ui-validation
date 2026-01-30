import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';

interface VideoScreenProps {
  videoUrl: string;
}

export const VideoScreen: React.FC<VideoScreenProps> = observer(
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
