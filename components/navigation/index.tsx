import { BuddyBuddyWithLogic } from '@/features/buddy/buddy-with-logic';
import BuddyConfig from '../layout/hedge-hog-config';
import { ScrollTop } from '../scroll-top';
import BottomDock from './dock';

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
