import { Text } from 'react-native';
import styled, { css } from 'styled-components';

const bold = css`
  font-weight: bold;
`;

const light = css`
  font-weight: lighter;
`;

const H1 = styled<{ light: boolean } & any>(Text)`
  color: #fff;
  font-size: 30;

  ${bold}
  ${props => props.light && light}
`;

export default H1;
