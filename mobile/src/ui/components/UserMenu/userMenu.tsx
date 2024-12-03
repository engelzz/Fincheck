import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useAuth } from '../../../hooks/useAuth';
import { Avatar } from '../../Dashboard/styles';
import { Text } from '../Text';

const data = [
  { label: 'Sair', value: '1' },
];

export function UserMenu() {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const { signout, user } = useAuth();

  const navigation = useNavigation();

  return (
    <View>
      <Dropdown
        style={{ height: 50, width: 64}}
        containerStyle={{borderRadius: 16}}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={() => navigation.navigate('Register')}
        renderRightIcon={() => (
          <Avatar style={{backgroundColor: 'transparent', borderWidth: 0}} />
        )}
        renderLeftIcon={() => (
          <Avatar>
            <Text>{user?.name} ME</Text>
          </Avatar>
        )}
      />
    </View>
  );
};