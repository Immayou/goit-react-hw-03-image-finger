import PropTypes from 'prop-types'; 
import { ImageGalleryPicture, PictureItem } from "../ImageGalleryItem/ImageGalleryItem.styled";

export const ImageGalleryItem = ({getPictures, onImageClick}) => {

    return (
    getPictures.map(({id, webformatURL, largeImageURL}) => 
    (<ImageGalleryPicture key={id}>
        <PictureItem src={webformatURL} alt="picture_data" onClick={() => onImageClick(largeImageURL)} />
    </ImageGalleryPicture>))
 )
}

ImageGalleryItem.propTypes = {
    getPictures: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            webformatURL: PropTypes.string,
            largeImageURL: PropTypes.string,
          }).isRequired,
    ).isRequired,
    onImageClick: PropTypes.func.isRequired        
    }