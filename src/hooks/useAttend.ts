import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useAttend() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const attendEvent = async ({
        handle,
        eventId,
    }: {
        handle: string;
        eventId: number;
    }) => {
        setLoading(true);
        const res = await fetch("/api/attend", {
            method: "POST",
            body: JSON.stringify({
                handle,
                eventId,
            }),
        });
        if (!res.ok) {
            const body = await res.json();
            throw new Error(body.error);
        }
        router.refresh();
        setLoading(false);
    }

    const leaveEvent = async ({
        handle,
        eventId,
    }: {
        handle: string;
        eventId: number;
    }) => {
        setLoading(true);
        const res = await fetch("/api/attend", {
            method: "DELETE",
            body: JSON.stringify({
                handle,
                eventId,
            }),
        });
        if (!res.ok) {
            const body = await res.json();
            throw new Error(body.error);
        }
        router.refresh();
        setLoading(false);
    }

    return {
        attendEvent,
        leaveEvent,
        loading,
    };
}
