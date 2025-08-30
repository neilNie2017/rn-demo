import Ionicons from '@react-native-vector-icons/ionicons';
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';

interface SearchBarProps {
  placeholder?: string;
  options?: string[];
  onSearch?: (text: string) => void;
  onOptionSelect?: (option: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = '搜索',
  options = ['全部', '最新', '热门', '推荐'],
  onSearch,
  onOptionSelect,
}) => {
  const [searchText, setSearchText] = useState('');
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = (text: string) => {
    setSearchText(text);
    onSearch?.(text);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setShowDropdown(false);
    onOptionSelect?.(option);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <View style={styles.container}>
      {/* 左侧下拉菜单 */}
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
        <Text style={styles.selectedOptionText}>{selectedOption}</Text>
        <Ionicons
          name={showDropdown ? 'chevron-up' : 'chevron-down'}
          size={16}
          color="#666"
        />
      </TouchableOpacity>

      {/* 搜索输入框 */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={searchText}
          onChangeText={handleSearch}
          placeholderTextColor="#999"
          returnKeyType="search"
        />
        {searchText.length > 0 && (
          <TouchableOpacity
            onPress={() => handleSearch('')}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={18} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* 下拉菜单模态框 */}
      <Modal
        visible={showDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDropdown(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowDropdown(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.dropdownMenu}>
              <FlatList
                data={options}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.optionItem,
                      selectedOption === item && styles.selectedOptionItem,
                    ]}
                    onPress={() => handleOptionSelect(item)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        selectedOption === item && styles.selectedOptionText,
                      ]}
                    >
                      {item}
                    </Text>
                    {selectedOption === item && (
                      <Ionicons name="checkmark" size={16} color="#007AFF" />
                    )}
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRightWidth: 1,
    borderRightColor: '#eee',
    minWidth: 60,
  },
  selectedOptionText: {
    fontSize: 14,
    color: '#333',
    marginRight: 4,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    padding: 0,
  },
  clearButton: {
    padding: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    paddingTop: 60, // 根据实际布局调整
  },
  dropdownMenu: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 16,
    maxHeight: 200,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedOptionItem: {
    backgroundColor: '#f8f8f8',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default SearchBar;
