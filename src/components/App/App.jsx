import React, { Component } from "react";
import Notiflix from "notiflix";
import {makeApiRequest} from "../../services/api";
import {Searchbar} from '../Searchbar/Searchbar';
import {ImageGallery} from "../ImageGallery/ImageGallery";
import {ImageGalleryItem} from '../ImageGalleryItem/ImageGalleryItem';
import {Modal} from '../Modal/Modal';
import {Button} from '../Button/Button';
import {Wrapper} from "../App/App.styled";
import {SpinnerLoader} from "../Loader/Loader";
export class App extends Component {

  state = {
   searchValue: '',
   apiDataPictures: [],
   isLoading: false,
   largeImageSrc: '',
   totalAmount: null,
   page: 1,
  }

  async componentDidUpdate (prevProps, prevState) {
    if (
      prevState.searchValue !== this.state.searchValue ||
      prevState.page !== this.state.page
      ) {
        await this.onRequestHandler()
        }            
  }

  onRequestHandler = async (value = this.state.searchValue, page = this.state.page) => {
    try {
      this.setState({ isLoading: true})
      const dataResult = await makeApiRequest(value, page)
      const dataHits = await dataResult.hits
      const dataTotalHits = await dataResult.totalHits
      this.setState({ isLoading: false, totalAmount: dataTotalHits }) 

      if (dataHits.length === 0) {
        this.showMessageIfInvalidRequest()
        return
      }

      if (this.state.page > 1) {
        this.setState(prevState => ({apiDataPictures:[...prevState.apiDataPictures, ...dataHits]}))
      }

      if (this.state.page === 1) {
        this.setState(prevState => ({apiDataPictures: dataHits}))
      }

    } catch (error) {
      this.showErrorMessage()
    }
  }

  onFormSubmitHandler = async value => {
    this.setState({searchValue: value, page: 1, apiDataPictures: []})
  }

  onLoadMoreHandler = async () => {
    this.setState(prevState => ({page: prevState.page + 1}))
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

  showMessageIfInvalidRequest () {
    Notiflix.Notify.failure(
      `Sorry, there are no images matching ${this.state.searchValue}. Please try again.`)
  }

  checkToShowLoadMore () {
    const isLoadBtnShown = Math.ceil(this.state.totalAmount/12) > this.state.page 
    return isLoadBtnShown
  }

  render () {
    const {isLoading, apiDataPictures, largeImageSrc} = this.state
    const isLoadMoreBtn = this.checkToShowLoadMore()
      return (
    <Wrapper>
          <Searchbar onSubmit={this.onFormSubmitHandler} isSubmitting={isLoading}/>
              {isLoading && <SpinnerLoader/>}
                  {apiDataPictures.length > 0 && (
                  <ImageGallery>
                    <ImageGalleryItem getPictures={apiDataPictures} onImageClick={this.onImageHandler}/>
                    </ImageGallery>)}
                    {isLoadMoreBtn && <Button loadMore={this.onLoadMoreHandler}/>}
                    {largeImageSrc > 0 && <Modal onModalClose={this.onModalCloseHandler}>
                      <img src={largeImageSrc} alt="large_image" />
                      </Modal>}
                      </Wrapper>
                      );
                    };
                  }

