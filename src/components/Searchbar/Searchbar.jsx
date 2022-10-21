import React, { Component } from "react";
import { HeaderForm, SearchForm, SearchFormButton, SearchFormButtonLabel, SearchFormInput } from "../Searchbar/Searchbar.styled";

export default class Searchbar extends Component {

    state = {
        searchInput: '',
    }

    inputHandler = e => {
        this.setState ({searchInput:  e.currentTarget.value.toLowerCase()})
    }

    formSubmitHandler = e => {
    e.preventDefault();
    if (this.state.searchInput.trim() === '') {
        toast('Please enter the query')
        return
    }
    this.props.onSubmit(this.state.searchInput)
    this.setState({searchInput: ''})
    }
    
    render () {
        return (
    <HeaderForm>
    <SearchForm onSubmit={this.formSubmitHandler}>
      <SearchFormButton type="submit">
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