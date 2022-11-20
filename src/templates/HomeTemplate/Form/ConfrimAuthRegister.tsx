import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoadingButton from '@mui/lab/LoadingButton';
import Divider from '@mui/material/Divider';
import { useAuth } from "../../../../context/AuthContext/AuthContext";
import {
  sendEmailVerification
} from 'firebase/auth'
import { toast } from 'react-toastify';


export function ConfrimAuthRegister() {
  const [loadingButton, setLoadingButton] = useState(false);
  const { user } = useAuth();

  const resendEmailVerify = () => {

    if (user) {
      setLoadingButton(true);
      sendEmailVerification(user.allInfo).then(() => {
        setLoadingButton(false)
        toast.info('Verification send', {
          position: "top-center",
          theme: "colored",
          autoClose: 1500,
        });
      }).catch(() => {
        setLoadingButton(false)
        toast.error('Many requests, wait 1 minute!', {
          position: "top-center",
          theme: "colored",
          autoClose: 1500,
        });
      })
    } else {
      toast.error('Something wrong!', {
        position: "top-center",
        theme: "colored",
        autoClose: 1500,
      });
    }
  }
  return (
    <Box component='div'>
      <Typography variant="h4" component="div" className='ffHelvetica' fontWeight={700}>
        <Typography component='h4' sx={{ fontSize: { sm: 32, xs: 24 } }} className='ffHelvetica' fontWeight={700}>Welcome! {user?.name}</Typography>
        <Typography sx={{ fontSize: { sm: 24 }, lineHeight: '38px', marginTop: 2 }} className='ffHelvetica'>To complete your account set up, verify account email we’ve sent to</Typography>
        <Typography textAlign='center' sx={{ fontSize: { sm: 24 } }} className='ffHelvetica' fontWeight={700}>{user?.email}</Typography>
      </Typography>
      <Divider sx={{ margin: '25px 0' }} />
      <Box component='div' sx={{ display: 'flex', justifyContent: 'center' }}>
        <LoadingButton
          style={{ padding: 10, fontSize: 20, background: '#fff', color: '#000', borderRadius: 8, maxWidth: 576, textTransform: 'inherit' }}
          variant="contained"
          color="primary"
          fullWidth
          loading={loadingButton}
          type="submit"
          className="ffHelvetica"
          onClick={resendEmailVerify}
        >
          RESEND VERIFICATION
        </LoadingButton>
      </Box>
    </Box>
  )
}