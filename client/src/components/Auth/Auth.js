import React,{useState} from 'react';
import { Avatar , Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
// import {  GoogleOAuthProvider } from '@react-oauth/google';
// import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Input from './input'
import {signup , signin} from '../../actions/auth';
// import Icon from './Icon';
import useStyles from './Styles';
const initialState= { firstName: '', lastName: '', email: '', password:'', confirmPassword: '',};
const Auth = () => {
  const classes = useStyles();

  const [showPassword,setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch()
  const history = useHistory()
  
  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleSubmit = (e) =>{
    e.preventDefault();
        if(isSignup){
          dispatch(signup(formData,history))
        }else{
          dispatch(signin(formData,history))
        }
  };

  const handleChange = (e) =>{
      e.preventDefault();
      setFormData({...formData, [e.target.name]:e.target.value})
  }
  
  const switchMode = () => {
   
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  // const googleSuccess = async (res) =>{
  //        const result = res?.profileObj;
  //        const token = res?.tokenId;

  //        try {
  //          dispatch({type:'AUTH', data:{result,token}});
  //          history.push('/')
  //        } catch (error) {
  //         console.log(error)
  //        }
  // };
  // const googleError = () =>{
  //         console.log("Google Sign In was unsucsees")
  // }
 

  return (
   <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon/>
            </Avatar>
      <Typography variant='h5'>{isSignup? 'Sing Up' : 'Sing In'} </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
               <Grid container spacing={2}>
                 {
                  isSignup && (
                     <>
                  
                      <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half/> 
                  
                      <Input name='lastName' label='Last Name' handleChange={handleChange} half/>
                  
                     </>
                  )}
                   <Input name='email' label='Email Adress' handleChange={handleChange} type='email'/>
                   <Input name='password' label='Password' handleChange={handleChange} type={showPassword? "text" : "password"} handleShowPassword={handleShowPassword}/>
                   { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
               </Grid>
               <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                {isSignup ? 'Sign up' : 'Sign in'}
               </Button>


               {/* <GoogleOAuthProvider clientId="491030462813-ja6935dg8kvbapcorjq3lcaf61j4r49b.apps.googleusercontent.com">
               <GoogleLogin
               
               render={(renderProps) => (
               <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
        </GoogleOAuthProvider> */}
              
            <Grid container justifyContent='flex-end'>
                      <Grid item>
                      <Button onClick={switchMode}>
                       { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                      </Button>
                      </Grid>
            </Grid>
      </form>
      </Paper>
   </Container>
  )
}

export default Auth