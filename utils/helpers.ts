import { AsyncStorage } from 'react-native';
import { css } from 'styled-components';
import { TOKEN_KEY } from './config';

export const padding = (amount: number) => css`
  padding-top: ${amount};
  padding-bottom: ${amount};
  padding-left: ${amount};
  padding-right: ${amount};
`;

export const hitSlopRow = {
  top: 12,
  bottom: 12,
  left: 12,
  right: 12
};

export const getUserInfo = async () => {
  const authString = await AsyncStorage.getItem(TOKEN_KEY);

  if (!authString) return undefined;

  const auth = JSON.parse(authString);

  return auth;
};
