import { NextResponse, type NextRequest } from "next/server";

import { z } from "zod";
import { db } from "@/db";
import { commentsTable } from "@/db/schema";

const commentOnEventSchema = z.object({
  eventId: z.number().positive(),
  handle: z.string(),
  content: z.string(),
});

type CommentOnEventRequest = z.infer<typeof commentOnEventSchema>;
export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    commentOnEventSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { eventId, handle, content } = data as CommentOnEventRequest;
  return db.insert(commentsTable)
    .values({
      eventId: eventId,
      handle: handle,
      content: content,
    })
    .then(() => new NextResponse("OK", { status: 200 }))
    .catch((error) => {
      console.log(error);
      return NextResponse.json(
        { error: "Something went wrong 1" },
        { status: 500 },
      );
    });
}

