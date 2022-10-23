import React, {Component} from 'react';
import PropTypes from 'prop-types'; 
import { createPortal} from 'react-dom';
import { Overlay, ModalWindow } from "../Modal/Modal.styled"; 

const modalRoot = document.querySelector('#modal-root')

export class Modal extends Component {

    static propTypes = {
        onModalClose: PropTypes.func.isRequired
    }

    componentDidMount () {
        window.addEventListener('keydown', this.handleKeydown)
    }

    componentWillUnmount () {
        window.removeEventListener('keydown', this.handleKeydown)
    }

    handleKeydown = e => {
        if (e.code === 'Escape') {
            this.props.onModalClose()
        }
    }

    handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
            this.props.onModalClose()
        }
    }

    render () {
        return createPortal(
        <Overlay onClick={this.handleBackdropClick}>
          <ModalWindow>
           {this.props.children}
          </ModalWindow>
          </Overlay>, 
          modalRoot);
    }
}

