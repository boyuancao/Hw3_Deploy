import { NextResponse, type NextRequest } from "next/server";

import { z } from "zod";
import { db } from "@/db";
import { meetTimesTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";

// zod is a library that helps us valiTime data at runtime
// it's useful for validating data coming from the client,
// since typescript only valiTimes data at compile time.
// zod's schema syntax is pretty intuitive,
// read more about zod here: https://zod.dev/
const meetTimeSchema = z.object({
  eventId: z.number().positive(),
  handle: z.string(),
  rowId: z.number().nonnegative(),
  colId: z.number().nonnegative(),
});

// you can use z.infer to get the typescript type from a zod schema
type meetTimeRequest = z.infer<typeof meetTimeSchema>;
export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    meetTimeSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { eventId, handle, rowId, colId } = data as meetTimeRequest;
  return db.insert(meetTimesTable)
    .values({ eventId, handle, rowId, colId })
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
    meetTimeSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { eventId, handle, rowId, colId } = data as meetTimeRequest;
  return db.delete(meetTimesTable)
    .where(
      and(
        eq(meetTimesTable.eventId, eventId),
        eq(meetTimesTable.handle, handle),
        eq(meetTimesTable.rowId, rowId),
        eq(meetTimesTable.colId, colId),
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
