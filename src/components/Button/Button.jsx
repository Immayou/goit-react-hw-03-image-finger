import React, {Component} from "react";
import PropTypes from 'prop-types'; 
import { LoadMoreBtn } from "../Button/Button.styled";
export class Button extends Component {
    static propTypes = {
        loadMore: PropTypes.func.isRequired,
      }
   
    onLoadMoreHandler = e => {
        e.preventDefault();
        this.props.loadMore();}

    render () {
    return (
        <LoadMoreBtn onClick={this.onLoadMoreHandler}>Load More</LoadMoreBtn>
 )
}
}