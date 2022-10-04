import * as React from 'react';
import style from './logo.module.scss'
import Link from 'next/link';

import ILogo from 'src/assets/images/VISTA-LOGO.svg'

export default function Logo() {
    return (
        <Link href='/' passHref>
            <a className={style.logo}>
                <ILogo />
                <p>Vista</p>
            </a>
        </Link>
    );
}
