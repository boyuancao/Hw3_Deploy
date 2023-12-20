"use client";

import { useEffect, useRef, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

// all components is src/components/ui are lifted from shadcn/ui
// this is a good set of components built on top of tailwindcss
// see how to use it here: https://ui.shadcn.com/
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn, validateHandle } from "@/lib/utils";
import type { Dispatch, SetStateAction } from "react";
type NameDialogProps = {
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
};
export default function NameDialog({ dialogOpen, setDialogOpen }: NameDialogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handleInputRef = useRef<HTMLInputElement>(null);
  const [handleError, setHandleError] = useState(false);

  // show the dialog if the handle is invalid
  useEffect(() => {
    const handle = searchParams.get("handle");
    setDialogOpen(!validateHandle(handle));
  }, [searchParams, setDialogOpen]);

  const handleSave = () => {
    const handle = handleInputRef.current?.value.trim();
    const newHandleError = !validateHandle(handle);

    setHandleError(newHandleError);
    if (newHandleError) return false;

    const params = new URLSearchParams(searchParams);
    params.set("handle", handle!);
    router.push(`${pathname}?${params.toString()}`);
    setDialogOpen(false);
    return true;
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setDialogOpen(true);
    } else {
      handleSave() && setDialogOpen(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>切換使用者</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              使用者名稱：
            </Label>
            <div className="col-span-3 flex items-center gap-2">
              <Input
                placeholder="monkeyman"
                defaultValue={searchParams.get("handle") ?? ""}
                className={cn(handleError && "border-red-500")}
                ref={handleInputRef}
              />
            </div>
            {handleError && (
              <p className="col-span-3 col-start-2 text-xs text-red-500">
                Invalid handle. It must not be empty and should not exceed 50 characters in length.
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>確認</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
