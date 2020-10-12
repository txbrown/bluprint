import { MaterialIcons } from '@expo/vector-icons';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
interface IAppProps {
  onPress: () => void;
}

const CloseButton: React.FunctionComponent<IAppProps> = ({
  onPress,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ width: 24 }}
      hitSlop={{ top: 16, bottom: 32, right: 16, left: 16 }}
      {...props}
    >
      <MaterialIcons name="close" size={28} style={{ color: 'white' }} />
    </TouchableOpacity>
  );
};

export default CloseButton;
