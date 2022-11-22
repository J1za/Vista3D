import { useRouter } from 'next/router'
import { useEffect } from 'react'
import cn from 'classnames'
import { Button, Typography } from '@mui/material';
import { ModalMUI } from '../../../components/ui/ModalMUI';
import { useModal } from '../../../../context/ModalProvider';
import { Auth } from '../Form';
import { useAuth } from '../../../../context/AuthContext/AuthContext';
import { ConfrimAuthRegister } from '../Form/ConfrimAuthRegister';
import EmailVerifyCheck from '../EmailVerifyCheck';

import style from '../home.module.scss';

export function SectionHomeFirst() {
    const urlVideo = 'https://res.cloudinary.com/dnv8xvjrt/video/upload/v1668087939/Final_video_odpzve.mp4';

    const { push, query: { oobCode } }: any = useRouter();
    const { user, logout } = useAuth();
    const {
        loginModal: { showModal, toggleModal },
    }: any = useModal();
    const handleOpenModal = () => {
        if (user && user?.emailVerify) {
            push('/model-generator')
        } else {
            toggleModal(true);
        }
    }
    useEffect(() => {
        if (oobCode) {
            toggleModal(true);
        }
    }, [])
    const handleLogOut = () => logout();
    return (
        <div className={cn(style.first)}>
            <div className={style.first_video}>
                <video autoPlay data-autoplay loop muted playsInline={true}>
                    <source src={urlVideo} type="video/mp4" />
                </video>
            </div>
            <Button style={{marginBottom: '250px'}}>
                <Button variant="outlined" style={{ borderWidth: 0, borderColor: 'orange', display: 'grid' }}>
                    {!showModal &&
                        <>
                            <Typography onClick={handleOpenModal} variant='h5' component='span' color='black' textTransform='uppercase' className={style.first_generatore}>
                                Generate yourself
                            </Typography>
                            {user &&
                                <Typography onClick={handleLogOut} variant='h5' component='div' color='black' textTransform='uppercase'>
                                    Logout
                                </Typography>
                            }
                        </>
                    }
                </Button>
            </Button>
            <Typography className='descBottom' textAlign='center'>“MAKE IT EASY FOR THEM, MAKE IT EASIER FOR YOU”</Typography>
            {showModal &&
                <ModalMUI>
                    {!user && !oobCode &&
                        <Auth />
                    }
                    {user && !user?.emailVerify &&
                        <ConfrimAuthRegister />
                    }
                    {oobCode &&
                        <EmailVerifyCheck />
                    }
                </ModalMUI>
            }

        </div>
    )
}