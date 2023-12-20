import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useAttend() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const commentOnEvent = async ({
        handle,
        eventId,
        content,
    }: {
        handle: string;
        eventId: number;
        content: string;
    }) => {
        setLoading(true);
        const res = await fetch("/api/comment", {
            method: "POST",
            body: JSON.stringify({
                handle,
                eventId,
                content,
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
        commentOnEvent,
        loading,
    };
}
