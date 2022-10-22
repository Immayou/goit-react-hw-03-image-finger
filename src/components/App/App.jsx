import React, { Component } from "react"
import axios from "axios";
import Notiflix from "notiflix";
import Searchbar from '../Searchbar/Searchbar'
import {ImageGallery} from "../ImageGallery/ImageGallery";
import {ImageGalleryItem} from '../ImageGalleryItem/ImageGalleryItem'

import { Wrapper } from "../App/App.styled";


axios.defaults.baseURL = 'https://pixabay.com/api/';

export class App extends Component {

  state = {
   searchValue: '',
   apiDataPictures: [],
   isLoading: false,
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

  handleFormSubmit = value => {
    this.setState({searchValue: value})
  }

  showErrorMessage () {
    Notiflix.Notify.failure(
      `Sorry, there are no images matching your ${this.state.searchValue}. Please try again.`)
  }

  render () {
  return (
    <Wrapper>
    <Searchbar onSubmit={this.handleFormSubmit} isSubmitting={this.state.isLoading}/>
    {this.state.isLoading && <div>Loader...</div>}
    {this.state.apiDataPictures && (
    <ImageGallery>
    <ImageGalleryItem getPictures={this.state.apiDataPictures}/>
    </ImageGallery>)}
    </Wrapper>
  );
};
}
