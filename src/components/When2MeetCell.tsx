"use client";

import useMeetTime from "@/hooks/useMeetTime";

type When2MeetCellProp = {
  eventId: number;
  handle: string;
  rowId: number;
  colId: number;
  userAttend: boolean;
  attedneeNum: number;
  readonly: boolean;
  highlight: boolean;
}

export default function When2MeetCell({
  eventId,
  handle,
  rowId, colId,
  userAttend,
  attedneeNum,
  readonly,
  highlight,
}: When2MeetCellProp) {

  const { addMeetTime, removeMeetTime } = useMeetTime();
  const handleCellClick = () => {
    if (readonly) return;
    if (userAttend) removeMeetTime({ handle, eventId, rowId, colId });
    else addMeetTime({ handle, eventId, rowId, colId });
  };
  const bgcolorList = [
    "bg-white",
    "bg-green-400",
    "bg-green-500",
    "bg-green-600",
    "bg-green-700",
    "bg-green-800",
    "bg-green-900",
  ]

  return (
    <td
      className={
        `h-4 w-20
        ${highlight ? "border-pink-700 border-4" : "border-transparent border-4"} border-solid
        ${bgcolorList[Math.min(attedneeNum, bgcolorList.length - 1)]}`}
      onClick={() => handleCellClick()}>
    </td>
  );

}
