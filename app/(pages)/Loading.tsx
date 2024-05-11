import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loading() {
  return (
    <Box className="flex flex-col w-full h-screen justify-center items-center gap-5">
      <CircularProgress size={50} color="primary" />
    </Box>
  );
}
