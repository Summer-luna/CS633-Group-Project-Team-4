import { Button, Dialog, DialogActions, DialogContent, Stack, Typography } from '@mui/material';

export const AttendanceDialog = ({ open, onClose, setFinished }) => {
  const handleFinish = () => {
    setFinished(true);
    onClose();
  };

  const handleMinimize = () => {
    setFinished(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={'sm'}>
      <DialogContent>
        <Stack>
          <Typography
            align={'center'}
            variant={'h5'}
            sx={{
              padding: 2
            }}
          >
            Attendance Code:
          </Typography>

          <Typography
            align={'center'}
            variant={'h2'}
            sx={{
              color: '#265792',
              fontWeight: 'bold'
            }}
          >
            1234
          </Typography>

          <Typography
            align={'center'}
            variant={'body1'}
            sx={{
              padding: 2
            }}
          >
            Enter the above code into the ClassGuardian now
          </Typography>

          <Typography
            align={'center'}
            variant={'body1'}
            sx={{
              paddingTop: 2,
              fontWeight: 'bold'
            }}
          >
            Enter Join Code
          </Typography>

          <Typography
            align={'center'}
            variant={'h4'}
            sx={{
              color: '#265792',
              fontWeight: 'light'
            }}
          >
            654321
          </Typography>

          <Typography align={'center'}>to join this course.</Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleMinimize}
          variant="contained"
          sx={{
            background: '#265792',
            color: 'white',
            fontWeight: 'bold'
          }}
        >
          Minimize and keep open
        </Button>

        <Button
          variant="contained"
          sx={{
            background: '#265792',
            color: 'white',
            fontWeight: 'bold'
          }}
          onClick={handleFinish}
          autoFocus
        >
          Finish
        </Button>
      </DialogActions>
    </Dialog>
  );
};
