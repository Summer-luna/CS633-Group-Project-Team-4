// import { Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Button,Box,TextField} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './home.css'
export const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
  }, []);
  const [tableData,setTableData] = useState(
  [{
      id: '123456',
      name: 'Khushbu Kumari',
      email: 'Khushbu@bu.edu',
    },
    {
      id: '246802',
      name: 'Xinyue Luna',
      email: 'Xinyue@bu.edu',
    },
    {
      id: '369258',
      name: 'Yilin Li',
      email: 'Yilin@bu.edu',
    },
    {
      id: '482604',
      name: 'Nelson Montesinos',
      email: 'Nelson@bu.edu',
    },]
  )
  const [dialogData,setDialogData] = useState({
    id: '',
    email: '',
    name: ''
  })
  const [editIndex, setEditIndex] = useState(null)
  const [open,setOpen] = useState(false)
  const edit = (index) => {
    setOpen(true)
    setDialogData(tableData[index])
    setEditIndex(index)
  }
  const deleteItem = (index) => {
    const cloneData = JSON.parse(JSON.stringify(tableData))
    cloneData.splice(index,1)
    setTableData(cloneData)
  }
  const handlePageTo = () => {
    navigate('/call')
  }
  const handlePageUp = () => {
    navigate('/attend')
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const id = data.get('id')
    const name = data.get('name')
    const email = data.get('email')
    const obj = { id, name, email}
    const cloneData = JSON.parse(JSON.stringify(tableData))
    cloneData.splice(editIndex,1,obj)
    setTableData(cloneData)
    setOpen(false)
    setEditIndex(null)
  }
  const Modal = () => {
    return (<div>
      <Dialog
        open={open}
        onClose={handleClose}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{"Edit"}</DialogTitle>
          <DialogContent style={{paddingTop: '20px'}}>
              <TextField style={{paddingBottom: '20px'}} name="id" fullWidth id="id" label="ID" autoFocus defaultValue={dialogData.id}/>
              <TextField style={{paddingBottom: '20px'}} name="name" fullWidth id="id" label="NAME" autoFocus defaultValue={dialogData.name}/>
              <TextField  name="email" fullWidth id="email" label="EMAIL" autoFocus defaultValue={dialogData.email}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button type='submit' >Agree</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>)
  }
  return (
      <div id="app">
        <div className="header">
          <h1>Introduction To C++</h1>
          <p className='p'>Roster</p>
        </div>
        <div className="content">
          <ul className="title">
            <li>BU ID</li>
            <li>Student Name</li>
            <li>Email</li>
          </ul>
          <ul className="info">
            {tableData.map((item, index) => (
                  <li key={index}>
                    <div className="id">{item.id}</div>
                    <div className="name">{item.name}</div>
                    <div className="email">{item.email}</div>
                    <div className="operate">
                        <ModeEditOutlineOutlinedIcon onClick={() => edit(index)}></ModeEditOutlineOutlinedIcon>
                        <DeleteForeverIcon onClick={() => deleteItem(index)}></DeleteForeverIcon>
                    </div>
                  </li>
                ))}
          </ul>
          <div className="footer">
            <button onClick={handlePageTo}>Take attendance</button>
            <button onClick={handlePageUp}>View attendance</button>
          </div>
        </div>
        <Modal/>
      </div>
  );
};
