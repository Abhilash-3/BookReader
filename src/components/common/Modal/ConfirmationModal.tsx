import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  heading: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  onClose,
  onConfirm,
  title,
  heading
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.heading}>{heading}</Text>
              <Text style={styles.title}>{title}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={[styles.button, styles.noButton]} 
                  onPress={onClose}
                >
                  <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.button, styles.yesButton]} 
                  onPress={onConfirm}
                >
                  <Text style={[styles.buttonText, styles.yesButtonText]}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  heading:{
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  noButton: {
    backgroundColor: '#f0f0f0',
  },
  yesButton: {
    backgroundColor: '#000',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
  },
  yesButtonText: {
    color: '#fff',
  },
});

export default ConfirmationModal;
