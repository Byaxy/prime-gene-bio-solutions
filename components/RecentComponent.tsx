import React, { ReactElement } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function RecentComponent({
  title,
  path,
  customStyle,
  children,
}: {
  title: string;
  path: string;
  customStyle: string;
  children: ReactElement;
}) {
  const router = useRouter();

  return (
    <Box
      className={`${customStyle} bg-white shadow-sm rounded-xl w-full flex flex-col gap-4 p-5`}
    >
      <Box className="flex flex-row items-start justify-between">
        <Typography className="text-primaryDark text-2xl font-bold">
          {title}
        </Typography>
        <Button
          size="small"
          variant="outlined"
          onClick={() => router.push(`${path}`)}
          className="font-semibold text-primaryDark"
        >
          View All
        </Button>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
}
