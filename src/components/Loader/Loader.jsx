import { RotatingLines } from  'react-loader-spinner';
import { Loader } from "../Loader/Loader.styled";


export const SpinnerLoader = () => {
    return (
      <Loader>
        <RotatingLines 
        strokeColor="grey" 
        strokeWidth="5" 
        animationDuration="0.75" 
        width="96" 
        visible={true}/>
      </Loader>
    );
  };