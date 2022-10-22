import React, { Component } from "react";
import Notiflix from "notiflix";
import { HeaderForm, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from "../Searchbar/Searchbar.styled";

export class Searchbar extends Component {

    state = {
        searchInput: '',
    }

    inputHandler = e => {
        this.setState ({searchInput: e.currentTarget.value.toLowerCase()})
    }

    formSubmitHandler = e => {
    e.preventDefault();
    if (this.state.searchInput.trim() === '') {
      Notiflix.Notify.info("Enter your query, please!")
        return
    }
    this.props.onSubmit(this.state.searchInput)
    this.setState({searchInput: ''})
    // e.target.reset();
    }
    
    render () {
        return (
    <HeaderForm>
    <SearchForm onSubmit={this.formSubmitHandler}>
      <SearchFormButton type="submit" disabled={this.props.isSubmitting}>
        <SearchFormButtonLabel>Search</SearchFormButtonLabel>
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