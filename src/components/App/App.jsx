import React, { Component } from "react"
import axios from "axios";
import Notiflix from "notiflix";
import Searchbar from '../Searchbar/Searchbar'
import {ImageGallery} from "../ImageGallery/ImageGallery";
import {ImageGalleryItem} from '../ImageGalleryItem/ImageGalleryItem'
import {Modal} from '../Modal/Modal'
import { Wrapper } from "../App/App.styled";
import { Loader } from "../Loader/Loader.styled";

axios.defaults.baseURL = 'https://pixabay.com/api/';
export class App extends Component {

  state = {
   searchValue: '',
   apiDataPictures: [],
   isLoading: false,
   largeImageSrc: ''
  }

  async componentDidUpdate (prevProps, prevState) {
    try {
    if (prevState.searchValue !== this.state.searchValue) {
    this.setState({isLoading: true, apiDataPictures: []})
    const response = await axios.get(`?q=${this.state.searchValue}&page=1&key=${process.env.REACT_APP_API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
    if (response.data.hits.length > 0){
    this.setState ({apiDataPictures: response.data.hits, isLoading: false})}
    else  {
      throw new Error()
    }
  }
    } catch (error) {
      this.setState({ isLoading: false})
      this.showErrorMessage()
    }
  }

  onFormSubmitHandler = value => {
    this.setState({searchValue: value})
  }

  onImageHandler = largeImageUrl => {
    this.setState({largeImageSrc: largeImageUrl})
  }

  onModalCloseHandler = () => {
    this.setState({largeImageSrc: ''})
  }

  showErrorMessage () {
    Notiflix.Notify.failure(
      `Sorry, there are no images matching ${this.state.searchValue}. Please try again.`)
  }

  render () {
  return (
    <Wrapper>
    <Searchbar onSubmit={this.onFormSubmitHandler} isSubmitting={this.state.isLoading}/>
    {this.state.isLoading && <Loader strokeColor="grey" strokeWidth="5" animationDuration="0.75" width="96" visible={true}/>}
    {this.state.apiDataPictures && (
    <ImageGallery>
    <ImageGalleryItem getPictures={this.state.apiDataPictures} onImageClick={this.onImageHandler}/>
    </ImageGallery>)}
    {this.state.largeImageSrc.length > 0 &&
      <Modal onModalClose={this.onModalCloseHandler}>
      <img src={this.state.largeImageSrc} alt="large_image" />
      </Modal>}
    </Wrapper>
  );
};
}


// const Loader = styled(RotatingLines)`
//   display: block;
//   margin: 0 auto;
// `