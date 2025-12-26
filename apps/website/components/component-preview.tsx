'use client';

// import {
//   ResizableHandle,
//   ResizablePanel,
//   ResizablePanelGroup,
// } from '@repo/design-system/components/ui/resizable';
import { RefreshCcw } from 'lucide-react';
import React, { ReactNode, useMemo, useState } from 'react';

import { cn } from '@/lib/utils';
import { Index } from '@/registry/__index__';

import { CodeCollapsibleWrapper } from './code-collapsible-wrapper';
import { OpenInV0Button } from './open-in-v0';
import { Button } from '@repo/design-system/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/design-system/components/ui/tabs';
import { Code as CodeInline } from '@repo/design-system/components/ui/typography';

export function ComponentPreview({
  className,
  name,
  openInV0Url,
  canReplay = true,
  notProse = true,
  codeCollapsible = false,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  name: string;
  openInV0Url?: boolean;
  canReplay?: boolean;
  notProse?: boolean;
  codeCollapsible?: boolean;
}) {
  const [replay, setReplay] = useState(0);

  const Codes = React.Children.toArray(children) as React.ReactElement[];
  const Code = Codes[0];

  const Preview = useMemo(() => {
    const Component = Index[name]?.component;

    if (!Component) {
      return (
        <p className="text-muted-foreground text-sm">
          Component <CodeInline>{name}</CodeInline> not found in registry.
        </p>
      );
    }

    return <Component />;
  }, [name]);

  return (
    <div className={cn('my-6', notProse && 'not-prose', className)} {...props}>
      <Tabs defaultValue="preview" className="gap-4">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>

        <TabsContent value="preview">
          <div className="relative rounded-lg border border-edge bg-zinc-950/0.75 dark:bg-white/0.75">
            {(canReplay || openInV0Url) && (
              <div className="flex justify-end gap-2 p-4">
                {openInV0Url && (
                  <OpenInV0Button
                    url={`https://bucharitesh.in/r/${name}.json`}
                  />
                )}
                {canReplay && (
                  // <SimpleTooltip content="Replay">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setReplay((v) => v + 1)}
                  >
                    <RefreshCcw />
                  </Button>
                )}
              </div>
            )}

            <div
              key={replay}
              className="relative mx-auto flex size-full items-center justify-center"
            >
              <React.Suspense
                fallback={
                  <div className="flex items-center justify-center text-muted-foreground text-sm">
                    Loading...
                  </div>
                }
              >
                <PreviewContent type="component">{Preview}</PreviewContent>
              </React.Suspense>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="code" className="[&>figure]:m-0">
          {codeCollapsible ? (
            <CodeCollapsibleWrapper className="my-0">
              {Code}
            </CodeCollapsibleWrapper>
          ) : (
            Code
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

type PreviewContentProps = {
  children: ReactNode;
  type: 'component' | 'block';
};

export const PreviewContent = ({ children, type }: PreviewContentProps) => {
  return (
    <>{children}</>
    // <ResizablePanelGroup className="size-full" direction="horizontal">
    //   <ResizablePanel
    //     className={cn(
    //       'peer not-fumadocs-codeblock z-10 size-full',
    //       type === 'component' ? 'overflow-hidden' : 'overflow-auto'
    //     )}
    //     defaultSize={100}
    //     maxSize={100}
    //     minSize={40}
    //   >
    //     {children}
    //   </ResizablePanel>
    //   <ResizableHandle
    //     className="z-20 peer-data-[panel-size=100.0]:w-0"
    //     withHandle
    //   />
    //   <ResizablePanel
    //     className="border-none bg-background"
    //     defaultSize={0}
    //     maxSize={70}
    //     minSize={0}
    //   />
    // </ResizablePanelGroup>
  );
};
