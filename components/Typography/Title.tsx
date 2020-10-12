import { Text } from 'react-native';
import styled, { css } from 'styled-components';

const bold = css`
  font-weight: bold;
`;

const light = css`
  font-family: light;
`;

const Title = styled<{ bold: boolean; light: boolean; color: string }, any>(
  Text
)`
  color: ${props => props.color || '#06060b'};
  font-size: 24;
  ${props => props.bold && bold}
  ${props => props.light && light}
`;

export default Title;
