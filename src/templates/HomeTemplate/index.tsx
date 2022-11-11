import { useEffect, useState, useRef } from 'react';
import cn from 'classnames'
import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import { ModalMUI } from '../../components/ui/ModalMUI';
import { useModal } from '../../../context/ModalProvider';
import { Auth } from './Form';
import { useAuth } from '../../../context/AuthContext/AuthContext';
import Logo from '../../components/ui/Icons/logo';
import useWindowDimensions from '../../hooks/useWindowDimensions';

import style from './home.module.scss';

export default function HomeTemplate() {
    const { isDesktopSmall } = useWindowDimensions();
    const urlVideo = 'https://res.cloudinary.com/dnv8xvjrt/video/upload/v1668087939/Final_video_odpzve.mp4'

    const videoEl = useRef<HTMLVideoElement>(null);
    const { user, logout } = useAuth();
    const {
        loginModal: { toggleModal },
    }: any = useModal();
    const handleOpenModal = () => toggleModal();
    const handleLogOut = () => logout();
    return (
        <div className={cn(style.info)}>
            <div className={style.info_inner}>
                <div className={style.info_buttons}>
                    {isDesktopSmall && <Logo />}
                    {!user?.emailVerify &&
                        <>
                            <Button onClick={handleOpenModal} variant="outlined" style={{ borderWidth: 0, borderColor: 'black' }}>
                                <Typography variant='h6' color='black' textTransform='capitalize' style={{ lineHeight: '24px' }}>
                                    Log In <br />
                                    Create Account
                                </Typography>
                            </Button>
                        </>
                    }
                    {user && user?.emailVerify &&
                        <div className='flex align-items'>
                            <Typography color='black' style={{ lineHeight: '24px', fontSize: 17 }}>
                                {user.displayName ? user.displayName : user.email}
                            </Typography>
                            <Button onClick={handleLogOut} variant="outlined" style={{ borderWidth: 0, borderColor: 'black' }}>
                                <Typography variant='h6' color='black' textTransform='capitalize'>
                                    Logout
                                </Typography>
                            </Button>
                        </div>
                    }
                </div>
                <video autoPlay loop muted playsInline={true} style={{ width: '100%', height: 518, objectFit: 'cover' }} ref={videoEl}>
                    <source src={urlVideo} type="video/mp4" />
                </video>
                <Link href='model-generator'>
                    <Button variant="outlined" style={{ borderWidth: 0, borderColor: 'orange', marginBottom: 'auto' }}>
                        <Typography variant='h5' component='span' fontWeight='700' color='black' textTransform='uppercase' className={style.info_generatore}>
                            Generate yourself
                        </Typography>
                    </Button>
                </Link>
            </div>
            <ModalMUI >
                <Auth />
            </ModalMUI>
        </div>
    );
}
