'use client';

import { Icons } from '@/components/icons';
import { AnimatePresence, motion } from 'motion/react';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { memo } from 'react';

const LoginPage = () => {
  const session = useSession();

  if (session.status === 'authenticated') {
    redirect('/admin');
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      {/* Framer motion wrapper */}
      <AnimatePresence>
        <LoginButton />
      </AnimatePresence>
    </div>
  );
};

const LoginButton = memo(function LoginButton() {
  return (
    <motion.button
      className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-neutral-900 shadow-xs transition-all duration-300 hover:border-neutral-300 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800/90 dark:text-neutral-100 dark:hover:border-neutral-600"
      onClick={() => signIn('github')}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <motion.div
        className="absolute inset-0 bg-linear-to-r from-neutral-100/0 via-neutral-100/50 to-transparent dark:from-neutral-700/0 dark:via-neutral-700/50"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
      <Icons.github className="h-4 w-4" />
      <span className="font-medium text-sm">Sign in with GitHub</span>
    </motion.button>
  );
});

export default LoginPage;
