import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useEvent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const postEvent = async ({
    title,
    startTime,
    endTime,
  } : {
    title: string;
    startTime: string;
    endTime: string;
  }) => {
    setLoading(true);
    const res = await fetch("/api/events", {
      method: "POST",
      body: JSON.stringify({
        title,
        startTime,
        endTime,
      }),
    });
    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }
    router.refresh();
    setLoading(false);
    return res.json();
  }
  return {
    postEvent,
    loading,
  };
}
