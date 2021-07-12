// import React, { useState } from 'react';
// import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';

// import { useDispatch } from 'react-redux';
// function Copyright() {
//     return (
//         <Typography variant="body2" color="textSecondary" align="center">
//             {'Copyright © '}
//             <Link color="inherit" href="http://material-ui.com/">
//                 Your Website
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

// const useStyles = makeStyles((theme) => ({
//     paper: {
//         marginTop: theme.spacing(8),
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     avatar: {
//         margin: theme.spacing(1),
//         backgroundColor: theme.palette.secondary.main,
//     },
//     form: {
//         width: '100%', // Fix IE 11 issue.
//         marginTop: theme.spacing(3),
//     },
//     submit: {
//         margin: theme.spacing(3, 0, 2),
//     },
// }));

// export default function SignUp() {
//     const classes = useStyles();
//     const dispatch = useDispatch();
//     const [Username, setUsername] = useState("");
//     const [Password, setPassword] = useState("");
//     const [ConfirmPasword, setConfirmPasword] = useState("");
//     const [Mobile, setMobile] = useState("");
//     const [RealName, setRealName] = useState("");
//     const [Description, setDescription] = useState("");
//     const registerHandler = () => {
//         (values) => {
//             setTimeout(() => {

//                 let dataToSubmit = {
//                     email: values.email,
//                     password: values.password,
//                     name: values.name,
//                     lastname: values.lastname,
//                     image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
//                 };

//                 dispatch(registerUser(dataToSubmit)).then(response => {
//                     if (response.payload.success) {
//                         props.history.push("/login");
//                     } else {
//                         alert(response.payload.err.errmsg)
//                     }
//                 })

//                 setSubmitting(false);
//             }, 500);
//         }
//     }
//     return (
//         <Container component="main" maxWidth="xs">
//             <CssBaseline />
//             <div className={classes.paper}>
//                 <Avatar className={classes.avatar}>
//                     <LockOutlinedIcon />
//                 </Avatar>
//                 <Typography component="h1" variant="h5">
//                     Sign up
//                 </Typography>
//                 <form className={classes.form} noValidate>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12} >
//                             <TextField
//                                 autoComplete="rname"
//                                 name="realName"
//                                 variant="outlined"
//                                 required
//                                 fullWidth
//                                 id="realName"
//                                 label="Name"
//                                 autoFocus
//                             />
//                         </Grid>

//                         {/* <Grid item xs={12}>
//                             <TextField
//                                 variant="outlined"
//                                 required
//                                 fullWidth
//                                 id="email"
//                                 label="Email Address"
//                                 name="email"
//                                 autoComplete="email"
//                             />
//                         </Grid> */}
//                         <Grid item xs={12}>
//                             <TextField
//                                 variant="outlined"
//                                 required
//                                 fullWidth
//                                 id="username"
//                                 label="Username"
//                                 name="username"
//                                 autoComplete="username"
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 variant="outlined"
//                                 required
//                                 fullWidth
//                                 name="password"
//                                 label="Password"
//                                 type="password"
//                                 id="password"
//                                 autoComplete="current-password"
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 variant="outlined"
//                                 required
//                                 fullWidth
//                                 id="mobile"
//                                 label="Mobile"
//                                 name="mobile"
//                                 autoComplete="mobile"
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 variant="outlined"
//                                 required
//                                 fullWidth
//                                 id="description"
//                                 label="Description"
//                                 name="description"
//                                 autoComplete="description"
//                             />
//                         </Grid>

//                         <Grid item xs={12}>
//                             <FormControlLabel
//                                 control={<Checkbox value="allowExtraEmails" color="primary" />}
//                                 label="I want to receive inspiration, marketing promotions and updates via email."
//                             />
//                         </Grid>

//                     </Grid>
//                     <Button
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         color="primary"
//                         className={classes.submit}
//                         onClick={registerHandler}
//                     >
//                         Sign Up
//                     </Button>
//                     <Grid container justify="flex-end">
//                         <Grid item>
//                             <Link to="/login" variant="body2">
//                                 Already have an account? Sign in
//                             </Link>
//                         </Grid>
//                     </Grid>
//                 </form>
//             </div>
//             <Box mt={5}>
//                 <Copyright />
//             </Box>
//         </Container>
//     );
// }
