import { Icons } from '@/components/icons';
import { USER } from '@/config/user';

export const DockConfig = {
  navbar: [
    { href: '/', icon: Icons.home, label: 'Home' },
    { href: '/craft', icon: Icons.craft, label: 'Crafts', new: true },
    { href: '/guestbook', icon: Icons.guestbook, label: 'Guestbook' },
    // { href: "/blog", icon: Icons.guestbook, label: "Blog" },
    { href: '/bookmarks', icon: Icons.bookmark, label: 'Bookmarks' },
    { href: '/cal', icon: Icons.calendar, label: 'Book a Meeting' },
    // { href: "/resume", icon: Icons.resume, label: "Resume" },
  ],
  contact: {
    social: {
      GitHub: {
        name: 'GitHub',
        url: USER.social.github,
        icon: Icons.github,
      },
      LinkedIn: {
        name: 'LinkedIn',
        url: USER.social.linkedin,
        icon: Icons.linkedin,
      },
      X: {
        name: 'X',
        url: USER.social.twitter,
        icon: Icons.x,
      },
      email: {
        name: 'Send Email',
        url: `mailto:${USER.email}`,
        icon: Icons.email,
      },
      Bluesky: {
        name: 'Bluesky',
        url: USER.social.bluesky,
        icon: Icons.bluesky,
      },
    },
  },
};

export const COLLECTION_IDS = [48073561, 59718740];

export const SCROLL_AREA_ID = 'scroll-area-id';
export const MOBILE_SCROLL_THRESHOLD = 20;
