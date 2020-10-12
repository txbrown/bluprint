import * as Icon from '@expo/vector-icons';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import React from 'react';
import {
  AsyncStorage,
  Platform,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import initStore from './store';
import { loginSuccess, logout } from './store/auth/actions';
import { getFavourites } from './store/favourites/actions';
import { theme, ThemeProvider } from './theme';
import { TOKEN_KEY } from './utils/config';
import './utils/firebase';

export const store = initStore();

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  // async componentDidMount() {

  // }

  _loadResourcesAsync = async () => {
    const authString = await AsyncStorage.getItem(TOKEN_KEY);
    if (!authString) return;

    const auth = JSON.parse(authString);
    if (auth.exp < Date.now() / 1000) {
      store.dispatch(logout());
    } else {
      store.dispatch(loginSuccess());
      store.dispatch(getFavourites(auth.aud));
    }

    return Promise.all([
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        ...Icon.MaterialCommunityIcons.font
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        // 'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
        // 'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
        // 'roboto-light': require('./assets/fonts/Roboto-Light.ttf'),
        // 'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf')
      })
    ]);
  };

  _handleLoadingError = (error: any) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ loading: false });
  };

  render() {
    if (this.state.loading) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }

    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <View style={{ flex: 1 }}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}

            <AppNavigator />
          </View>
        </ThemeProvider>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
