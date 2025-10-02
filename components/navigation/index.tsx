import BottomDock from './dock';
import dynamic from 'next/dynamic';



// const CommandMenu = dynamic(() =>
//   import("@/features/command-menu/components/command-menu").then((mod) => mod.CommandMenu)
// );

// const BuddyConfig = dynamic(() =>
//   import("@/components/layout/hedge-hog-config").then((mod) => mod.default)
// );

// const BuddyBuddyWithLogic = dynamic(() =>
//   import("@/features/buddy/buddy-with-logic").then((mod) => mod.BuddyBuddyWithLogic)
// );

const ScrollTop = dynamic(() =>
  import("@/components/scroll-top").then((mod) => mod.ScrollTop)
);

export default function Navigation() {
  return (
    <>
      <BottomDock className="hidden lg:block" />
      <ScrollTop />
      {/* <BuddyBuddyWithLogic /> */}
      {/* <BuddyConfig /> */}
      {/* <CommandMenu /> */}
    </>
  );
}
