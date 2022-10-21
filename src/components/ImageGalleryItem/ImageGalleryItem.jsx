import { ImageGalleryPicture, PictureItem } from "../ImageGalleryItem/ImageGalleryItem.styled";

export const ImageGalleryItem = ({getPictures}) => {
 return (
    getPictures.map(({id, webformatURL, largeImageURL}) => 
    (<ImageGalleryPicture key={id}>
        <PictureItem src={webformatURL} alt="picture_data" />
    </ImageGalleryPicture>))
 )
}