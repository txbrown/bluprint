import * as React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import LoadingSpinner from '../components/LoadingSpinner';
import PlaceCard from '../components/PlaceCard';
import StyledSafeView from '../components/StyledSafeView';
import MegaText from '../components/Typography/MegaText';
import Title from '../components/Typography/Title';
import placesService from '../services/placesService';

export interface IHomeScreenProps {}

export default class HomeScreen extends React.Component<IHomeScreenProps> {
  static navigationOptions = {
    tabBarLabel: 'Home!'
  };

  state = {
    loading: true,
    places: [],
    coverImages: []
  };

  async componentDidMount() {
    await placesService
      .getPlaces()
      .then(r => r.json())
      .then(data =>
        this.setState({
          places: data.items || []
        })
      )
      .catch(err => console.log(err))
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  public render() {
    const { places, loading } = this.state;

    if (loading) return <LoadingSpinner />;

    return (
      <StyledSafeView>
        <ScrollView
          style={{
            flex: 1,
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 32,
            paddingBottom: 128
          }}
        >
          <MegaText style={{ marginBottom: 32 }}>
            Edificios Em Destaque
          </MegaText>
          <FlatList
            style={{ marginBottom: 32 }}
            ItemSeparatorComponent={() => <View style={{ marginRight: 32 }} />}
            horizontal
            keyExtractor={item => `${item.sys.id}`}
            data={places}
            renderItem={({ item, index }) => {
              return (
                <PlaceCard
                  id={item.sys.id}
                  large
                  name={item.fields.name}
                  image={item.fields.coverImage.sys.id}
                  onPress={() =>
                    this.props.navigation.navigate('Place', {
                      imageId: item.fields.coverImage.sys.id,
                      description: item.fields.description
                    })
                  }
                />
              );
            }}
          />

          <Title style={{ marginBottom: 32 }}>Recentemente Adicionados</Title>

          <FlatList
            style={{ marginBottom: 32 }}
            ItemSeparatorComponent={() => <View style={{ marginRight: 32 }} />}
            horizontal
            keyExtractor={item => `${item.sys.id}`}
            data={places}
            renderItem={({ item, index }) => {
              return (
                <PlaceCard
                  id={item.sys.id}
                  name={item.fields.name}
                  image={item.fields.coverImage.sys.id}
                  onPress={() =>
                    this.props.navigation.navigate('Place', {
                      imageId: item.fields.coverImage.sys.id,
                      description: item.fields.description
                    })
                  }
                />
              );
            }}
          />
        </ScrollView>
      </StyledSafeView>
    );
  }
}
