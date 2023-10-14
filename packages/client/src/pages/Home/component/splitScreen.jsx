import { Stack, styled } from '@mui/material';

const Pane = styled('div')(({ weight }) => ({
  flex: weight
}));

// eslint-disable-next-line react/prop-types
export const SplitScreen = ({ children, leftWeight = 1, rightWeight = 1, direction }) => {
  const [left, right] = children;

  return (
    <Stack direction={direction}>
      <Pane weight={leftWeight}>{left}</Pane>
      <Pane weight={rightWeight}>{right}</Pane>
    </Stack>
  );
};
