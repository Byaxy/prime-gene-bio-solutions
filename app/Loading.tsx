import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loading() {
  return (
    <Box className="flex flex-col w-full h-full justify-center items-center py-8">
      <CircularProgress size={40} color="primary" />
    </Box>
  );
}
