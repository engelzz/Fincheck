import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Modal, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { ExpensesIcon } from '../../../../components/Icons/ExpensesIcon';
import { Avatar } from '../../../styles';
import { FabItem } from './FabItem';

const data = [
  { label: 'Nova Despesa', value: <ExpensesIcon /> },
  { label: 'Nova Receita', value: '1' },
  { label: 'Nova Conta', value: '1' },
];

export function Fab() {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const navigation = useNavigation();

  return (
    <View>
      <Dropdown
        containerStyle={{borderRadius: 16, width: '100%'}}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        value={value}
        placeholder=''
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={() => (
          <Modal />
        )}
        renderRightIcon={() => (
          <FabItem />
        )}
        renderLeftIcon={() => (
          <Avatar style={{backgroundColor: 'transparent', borderWidth: 0}} />
        )}
      />
    </View>
  );
};