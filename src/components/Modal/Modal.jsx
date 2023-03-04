import { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    border: 'none',
    borderRadius: '0',
  },
  overlay: {
    backgroundColor: '#000000bf',
  },
};

Modal.setAppElement('#root');

export class ModalImage extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    image: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };
  render() {
    const { isOpen, image, onClose } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <img src={image} alt="" />
      </Modal>
    );
  }
}
