import { useState, useMemo } from "react";
import Router from 'next/router'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from "@mui/material/TextField";
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import NextLink from "next/link";
import LoadingButton from '@mui/lab/LoadingButton';

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

import { useFormik } from 'formik';
import { object, string, ref } from 'yup';

import { useModal } from '../../../../context/ModalProvider';
import { useAuth } from "../../../../context/AuthContext/AuthContext";
import { toast } from 'react-toastify';
import countryList from 'react-select-country-list';
import style from './style.module.scss'
import GoogleI from '../../../assets/images/icons/Google_icon.svg'
import firebase from "firebase/compat/app";

type AuthType = 'login' | 'singup' | 'loginGoogle';
const optionsGender = ['Female', 'Male', 'Other'];

export function Auth() {
    const optionsCountry = useMemo(() => countryList().getData(), [])
    const { signup, login, upProfile, user, loginWithGoogle } = useAuth();
    const {
        loginModal: { showModal, toggleModal },
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

    let userCreateValidation = object({
        password: string().required('Invalid password').min(6, 'Too Short!').max(20, 'Too Long!'),
        email: string().email('Invalid email').required('Required'),
        confirmEmail: string().email('Invalid email').oneOf([ref('email')], "Email don't match").required('Required'),
        name: string().required('Name required').min(2, 'Too Short!'),
        surname: string().required('Surname required').min(2, 'Too Short!'),
    });
    let userAuthValidation = object({
        password: string().required('Invalid password').min(6, 'Too Short!').max(20, 'Too Long!'),
        email: string().email('Invalid email').required('Required')
    });
    const checkingVerifyEmail = (arg: any) => {
        if (arg.user.emailVerified) {
            toast.success('🦄 Authorization successful!', {
                position: "top-center",
                theme: "colored",
                autoClose: 1000,
                className: style.toast
            });
            Router.push('/model-generator')
            toggleModal(false);
        }
    }
    const getFormattedMessage = (reason: firebase.FirebaseError) => {
        switch (reason.code) {
            case 'auth/user-not-found': {
                return 'Wrong email or password'
            }
            case 'auth/wrong-password': {
                return 'Wrong email or password'
            }
            case 'auth/weak-password': {
                return 'Password should be at least 6 characters'
            }
            case 'auth/email-already-in-use': {
                return 'The email address is already in use by another account'
            }
            default: {
                return reason.message
            }
        }
    }
    const handleAuth = async (type: AuthType) => {
        try {
            switch (type) {
                case 'singup':
                    await signup(formik.values.email, formik.values.password)
                    await upProfile(`${formik.values.name} ${formik.values.surname}`);
                    break;
                case 'login':
                    await login(formik.values.email, formik.values.password)
                        .then((loginUser: Object) => {
                            checkingVerifyEmail(loginUser)
                        })
                    break;
                case 'loginGoogle':
                    await loginWithGoogle().then((loginUser: Object) => {
                        checkingVerifyEmail(loginUser)
                    })
                    break;
                default:
                    break;
            }
            setLoadingButton(false);

        } catch (err: any) {
            setLoadingButton(false);
            toast.error(getFormattedMessage(err), {
                position: "top-right",
                theme: "colored"
            });
        }
    }

    const formik = useFormik({
        initialValues: {
            password: '',
            email: '',
            confirmEmail: '',
            name: '',
            surname: '',
            gender: '',
            age: '',
            nationality: '',
        },
        validationSchema: createAccount ? userCreateValidation : userAuthValidation,
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
        <form onSubmit={formik.handleSubmit} style={{ maxWidth: 576, margin: '0 auto' }}>
            <Box
                component='div'
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: "100%",
                }}
            >
                <Typography variant="h4" component="div" textAlign="center" className='ffHelvetica' fontWeight={700}>
                    {createAccount ?
                        'Create New Account' :
                        <>
                            <Typography component='h4' sx={{ fontSize: { sm: 32, xs: 24 } }} className='ffHelvetica' fontWeight={700}>Welcome back!</Typography>
                            <Typography sx={{ marginTop: -1 }} className='ffHelvetica' fontWeight={100}> Please enter your details</Typography>
                        </>
                    }
                </Typography>
                <Box component='div' sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
                    <LoadingButton
                        style={{ padding: 10, fontSize: 20, background: '#fff', color: '#000', borderRadius: 8, textTransform: 'inherit' }}
                        variant="contained"
                        color="primary"
                        fullWidth
                        loading={loadingButton}
                        className="ffHelvetica"
                        onClick={() => handleAuth('loginGoogle')}
                    >
                        <GoogleI style={{ marginRight: 15 }} />
                        {createAccount ? 'Register with Google' : 'Log in with Google'}
                    </LoadingButton>
                </Box>
                <Typography component="div" textAlign="center" className={style.or}>
                    <Typography component='p' className='ffHelvetica' fontWeight={100}>or</Typography>
                </Typography>

                <Grid container columnSpacing={2} rowSpacing={1.5}>
                    {createAccount &&
                        <>
                            <Grid item xs={12} md={6} >
                                <TextField
                                    label="Name"
                                    name="name"
                                    type="text"

                                    fullWidth
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} >
                                <TextField
                                    label="Surname"
                                    name="surname"
                                    type="text"

                                    fullWidth
                                    error={formik.touched.surname && Boolean(formik.errors.surname)}
                                    helperText={formik.touched.surname && formik.errors.surname}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} >
                                <Autocomplete
                                    className='ffHelvetica'
                                    disablePortal
                                    options={optionsGender}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Gender" name="gender" />
                                    )}
                                    onChange={(event, value) => (formik.setFieldValue("gender", value !== null && value))}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} >
                                <TextField
                                    label="Age"
                                    name="age"
                                    type="number"

                                    fullWidth
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    className='ffHelvetica'
                                    disablePortal
                                    id="combo-box-demo"
                                    options={optionsCountry}
                                    renderInput={(params) => <TextField {...params} label="Nationality" name="nationality" />}
                                    onChange={(event, value: any) => (formik.setFieldValue("nationality", value !== null && value?.label))}
                                />
                            </Grid>
                        </>
                    }
                    <Grid item md={createAccount ? 6 : 12} xs={12}>
                        <TextField
                            label="Email"
                            name="email"
                            type="email"

                            fullWidth
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    {createAccount &&
                        <Grid item xs={12} md={6} >
                            <TextField
                                color='info'
                                label="Confirmation Email"
                                name="confirmEmail"
                                type="email"

                                fullWidth
                                className="ffHelvetica"
                                error={formik.touched.confirmEmail && Boolean(formik.errors.confirmEmail)}
                                helperText={formik.touched.confirmEmail && formik.errors.confirmEmail}
                                onChange={formik.handleChange}
                            />

                        </Grid>
                    }
                    <Grid item xs={12}>
                        <TextField
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
                    </Grid>
                </Grid>
            </Box>
            {
                createAccount &&
                <Typography onClick={createAcc} component="span" className='ffHelvetica' style={{ display: 'inline-block', marginTop: 6, cursor: 'pointer' }}>
                    Back to Authorization
                </Typography>
            }

            <Box component='div' sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                <LoadingButton
                    style={{ padding: 10, fontSize: 20, background: '#000', borderRadius: 8, minWidth: 243, textTransform: 'inherit' }}
                    variant="contained"
                    color="primary"
                    loading={loadingButton}
                    type="submit"
                    className="ffHelvetica"
                >
                    {createAccount ? 'Create account' : 'Log in'}
                </LoadingButton>
            </Box>
            {!createAccount &&
                <Box component='div' sx={{ mt: 1.5, textAlign: 'center' }}>
                    <Typography className='ffHelvetica' fontWeight={100}>Don’t have an account? <Link onClick={createAcc} color='#000' style={{ cursor: 'pointer' }} fontWeight={500}>Sign up for free</Link></Typography>

                </Box>
            }
            <Box component='div' sx={{ mt: 1.5, display: 'flex', justifyContent: 'center' }}>
                <NextLink href="/model-generator">
                    <Link className='ffHelvetica' color='#000' style={{ cursor: 'pointer' }} fontWeight={500}>Try without Sign in</Link>
                </NextLink>
            </Box>

        </form >
    );
}