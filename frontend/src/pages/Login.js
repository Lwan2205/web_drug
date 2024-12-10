import React, { useContext, useState } from 'react'
// import loginIcons from '../assest/signin.gif'
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Context from '../context/index'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';


const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        const dataResponse = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signIn.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()

        if (dataApi.success) {
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()

        }

        else if (dataResponse.status === 401) {
            toast.error('Invalid email or password');
        } else {
            toast.error(dataApi.message || 'An error occurred');
        }

    }

    console.log("data login", data)

    return (
        // <section id='login'>
        //     <div className='mx-auto container p-4'>

        //         <div className='bg-white p-5 w-full max-w-sm mx-auto'>
        //             <div className='w-20 h-20 mx-auto'>
        //                 {/* <img src={loginIcons} alt='login icons' /> */}
        //             </div>

        //             <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
        //                 <div className='grid'>
        //                     <label>Email : </label>
        //                     <div className='bg-slate-100 p-2'>
        //                         <input
        //                             type='email'
        //                             placeholder='enter email'
        //                             name='email'
        //                             value={data.email}
        //                             onChange={handleOnChange}
        //                             className='w-full h-full outline-none bg-transparent' />
        //                     </div>
        //                 </div>

        //                 <div>
        //                     <label>Password : </label>
        //                     <div className='bg-slate-100 p-2 flex'>
        //                         <input
        //                             type={showPassword ? "text" : "password"}
        //                             placeholder='enter password'
        //                             value={data.password}
        //                             name='password'
        //                             onChange={handleOnChange}
        //                             className='w-full h-full outline-none bg-transparent' />
        //                         <div className='cursor-pointer text-xl' onClick={() => setShowPassword((preve) => !preve)}>
        //                             <span>
        //                                 {
        //                                     showPassword ? (
        //                                         <FaEyeSlash />
        //                                     )
        //                                         :
        //                                         (
        //                                             <FaEye />
        //                                         )
        //                                 }
        //                             </span>
        //                         </div>
        //                     </div>
        //                     <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
        //                         Forgot password ?
        //                     </Link>
        //                 </div>

        //                 <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>

        //             </form>

        //             <p className='my-5'>Don't have account ? <Link to={"/sign-up"} className=' text-red-600 hover:text-red-700 hover:underline'>Sign up</Link></p>
        //         </div>


        //     </div>
        // </section>
        <div>
            <ToastContainer />
            <CssBaseline enableColorScheme />
            <SignInContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2,
                        }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
                                id="email"
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                autoComplete="email"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                onChange={handleOnChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <TextField
                                name="password"
                                placeholder="••••••"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                onChange={handleOnChange}
                                InputProps={{
                                    endAdornment: (
                                        <Button
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword((preve) => !preve)}
                                        >
                                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                                        </Button>
                                    ),
                                }}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Sign in
                        </Button>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Link to={'/forgot-password'} style={{ color: 'black', fontWeight: '700', fontSize: '12px', textDecoration: 'none' }}>
                                Forgot password ?
                            </Link>
                            <Link to={'/sign-up'} style={{ color: 'black', fontWeight: '700', fontSize: '12px', textDecoration: 'none' }}>
                                Don't have account ? Sign up
                            </Link>
                        </Box>

                    </Box>
                </Card>
            </SignInContainer>
        </div>
    )
}

export default Login