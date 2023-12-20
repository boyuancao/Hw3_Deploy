import { db } from "@/db";
import { eq } from "drizzle-orm";

import { meetTimesTable } from "@/db/schema";
import When2MeetTable from "./When2MeetTable";

type When2MeetProp = {
  eventId: number;
  handle: string;
  startTime: string;
  endTime: string;
  readonly: boolean;
}

export default async function When2Meet({ eventId, handle, readonly, startTime, endTime }: When2MeetProp) {
  const n = 48, m = 8;
  const meetTimes = await db
    .select({ handle: meetTimesTable.handle, rowId: meetTimesTable.rowId, colId: meetTimesTable.colId })
    .from(meetTimesTable)
    .where(eq(meetTimesTable.eventId, eventId))
    .execute();

  const attendeeNum: number[][] = new Array(n);
  for (let i = 0; i < n; i++) {
    attendeeNum[i] = new Array(m).fill(0);
  }
  const userAttend: boolean[][] = new Array(n);
  for (let i = 0; i < n; i++) {
    userAttend[i] = new Array(m).fill(false);
  }
  meetTimes.map((meetTime) => {
    const { rowId, colId } = meetTime;
    attendeeNum[rowId][colId]++;
    if (meetTime.handle == handle)
      userAttend[rowId][colId] = true;
  })

  const startDate = new Date(startTime.substring(0, 10));
  const endDate = new Date(endTime.substring(0, 10));
  const dayCount = (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000) + 1;
  const startHour = parseInt(startTime.substring(11, 13));
  const endHour = parseInt(endTime.substring(11, 13));
  return (
    <When2MeetTable
      eventId={eventId}
      handle={handle}
      attendeeNum={attendeeNum}
      userAttend={userAttend}
      readonly={readonly}
      dayCount={dayCount}
      startHour={startHour}
      endHour={endHour}
      startDate={startDate}
    />
  );
}
