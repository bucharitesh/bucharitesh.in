"use client";

import { Button } from "@/components/ui/button";
import { TooltipWrapper } from "@/components/ui/tooltip";
import { Check, Link2 } from "lucide-react";
import { useState } from "react";

export function CopyLinkButton() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        setCopied(true);
        navigator.clipboard.writeText(window.location.href);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <TooltipWrapper content="Copy link">
            <Button onClick={handleCopy} disabled={copied} className="rounded-full px-2 py-1 h-8" variant="outline">
                {copied ? <Check className="size-4" /> : <Link2 className="size-4" />}
            </Button>
        </TooltipWrapper>
    );
}