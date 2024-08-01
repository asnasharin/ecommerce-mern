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
import CloudUploadIcon from "@mui/icons-material/CloudUploadOutlined"
import { Link } from 'react-router-dom'

function SignUp() {
  return (
    <div className={styles.formContainer}>
        <form className={styles.form} >
          <Avatar className={styles.avatar} >
            <LockOutLinedIcon />
          </Avatar>
        <Typography variant='h5' style={{ fontWeight: 'bold'}} className={styles.heading}>
                Create an Account
            </Typography>
        <div className={styles.root}>
              <Avatar
                alt="Avatar Preview"
                src=""
                className={styles.avatar2}
              />
              <input
                accept="image/*"
                className={styles.input}
                id="avatar-input"
                type="file"

              />
              <label htmlFor="avatar-input">
                <Button
                  variant="contained"
                  startIcon={<CloudUploadIcon style={{ color: "#FFFFFF" }} />}
                  component="span"
                  className={styles.uploadAvatarButton}
                >
                  <p className={styles.uploadAvatarText}>Upload Photo</p>
                </Button>
              </label>
            </div>
            <TextField 
            label="Name" 
            variant="outlined"
            fullWidth
            className={styles.textfield}

            />
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
            <TextField 
            label="Confirm Password" 
            variant="outlined"
            fullWidth
            className= {styles.textfield}
            
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
                Create Account
            </Button>
            <Typography
              variant="body1"
              align="center"
              style={{ marginTop: "1rem" }}
            >
              Already have an account?
              <Link to="/login" className={styles.createaccount}>
                Login
              </Link>
            </Typography>
        </form>   
    </div>
  )
}

export default SignUp