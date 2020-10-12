import Constants from 'expo-constants';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components';

const StyledSafeView = styled(SafeAreaView)`
  background-color: #fff;
  flex: 1;
  padding-top: ${Constants.statusBarHeight};
`;

export default StyledSafeView;
