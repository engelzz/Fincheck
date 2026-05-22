import { Fragment, useState } from 'react';
import { Animated } from 'react-native';
import { ChevronDownIcon } from '../Icons/ChevronDownIcon';
import { Text } from '../Text';
import {
  Container,
  DropdownList,
  ErrorText,
  OptionItem,
  SelectButton,
  SelectText,
  Separator,
} from './styles';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange(value: string): void;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
}

export function Select({ value, onChange, options, placeholder, error }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((o) => o.value === value);

  function handleSelect(option: SelectOption) {
    onChange(option.value);
    setIsOpen(false);
  }

  return (
    <Container style={{ zIndex: isOpen ? 9999 : 1 }}>
      <SelectButton
        onPress={() => setIsOpen((prev) => !prev)}
        hasError={!!error}
        isOpen={isOpen}
        activeOpacity={0.8}
      >
        <SelectText hasValue={!!selectedOption}>
          {selectedOption?.label ?? placeholder ?? 'Selecione'}
        </SelectText>
        <Animated.View
          style={{
            transform: [{ rotate: isOpen ? '180deg' : '0deg' }],
          }}
        >
          <ChevronDownIcon />
        </Animated.View>
      </SelectButton>

      {isOpen && (
        <DropdownList hasError={!!error}>
          {options.map((item, index) => (
            <Fragment key={item.value}>
              {index > 0 && <Separator />}
              <OptionItem
                onPress={() => handleSelect(item)}
                isSelected={value === item.value}
                activeOpacity={0.7}
              >
                <Text
                  size={16}
                  color={value === item.value ? '#087f5b' : '#495057'}
                  weight={value === item.value ? '600' : undefined}
                >
                  {item.label}
                </Text>
                {value === item.value && (
                  <Text size={14} color="#087f5b" weight="600">
                    ✓
                  </Text>
                )}
              </OptionItem>
            </Fragment>
          ))}
        </DropdownList>
      )}

      {error && !isOpen && <ErrorText>{error}</ErrorText>}
    </Container>
  );
}
