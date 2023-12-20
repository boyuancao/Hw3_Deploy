"use client";

import { Button } from "@/components/ui/button";
import useAttend from "@/hooks/useAttend";

type LeaveEventButtonProp = {
  eventId: number;
  handle: string;
}

export default function LeaveEventButton({ eventId, handle }: LeaveEventButtonProp) {
  const { leaveEvent, loading } = useAttend();
  const handleLeave = () => {
    leaveEvent({ eventId: eventId, handle: handle })
  }

  return (
    <>
      <Button
        className="bg-lime-500 hover:bg-lime-600 text-stone-900 rounded-lg w-15 h-auto text-xl"
        variant="outline"
        onClick={handleLeave}
        disabled={loading}
      >我已參加</Button>
    </>
  );
}
