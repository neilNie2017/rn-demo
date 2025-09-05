import Ionicons from '@react-native-vector-icons/ionicons';
import { SearchBar } from '@rneui/themed';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Scaner from '../Scaner';

interface SearchScanBarProps<T = string> {
  value: T;
  onChange: (value: T) => void;
}

export default function SearchScanBar({
  value,
  onChange,
}: Partial<SearchScanBarProps>) {
  const [inputValue, setInputValue] = useState('');
  const scanRef = useRef<any>(null);

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);
  return (
    <View style={styles.container}>
      <SearchBar
        round
        placeholder="搜索关键字"
        searchIcon={<Ionicons name="search" size={24} />}
        containerStyle={{
          backgroundColor: 'none',
        }}
        inputContainerStyle={{}}
        lightTheme={true}
        value={inputValue}
        onChangeText={text => {
          setInputValue(text);
          onChange?.(text || '');
        }}
        onChange={e => {
          // onChange(e.target.value);
          console.log(e);
        }}
      />
      <Ionicons
        name="scan-outline"
        size={24}
        style={styles.ext}
        onPress={() => {
          scanRef.current?.setOpen(true);
        }}
      />
      <Scaner
        onRef={scanRef}
        onSance={value => {
          setInputValue(value);
          onChange?.(value);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    position: 'relative',
  },
  ext: {
    position: 'absolute',
    right: 20,
    top: '30%',
  },
});
