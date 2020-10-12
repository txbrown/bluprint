import { Text } from 'react-native';
import styled from 'styled-components';

const IconLabel = styled(Text)`
  color: ${props => (props.color ? props.color : '#fff')};
  font-size: 12;
  font-family: 'roboto-light';
`;

export default IconLabel;
