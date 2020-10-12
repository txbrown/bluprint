import * as React from 'react';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import styled from 'styled-components';
import CloseButton from '../components/CloseButton';
import { Scrim } from '../components/Scrim';
import placesService from '../services/placesService';
import { padding } from '../utils/helpers';

export interface IPlaceScreenProps {}

export interface IPlaceScreenState {
  imageUrl: string;
}

const CoverImage = styled(Image)`
  width: 100%;
  height: 500;
`;

const Container = styled(ScrollView)`
  flex: 1;
  position: relative;
`;

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  right: 32;
  top: 32;
  z-index: 10;
`;

const Description = styled(Text)``;

const MainContent = styled(View)`
  ${padding(32)}
`;

export default class PlaceScreen extends React.Component<
  IPlaceScreenProps,
  IPlaceScreenState
> {
  constructor(props: IPlaceScreenProps) {
    super(props);

    this.state = {
      imageUrl: ''
    };
  }

  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    try {
      const imageId = this.props.navigation.getParam('imageId');
      const imageUrl = await placesService.getImage(imageId);
      this.setState({ imageUrl });
    } catch (error) {}
  }

  public render() {
    const { imageUrl } = this.state;
    const { navigation } = this.props;
    const description = navigation.getParam('description') || '';
    return (
      <Container>
        <StatusBar hidden />
        <StyledCloseButton onPress={() => navigation.goBack()} />
        <View style={{ position: 'relative' }}>
          <CoverImage uri={imageUrl} />
          <Scrim opacity={0.2} />
        </View>
        <MainContent>
          <Description>{description}</Description>
        </MainContent>
      </Container>
    );
  }
}
