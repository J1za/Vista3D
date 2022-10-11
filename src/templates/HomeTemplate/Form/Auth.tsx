import { useState, useCallback } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";

import LoadingButton from '@mui/lab/LoadingButton';

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

import { useFormik } from 'formik';
import { object, string } from 'yup';

import Router from 'next/router'

import { useModal } from '../../../../context/ModalProvider';
import { useAuth } from "../../../../context/AuthContext/AuthContext";

import { toast } from 'react-toastify';

type AuthType = 'login' | 'singup';

export function Auth() {
    const { signup, login } = useAuth();

    const {
        loginModal: { toggleModal },
    }: any = useModal();

    const [showPassword, setshowPassword] = useState(false);
    const [createAccount, setCreateAccount] = useState(false);
    const [loadingButton, setLoadingButton] = useState(false);

    const showPwd = () => {
        setshowPassword(!showPassword);
    };
    const createAcc = () => {
        setCreateAccount(!createAccount);
    };

    let userValidation = object({
        password: string().required('Invalid password').min(6, 'Too Short!').max(20, 'Too Long!'),
        email: string().email('Invalid email').required('Required'),
    });

    const handleAuth = async (type: AuthType) => {
        try {
            switch (type) {
                case 'singup':
                    await signup(formik.values.email, formik.values.password);
                    break;
                case 'login':
                    await login(formik.values.email, formik.values.password)
                    break;
            }
            toggleModal();
            setLoadingButton(false);
            Router.push('/model-generator')
        } catch (err: any) {
            setLoadingButton(false);
            toast.error(err.code, {
                position: "bottom-right",
                autoClose: 5000,
                closeOnClick: true,
                theme: "colored"
            });
        }
    }

    const formik = useFormik({
        initialValues: {
            password: '',
            email: '',
        },
        validationSchema: userValidation,
        onSubmit: values => {
            setLoadingButton(true)
            switch (createAccount) {
                case true:
                    handleAuth('singup');
                    break;
                default:
                    handleAuth('login');
                    break;
            }
        },
    });
    return (
        <>
            <Container maxWidth="sm" style={{ padding: 0 }}>
                <form onSubmit={formik.handleSubmit}>
                    <Box
                        component='div'
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            height: "100%"
                        }}
                    >
                        <Typography variant="h4" component="div" textAlign="center">
                            {createAccount ? 'Create New Account' : 'Authorization'}
                        </Typography>

                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            margin="normal"
                            fullWidth
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            onChange={formik.handleChange}
                            InputProps={{
                                endAdornment: (
                                    <IconButton onClick={showPwd}>
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                )
                            }}
                        />
                    </Box>
                    <FormControlLabel
                        style={{ display: 'block' }}
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Typography onClick={createAcc} component="span" color='blue' style={{ display: 'inline-block', marginTop: 5, cursor: 'pointer' }}>
                        {createAccount ? 'Back to Authorization' : 'Create New Account'}
                    </Typography>
                    <Box component='div' sx={{ mt: 2 }}>
                        <LoadingButton
                            style={{ padding: 15, fontSize: 18 }}
                            variant="contained"
                            color="primary"
                            fullWidth
                            loading={loadingButton}
                            type="submit"
                        >
                            {createAccount ? 'Create account' : 'Sign in'}
                        </LoadingButton>
                    </Box>
                </form>
            </Container>
        </>
    );
}
