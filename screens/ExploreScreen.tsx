import * as React from 'react';
import { Text } from 'react-native';
import StyledSafeView from '../components/StyledSafeView';

export interface IExploreScreenProps {}

export interface IExploreScreenState {}

export default class ExploreScreen extends React.Component<
  IExploreScreenProps,
  IExploreScreenState
> {
  constructor(props: IExploreScreenProps) {
    super(props);

    this.state = {};
  }

  public render() {
    return (
      <StyledSafeView>
        <Text>Explore screen</Text>
      </StyledSafeView>
    );
  }
}
