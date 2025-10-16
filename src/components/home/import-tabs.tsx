'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const bookImportOptions = [
  {
    id: 'publisher-import',
    label: 'Verlagsimport',
    videoPath:
      'https://xguihxuzqibwxjnimxev.supabase.co/storage/v1/object/public/videos/marketing/website/supabase-table-editor.webm',
    imagePath:
      'https://supabase.com/images/index/dashboard/supabase-table-editor.png',
  },
  {
    id: 'book-search',
    label: 'Buchsuche',
    videoPath:
      'https://xguihxuzqibwxjnimxev.supabase.co/storage/v1/object/public/videos/marketing/website/supabase-sql-editor.webm',
    imagePath:
      'https://supabase.com/images/index/dashboard/supabase-sql-editor.png',
  },
  {
    id: 'file-upload',
    label: 'Datei-Upload',
    icon: BookOpen,
    videoPath:
      'https://xguihxuzqibwxjnimxev.supabase.co/storage/v1/object/public/videos/marketing/website/supabase-rls.webm',
    imagePath: 'https://supabase.com/images/index/dashboard/supabase-rls.png',
  },
  {
    id: 'manual',
    label: 'Manuell hinzufügen',
    icon: BookOpen,
    videoPath:
      'https://xguihxuzqibwxjnimxev.supabase.co/storage/v1/object/public/videos/marketing/website/supabase-table-editor.webm',
    imagePath:
      'https://supabase.com/images/index/dashboard/supabase-table-editor.png',
  },
];

// Scroll Shadow Hook
function useScrollShadow() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const updateShadows = useCallback(() => {
    const element = scrollRef.current;
    if (!element) return;
  }, []);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    // Initial check
    updateShadows();

    // Add scroll listener
    element.addEventListener('scroll', updateShadows);

    // Add resize observer to handle container size changes
    const resizeObserver = new ResizeObserver(updateShadows);
    resizeObserver.observe(element);

    return () => {
      element.removeEventListener('scroll', updateShadows);
      resizeObserver.disconnect();
    };
  }, [updateShadows]);

  return { scrollRef };
}

// Scroll Shadow Container Component
function ScrollShadow({
  children,
  className,
  scrollRef,
}: {
  children: React.ReactNode;
  className?: string;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className={cn('relative', className)}>
      <div
        ref={scrollRef}
        className={cn('scrollbar-hide overflow-x-auto h-fit py-[5px] px-4')}
        data-scroll-overflow
      >
        {children}
      </div>
      <div className='absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none' />
      <div className='absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none' />
    </div>
  );
}

// Simple Tab Components
function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root className={cn('w-full', className)} {...props} />;
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn(
        'mx-auto group relative h-10 rounded-full sm:border w-max',
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  children,
  isActive,
  isFocusVisible,
  onKeyDown,
  onFocus,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> & {
  isActive?: boolean;
  isFocusVisible: boolean;
  onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  onFocus: () => void;
}) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isInitialMount = useRef(true);

  // Scroll trigger into view when it becomes active, but only if content is overflowing
  useEffect(() => {
    // Skip scrolling on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (isActive && triggerRef.current) {
      // Find the scroll container
      const scrollContainer = triggerRef.current.closest(
        '[data-scroll-overflow]',
      ) as HTMLElement | null;

      // Only scroll if the content is actually overflowing
      if (
        scrollContainer &&
        scrollContainer.scrollWidth > scrollContainer.clientWidth
      ) {
        // Get the trigger's position relative to the scroll container
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const containerRect = scrollContainer.getBoundingClientRect();

        // Calculate the center position
        const triggerCenter = triggerRect.left + triggerRect.width / 2;
        const containerCenter = containerRect.left + containerRect.width / 2;
        const scrollOffset = triggerCenter - containerCenter;

        // Scroll only horizontally
        scrollContainer.scrollBy({
          left: scrollOffset,
          behavior: 'smooth',
        });
      }
    }
  }, [isActive]);

  return (
    <TabsPrimitive.Trigger
      ref={triggerRef}
      className={cn(
        'px-4 rounded-full text-sm text-muted-foreground hover:text-primary data-[state=active]:text-primary cursor-pointer h-full relative transition-all duration-200 outline-none',
        isFocusVisible
          ? 'focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-offset-1 focus-visible:ring-offset-background'
          : 'outline-none',
        className,
      )}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      {...props}
    >
      {isActive && (
        <motion.span
          layoutId='bubble'
          className='absolute -top-px -bottom-px -inset-x-px bg-input/30 border border-border rounded-full z-0'
          transition={{
            type: 'spring',
            duration: 0.4,
            bounce: 0,
          }}
        />
      )}
      <span className='relative z-10'>{children}</span>
    </TabsPrimitive.Trigger>
  );
}

// Type-safe tab ID based on available options
type TabId = (typeof bookImportOptions)[number]['id'];

// Video Player Component
function VideoPlayer({ src, imagePath }: { src: string; imagePath: string }) {
  return (
    <div className='relative w-full' style={{ aspectRatio: '16 / 9' }}>
      <div className='absolute inset-0'>
        <video
          className='relative z-10 block w-full h-full object-contain reduce-motion:hidden'
          loop
          autoPlay
          playsInline
          muted
          poster={imagePath}
        >
          <source src={src} type='video/webm' />
        </video>
        <Image
          alt='In App Screenshot'
          loading='lazy'
          width={2048}
          height={1260}
          className='reduce-motion:block hidden absolute inset-0 w-full h-full object-contain'
          src={imagePath}
        />
      </div>
    </div>
  );
}

// Main Component
export function ImportTabs() {
  const [activeTab, setActiveTab] = useState<TabId>(bookImportOptions[0].id);
  const { scrollRef } = useScrollShadow();
  const [isFocusVisible, setIsFocusVisible] = useState(false);
  const lastArrowKeyTime = useRef<number>(0);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        lastArrowKeyTime.current = Date.now();
        setIsFocusVisible(false);
      }
    },
    [],
  );

  const handleFocus = useCallback(() => {
    const timeSinceArrowKey = Date.now() - lastArrowKeyTime.current;
    // If arrow key was pressed within last 100ms, it's keyboard navigation
    setIsFocusVisible(timeSinceArrowKey > 100);
  }, []);

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as TabId)}
    >
      <ScrollShadow scrollRef={scrollRef}>
        <TabsList loop={false}>
          {bookImportOptions.map((option) => (
            <TabsTrigger
              key={option.id}
              value={option.id}
              isActive={activeTab === option.id}
              isFocusVisible={isFocusVisible}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
            >
              {option.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </ScrollShadow>

      <div className='w-full mt-6 p-1 sm:p-2 rounded-lg sm:rounded-xl border'>
        <div className='relative w-full rounded-sm sm:rounded-md border overflow-hidden'>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: 'easeIn' }}
            className='size-full'
          >
            <VideoPlayer
              src={
                bookImportOptions.find((option) => option.id === activeTab)
                  ?.videoPath ?? ''
              }
              imagePath={
                bookImportOptions.find((option) => option.id === activeTab)
                  ?.imagePath ?? ''
              }
            />
          </motion.div>
        </div>
      </div>
    </Tabs>
  );
}
