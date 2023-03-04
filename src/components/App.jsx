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
    this.setState({ query: searchTerm });
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      const fetchImages = async () => {
        try {
          this.setState({ isLoading: true });

          const images = await requestImages(this.state.query, this.state.page);

          if (images.hits.length === 0) {
            Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.'
            );
            return;
          }

          if (images.totalHits - this.state.page * PER_PAGE > 0) {
            this.setState({ isMore: true });
          } else {
            this.setState({ isMore: false });
            Notify.info(
              `We're sorry, but you've reached the end of search results.`
            );
          }

          if (prevState.query !== this.state.query) {
            this.setState({
              images: images.hits,
            });
          }

          if (prevState.page !== this.state.page) {
            this.setState(prev => ({
              images: [...prev.images, ...images.hits],
            }));
          }
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
