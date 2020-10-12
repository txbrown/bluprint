import { Text } from 'react-native';
import styled from '../../theme';

const MegaText = styled<{ color: string }, any>(Text)`
  color: ${props => props.color || '#000'};
  font-size: 42;
  /* font-weight: bold; */
  /* font-family: archivo-bold; */
`;

export default MegaText;
