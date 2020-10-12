import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import * as AuthSession from "expo-auth-session";
import Constants from "expo-constants";
import * as StoreReview from "expo-store-review";
import jwtDecode from "jwt-decode";
import * as React from "react";
import {
  Alert,
  AsyncStorage,
  Button,
  FlatList,
  ScrollView,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import styled from "styled-components";
import StyledSafeView from "../components/StyledSafeView";
import Body from "../components/Typography/Body";
import MegaText from "../components/Typography/MegaText";
import { loginSuccess, logout } from "../store/auth/actions";
import { AppState } from "../store/types";
import colors from "../utils/colors";
import { TOKEN_KEY } from "../utils/config";
import { hitSlopRow } from "../utils/helpers";

const auth0ClientId = Constants.manifest.extra.AUTH0_CLIENT_ID;
const auth0Domain = Constants.manifest.extra.AUTH0_DOMAIN;

/**
 * Converts an object to a query string.
 */
function toQueryString(params) {
  return (
    "?" +
    Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join("&")
  );
}

const NamesSection = styled(View)`
  margin-bottom: 56;
  flex: 1;
`;

const ContentContainer = styled(ScrollView)`
  padding-left: 16;
  padding-right: 16;
  flex: 1;
  margin-bottom: 32;
`;

const Separator = styled(View)`
  border-width: 0.5;
  border-color: ${colors.darkGrey};
  margin-bottom: 16;
`;

const Row = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  background-color: #fff;
`;

const StyledIcon = styled(MaterialIcons)``;

const MenuOption = ({ onPress, title, iconName, renderIcon }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ paddingBottom: 8 }}
      hitSlop={hitSlopRow}
    >
      <Row>
        <Body>{title}</Body>
        {renderIcon ? renderIcon() : <StyledIcon size={24} name={iconName} />}
      </Row>
    </TouchableOpacity>
  );
};

export interface IProfileScreenProps {
  isLoggedIn: boolean;
}

export interface IProfileScreenState {}

class ProfileScreen extends React.Component<
  IProfileScreenProps,
  IProfileScreenState
> {
  constructor(props: IProfileScreenProps) {
    super(props);

    this.state = { name: "" };
  }

  async componentDidMount() {
    const { isLoggedIn } = this.props;

    if (isLoggedIn) {
      const authString = await AsyncStorage.getItem(TOKEN_KEY);
      const auth = JSON.parse(authString);

      this.setState({ name: auth.name });
    }
  }

  login = async () => {
    // Retrieve the redirect URL, add this to the callback URL list
    // of your Auth0 application.
    const redirectUrl = AuthSession.getRedirectUrl();
    console.log(`Redirect URL: ${redirectUrl}`);

    // Structure the auth parameters and URL
    const queryParams = toQueryString({
      client_id: auth0ClientId,
      redirect_uri: redirectUrl,
      response_type: "id_token", // id_token will return a JWT token
      scope: "openid profile", // retrieve the user's profile
      nonce: "nonce", // ideally, this will be a random value
    });
    const authUrl = `${auth0Domain}/authorize` + queryParams;
    console.log(authUrl);

    // Perform the authentication
    const response = await AuthSession.startAsync({ authUrl });
    console.log("Authentication response", response);

    if (response.type === "success") {
      this.handleResponse(response.params);
    }
  };

  handleResponse = async (response) => {
    if (response.error) {
      Alert(
        "Authentication error",
        response.error_description || "something went wrong"
      );
      return;
    }

    // Retrieve the JWT token and decode it
    const jwtToken = response.id_token;
    const decoded = jwtDecode(jwtToken);
    console.log(decoded);
    await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(decoded));
    this.props.dispatch(loginSuccess());
    const { name } = decoded;
    this.setState({ name });
  };

  getMenuOptions = () => {
    const { navigation } = this.props;
    const menuOptions = [
      {
        title: "Detalhes de conta",
        iconName: "person-outline",
        action: () => navigation.navigate("AccountDetails"),
      },
      {
        title: "Notificacoes",
        iconName: "notifications-none",
        action: () => navigation.navigate("Notifications"),
      },
      {
        title: "Partilha a app",
        renderIcon: () => <Feather name="share" size={24} />,
        action: this.handleShareApp,
      },
      {
        title: "Avalia a app",
        iconName: "star",
        action: () => StoreReview.requestReview(),
      },
      {
        title: "Segue-nos",
        iconName: "radio",
        action: () => this.props.navigation.navigate("Notifications"),
      },
      {
        title: "Termos e condicoes",
        renderIcon: () => (
          <MaterialCommunityIcons size={24} name="file-document-box" />
        ),
        action: () => this.props.navigation.navigate("Terms"),
      },
      {
        title: "Sair",
        renderIcon: () => <MaterialCommunityIcons size={24} name="logout" />,
        action: () => this.props.dispatch(logout()),
      },
    ];

    return menuOptions;
  };

  handleShareApp = async () => {
    const appName = Constants.manifest.name;

    try {
      const result = await Share.share({
        title: appName,
        message: `Hey. I love ${appName} and I think you will too!\nDownload now so we can plan things to do together.\n\n${StoreReview.storeUrl()}`,
        url: StoreReview.storeUrl(),
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }

    this.setState({ isSharing: false });
  };

  public render() {
    const { name } = this.state;
    const { isLoggedIn } = this.props;

    const menuOptions = this.getMenuOptions();

    if (!isLoggedIn) {
      return (
        <StyledSafeView>
          <View style={styles.container}>
            <Button title="Log in" onPress={this.login} />
          </View>
        </StyledSafeView>
      );
    }

    return (
      <StyledSafeView>
        <ContentContainer>
          <NamesSection>
            <MegaText color={colors.yellow}>{name}</MegaText>
          </NamesSection>

          <View style={{ flex: 2 }}>
            <FlatList
              keyExtractor={(item) => item.title}
              data={menuOptions}
              ItemSeparatorComponent={() => <Separator />}
              renderItem={({ item }) => {
                return (
                  <MenuOption
                    title={item.title}
                    iconName={item.iconName}
                    renderIcon={item.renderIcon}
                    onPress={item.action}
                  />
                );
              }}
            />
          </View>
        </ContentContainer>
      </StyledSafeView>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 40,
  },
});
