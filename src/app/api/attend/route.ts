import { NextResponse, type NextRequest } from "next/server";

import { z } from "zod";
import { db } from "@/db";
import { attendeesTable, meetTimesTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";

// zod is a library that helps us valiTime data at runtime
// it's useful for validating data coming from the client,
// since typescript only valiTimes data at compile time.
// zod's schema syntax is pretty intuitive,
// read more about zod here: https://zod.dev/
const attendEventSchema = z.object({
  eventId: z.number().positive(),
  handle: z.string(),
});

// you can use z.infer to get the typescript type from a zod schema
type AttendEventRequest = z.infer<typeof attendEventSchema>;
export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    attendEventSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { eventId, handle } = data as AttendEventRequest;
  return db.insert(attendeesTable)
    .values({
      eventId: eventId,
      handle: handle,
    })
    .onConflictDoNothing()
    .then(() => new NextResponse("OK", { status: 200 }))
    .catch((error) => {
      console.log(error);
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 },
      );
    });
}

export async function DELETE(request: NextRequest) {
  const data = await request.json();
  try {
    attendEventSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { eventId, handle } = data as AttendEventRequest;
  await db.delete(meetTimesTable)
    .where(
      and(
        eq(meetTimesTable.eventId, eventId),
        eq(meetTimesTable.handle, handle),
      ))
    .execute()
    .catch(() => { });

  return db.delete(attendeesTable)
    .where(
      and(
        eq(attendeesTable.eventId, eventId),
        eq(attendeesTable.handle, handle),
      ))
    .execute()
    .then(() => new NextResponse("OK", { status: 200 }))
    .catch((error) => {
      console.log(error);
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 },
      );
    });
}
