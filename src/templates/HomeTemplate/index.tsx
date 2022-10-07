import cn from 'classnames'
import { Button, Typography } from '@mui/material';
import Model3D from './Model3D';
import Link from 'next/link';
import { ModalMUI } from '../../components/ui/ModalMUI';
import { useModal } from '../../../context/ModalProvider';
import { Login } from './Form';

import style from './home.module.scss';

export default function HomeTemplate() {
    const {
        loginModal: { toggleModal },
    }: any = useModal();
    const handleOpenModal = () => toggleModal();

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
                <Button onClick={handleOpenModal} variant="outlined" style={{ borderWidth: 2, borderColor: 'black' }}>
                    <Typography variant='h5' fontWeight='700' color='black' textTransform='capitalize'>
                        Login/Register
                    </Typography>
                </Button>
                <ModalMUI nameModal='Authorization' >
                    <Login />
                </ModalMUI>
            </div>
        </div>
    );
}
