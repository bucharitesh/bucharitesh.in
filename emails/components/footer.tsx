import { Hr, Link, Tailwind, Text } from "@react-email/components"

export default function Footer({
  email,
  marketing,
  unsubscribe,
}: {
  email: string
  marketing?: boolean
  unsubscribe?: boolean
}) {
  if (marketing) {
    return (
      <Tailwind>
        <Hr className="mx-0 my-6 w-full border border-gray-200" />
        <Text className="text-[12px] leading-6 text-gray-200">
          We send out product update emails once a month – no spam, no nonsense.
          <br />
          Don't want to get these emails?{" "}
          <Link
            className="text-gray-100 underline"
            href="https://app.dub.co/account/settings"
          >
            Unsubscribe here.
          </Link>
        </Text>
      </Tailwind>
    )
  }

  return (
    <Tailwind>
      <Hr className="mx-0 my-6 w-full border border-gray-200" />
      <Text className="text-[12px] leading-6 text-gray-200">
        This email was intended for{" "}
        <span className="text-[#fecdd3]">{email}</span>. If you were not
        expecting this email, you can ignore this email. If you are concerned
        about your account's safety, please reply to this email to get in touch
        with me.
      </Text>

      {unsubscribe && (
        <Text className="text-[12px] leading-6 text-gray-400">
          Don’t want to get these emails?{" "}
          <Link
            className="text-[#f43f5e] underline"
            href="https://app.dub.co/account/settings"
          >
            Adjust your notification settings
          </Link>
        </Text>
      )}
    </Tailwind>
  )
}
