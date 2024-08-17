import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      onClick={router.back}
      variant="contained"
      className="flex flex-row items-center justify-center gap-1 bg-primaryColor/95 text-white hover:bg-primaryColor"
    >
      <ArrowBackIcon />
      <span className="text-white font-medium capitalize sm:text-lg">Back</span>
    </Button>
  );
};

export default BackButton;
