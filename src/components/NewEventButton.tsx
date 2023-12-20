"use client";

import NewEventDialog from "@/components/NewEventDialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function NewEventButton() {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      <Button
        className="text-gray-700 text-xl w-1/12 ml-auto my-auto"
        variant="outline"
        onClick={() => { setDialogOpen(true) }}
      >新增</Button>
      <NewEventDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </>
  );
}
