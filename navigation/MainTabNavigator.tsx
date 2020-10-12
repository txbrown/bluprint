import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
import ExploreScreen from '../screens/ExploreScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import HomeScreen from '../screens/HomeScreen';
import PlaceScreen from '../screens/PlaceScreen';
import ProfileScreen from '../screens/ProfileScreen';
import colors from '../utils/colors';

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        title: `Bluprint`
      })
    },
    Place: {
      screen: PlaceScreen,
      navigationOptions: ({ navigation }) => ({
        headerMode: 'none'
      })
    }
  },
  {
    navigationOptions: {
      tabBarLabel: 'Home'
    },
    initialRouteName: 'Home',
    headerBackTitleVisible: false,
    mode: 'modal'
  }
);

const ExploreStack = createStackNavigator(
  {
    Explore: ExploreScreen
  },
  {
    navigationOptions: {
      tabBarLabel: 'Explora'
    },
    initialRouteName: 'Explore',
    headerBackTitleVisible: false,
    headerMode: 'none',
    mode: 'modal'
  }
);

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen
  },
  {
    navigationOptions: {
      tabBarLabel: 'Perfil'
    },
    initialRouteName: 'Profile',
    headerBackTitleVisible: false,
    headerMode: 'none',
    mode: 'modal'
  }
);

const FavouritesStack = createStackNavigator(
  {
    Favourites: FavouritesScreen
  },
  {
    navigationOptions: {
      tabBarLabel: 'Favoritos'
    },
    initialRouteName: 'Favourites',
    headerBackTitleVisible: false,
    headerMode: 'none',
    mode: 'modal'
  }
);

export default createBottomTabNavigator(
  {
    Home: HomeStack,
    Explore: ExploreStack,
    Favourites: FavouritesStack,
    Profile: ProfileStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName = '';
        switch (routeName) {
          case 'Home':
            iconName = 'ios-home';
            break;
          case 'Explore':
            iconName = 'ios-albums';
            break;
          case 'Profile':
            iconName = 'ios-person';
            break;
          case 'Favourites':
            iconName = 'ios-heart';
            break;
          default:
            break;
        }

        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    }),
    initialRouteName: 'Home',
    animationEnabled: true,
    tabBarOptions: {
      style: { backgroundColor: colors.lightgrey }
    }
  }
);
