import { BoxIcon, InfinityIcon, LinkIcon } from 'lucide-react';
import Image from 'next/image';

import { Markdown } from '@/components/markdown';
import type { Project } from '@/config/projects';
import { UTM_PARAMS } from '@/config/site';
import { addQueryParams } from '@/lib/url';
import { cn } from '@/lib/utils';
import {
  CollapsibleChevronsIcon,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithContext,
} from '@repo/design-system/components/ui/collapsible';
import { Tag } from '@repo/design-system/components/ui/tag';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@repo/design-system/components/ui/tooltip';
import { ProseMono } from '@repo/design-system/components/ui/typography';

export function ProjectItem({
  className,
  project,
  isFirst = false,
  isLast = false,
}: {
  className?: string;
  project: Project;
  isFirst?: boolean;
  isLast?: boolean;
}) {
  const { start, end } = project.period;
  const isOngoing = !end;
  const isSinglePeriod = end === start;
  const isExpanded = project.isExpanded ?? false;

  return (
    <CollapsibleWithContext defaultOpen={isExpanded} asChild>
      <div className={cn(className, 'group/item')}>
        <div
          className={cn(
            'flex items-center border-2 border-accent',
            isFirst && 'rounded-t-xl',
            isLast && 'group-data-[state=closed]/item:rounded-b-xl'
          )}
        >
          {project.logo ? (
            <Image
              src={project.logo}
              alt={project.title}
              width={32}
              height={32}
              quality={100}
              className="mx-4 flex size-6 shrink-0 select-none"
              unoptimized
              aria-hidden="true"
            />
          ) : (
            <div
              className="mx-4 flex size-6 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-edge ring-offset-1 ring-offset-background select-none"
              aria-hidden="true"
            >
              <BoxIcon className="size-4" />
            </div>
          )}

          <div className="flex-1">
            <CollapsibleTrigger className="flex w-full items-center gap-2 p-4 pr-2 text-left">
              <div className="flex-1">
                <h3 className="mb-1 leading-snug font-medium text-balance">
                  {project.title}
                </h3>
                <dl className="text-sm text-muted-foreground">
                  <dt className="sr-only">Period</dt>
                  <dd className="flex items-center gap-0.5">
                    <span>{start}</span>
                    {!isSinglePeriod && (
                      <>
                        <span className="font-mono">—</span>
                        {isOngoing ? (
                          <>
                            <InfinityIcon
                              className="size-4.5 translate-y-[0.5px]"
                              aria-hidden
                            />
                            <span className="sr-only">Present</span>
                          </>
                        ) : (
                          <span>{end}</span>
                        )}
                      </>
                    )}
                  </dd>
                </dl>
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground after:absolute after:-inset-2 hover:text-foreground"
                    href={addQueryParams(project.link, UTM_PARAMS)}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <LinkIcon className="pointer-events-none size-4" />
                    <span className="sr-only">Open Project Link</span>
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Open Project Link</p>
                </TooltipContent>
              </Tooltip>

              <div
                className="shrink-0 text-muted-foreground [&_svg]:size-4"
                aria-hidden
              >
                <CollapsibleChevronsIcon />
              </div>
            </CollapsibleTrigger>
          </div>
        </div>

        <CollapsibleContent className="group/content overflow-hidden duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div
            className={cn(
              'border-x-2 border-dashed border-edge border-accent',
              isLast &&
                'group-data-[state=open]/item:border-b-2 group-data-[state=open]/item:rounded-b-xl'
            )}
          >
            <div className="space-y-4 p-4 duration-300 group-data-[state=closed]/content:animate-fade-out group-data-[state=open]/content:animate-fade-in">
              {project.description && (
                <ProseMono>
                  <Markdown>{project.description}</Markdown>
                </ProseMono>
              )}

              {project.skills.length > 0 && (
                <ul className="flex flex-wrap gap-1.5">
                  {project.skills.map((skill, index) => (
                    <li key={index} className="flex">
                      <Tag>{skill}</Tag>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </CollapsibleWithContext>
  );
}
