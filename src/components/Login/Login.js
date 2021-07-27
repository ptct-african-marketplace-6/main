import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import axiosWithAuth from '../../common/helpers/axiosWithAuth'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function Login(props) {
  // Will be true if bootstrap is loaded, false otherwise
  const classes = useStyles()
  const { push } = useHistory()

  const [disabledButton, setDisabledButton] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    isOwner: false,
  })

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    isOwner: '',
  })

  const formSchema = yup.object().shape({
    username: yup
      .string()
      .required('Please include your name.')
      .min(6, 'Name must be at least 6 characters long'),
    email: yup
      .string()
      .email('Please include your email address.')
      .required('Must include email address.'),
    password: yup
      .string()
      .required('Password is Required')
      .min(6, 'Passwords must be at least 6 characters long.'),
    isOwner: yup.bool(),
  })

  const setFormErrors = (variable, value) => {
    yup
      .reach(formSchema, variable)
      .validate(value)
      .then(() => setErrors({ ...errors, [variable]: '' }))
      .catch((err) => setErrors({ ...errors, [variable]: err.errors[0] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    axiosWithAuth()
      .post('auth/register', formData)
      .then((res) => {
        console.log(res.data)
        localStorage.setItem('token', formData.password)
        // setFormData({
        //   username: formData.username
        // })
        push('/')
      })
      .catch((err) => {
        console.log({ err })
      })
  }

  const handleChange = (e) => {
    const { type } = e.target
    console.log('TYPE', type)
    const valueToUse = type === 'checkbox' ? 'checked' : 'value'
    setFormData({
      ...formData,
      [e.target.name]: e.target[valueToUse],
    })
    console.log('FORM DATA', formData)
    console.log('E.TARGET.VALUETOUSE', e.target[valueToUse])

    setFormErrors(e.target.name, e.target[valueToUse])
  }

  useEffect(() => {
    formSchema.isValid(formData).then((valid) => setDisabledButton(!valid))
  })

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='user'
                name='username'
                variant='outlined'
                required
                fullWidth
                id='username'
                label='Name'
                value={formData.username}
                onChange={handleChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email'
                value={formData.email}
                onChange={handleChange}
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='password'
                value={formData.password}
                onChange={handleChange}
                label='Password'
                name='password'
                autoComplete='password'
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.isOwner}
                    name='isOwner'
                    onChange={handleChange}
                    color='primary'
                  />
                }
                label="I'm an Owner"
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            disabled={disabledButton}
            className={classes.submit}
            onClick={handleSubmit}
          >
            Login
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='/sign-up' variant='body2'>
                New around here? Sign up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}
