"use client";

import { Button } from "@/components/ui/button";
import useUserInfo from "@/hooks/useUserInfo";
import { useState } from "react";
import NameDialog from "./NameDialog";

export default function UserInfoHeader() {
  const { handle } = useUserInfo();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div className="mx-auto .h-8 w-full flex justify-between my-5">
        <p className="text-gray-700 text-4xl">{handle ?? "guest"}</p>
        <Button
          className="text-gray-700 text-xl h-full"
          variant="outline"
          onClick={() => { setDialogOpen(true) }}
        >切換使用者</Button>
      </div>
      <NameDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </>
  );
}
