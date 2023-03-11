import { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'components/Modal/Modal';
import { ImageGalleryItemImage } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  static propTypes = {
    image: PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string,
    }).isRequired,
  };
  state = {
    isModalOpen: false,
  };

  openModal = () => this.setState({ isModalOpen: true });
  closeModal = () => this.setState({ isModalOpen: false });

  render() {
    const { isModalOpen } = this.state;
    const { image } = this.props;

    return (
      <div>
        {isModalOpen && (
          <Modal onClose={this.closeModal}>
            <img src={image.largeImageURL} alt="" />
          </Modal>
        )}

        <ImageGalleryItemImage
          src={image.webformatURL}
          alt={image.tags}
          onClick={this.openModal}
        />
      </div>
    );
  }
}
