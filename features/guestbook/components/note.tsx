'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import React from 'react';
import Drag from './drag';

const Note = React.memo(
  ({
    name,
    content,
    signature,
    initialX,
    initialY,
  }: {
    name: string;
    content: string;
    signature: string;
    initialX?: number;
    initialY?: number;
  }) => {
    return (
      <Drag
        className={cn('z-10 max-w-[200px]')}
        initialX={initialX}
        initialY={initialY}
      >
        <motion.div
          initial={{ opacity: 0, y: 2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={cn(
            'note-item w-fit max-w-[165px] scale-75! bg-gray-200 px-1.5 pt-1.5 pb-2 text-gray-900 transition-shadow duration-300 ease-out hover:shadow-md',
            'z-10 rounded-lg backdrop-blur-sm'
          )}
          style={{
            boxShadow:
              '0 4px 8px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.2), 0 16px 32px rgba(0, 0, 0, 0.2)',
          }}
        >
          {signature ? (
            <div
              className={cn(
                'relative flex items-center justify-center overflow-hidden rounded-[4px] border border-gray-500/50 bg-gray-200'
              )}
            >
              <div
                className="z-10 object-contain"
                dangerouslySetInnerHTML={{ __html: signature }}
              />
              {/* <Image
                src="/images/33.jpeg"
                className="absolute object-cover"
                fill
                draggable={false}
                quality={25}
                alt=""
              /> */}
            </div>
          ) : null}
          <div className="mt-1.5 w-full break-words text-sm">
            <span className="mr-1 font-semibold text-[12px] text-gray-600">
              {name}
            </span>
            <div className="font-medium text-[16px] leading-tight">
              {content}
            </div>
          </div>
        </motion.div>
      </Drag>
    );
  }
);

export default Note;
