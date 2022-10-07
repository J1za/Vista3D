import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { useModal } from '../../../../context/ModalProvider';

import style from './modelmui.module.scss'

interface ModalMUIProp {
    children?: React.ReactNode;
    nameModal?: string;
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

export function ModalMUI({ children, nameModal }: ModalMUIProp) {
    const {
        //@ts-ignore
        loginModal: { showModal, toggleModal },
    } = useModal();
    const handleClose = () => toggleModal();

    return (
        <div>
            <Modal
                open={showModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box component='div' sx={styleBox}>
                    <Box component='div' className={style.dialogTitle}>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    {children}
                </Box>
            </Modal>
        </div>
    );
}
