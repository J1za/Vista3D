import * as React from 'react';
import style from './icons.module.scss'
import Link from 'next/link';
import cn from 'classnames';

import ILogo from 'src/assets/images/VISTA-LOGO.svg'

interface LogoProps {
    className?: string;
    hideText?: boolean;
    hideIcon?: boolean;
}

export default function Logo({ className, hideText, hideIcon }: LogoProps) {
    return (
        <Link href='/' passHref>
            <a className={cn(style.logo, className)}>
                {!hideIcon && <ILogo />}
                {!hideText && <p>Vista</p>}
            </a>
        </Link>
    );
}
