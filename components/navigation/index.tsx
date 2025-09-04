import { BuddyBuddyWithLogic } from "@/components/buddy/buddy-with-logic";
import { ScrollTop } from "../scroll-top";
import BottomDock from "./dock";
import { FloatingHeader } from "./floating-header";
import BuddyConfig from "../layout/hedge-hog-config";
// import { CommandMenu } from "../command-menu";

export default function Navigation() {
  return (
    <>
      <FloatingHeader className="block md:hidden" />
      <BottomDock className="hidden md:block " />
      <ScrollTop />
      <BuddyBuddyWithLogic />
      <BuddyConfig />
      {/* <CommandMenu /> */}
    </>
  );
}
