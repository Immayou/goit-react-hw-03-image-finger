import { ImageGalleryList } from "../ImageGallery/ImageGallery.styled"; 

export const ImageGallery = ({children}) => {
        return (
            <ImageGalleryList>
                {children}
            </ImageGalleryList>    )
}
