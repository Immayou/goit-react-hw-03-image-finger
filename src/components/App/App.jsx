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

  makeRequest = async (value, page) => {
    try {
      this.setState({ isLoading: true})
      const response = await axios.get(`?q=${value}&page=${page}&key=${process.env.REACT_APP_API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
      this.setState({ isLoading: false, totalAmount: response.data.totalHits })
      return await response.data.hits
    } catch (error) {
      this.setState({ isLoading: false})
      this.showErrorMessage()
    }
  }

  onRequestHandler = async (value = this.state.searchValue, page= this.state.page) => {
    try {
      const dataResult = await this.makeRequest(value, page)

      if (dataResult.length === 0) {
        this.setState({ isLoading: false})
        this.showMessageIfEmptyQuery()
        return
      }

      if (this.state.page > 1) {
        this.setState(prevState => ({apiDataPictures:[...prevState.apiDataPictures, ...dataResult]}))
      }

      if (this.state.page === 1) {
        this.setState(prevState => ({apiDataPictures: dataResult, page: prevState.page + 1}))
      }
      

      console.log(this.state.apiDataPictures.length)
      console.log(this.state.totalAmount)
      if (this.state.apiDataPictures.length === this.state.totalAmount) {
        this.setState({ isLoading: false})
        this.showMessageIfListIsEnd()
        return
      }

    } catch (error) {
      this.setState({ isLoading: false})
      this.showErrorMessage()
    }
  }

  onLoadMoreHandler = async () => {
    this.setState(prevState => ({page: prevState.page + 1}))
    await this.onRequestHandler()
  }

  onFormSubmitHandler = async value => {
    this.setState({searchValue: value, page: 1, apiDataPictures: []})
    await this.onRequestHandler(value, 1)
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
    const checkToShowLoadMore = Math.ceil(this.state.totalAmount/12) <= this.state.page
  return (
    <Wrapper>
    <Searchbar onSubmit={this.onFormSubmitHandler} isSubmitting={this.state.isLoading}/>
    {this.state.isLoading && <SpinnerLoader/>}
    {this.state.apiDataPictures.length > 0 && (
    <ImageGallery>
    <ImageGalleryItem getPictures={this.state.apiDataPictures} onImageClick={this.onImageHandler}/>
    </ImageGallery>)}
    {!checkToShowLoadMore && <Button loadMore={this.onLoadMoreHandler}/>}
    {this.state.largeImageSrc.length > 0 &&
      <Modal onModalClose={this.onModalCloseHandler}>
      <img src={this.state.largeImageSrc} alt="large_image" />
      </Modal>}
    </Wrapper>
  );
};
}

