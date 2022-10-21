import React, { Component } from "react"
import axios from "axios";
import Searchbar from '../Searchbar/Searchbar'
import {ImageGallery} from "../ImageGallery/ImageGallery";
import {ImageGalleryItem} from '../ImageGalleryItem/ImageGalleryItem'

import { Wrapper } from "../App/App.styled";


axios.defaults.baseURL = 'https://pixabay.com/api/';

export class App extends Component {

  state = {
   searchValue: '',
   apiDataPictures: [],
  }

  async componentDidUpdate (prevProps, prevState) {
    try {
    if (prevState.searchValue !== this.state.searchValue) {
    const response = await axios.get(`?q=${this.state.searchValue}&page=1&key=${process.env.REACT_APP_API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
    this.setState ({apiDataPictures: response.data.hits})
    }
    } catch (error) {
      console.log(error)
    }
  }

  handleFormSubmit = value => {
    this.setState({searchValue: value})
  }

  render () {
  return (
    <Wrapper>
    <Searchbar onSubmit={this.handleFormSubmit}/>
    {this.state.apiDataPictures && (
    <ImageGallery>
    <ImageGalleryItem getPictures={this.state.apiDataPictures}/>
    </ImageGallery>)}
    </Wrapper>
  );
};
}
