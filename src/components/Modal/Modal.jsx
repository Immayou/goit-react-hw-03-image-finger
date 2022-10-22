import React, {Component} from 'react';
import { createPortal} from 'react-dom';
import { Overlay, ModalWindow } from "../Modal/Modal.styled"; 

const modalRoot = document.querySelector('#modal-root')

export class Modal extends Component {
    componentDidMount () {
        
    }
    render () {
        return createPortal(<Overlay>
          <ModalWindow>
           {this.props.children}
          </ModalWindow>
          </Overlay>, 
          modalRoot);
    }
}

