import React from 'react';
import { Media } from 'reactstrap';
import {BASE_API} from '../../../config/api/Security';


const ImageZoom = ({image}) => {

    return (
        <Media src={image} alt={'Zoom'} className="img-fluid"/>
    );
}

export default ImageZoom;
