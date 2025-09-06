"use client";

import { signIn, useSession } from "next-auth/react";
import { AnimatePresence, motion } from 'motion/react';
import React, { memo } from 'react'
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { redirect } from "next/navigation";

const LoginPage = () => {
    const session = useSession();

    if (session.status === "authenticated") {
        redirect("/admin");
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
        {/* Framer motion wrapper */}
        <AnimatePresence>
            <LoginButton />
        </AnimatePresence>
        </div>
    );
}

const LoginButton = memo(function LoginButton() {
    return (
        <motion.button
            className="group w-full relative flex items-center justify-center gap-2 rounded-xl px-4 py-2.5
          bg-white dark:bg-neutral-800/90 overflow-hidden
          text-neutral-900 dark:text-neutral-100
          border border-neutral-200 dark:border-neutral-700
          hover:border-neutral-300 dark:hover:border-neutral-600
          shadow-xs hover:shadow-md
          transition-all duration-300"
            onClick={() => signIn("github")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
        >
            <motion.div
                className="absolute inset-0 bg-linear-to-r from-neutral-100/0 via-neutral-100/50 dark:from-neutral-700/0 dark:via-neutral-700/50 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            <GitHubLogoIcon className="h-4 w-4" />
            <span className="font-medium text-sm">Sign in with GitHub</span>
        </motion.button>
    );
});

export default LoginPage;
