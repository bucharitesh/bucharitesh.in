// projects-command.ts
import { useMemo } from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import type { CommandGroup } from '../types';

interface SocialLink {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: any;
}

const socialLinks: SocialLink[] = [
  {
    id: 'github',
    name: 'GitHub',
    description: 'Check out my open source projects',
    url: 'https://github.com/yourusername',
    icon: FaGithub,
  },
  {
    id: 'twitter',
    name: 'Twitter',
    description: 'Follow me for updates and tech insights',
    url: 'https://twitter.com/yourusername',
    icon: FaTwitter,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    description: 'Connect with me professionally',
    url: 'https://linkedin.com/in/yourusername',
    icon: FaLinkedin,
  },
];

interface SocialsCommandProps {
  setOpen: (open: boolean) => void;
}

export const useSocialsCommand = ({
  setOpen,
}: SocialsCommandProps): CommandGroup => {
  const commands = useMemo(
    () =>
      socialLinks.map((social) => ({
        id: social.id,
        name: social.name,
        description: social.description,
        icon: social.icon,
        action: () => {
          window.open(social.url, '_blank');
          setOpen(false);
        },
      })),
    [setOpen]
  );

  return {
    name: 'Social Links',
    commands,
  };
};
