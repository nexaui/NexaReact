import React from 'react';
import { Modal, TouchableOpacity, View, Text, StyleSheet, Dimensions } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/Ionicons';

const windowHeight = Dimensions.get('window').height;

const ImageViewerModal = ({ visible, images, initialIndex, onClose }) => {
  const renderHeader = () => (
    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
      <Icon name="close" size={30} color="#fff" />
    </TouchableOpacity>
  );

  const renderFooter = (currentIndex) => (
    <View style={styles.footer}>
      <Text style={styles.footerTitle}>{images[currentIndex].props.title}</Text>
      <Text style={styles.footerDescription}>{images[currentIndex].props.description}</Text>
    </View>
  );

  return (
    <Modal visible={visible} transparent={true}>
      <ImageViewer
        imageUrls={images}
        index={initialIndex}
        onCancel={onClose}
        enableSwipeDown={true}
        onSwipeDown={onClose}
        renderFooter={renderFooter}
        footerContainerStyle={styles.footerContainer}
        renderHeader={renderHeader}
        enablePreload={true}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1000,
  },
  footerContainer: {
    bottom: 0,
    width: '100%',
    height: windowHeight * 0.15,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  footer: {
    width: '100%',
  },
  footerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  footerDescription: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ImageViewerModal;
