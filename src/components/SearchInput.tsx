"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { Input } from "./ui/input";

export default function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <>
      <Input placeholder="搜尋想參加的活動 (按 Enter 以送出)" className="mr-2" ref={inputRef} onKeyDown={(e) => {
        if (e.key == "Enter" && inputRef.current) {
          const params = new URLSearchParams(searchParams);
          params.set("searchString", inputRef.current?.value);
          router.push(`${pathname}?${params.toString()}`)
        }
      }} />
    </>
  )
}
