import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { checkActionCode, applyActionCode, Auth } from "firebase/auth";
import { auth } from '../../../config/firebase';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SuccesIcon from '../../assets/images/icons/SussectCircle.png'
import { useModal } from '../../../context/ModalProvider';
import { ModalMUI } from '../../components/ui/ModalMUI';
import { useAuth } from '../../../context/AuthContext/AuthContext';
import Image from 'next/image';

export default function AuthTemplate() {
    const [erorrVerify, setErorrVerify] = useState<boolean>(false)
    const { push, query: { oobCode } }: any = useRouter();
    const handleVerifyEmail = (auth: Auth, actionCode: string) => {
        // Localize the UI to the selected language as determined by the lang
        // parameter.
        // Confirm the action code is valid.
        checkActionCode(auth, actionCode).then((info) => {

            // Revert to the old email.
            return applyActionCode(auth, actionCode);
        }).catch((error) => {
            setErorrVerify(true);
        });
    }
    const {
        loginModal: { showModal, toggleModal },
    }: any = useModal();
    useEffect(() => {
        handleVerifyEmail(auth, oobCode);
        if (!showModal) {
            toggleModal(true);
        }
        setTimeout(() => {
            toggleModal(false);
            push('/')
        }, 2000)
    }, [])

    return (
        <ModalMUI>
            <Box component='div'>
                <Typography variant="h4" component="div" className='ffHelvetica' textAlign='center' fontWeight={700}>
                    {erorrVerify ?
                        <Typography sx={{ fontSize: { sm: 24 }, lineHeight: '38px', marginTop: 1 }} className='ffHelvetica' fontWeight={700}>
                            Something wrong! Try Again
                        </Typography>
                        :
                        <>
                            <Typography component='h4' sx={{ fontSize: { sm: 32, xs: 24 }, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, position: 'relative' }} className='ffHelvetica' fontWeight={700}>Congratulations!
                                <Image
                                    src={SuccesIcon.src}
                                    alt="Congratulations"
                                    objectFit='cover'
                                    width={33}
                                    height={33}
                                /></Typography>
                            <Typography sx={{ fontSize: { sm: 24 }, lineHeight: '38px', marginTop: 1 }} className='ffHelvetica'>Your email has been confirmed. You can now login with your credentials.</Typography>
                        </>
                    }

                </Typography>
            </Box>
        </ModalMUI>
    );
}
