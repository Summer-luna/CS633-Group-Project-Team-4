import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Fragment } from 'react';

export const StudentTable = ({ rows, tableConfig }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {tableConfig.map((config) => {
              if (config.header) {
                return (
                  <TableCell key={config.field}>
                    <Fragment key={config.field}>{config.header()}</Fragment>
                  </TableCell>
                );
              }

              return (
                <TableCell key={config.field} sx={{ color: '#265792', borderBottom: '1px solid #265792' }}>
                  {config.name}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {tableConfig.map((config) => (
                <TableCell key={config.field} sx={{ borderBottom: '1px solid black' }}>
                  {config.render(row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
