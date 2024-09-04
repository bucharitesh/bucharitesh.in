import { Heading, Link, Section, Text } from "@react-email/components"
import EmailText from "./components/email-text"
import EmailBody from "./components/email-body"

export default function WelcomeEmail({
  email = "contact@bucharitesh.in",
}: {
  email: string
}) {
  return (
    <EmailBody email={email}>
      <Heading className="mx-0 my-7 p-0 text-center text-[#f43f5e] text-xl font-semibold">
        Welcome to Bucharitesh.in
      </Heading>
      <EmailText>Thanks for signing up,</EmailText>
      <EmailText>
        My name is Ritesh, I am excited to have you on board!
      </EmailText>
    </EmailBody>
  )
}
