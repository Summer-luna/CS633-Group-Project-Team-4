// import { Button, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { Button } from '@mui/material';
import './index.css'
export const Attend = () => {
  const [tableData, setTableData] = useState([
    {
      id: '123456',
      name: 'Khushbu Kumari',
      email: 'Khushbu@bu.edu',
      show: 'Present'
    },
    {
      id: '246802',
      name: 'Xinyue Luna',
      email: 'Xinyue@bu.edu',
      show: 'Present'
    },
    {
      id: '369258',
      name: 'Yilin Li',
      email: 'Yilin@bu.edu',
      show: 'Executed'
    },
    {
      id: '482604',
      name: 'Nelson Montesinos',
      email: 'Nelson@bu.edu',
      show: 'Absent'
    }]
  )
  const formatDate = () => {
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
  const [formattedDate, setFormattedDate] = useState(formatDate())

  const [state, setState] = useState({
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal } = state;
  return (
    <div id='app'>
      <div className="header">
        <h1>Introduction To C++</h1>
        <div className='attend'>
          <p className='attendp'>View attendance for: <span className='attendtime'>{formattedDate}</span></p>
          <Button variant="contained">Display</Button>
        </div>
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
                <Button className={item.show === 'Present' ? 'green' : item.show === 'Executed' ? 'orange' : 'red'}>{item.show}</Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
