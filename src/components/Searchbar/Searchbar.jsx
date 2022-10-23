import React, { Component } from "react";
import PropTypes from 'prop-types';
import Notiflix from "notiflix";
import { HeaderForm, SearchForm, SearchFormButton, SearchFormInput } from "../Searchbar/Searchbar.styled";
import {TiEject} from 'react-icons/ti';
export class Searchbar extends Component {

    static propTypes = {
      isSubmitting: PropTypes.bool.isRequired
    }

    state = {
        searchInput: '',
    }

    inputHandler = e => {
        this.setState ({searchInput: e.currentTarget.value.toLowerCase()})
    }

    formSubmitHandler = e => {
    const {searchInput} = this.state
    e.preventDefault();
    if (searchInput.trim() === '') {
      Notiflix.Notify.info("Enter your query, please!")
      return
    }
    this.props.onSubmit(searchInput)
    }
    
    render () {
        return (
    <HeaderForm>
    <SearchForm onSubmit={this.formSubmitHandler}>
      <SearchFormButton type="submit" disabled={this.props.isSubmitting}>
          <TiEject size = '25px'/>
      </SearchFormButton>
      <SearchFormInput
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        onChange={this.inputHandler}
        value={this.state.searchInput}
      />
    </SearchForm>
  </HeaderForm>
 )
}
}