import { Text } from 'react-native';
import styled from 'styled-components';

const Label = styled<{ color: string }, any>(Text)`
  color: ${props => props.color || '#fff'};
  font-size: 14;
  font-family: 'roboto-regular';
`;

export default Label;
