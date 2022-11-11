import { useState, useMemo, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from "@mui/material/TextField";
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

import { useFormik } from 'formik';
import { object, string, ref } from 'yup';

import Router from 'next/router'

import { useModal } from '../../../../context/ModalProvider';
import { useAuth } from "../../../../context/AuthContext/AuthContext";
import { toast } from 'react-toastify';
import countryList from 'react-select-country-list';
import style from './style.module.scss'

type AuthType = 'login' | 'singup';

export function Auth() {
    const optionsCountry = useMemo(() => countryList().getData(), [])
    const { signup, login, upProfile, user } = useAuth();
    const { emailVerify } = user;
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

    const handleAuth = async (type: AuthType) => {
        try {
            switch (type) {
                case 'singup':
                    await signup(formik.values.email, formik.values.password);
                    await upProfile(`${formik.values.name} ${formik.values.surname}`);
                    break;
                case 'login':
                    await login(formik.values.email, formik.values.password)
                    break;
            }
            toggleModal();
            setLoadingButton(false);
            if (emailVerify) {
                toast.success('🦄 Authorization successful!', {
                    position: "top-center",
                    theme: "colored",
                    autoClose: 1000,
                });
                setTimeout(() => {
                    Router.push('/model-generator')
                }, 500)
            } else {
                toast.warning('Confirm your email address to sign in!', {
                    position: "top-center",
                    theme: "colored",
                    autoClose: 1500,
                    className: style.toast
                });
            }
        } catch (err: any) {
            setLoadingButton(false);
            toast.error(err.code, {
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
                {createAccount &&
                    <>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Name"
                                    name="name"
                                    type="text"
                                    margin="normal"
                                    fullWidth
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Surname"
                                    name="surname"
                                    type="text"
                                    margin="normal"
                                    fullWidth
                                    error={formik.touched.surname && Boolean(formik.errors.surname)}
                                    helperText={formik.touched.surname && formik.errors.surname}
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Autocomplete
                                    disablePortal
                                    options={optionsGender}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Gender" name="gender" margin="normal" />
                                    )}
                                    onChange={(event, value) => (formik.setFieldValue("gender", value !== null && value))}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Age"
                                    name="age"
                                    type="number"
                                    margin="normal"
                                    fullWidth
                                    onChange={formik.handleChange}
                                />
                            </Grid>
                        </Grid>

                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={optionsCountry}
                            renderInput={(params) => <TextField {...params} label="Nationality" margin="normal" name="nationality" />}
                            onChange={(event, value: any) => (formik.setFieldValue("nationality", value !== null && value?.label))}
                        />
                    </>
                }
                <Grid container columnSpacing={2}>
                    <Grid item xs={createAccount ? 6 : 12}>
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
                    </Grid>
                    {createAccount &&
                        <Grid item xs={6}>
                            <TextField
                                label="Confirmation Email"
                                name="confirmEmail"
                                type="email"
                                margin="normal"
                                fullWidth
                                error={formik.touched.confirmEmail && Boolean(formik.errors.confirmEmail)}
                                helperText={formik.touched.confirmEmail && formik.errors.confirmEmail}
                                onChange={formik.handleChange}
                            />

                        </Grid>
                    }
                    <Grid item xs={12}>
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
                    </Grid>
                </Grid>
            </Box>
            {createAccount &&
                <Typography onClick={createAcc} component="span" color='blue' style={{ display: 'inline-block', marginTop: 5, cursor: 'pointer' }}>
                    Back to Authorization
                </Typography>
            }

            <Box component='div' sx={{ mt: 2 }}>
                <LoadingButton
                    style={{ padding: 10, fontSize: 18 }}
                    variant="contained"
                    color="primary"
                    fullWidth
                    loading={loadingButton}
                    type="submit"
                >
                    {createAccount ? 'Create account' : 'Sign in'}
                </LoadingButton>
            </Box>
            {!createAccount &&
                <Box component='div' sx={{ mt: 2, textAlign: 'center' }} onClick={createAcc}>
                    <LoadingButton variant="outlined" fullWidth color="secondary" style={{ fontSize: 16 }}>Create account</LoadingButton>
                </Box>
            }

        </form>
    );
}

const optionsGender = ['Female', 'Male', 'Other'];