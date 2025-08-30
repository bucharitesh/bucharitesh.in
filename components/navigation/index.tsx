import { HedgehogBuddyWithLogic } from "@/archive/components/hedgehog/buddy-with-logic";
import { ScrollTop } from "../scroll-top";
import BottomDock from "./dock";
import { FloatingHeader } from "./floating-header";
import HedgehogConfig from "../layout/hedge-hog-config";

export default function Navigation() {
  return (
    <>
      <FloatingHeader className="block md:hidden" />
      <BottomDock className="hidden md:block " />
      <ScrollTop />
      <HedgehogBuddyWithLogic />
      <HedgehogConfig />
    </>
  );
}
