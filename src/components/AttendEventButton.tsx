"use client";

import { Button } from "@/components/ui/button";
import useAttend from "@/hooks/useAttend";

type AttendEventButtonProp = {
  eventId: number;
  handle: string;
}

export default function AttendEventButton({ eventId, handle }: AttendEventButtonProp) {
  const { attendEvent, loading } = useAttend();
  const handleAttend = () => {
    attendEvent({ eventId: eventId, handle: handle })
  }
  return (
    <>
      <Button
        className="text-gray-700 w-15 h-auto text-xl rounded-lg"
        variant="outline"
        onClick={handleAttend}
        disabled={loading}
      >我要參加</Button>
    </>
  );
}
