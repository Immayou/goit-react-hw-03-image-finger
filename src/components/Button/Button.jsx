import React, {Component} from "react";
import { LoadMoreBtn } from "../Button/Button.styled";

export class Button extends Component {
   
    onLoadMoreHand = e => {
        e.preventDefault();
        this.props.loadMore();
    }

    render () {
    return (
        <LoadMoreBtn onClick={this.onLoadMoreHand}>Load More</LoadMoreBtn>
 )
}
}