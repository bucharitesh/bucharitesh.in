import { Text } from "@react-email/components";

export default function EmailText({ children }: { children: React.ReactNode }) {
  return <Text className="text-sm leading-6 text-text-red-100">{children}</Text>;
}
