"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent, DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAttend from "@/hooks/useAttend";
import useEvent from "@/hooks/useEvent";
import useUserInfo from "@/hooks/useUserInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type NameDialogProps = {
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
};
export default function NameDialog({ dialogOpen, setDialogOpen }: NameDialogProps) {
  const handleOpenChange = (open: boolean) => {
    if (open) {
      setDialogOpen(true);
    } else {
      setDialogOpen(false);
      form.reset();
    }
  };
  const FormSchema = z.object({
    eventName: z.string(),
    startTime: z.string(),
    endTime: z.string(),
  });
  const { handle } = useUserInfo();
  const { postEvent } = useEvent();
  const { attendEvent } = useAttend();

  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      eventName: "",
      startTime: "",
      endTime: "",
    }
  });
  const validateForm = (data: z.infer<typeof FormSchema>) => {
    if (data.eventName.trim() === "")
      return 'Title should not be empty';
    if (data.eventName.length > 280)
      return 'Title too long';

    const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}$/;
    if (!dateRegex.test(data.startTime))
      return `Invalid start time
Wrong format: should be YYYY-MM-DD HH. e.g. '0123-04-05 01'`;
    if (!dateRegex.test(data.endTime))
      return `Invalid ending time
Wrong format: should be YYYY-MM-DD HH. e.g. '0123-04-05 06'`;

    const startHour = parseInt(data.startTime.substring(11, 13));
    const endHour = parseInt(data.endTime.substring(11, 13));
    if (startHour < 0 || 24 <= startHour) return `Invalid start time
Wrong format: Hour should be in the range of 0-23`;
    if (endHour < 0 || 24 <= endHour) return `Invalid ending time
Wrong format: Hour should be in the range of 0-23`;

    const validateDateString = (dateString: string) => {
      const [year, month, day] = dateString.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      return date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    }
    if (!validateDateString(data.startTime.substring(0, 10)))
      return "Invalid start date"
    if (!validateDateString(data.endTime.substring(0, 10)))
      return "Invalid ending date"

    const startTime = new Date(data.startTime + ":");
    const endTime = new Date(data.endTime + ":");
    if (startTime >= endTime)
      return 'Start time should be earlier than ending time';
    if ((endTime.getTime() - startTime.getTime()) / (24 * 60 * 60 * 1000) > 7)
      return 'Cannot be longer than 7 days.'
    return 'OK';
  }
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const validationMsg = validateForm(data);
    if (validationMsg === 'OK' && handle) {
      try {
        setLoading(true);
        const id = await postEvent({
          title: data.eventName,
          startTime: data.startTime,
          endTime: data.endTime,
        })
          .then(({ id }) => {
            attendEvent({ handle, eventId: id })
            return id;
          });
        router.push(`/event/${id}/?handle=${handle}`);
      }
      catch (e) {
        console.log(e);
        alert(`Error posting event ${e}`);
      }
      finally {
        setLoading(false);
      }
    }
    else {
      alert(validationMsg);
    }
  }
  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange} >
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>新增活動</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="eventName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="標題" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From</FormLabel>
                  <FormControl>
                    <Input placeholder="YYYY-MM-DD HH" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To</FormLabel>
                  <FormControl>
                    <Input placeholder="YYYY-MM-DD HH" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>新增</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
