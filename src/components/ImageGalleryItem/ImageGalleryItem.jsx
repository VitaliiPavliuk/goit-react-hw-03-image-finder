import { Component } from 'react';

export class ImageGalleryItem extends Component {
  render() {
    const { image } = this.props;
    return (
      <img
        className="ImageGalleryItem-image"
        src={image.webformatURL}
        alt={image.tags}
      />
    );
  }
}
