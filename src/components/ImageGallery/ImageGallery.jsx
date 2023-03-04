import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';

export class ImageGallery extends Component {
  render() {
    return (
      <ul className="ImageGallery">
        {this.props.images.map(image => (
          <li className="ImageGalleryItem" key={image.id}>
            <ImageGalleryItem image={image} />
          </li>
        ))}
      </ul>
    );
  }
}
