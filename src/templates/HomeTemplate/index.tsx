import cn from 'classnames'
import { Button, Typography } from '@mui/material';
import Model3D from './Model3D';
import Link from 'next/link';
import { ModalMUI } from '../../components/ui/ModalMUI';
import { useModal } from '../../../context/ModalProvider';
import { Auth } from './Form';
import { useAuth } from '../../../context/AuthContext/AuthContext';

import style from './home.module.scss';
import { database } from '../../../config/firebase';
import { ref, onValue } from "firebase/database";

export default function HomeTemplate() {
    const { user, logout } = useAuth();
    const starCountRef = ref(database, 'users/' + user.uid);
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
    });
    const {
        loginModal: { toggleModal },
    }: any = useModal();
    const handleOpenModal = () => toggleModal();
    const handleLogOut = () => logout();

    return (
        <div className={cn('border-default', style.models)}>
            <div className={style.models_inner}>
                <Model3D model='Pia_fit_avg.glb' />
                <Model3D model='Omar_fat_avg.glb' />
                <Model3D model='Pia_fit_avg.glb' />
            </div>
            <div className={style.models_buttons}>
                <Link href='model-generator'>
                    <Button variant="outlined" style={{ borderWidth: 2, borderColor: 'orange' }}>
                        <Typography variant='h5' fontWeight='700' color='black' textTransform='capitalize'>
                            Generate yourself
                        </Typography>
                    </Button>
                </Link>
                {!user &&
                    <>
                        <Button onClick={handleOpenModal} variant="outlined" style={{ borderWidth: 2, borderColor: 'black' }}>
                            <Typography variant='h5' fontWeight='700' color='black' textTransform='capitalize'>
                                Login/Register
                            </Typography>
                        </Button>
                        <ModalMUI nameModal='Authorization' >
                            <Auth />
                        </ModalMUI>
                    </>
                }
                {user &&
                    <Button onClick={handleLogOut} variant="outlined" style={{ borderWidth: 2, borderColor: 'black' }}>
                        <Typography variant='h5' fontWeight='700' color='black' textTransform='capitalize'>
                            Logout
                        </Typography>
                    </Button>
                }
            </div>
        </div>
    );
}
