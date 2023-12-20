import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useMeetTime() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const addMeetTime = async ({
        handle, eventId, rowId, colId,
    }: {
        handle: string; eventId: number; rowId: number; colId: number;
    }) => {
        setLoading(true);
        const res = await fetch("/api/meetTime", {
            method: "POST",
            body: JSON.stringify({
                handle, eventId, rowId, colId,
            }),
        });
        if (!res.ok) {
            const body = await res.json();
            throw new Error(body.error);
        }
        router.refresh();
        setLoading(false);
    }

    const removeMeetTime = async ({
        handle, eventId, rowId, colId,
    }: {
        handle: string; eventId: number; rowId: number; colId: number;
    }) => {
        setLoading(true);
        const res = await fetch("/api/meetTime", {
            method: "DELETE",
            body: JSON.stringify({
                handle, eventId, rowId, colId,
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
        addMeetTime,
        removeMeetTime,
        loading,
    };
}
