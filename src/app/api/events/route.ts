import { NextResponse, type NextRequest } from "next/server";

import { z } from "zod";

import { db } from "@/db";
import { eventsTable } from "@/db/schema";

// zod is a library that helps us valiTime data at runtime
// it's useful for validating data coming from the client,
// since typescript only valiTimes data at compile time.
// zod's schema syntax is pretty intuitive,
// read more about zod here: https://zod.dev/
const postEventSchema = z.object({
  title: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

// you can use z.infer to get the typescript type from a zod schema
type PostEventRequest = z.infer<typeof postEventSchema>;
export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    postEventSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { title, startTime, endTime} = data as PostEventRequest;
  try {
    const [{id}] = await db
      .insert(eventsTable)
      .values({
        title,
        startTime,
        endTime,
      })
      .returning({id: eventsTable.id})
      .execute();
    return NextResponse.json(
      { id: id },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
