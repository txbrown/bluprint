import { View } from 'react-native';
import styled from '../theme';

interface Props {
  opacity: number;
}

export const Scrim = styled<Props, any>(View)`
  background-color: #06060b;
  opacity: ${props => props.opacity || 0.2};
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
`;
