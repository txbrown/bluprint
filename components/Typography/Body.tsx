import { Text } from 'react-native';
import styled, { css } from 'styled-components';
import colors from '../../utils/colors';

const bold = css`
  font-weight: bold;
`;

const light = css`
  font-weight: 300;
`;

const Body = styled<{ bold: boolean; light: boolean } & any>(Text)`
  color: ${colors.black};
  font-size: 16;
  ${props => props.bold && bold}
  ${props => props.light && light}
`;

export default Body;
