import React, { useEffect, useState } from 'react';
import { TouchableHighlight, View } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import styled, { css } from 'styled-components';
import placesService from '../services/placesService';
import SaveButton from './SaveButton';
import { Scrim } from './Scrim';
import H1 from './Typography/H1';

interface IPlaceCardProps {
  image: string;
  name: string;
  id: string;
  onPress?: () => void;
  large?: boolean;
  full?: boolean;
}

const large = css`
  width: 280;
  height: 350;
`;

const normal = css`
  width: 280;
  height: 200;
`;

const full = css`
  width: 100%;
  height: 350;
`;

const Wrapper = styled(View)`
  position: relative;
  ${props => (props.large ? large : normal)}
  ${props => props.full && full}
`;

const CoverImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

const StyledTitle = styled(H1)`
  position: absolute;
  bottom: 32;
  left: 16;
  z-index: 100;
  padding-right: 32;
`;

const StyledSaveButton = styled(SaveButton)`
  position: absolute;
  z-index: 999;
  right: 16;
  top: 64;
`;

const PlaceCard: React.FunctionComponent<IPlaceCardProps> = ({
  image,
  onPress,
  name,
  large,
  full,
  id
}) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    placesService.getImage(image).then(i => {
      setImageUrl(i);
    });
  }, []);

  return (
    <TouchableHighlight onPress={onPress}>
      <Wrapper large={large} full={full}>
        <CoverImage uri={imageUrl} resizeMode="cover" />
        <StyledSaveButton placeId={id} />
        <Scrim opacity={0.2} />
        <StyledTitle bold numberOfLines={3}>
          {name}
        </StyledTitle>
      </Wrapper>
    </TouchableHighlight>
  );
};

export default PlaceCard;
