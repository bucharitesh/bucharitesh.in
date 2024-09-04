import {
  Text,
} from "@react-email/components"

export default function EmailText({ children }: { children: React.ReactNode }) {
  return <Text className="text-sm leading-6 text-[#fecdd3]">{children}</Text>
}