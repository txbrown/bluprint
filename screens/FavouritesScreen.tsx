import * as React from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import LoadingSpinner from '../components/LoadingSpinner';
import PlaceCard from '../components/PlaceCard';
import StyledSafeView from '../components/StyledSafeView';
import MegaText from '../components/Typography/MegaText';
import placesService from '../services/placesService';
import { Favourite } from '../store/favourites/types';
import { AppState } from '../store/types';

export interface IFavouritesScreenProps {
  favourites: Favourite[];
}

export interface IFavouritesScreenState {}

class FavouritesScreen extends React.Component<
  IFavouritesScreenProps,
  IFavouritesScreenState
> {
  state = {
    loading: true,
    places: [],
    coverImages: []
  };

  async componentDidMount() {
    this.handleFetchFavourites();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.favourites !== this.props.favourites) {
      this.handleFetchFavourites();
    }
  }

  handleFetchFavourites = async () => {
    const { favourites } = this.props;
    await placesService
      .getAllPlacesByIds(favourites.map(f => f.place_id))
      .then(r => r.json())
      .then(data => {
        this.setState({
          places: data.items || []
        });
      })
      .catch(err => console.log(err))
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  public render() {
    const { places, loading } = this.state;

    if (loading) return <LoadingSpinner />;

    return (
      <StyledSafeView>
        <View
          style={{
            flex: 1,
            paddingRight: 16,
            paddingLeft: 16,
            paddingTop: 32
          }}
        >
          <MegaText style={{ marginBottom: 32 }}>Os Teus Favoritos</MegaText>

          <FlatList
            style={{ marginBottom: 32 }}
            ItemSeparatorComponent={() => <View style={{ marginBottom: 32 }} />}
            // horizontal
            showsVerticalScrollIndicator={false}
            keyExtractor={item => `${item.sys.id}`}
            data={places}
            renderItem={({ item, index }) => {
              return (
                <PlaceCard
                  id={item.sys.id}
                  full
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
        </View>
      </StyledSafeView>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isLoggedIn: state.auth.isLoggedIn,
  favourites: state.favourites.favourites
});

export default connect(mapStateToProps)(FavouritesScreen);
