import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import CloseIcon from '../../assets/close-x.svg';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const UserInfoCard = ({
  greeting = '',
  name,
  imageUrl,
  saldoValue,
  pointsValue,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const formatCurrency = value => {
    return `Rp ${Number(value).toLocaleString('id-ID')}`;
  };

  const formatPoints = value => {
    return `${Number(value).toLocaleString('id-ID')}`;
  };

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.greetingText}>{greeting}</Text>
      <Text style={styles.nameText}>{name || ''}</Text>

      <View style={styles.contentRow}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          disabled={!imageUrl}>
          <Image
            source={{uri: imageUrl}}
            style={styles.qrImage}
            resizeMode="contain"
            onError={e => console.log('Image load error:', e.nativeEvent.error)}
          />
        </TouchableOpacity>

        <View style={styles.titleColumn}>
          <Text style={styles.labelText}>Saldo</Text>
          <Text style={[styles.labelText, styles.labelMarginTop]}>Point</Text>
        </View>

        <View style={styles.valueColumn}>
          <Text style={styles.valueText}>
            {formatCurrency(saldoValue || 0)}
          </Text>
          <Text style={[styles.valuePoint, styles.labelMarginTop]}>
            {formatPoints(pointsValue || 0)}
          </Text>
        </View>
      </View>

      {imageUrl && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitleText}>
                Show the QR Code below to the cashier
              </Text>
              <Image
                source={{uri: imageUrl}}
                style={styles.modalImage}
                resizeMode="contain"
                onError={e =>
                  console.log('Modal Image load error:', e.nativeEvent.error)
                }
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                <CloseIcon
                  width={screenWidth * 0.06}
                  height={screenWidth * 0.06}
                  fill="#333"
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: screenWidth * 0.04,
    marginTop: 15,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  greetingText: {
    fontSize: screenWidth * 0.035,
    color: '#666',
  },
  nameText: {
    fontSize: screenWidth * 0.045,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
    marginBottom: 15,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qrImage: {
    width: screenWidth * 0.15,
    height: screenWidth * 0.15,
    borderRadius: (screenWidth * 0.15) / 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  titleColumn: {
    marginLeft: 15,
  },
  valueColumn: {
    flex: 1,
    marginLeft: 10,
    alignItems: 'flex-end',
  },
  labelText: {
    fontSize: screenWidth * 0.035,
    color: '#666',
  },
  valueText: {
    fontSize: screenWidth * 0.038,
    fontWeight: '600',
    color: '#333',
  },
  valuePoint: {
    fontSize: screenWidth * 0.038,
    fontWeight: '600',
    color: '#7feac4',
  },
  labelMarginTop: {
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalTitleText: {
    fontSize: screenWidth * 0.04,
    color: '#666',
    textAlign: 'center',
    marginBottom: 35,
  },
  modalImage: {
    width: screenWidth * 0.7,
    height: screenWidth * 0.7,
  },
  closeButton: {
    position: 'absolute',
    top: screenHeight * 0.05,
    right: screenWidth * 0.05,
    padding: 10,
    zIndex: 1,
  },
});

export default UserInfoCard;
