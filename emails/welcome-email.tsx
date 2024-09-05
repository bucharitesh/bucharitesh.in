import { Heading, Text } from "@react-email/components"
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

      <EmailText>Thanks for subscribing!</EmailText>

      <EmailText>
        My name is Ritesh, I am excited to have you on board!
      </EmailText>

      <EmailText>
        Thank you for joining our community of tech enthusiasts and creative
        minds. I'm excited to have you on board and look forward to sharing
        valuable insights, innovative ideas, and thought-provoking content with
        you.
      </EmailText>

      <Text className="text-xs text-[#f87171] italic mt-2">
        P.S. If you ever feel like unsubscribing, just remember: every time
        someone leaves, I eat a tub of ice cream. Think of my waistline! 🍦
      </Text>
    </EmailBody>
  )
}
