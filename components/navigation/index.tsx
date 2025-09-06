import { BuddyBuddyWithLogic } from "@/components/buddy/buddy-with-logic";
import { ScrollTop } from "../scroll-top";
import BottomDock from "./dock";
import BuddyConfig from "../layout/hedge-hog-config";

export default function Navigation() {
  return (
    <>
      <BottomDock className="hidden lg:block" />
      <ScrollTop />
      <BuddyBuddyWithLogic />
      <BuddyConfig />
      {/* <CommandMenu /> */}
    </>
  );
}
