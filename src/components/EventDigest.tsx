import {
  Card,
  CardContent
} from "@/components/ui/card";
import { db } from "@/db";
import { attendeesTable, eventsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  Check
} from "lucide-react";
import Link from "next/link";

type EventDigestProp = {
  id: number;
  handle?: string;
};

export default async function EventDigest({
  id,
  handle,
}: EventDigestProp) {
  const attendees = await db
    .select({ handle: attendeesTable.handle })
    .from(attendeesTable)
    .where(eq(attendeesTable.eventId, id))
    .execute();
  const attendeeHandles = attendees.map(data => data.handle);
  const userAttend = attendeeHandles.includes(handle ?? "");
  const [event] = await db
    .select({
      id: eventsTable.id,
      title: eventsTable.title,
    })
    .from(eventsTable)
    .where(eq(eventsTable.id, id))
    .execute();

  return (
    <Link
      href={{
        pathname: `/event/${id}`,
        query: { handle },
      }}
    >
      <Card className="w-full">
        <CardContent className="p-0">
          <div className="flex text-xl h-auto py-5">
            <h1 className="h-auto w-3/4 my-auto ml-4 break-all">{event.title}</h1>
            <div className="flex ml-auto">
              {userAttend && <Check className="h-auto w-10 mr-4" color="#15c618" />}
              <p className="h-auto my-auto mr-4"> {attendees.length} 人參加</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
