import { useRouter } from 'next/router'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useModal } from '../../../../context/ModalProvider';

import style from './modelmui.module.scss'

interface ModalMUIProp {
    children?: React.ReactNode;
}

const styleBox = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    pt: 2
};

export function ModalMUI({ children }: ModalMUIProp) {
    const { replace }: any = useRouter();
    const {
        loginModal: { showModal, toggleModal },
    }: any = useModal();
    const handleClose = () => {
        toggleModal(false)
        replace('/', undefined, { shallow: true })
    };

    return (
        <div>
            <Modal
                open={showModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component='div' sx={styleBox} className={style.MuiModal}>
                    <Box component='div' className={style.dialogTitle}>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {children}
                </Box>
            </Modal>
        </div >
    );
}
