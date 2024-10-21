import { auth } from "@/lib/auth";
import { SignIn, SignOut } from "./buttons";
import { SubmitButton } from "./submit-button";
import { saveGuestbookEntry } from "@/lib/db/guestbook";

export async function Form() {
  let session = await auth();

  if (!session?.user) {
    return <SignIn />;
  }

  return (
    <>
      <form className="relative max-w-[500px]" action={saveGuestbookEntry}>
        <div className="relative mb-4 w-full">
          <textarea
            aria-label="Your message"
            placeholder="Your message..."
            name="entry"
            required
            className="pl-4 pr-32 py-2 mt-1 focus:ring-primary focus:border-primary block w-full border-primary rounded-md bg-primary text-primary"
          />
          <span className="absolute -bottom-px right-px h-px w-[40%] bg-gradient-to-r from-primary-400/0 via-primary-400/40 to-primary-400/0"></span>
          <span className="absolute -left-px top-4 h-[40%] w-px bg-gradient-to-b from-primary-400/0 via-primary-400/40 to-primary-400/0"></span>
        </div>
        <div className="flex gap-4 items-center">
          <SubmitButton />
          <SignOut />
        </div>
      </form>
    </>
  );
}
