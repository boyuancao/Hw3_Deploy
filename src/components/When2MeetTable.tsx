"use client"

import { useState } from "react";
import When2MeetCell from "./When2MeetCell";

type When2MeetTableProp = {
  eventId: number;
  handle: string;
  attendeeNum: number[][];
  userAttend: boolean[][];
  readonly: boolean;
  dayCount: number;
  startHour: number;
  endHour: number;
  startDate: Date;
}

export default function When2MeetTable({
  eventId,
  handle,
  attendeeNum,
  userAttend,
  readonly,
  dayCount,
  startHour,
  endHour,
  startDate
}: When2MeetTableProp) {
  const n = 48, m = dayCount;
  const tableRows = [];
  const [mouseOver, setMouseOver] = useState(false);
  const rowHeader = (rowId: number) => {
    return `${Math.floor(rowId / 2)}:${rowId % 2 ? "30" : "00"} ~ ${Math.floor(rowId / 2)}:${rowId % 2 ? "59" : "29"}`
  }

  for (let i = 0; i < n; i++) {
    const rowCells = [<th key={`row-${i}-header`}><p className="w-32">{rowHeader(i)}</p></th>];
    for (let j = 0; j < m; j++) {
      const isBlack = j >= dayCount
        || (j == 0 && Math.floor(i / 2) < startHour)
        || (j + 1 == dayCount && Math.floor(i / 2) >= endHour)
      rowCells.push(
        isBlack ?
          <td
            key={`cell-${i}-${j}`}
            className="h-4 w-20 border-transparent border-4 bg-slate-400"
          />
          : <When2MeetCell
            key={`cell-${i}-${j}`}
            eventId={eventId}
            handle={handle}
            rowId={i}
            colId={j}
            readonly={readonly}
            highlight={mouseOver && userAttend[i][j]}
            attedneeNum={attendeeNum[i][j]}
            userAttend={userAttend[i][j]}
          />
      );
    }
    if (i % 2 == 0) tableRows.push(
      <tr key={`sep-${i}`}>
        <td className="col-span-full"></td>
      </tr>);
    tableRows.push(<tr key={i}>{rowCells}</tr>);
  }
  const colHeader = [<th key="corner-header">time</th>]
  let currentDate = new Date(startDate);
  for (let j = 0; j < m; j++) {
    colHeader.push(<th key={`col-${j}-header`}>{(currentDate).getMonth() + 1}/{currentDate.getDate()}</th>)
    currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
  }

  const bgcolorList = [
    "bg-white",
    "bg-green-400",
    "bg-green-500",
    "bg-green-600",
    "bg-green-700",
    "bg-green-800",
    "bg-green-900",
  ]
  const exampleHeader = []
  const example = [];
  for (let i = 0; i <= 6; i++) {
    exampleHeader.push(<th key={`example-header-${i}`}>{i}</th>)
    example.push(<td
      key={`example-${i}`}
      className={`h-4 w-20 border-transparent border-4 border-black ${bgcolorList[i]}`}
    />)
  }
  return (
    <>
      <table
        onMouseOver={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
        className="bg-gray-200 p-5 m-5 border-separate border-spacing-0 border-4 border-black"
      >
        <thead>
          <tr>{colHeader}</tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
      <table
        className="m-7 border-spacing-0"
      >
        <thead>
          <tr>{exampleHeader}</tr>
        </thead>
        <tbody>
          <tr>{example}</tr>
        </tbody>
      </table>
    </>

  );
}
