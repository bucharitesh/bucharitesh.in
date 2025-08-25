import { CommandMenu } from "../command-menu/new";
import { ScrollTop } from "../scroll-top";
import BottomDock from "./dock";
import { FloatingHeader } from "./floating-header";

export default function Navigation() {
  return (
    <>
      <FloatingHeader className="block md:hidden" />
      <BottomDock className="hidden md:block " />
      <ScrollTop />
      <CommandMenu />
    </>
  );
}
