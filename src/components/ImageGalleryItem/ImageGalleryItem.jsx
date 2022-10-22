import { ImageGalleryPicture, PictureItem } from "../ImageGalleryItem/ImageGalleryItem.styled";

export const ImageGalleryItem = ({getPictures, onImageClick}) => {

    return (
    getPictures.map(({id, webformatURL, largeImageURL} = getPictures) => 
    (<ImageGalleryPicture key={id}>
        <PictureItem src={webformatURL} alt="picture_data" onClick={() => onImageClick(largeImageURL)} />
    </ImageGalleryPicture>))
 )
}