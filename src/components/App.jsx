import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { PER_PAGE, requestImages } from 'services/api';
import { LoadMoreBtn } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import Loader from './Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isMore: false,
    isLoading: false,
    error: null,
  };

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  handleSetSearchQuery = searchTerm => {
    this.setState({ query: searchTerm, page: 1, images: [], isMore: false });
  };

  componentDidUpdate(_, prevState) {
    if (this.state.query === '') {
      Notify.failure('Please enter a search query.');
      return;
    }

    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      const fetchImages = async () => {
        try {
          this.setState({ isLoading: true });

          const images = await requestImages(this.state.query, this.state.page);

          if (images.totalHits === 0) {
            Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.'
            );
            return;
          }

          this.setState({
            isMore: images.totalHits - this.state.page * PER_PAGE > 0,
            images: [...this.state.images, ...images.hits],
          });
        } catch (error) {
          this.setState({ error: error.message });
        } finally {
          this.setState({ isLoading: false });
        }
      };

      fetchImages();
    }
  }

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSetSearchQuery} />

        {this.state.isLoading && <Loader />}
        {this.state.error !== null && (
          <p>Oops, some error occured... {this.state.error}</p>
        )}

        <ImageGallery images={this.state.images} />
        {this.state.isMore && (
          <LoadMoreBtn handleLoadMore={this.handleLoadMore} />
        )}
      </div>
    );
  }
}
