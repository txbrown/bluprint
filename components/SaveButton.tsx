import { Ionicons } from '@expo/vector-icons';
import { find } from 'lodash';
import * as React from 'react';
import { WithApolloClient } from 'react-apollo';
import { TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import placesService from '../services/placesService';
import { getFavourites } from '../store/favourites/actions';
import { AppState } from '../store/types';
import { getUserInfo } from '../utils/helpers';

export interface Props {
  selected: boolean;
  isLoggedIn: boolean;
  placeId: string;
  favourites: object;
}

export interface State {
  selected: boolean;
}

class SaveButton extends React.PureComponent<WithApolloClient<Props>, State> {
  constructor(props: Props) {
    super(props);
    const { favourites, placeId } = this.props;

    const foundFavourite = find(favourites, { place_id: placeId });

    this.state = {
      selected: !!foundFavourite
    };
  }

  static defaultProps: Props = {
    selected: false,
    isLoggedIn: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.favourites !== this.props.favourites) {
      const { favourites, placeId } = this.props;

      const foundFavourite = find(favourites, { place_id: placeId });

      this.setState({ selected: !!foundFavourite });
    }
  }

  handlePress = async () => {
    if (!this.props.isLoggedIn) {
      this.props.navigation.navigate('Profile');
      return;
    }

    const { placeId, favourites, dispatch } = this.props;
    const userInfo = await getUserInfo();

    const { selected } = this.state;

    if (selected) {
      const favourite = find(favourites, { place_id: placeId });
      if (favourite) {
        await placesService.removeFavourite(favourite.id);
      }
    } else {
      await placesService.setFavourite(placeId, userInfo.aud);
    }

    dispatch(getFavourites(userInfo.aud));

    this.setState(state => {
      return { selected: !state.selected };
    });
  };

  render() {
    const { selected } = this.state;

    return (
      <TouchableOpacity
        hitSlop={{ top: 16, bottom: 16, right: 16, left: 16 }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 'auto',
          position: 'absolute',
          top: 32,
          right: 16,
          zIndex: 200
        }}
        onPress={this.handlePress}
      >
        <Ionicons
          name={selected ? 'ios-heart' : 'ios-heart-empty'}
          size={28}
          style={{
            marginBottom: -3,
            color: '#fff'
          }}
        />
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isLoggedIn: state.auth.isLoggedIn,
  favourites: state.favourites.favourites
});

export default connect(mapStateToProps)(withNavigation(SaveButton));
