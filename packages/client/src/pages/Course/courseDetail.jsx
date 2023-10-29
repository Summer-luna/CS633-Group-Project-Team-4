import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { StudentTable } from './studentTable.jsx';
import { Delete } from '@mui/icons-material';
import { useEffect } from 'react';

const rows = [
  {
    id: '123456',
    name: 'Khushbu Kumari',
    email: 'Khushbu@bu.edu'
  },
  {
    id: '246802',
    name: 'Xinyue Luna',
    email: 'Xinyue@bu.edu'
  },
  {
    id: '369258',
    name: 'Yilin Li',
    email: 'Yilin@bu.edu'
  },
  {
    id: '482604',
    name: 'Nelson Montesinos',
    email: 'Nelson@bu.edu'
  }
];

export const Students = ({ name }) => {
  useEffect(() => {});
  const tableConfig = [
    {
      field: 'id',
      name: 'BU ID',
      render: (row) => row.id
    },
    {
      field: 'name',
      name: 'Student Name',
      render: (row) => row.name
    },
    {
      field: 'email',
      name: 'Email',
      render: (row) => row.email
    },
    {
      field: 'actions',
      name: 'Actions',
      render: () => (
        <Tooltip title="Delete">
          <IconButton>
            <Delete sx={{ color: '#265792' }} />
          </IconButton>
        </Tooltip>
      )
    }
  ];
  return (
    <Stack>
      <Stack>
        <Typography variant="h4">{name}</Typography>
        <Typography variant="body1">Roster</Typography>
      </Stack>
      <StudentTable tableConfig={tableConfig} rows={rows} />
    </Stack>
  );
};
