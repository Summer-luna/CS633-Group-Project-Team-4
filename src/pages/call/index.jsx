// import { Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Button,Box,TextField,Alert,Snackbar} from '@mui/material';
import './index.css'
export const Call = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  }
  const formatDate = ()=> {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; 
    const year = currentDate.getFullYear();
    if (day < 10) {
      day = '0' + day;
    }
    if (month < 10) {
      month = '0' + month;
    }

    const formattedDate = month + '/' + day + '/' + year;
    return formattedDate
  }
  const [formattedDate,setFormattedDate] = useState(formatDate())
  const send = (e) => {
    setOpen(true);
  }
  const [state, setState] = useState({
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal } = state;
  return (
    <div id='app'> 
      <div className="header">
        <h1>Introduction To C++ </h1>
        <div className='callP'>{formattedDate}</div>
      </div>
      <div className="callcontent">
        <Box component="form" sx={{  
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}>
            <TextField style={{paddingBottom: '20px'}} id="id" label="Attendance Code" autoFocus />
            <TextField style={{paddingBottom: '20px'}} id="id" label="Enter time limit" autoFocus />
            <Button variant="contained" onClick={send}>Send Code</Button>
        </Box>
        <Snackbar anchorOrigin={{ vertical, horizontal }} autoHideDuration={2000} open={open} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            This is a success message!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};
