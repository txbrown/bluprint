import * as React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styled from 'styled-components';

interface ILoadingSpinnerProps {}

const Wrapper = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const LoadingSpinner: React.FunctionComponent<ILoadingSpinnerProps> = props => {
  return (
    <Wrapper>
      <ActivityIndicator />
    </Wrapper>
  );
};

export default LoadingSpinner;
