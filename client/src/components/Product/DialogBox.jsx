// import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, Rating, TextField, Typography } from '@mui/material'
// import Close from "@mui/icons-material/Close"
// import styles from "./DialogBox.module.scss"
// import React from 'react'

// function DialogBox({open, handleClose}) {
//   return (
//     <Dialog
//     open={open}
//     handleClose={handleClose}
//     fullWidth={true}
//     maxWidth="md"
//     styles={{ paper: styles.dialog }}
//   >
//     <DialogTitle>
//       <Grid container justify="space-between" alignItems="center">
//         <Grid >
//           <Typography variant="h5" className={styles.header}>
//             Write your review
//           </Typography>
//         </Grid>
//         <Grid item>
//           <IconButton onClick={handleClose}>
//             <Close />
//           </IconButton>
//         </Grid>
//       </Grid>
//     </DialogTitle>
//     <DialogContent className={styles.dialogContent}>
//       <Typography variant="body1" className={styles.subHeadings}>
//         *All fields are required unless marked optional.
//       </Typography>
//       <Box mt={2}>
//         <Typography variant="body1" className={styles.bodyText}>
//           Title
//         </Typography>
//         <TextField
//           fullWidth
//           variant="outlined"
//           placeholder="Enter title here"
//           // value={title}
//           // onChange={handleTitleChange}
//           className={styles.textField}
//         />
//       </Box>
//       <Box mt={2}>
//         <Typography variant="body1" className={styles.bodyText}>
//           Description
//         </Typography>
//         <TextField
//           fullWidth
//           variant="outlined"
//           placeholder="Enter description here"
//           multiline
//           rows={4}
//           // value={comment}
//           // onChange={handleDescriptionChange}
//           className={styles.textField}
//         />
//       </Box>
//       <Box mt={2}>
//         <Typography variant="body1" className={styles.bodyText}>
//           Rating
//         </Typography>
//         <Rating
//           name="rating"
//           // value={ratings}
//           // onChange={handleRatingChange}
//           precision={0.5}
//           className={styles.star}
//         />
//       </Box>
//       <Box mt={2}>
//         <FormControl component="fieldset">
//           <FormLabel
//             component="legend"
//             style={{ fontSize: "14px", color: "#414141", fontWeight: "500" }}
//           >
//             Would you recommend this product?
//           </FormLabel>
//           <RadioGroup
//             aria-label="recommendation"
//             name="recommendation"
//             // value={recommend}
//             // onChange={handleRecommendChange}
//           >
//             <FormControlLabel
//               value="yes"
//               control={<Radio color="black" />}
//               label="Yes"
//             />
//             <FormControlLabel
//               value="no"
//               control={<Radio color="black" />}
//               label="No"
//             />
//           </RadioGroup>
//         </FormControl>
//       </Box>

//       <DialogActions>
//         <Button
//           variant="outlined"
//           // onClick={handleSubmit}
//           className={styles.submitBtn}
//         >
//           Submit
//         </Button>
//       </DialogActions>
//     </DialogContent>
//   </Dialog>

//   )
// }

// export default DialogBox

import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./DialogBox.module.scss";

function DialogBox({ open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose} // Corrected prop name
      fullWidth={true}
      maxWidth="md"
      classes={{ paper: styles.dialog }} // Corrected class usage
    >
      <DialogTitle>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h5" className={styles.header}>
              Write your review
            </Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent className={styles.dialogContent}>
        <Typography variant="body1" className={styles.subHeadings}>
          *All fields are required unless marked optional.
        </Typography>
        <Box mt={2}>
          <Typography variant="body1" className={styles.bodyText}>
            Title
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter title here"
            className={styles.textField}
          />
        </Box>
        <Box mt={2}>
          <Typography variant="body1" className={styles.bodyText}>
            Description
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter description here"
            multiline
            rows={4}
            className={styles.textField}
          />
        </Box>
        <Box mt={2}>
          <Typography variant="body1" className={styles.bodyText}>
            Rating
          </Typography>
          <Rating name="rating" precision={0.5} className={styles.star} />
        </Box>
        <Box mt={2}>
          <FormControl component="fieldset">
            <FormLabel
              component="legend"
              style={{ fontSize: "14px", color: "#414141", fontWeight: "500" }}
            >
              Would you recommend this product?
            </FormLabel>
            <RadioGroup aria-label="recommendation" name="recommendation">
              <FormControlLabel
                value="yes"
                control={<Radio color="primary" />} // Corrected color prop
                label="Yes"
              />
              <FormControlLabel
                value="no"
                control={<Radio color="primary" />} // Corrected color prop
                label="No"
              />
            </RadioGroup>
          </FormControl>
        </Box>

        <DialogActions>
          <Button variant="outlined" className={styles.submitBtn}>
            Submit
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default DialogBox;
