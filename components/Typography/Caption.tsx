import { Text } from 'react-native';
import styled, { css } from 'styled-components';
import colors from '../../styles/colors';

const bold = css`
  font-family: 'roboto-bold';
`;

const light = css`
  font-family: 'roboto-light';
`;

const Caption = styled<{ bold: boolean; light: boolean; color: string }, any>(
  Text
)`
  color: ${props => props.color || colors.darkGrey};
  font-size: 12;
  font-family: 'roboto-regular';
  ${props => props.bold && bold}
  ${props => props.light && light}
`;

export default Caption;
