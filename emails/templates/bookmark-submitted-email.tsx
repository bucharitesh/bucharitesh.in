import { Heading, Text, Link } from "@react-email/components";
import EmailText from "../components/email-text";
import EmailBody from "../components/email-body";

export default function BookMarkSubmittedEmail({
  url = "https://example.com",
  email = "contact@bucharitesh.in",
  type = "Other",
}: {
  url: string;
  email: string;
  type?: string;
}) {
  return (
    <EmailBody>
      <Heading className="mx-0 my-7 p-0 text-center text-red-300 text-xl font-semibold">
        New Bookmark Submitted
      </Heading>

      <EmailText>
        A new bookmark has been submitted to your collection!
      </EmailText>

      <div className="my-6 p-4 bg-[#44403c] rounded-lg border border-[#44403c]">
        <EmailText>
          <strong>URL:</strong>{" "}
          <Link 
            href={url} 
            className="text-red-100 underline underline-offset-2"
          >
            {url}
          </Link>
        </EmailText>
        
        <EmailText>
          <strong>Submitted by:</strong> {email}
        </EmailText>
        
        {type && type !== "" && (
          <EmailText>
            <strong>Type:</strong> {type}
          </EmailText>
        )}
        
        <EmailText>
          <strong>Submitted at:</strong> {new Date().toLocaleString()}
        </EmailText>
      </div>

      <EmailText>
        Review this bookmark and consider adding it to your public collection if it's valuable content worth sharing.
      </EmailText>

      <Text className="text-xs text-gray-200 italic mt-4">
        P.S. Another gem for your digital treasure chest! 💎
      </Text>
    </EmailBody>
  );
}
