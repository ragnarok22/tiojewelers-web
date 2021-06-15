import React, { Fragment } from 'react';
import Link from 'next/link';

const LogoImage = ({ logo }) => {
    return (
        <Fragment>
            <Link href={'/'} >
                <a>
                    <img src={`/assets/images/tiojewelers/logo/${logo?logo:'logo.png'}`} alt="" width='150rem' height='150rem'  className="img-fluid" />
                </a>
            </Link>
        </Fragment>
    )
}

export default LogoImage;