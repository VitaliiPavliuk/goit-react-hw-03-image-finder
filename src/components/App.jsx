import { Component } from 'react';
import { requestImages } from 'services/api';
import { LoadMoreBtn } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    query: 'dog',
    page: 1,
    images: [],
  };

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  handleSetSearchQuery = searchTerm => {
    this.setState({ query: searchTerm });
  };

  componentDidMount() {
    const fetchImages = async () => {
      try {
        // this.setState({ isLoading: true });
        const images = await requestImages(this.state.query, this.state.page);
        // console.log(images.hits);

        this.setState({ images: images.hits });

        console.log(this.state.images);
      } catch (error) {
        // this.setState({ error: error.message });
        console.log(error);
      } finally {
        // this.setState({ isLoading: false });
        console.log('finally');
      }
    };

    fetchImages();
  }

  componentDidUpdate(_, prevState) {
    // if (
    //   prevState.selectedPostId !== this.state.selectedPostId &&
    //   this.state.selectedPostId !== null
    // ) {
    //   const fetchPostComments = async postId => {
    //     try {
    //       this.setState({ isLoading: true });
    //       const comments = await requestPostComments(postId);

    //       this.setState({ comments });
    //     } catch (error) {
    //       this.setState({ error: error.message });
    //     } finally {
    //       this.setState({ isLoading: false });
    //     }
    //   };

    //   fetchPostComments(this.state.selectedPostId);
    // }

    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      // Ваш запит на сервер за додатковими картинками
      const fetchImages = async () => {
        try {
          // this.setState({ isLoading: true });
          const images = await requestImages(this.state.query, this.state.page);
          // console.log(images.hits);

          this.setState(prev => ({ images: [...prev.images, ...images.hits] }));

          console.log(this.state.images);
        } catch (error) {
          // this.setState({ error: error.message });
          console.log(error);
        } finally {
          // this.setState({ isLoading: false });
          console.log('finally');
        }
      };

      fetchImages();
    }
  }

  render() {
    return (
      <div className="App">
        <Searchbar />
        <ImageGallery images={this.state.images} />
        <LoadMoreBtn handleLoadMore={this.handleLoadMore} />
      </div>
    );
  }
}
