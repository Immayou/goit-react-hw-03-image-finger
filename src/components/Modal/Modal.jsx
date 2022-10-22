import { Overlay, ModalWindow } from "../Modal/Modal.styled"; 

export const Modal = ({children}) => {
        return (
            <Overlay>
               <ModalWindow>
                   {children}
                </ModalWindow>
            </Overlay>
 )
}