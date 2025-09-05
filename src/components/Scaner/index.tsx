import Ionicons from '@react-native-vector-icons/ionicons';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import { Alert, Dimensions, Modal, StyleSheet, View } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

interface ScanerProps<T = string> {
  onSance: (value: T) => void;
  onRef: React.RefObject<any>;
}

export default function Scaner({ onSance, onRef }: ScanerProps) {
  const [open, setOpen] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  console.log('获取权限', device, hasPermission, requestPermission);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log('扫码出来的内容==>', codes);
      setOpen(false);
      onSance(codes.map(item => item.value).join(','));
    },
  });

  console.log('windowWidth', windowWidth, windowHeight);

  useImperativeHandle(
    onRef,
    () => {
      return {
        setOpen: bool => {
          setOpen(bool);
        },
      };
    },
    [],
  );

  if (!hasPermission) {
    requestPermission();
    Alert.alert('未获取到权限');
    return;
  }
  return (
    <View style={styles.container}>
      <Modal
        visible={open}
        style={styles.mask}
        transparent={false}
        animationType="fade"
      >
        <View style={styles.header}>
          <Ionicons
            name="close"
            color={'#fff'}
            size={24}
            onPress={() => {
              setOpen(false);
            }}
          />
        </View>
        <View style={styles.maskContent}>
          {device && hasPermission && (
            <Camera
              device={device}
              isActive
              style={{ ...styles.absoluteFill, width: windowHeight }}
              codeScanner={codeScanner}
            />
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute', // 让容器使用绝对定位
    top: 0,
    left: 0,
    right: 0,
    bottom: 0, // 定位到屏幕的四个角
  },
  mask: {
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  header: {
    display: 'flex',
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  maskContent: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  absoluteFill: {
    width: 300,
    height: 375,
    // borderStyle: 'dotted',
    // borderWidth: 3,
    // borderColor: '#fff',
    // zIndex: 1000,
  },
});
