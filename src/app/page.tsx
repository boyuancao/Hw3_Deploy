
import EventDigest from "@/components/EventDigest";
import NewEventButton from "@/components/NewEventButton";
import SearchInput from "@/components/SearchInput";
import UserInfoHeader from "@/components/UserInfoHeader";
import { db } from "@/db";
import { eventsTable, usersTable } from "@/db/schema";
type HomePageProps = {
  searchParams: {
    handle?: string;
    searchString?: string;
  };
};

// Since this is a server component, we can do some server side processing
// in the react component. This may seem crazy at first, but it's actually
// a very powerful feature. It allows us to do the data fetching and rendering
// the page in the same place. It may seem weird to run react code on the server,
// but remember, react is not just for the browser, react-dom is. React is just
// the shadow dom and state update logic. We can use react to render anything,
// any where. There are already libraries that use react to render to the terminal,
// email, PDFs, native mobile apps, 3D objects and even videos.
export default async function Home({
  searchParams: { handle, searchString },
}: HomePageProps) {
  // read the  handle from the query params and insert the user
  // if needed.
  if (handle) {
    await db
      .insert(usersTable)
      .values({
        handle,
      })
      .onConflictDoNothing()
      .execute();
  }

  const events = await db
    .select({
      id: eventsTable.id,
      title: eventsTable.title
    })
    .from(eventsTable)
    .execute();

  return (
    <>
      <div className="h-screen w-full overflow-scroll">
        <UserInfoHeader />
        <div className="w-full flex mb-2">
          <SearchInput />
          <NewEventButton />
        </div>
        <div className="flex flex-col gap-2">
          {events.map((event) => (
            event.title.includes(searchString ?? "") ?
              <EventDigest
                key={event.id}
                id={event.id}
                handle={handle}
              /> : <></>
          ))}
        </div>
      </div>
    </>
  );
}
