import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import '../assets/css/SignUp.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { MuiTelInput } from 'mui-tel-input'
import { styled } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpContainer = styled(Stack)(({ theme }) => ({
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

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    overflow: 'scroll',
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

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: "",
        username: "",
        confirmPassword: "",
        phoneNumber: "",  // Số điện thoại
        address: "",  // Địa chỉ
    })
    const navigate = useNavigate()

    const handleOnChange = (e) => {
        if (e && e.target) {
            const { name, value } = e.target;
            setData({
                ...data,
                [name]: value,
            });
        } else {
            console.error('Event target is undefined');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (data.password === data.confirmPassword) {

            const dataResponse = await fetch(SummaryApi.signUP.url, {
                method: SummaryApi.signUP.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const status = dataResponse.status
            const message = await dataResponse.json().then(data => data.message)
            if (status === 200) {
                toast.success(message)
                navigate("/")
            } else {
                toast.error(message)
            }
        } else {
            toast.error("Please check password and confirm password")
        }
    }

    return (
        // <section id='signup' className='signup-container'>
        //     <div className='mx-auto container p-4'>

        //         <div className='bg-white p-5 w-full max-w-sm mx-auto'>
        //             <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
        //                 <div className='grid'>
        //                     <label>Name : </label>
        //                     <div className='bg-slate-100 p-2'>
        //                         <input
        //                             type='text'
        //                             placeholder='Enter your name'
        //                             name='username'
        //                             value={data.usernamename}
        //                             onChange={handleOnChange}
        //                             required
        //                             className='w-full h-full outline-none bg-transparent' />
        //                     </div>
        //                 </div>

        //                 <div className='grid'>
        //                     <label>Email : </label>
        //                     <div className='bg-slate-100 p-2'>
        //                         <input
        //                             type='email'
        //                             placeholder='Enter your email'
        //                             name='email'
        //                             value={data.email}
        //                             onChange={handleOnChange}
        //                             required
        //                             className='w-full h-full outline-none bg-transparent' />
        //                     </div>
        //                 </div>

        //                 {/* Mục nhập số điện thoại */}
        //                 <div className='grid'>
        //                     <label>Phone Number : </label>
        //                     <div className='bg-slate-100 p-2'>
        //                         <input
        //                             type='tel'
        //                             placeholder='Enter your phone number'
        //                             name='phoneNumber'
        //                             value={data.phoneNumber}
        //                             onChange={handleOnChange}
        //                             required
        //                             className='w-full h-full outline-none bg-transparent' />
        //                     </div>
        //                 </div>

        //                 {/* Mục nhập địa chỉ */}
        //                 <div className='grid'>
        //                     <label>Address : </label>
        //                     <div className='bg-slate-100 p-2'>
        //                         <input
        //                             type='text'
        //                             placeholder='Enter your address'
        //                             name='address'
        //                             value={data.address}
        //                             onChange={handleOnChange}
        //                             required
        //                             className='w-full h-full outline-none bg-transparent' />
        //                     </div>
        //                 </div>

        //                 <div>
        //                     <label>Password : </label>
        //                     <div className='bg-slate-100 p-2 flex'>
        //                         <input
        //                             type={showPassword ? "text" : "password"}
        //                             placeholder='Enter your password'
        //                             value={data.password}
        //                             name='password'
        //                             onChange={handleOnChange}
        //                             required
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
        //                 </div>

        //                 <div>
        //                     <label>Confirm Password : </label>
        //                     <div className='bg-slate-100 p-2 flex'>
        //                         <input
        //                             type={showConfirmPassword ? "text" : "password"}
        //                             placeholder='Confirm your password'
        //                             value={data.confirmPassword}
        //                             name='confirmPassword'
        //                             onChange={handleOnChange}
        //                             required
        //                             className='w-full h-full outline-none bg-transparent' />

        //                         <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((preve) => !preve)}>
        //                             <span>
        //                                 {
        //                                     showConfirmPassword ? (
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
        //                 </div>

        //                 <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Sign Up</button>

        //             </form>

        //             <p className='my-5'>Already have an account? <Link to={"/login"} className=' text-red-600 hover:text-red-700 hover:underline'>Login</Link></p>
        //         </div>
        //     </div>
        // </section>

        <div>
            <ToastContainer />
            <CssBaseline enableColorScheme />
            <SignUpContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        Sign Up
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
                            <FormLabel htmlFor="username">Name</FormLabel>
                            <TextField
                                id="username"
                                type="text"
                                value={data.username}
                                name="username"
                                placeholder="Enter your name"
                                autoComplete="username"
                                autoFocus

                                required
                                fullWidth
                                variant="outlined"
                                onChange={handleOnChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
                                id="email"
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                value={data.email}
                                autoComplete="email"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                onChange={handleOnChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="address">Address</FormLabel>
                            <TextField
                                id="address"
                                type="text"
                                name="address"
                                placeholder="Enter your address"
                                value={data.address}
                                autoComplete="address"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                onChange={handleOnChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="phone">Phone Number</FormLabel>
                            {/* <TextField
                                id="phoneNumber"
                                type="number"
                                name="phoneNumber"
                                placeholder="Enter your phone number"
                                autoComplete="phoneNumber"
                                autoFocus
                                value={data.phoneNumber}
                                required
                                fullWidth
                                variant="outlined"
                                onChange={handleOnChange}
                            /> */}
                            <MuiTelInput
                                defaultCountry={'vn'}
                                placeholder="Enter your phone number"
                                name="phoneNumber"
                                id="phoneNumber"
                                startadornment="+84"
                                value={data.phoneNumber ? data.phoneNumber : "+84"} // Số điện thoại
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                onChange={(e) => {
                                    setData({ ...data, phoneNumber: e })
                                    console.log(data)
                                }}
                            ></MuiTelInput>

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
                        <FormControl>
                            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                            <TextField
                                name="confirmPassword"
                                placeholder="••••••"
                                type={showPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                autoComplete="confirmPassword"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                onChange={handleOnChange}
                                InputProps={{
                                    endAdornment: (
                                        <Button
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowConfirmPassword((preve) => !preve)}
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
                    </Box>
                </Card>
            </SignUpContainer>
        </div>
    )
}

export default SignUp;
