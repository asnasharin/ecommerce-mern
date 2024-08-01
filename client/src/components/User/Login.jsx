import React from 'react'
import {
    Avatar,
    TextField,
    Typography,
    Button,
    Checkbox,
    FormControlLabel,
    Grid
    
} from "@mui/material"
import styles from "./formStyle.module.scss"
import LockOutLinedIcon from "@mui/icons-material/LockOutlined"
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className={styles.formContainer}>
        <form className={styles.form} >
          <Avatar className={styles.avatar} >
            <LockOutLinedIcon />
          </Avatar>
        <Typography variant='h5' style={{ fontWeight: 'bold'}} className={styles.heading}>
                Login in to your Account
            </Typography>

            <TextField 
            label="Email" 
            variant="outlined"
            fullWidth
            className={styles.textfield}
            
            />
            <TextField 
            label="Password" 
            variant="outlined"
            fullWidth
            className={styles.textfield}
            
            />
           
            <Grid
              container
              className={styles.gridcheckbox}
              justify="flex-start"
              alignItems="center"
            >
              <Grid item>
                <FormControlLabel
                  control={<Checkbox />}
                  label="I Accept The Terms Of Use"
                  className={styles.checkbox}
                />
              </Grid>
            </Grid>

            <Typography
              variant="body2"
              className={styles.termsAndConditionsText}
            >
              I acknowledge will use my information in accordance
              with its
              <Link href="#" className={styles.privacyText}>
                Privacy Policy.
              </Link>
            </Typography>
            <Button
            component="span"
            variant='contained' 
            fullWidth
            className={styles.signupbtn}
            >
                 Login in
            </Button>
            <Typography
              variant="body1"
              align="center"
              style={{ marginTop: "1rem" }}
            >
              create an account?
              <Link to="/signup" className={styles.createaccount}>
                signup
              </Link>
            </Typography>
        </form>   
    </div>
  )
}

export default Login