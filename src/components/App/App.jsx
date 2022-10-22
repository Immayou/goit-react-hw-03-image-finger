import React, { Component } from "react"
import axios from "axios";
import Notiflix from "notiflix";
import {Searchbar} from '../Searchbar/Searchbar'
import {ImageGallery} from "../ImageGallery/ImageGallery";
import {ImageGalleryItem} from '../ImageGalleryItem/ImageGalleryItem'
import {Modal} from '../Modal/Modal'
import {Button} from '../Button/Button'
import { Wrapper } from "../App/App.styled";
import { SpinnerLoader } from "../Loader/Loader";

axios.defaults.baseURL = 'https://pixabay.com/api/';
export class App extends Component {

  state = {
   searchValue: '',
   apiDataPictures: [],
   isLoading: false,
   largeImageSrc: '',
   totalAmount: null,
   page: 1,
  }

  makeRequest = async (value) => {
    try {
      this.setState({ isLoading: true})
      if (this.state.page === 1) {
        this.setState({ apiDataPictures: [] })
      }
      const response = await axios.get(`?q=${value}&page=${this.state.page}&key=${process.env.REACT_APP_API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
      this.setState({ isLoading: false, totalAmount: response.data.total })
      return response.data.hits
    } catch (error) {
      this.setState({ isLoading: false})
      this.showErrorMessage()
    }
  }

  onRequestHandler = async (value = this.state.searchValue) => {
    try {
      const dataResult = await this.makeRequest(value)

      if (dataResult.length === 0) {
        this.setState({ isLoading: false})
        this.showMessageIfEmptyQuery()
        return
      }

      if (this.state.page > 1) {
        this.setState(prevState => ({apiDataPictures:[...prevState.apiDataPictures, ...dataResult], page: prevState.page + 1}))
      }

      if (this.state.page === 1) {
        this.setState(prevState => ({apiDataPictures: dataResult, page: prevState.page + 1}))
      }

      // if (this.state.apiDataPictures.length === this.state.totalAmount) {
      //   this.setState({ isLoading: false})
      //   this.showMessageIfListIsEnd()
      //   return
      // }

    } catch (error) {
      this.setState({ isLoading: false})
      this.showErrorMessage()
    }
  }

  onLoadMoreHandler = () => {
      this.onRequestHandler()
  }

  onFormSubmitHandler = value => {
    this.setState({searchValue: value, page: 1})
    this.onRequestHandler(value)
  }

  onImageHandler = largeImageUrl => {
    this.setState({largeImageSrc: largeImageUrl})
  }

  onModalCloseHandler = () => {
    this.setState({largeImageSrc: ''})
  }

  showErrorMessage () {
    Notiflix.Notify.failure(
      `Sorry, something went wrong. Please try again.`)
  }

  showMessageIfEmptyQuery () {
    Notiflix.Notify.failure(
      `Sorry, there are no images matching ${this.state.searchValue}. Please try again.`)
  }

  showMessageIfListIsEnd () {
    Notiflix.Notify.info(
      `Wow! You watched all of the pictures. Please, try new query!`)
  }

  render () {
  return (
    <Wrapper>
    <Searchbar onSubmit={this.onFormSubmitHandler} isSubmitting={this.state.isLoading}/>
    {this.state.isLoading && <SpinnerLoader/>}
    {this.state.apiDataPictures.length > 0 && (
    <ImageGallery>
    <ImageGalleryItem getPictures={this.state.apiDataPictures} onImageClick={this.onImageHandler}/>
    </ImageGallery>)}
    {this.state.apiDataPictures.length > 0 && <Button loadMore={this.onLoadMoreHandler}/>}
    {this.state.largeImageSrc.length > 0 &&
      <Modal onModalClose={this.onModalCloseHandler}>
      <img src={this.state.largeImageSrc} alt="large_image" />
      </Modal>}
    </Wrapper>
  );
};
}

