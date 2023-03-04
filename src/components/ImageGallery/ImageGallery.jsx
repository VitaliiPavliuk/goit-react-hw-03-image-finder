import { Component } from 'react';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import {
  ImageGalleryItemStyled,
  ImageGalleryStyled,
} from './ImageGallery.styled';

export class ImageGallery extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired
    ).isRequired,
  };
  render() {
    const { images } = this.props;
    return (
      <ImageGalleryStyled>
        {images.map(image => (
          <ImageGalleryItemStyled key={image.id}>
            <ImageGalleryItem image={image} />
          </ImageGalleryItemStyled>
        ))}
      </ImageGalleryStyled>
    );
  }
}
