"use client";

import { Input } from "@/components/ui/input";
import useComment from "@/hooks/useComment";
import { useRef } from "react";

type CommentInputProp = {
  eventId: number;
  handle: string;
}

export default function CommentInput({ eventId, handle }: CommentInputProp) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { commentOnEvent } = useComment();
  return (
    <>
      <Input placeholder={`${handle} 留下你的想法`} ref={inputRef} onKeyDown={(e) => {
        if (e.key == "Enter" && inputRef.current) {
          commentOnEvent({ handle, eventId, content: inputRef.current.value });
          inputRef.current.value = "";
        }
      }} />
    </>
  );
}
