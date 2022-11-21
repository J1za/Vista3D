import Router from 'next/router'
import cn from 'classnames'
import { Button, Typography } from '@mui/material';
import Link from 'next/link';
import { ModalMUI } from '../../components/ui/ModalMUI';
import { useModal } from '../../../context/ModalProvider';
import { Auth } from './Form';
import { useAuth } from '../../../context/AuthContext/AuthContext';
import Logo from '../../components/ui/Icons/logo';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { ConfrimAuthRegister } from './Form/ConfrimAuthRegister';

import style from './home.module.scss';

export default function HomeTemplate() {
    const { isDesktopSmall } = useWindowDimensions();

    const { user, logout } = useAuth();
    const {
        loginModal: { showModal, toggleModal },
    }: any = useModal();
    const handleOpenModal = () => {
        if (user && user?.emailVerify) {
            Router.push('/model-generator')
        } else {
            toggleModal(true);
        }
    }
    const handleLogOut = () => logout();
    return (
        <div className={cn(style.info)}>
            <Button>
                <Button variant="outlined" style={{ borderWidth: 0, borderColor: 'orange', marginBottom: 'auto', display: 'grid' }}>
                    {!showModal &&
                        <>
                            <Typography onClick={handleOpenModal} variant='h5' component='span' color='black' textTransform='uppercase' className={style.info_generatore}>
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
            <ModalMUI>
                {!user &&
                    <Auth />
                }
                {user && !user?.emailVerify &&
                    <ConfrimAuthRegister />
                }
            </ModalMUI>
        </div>
    );
}
