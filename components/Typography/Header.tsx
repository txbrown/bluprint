import * as React from 'react';
import { View } from 'react-native';
import styled from '../../theme';

export interface HeaderProps {}

const Wrapper = styled(View)`
  flex-direction: row;
  height: 36;
  justify-content: space-between;
`;

export default class Header extends React.PureComponent<HeaderProps, any> {
  public render() {
    return <Wrapper />;
  }
}
