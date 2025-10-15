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
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const updateShadows = useCallback(() => {
    const element = scrollRef.current;
    if (!element) return;

    const { scrollLeft, scrollWidth, clientWidth } = element;

    setShowLeftShadow(scrollLeft > 4);
    setShowRightShadow(scrollLeft < scrollWidth - clientWidth - 4);
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

  return {
    scrollRef,
    showLeftShadow,
    showRightShadow,
  };
}

// Scroll Shadow Container Component
function ScrollShadow({
  children,
  className,
  scrollRef,
  showLeftShadow,
  showRightShadow,
}: {
  children: React.ReactNode;
  className?: string;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  showLeftShadow: boolean;
  showRightShadow: boolean;
}) {
  return (
    <div className={cn('relative', className)}>
      {/* Left shadow */}
      <div
        aria-hidden='true'
        className={cn(
          'absolute -left-[5px] top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none transition-opacity duration-200',
          showLeftShadow ? 'opacity-100' : 'opacity-0',
        )}
      />

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        className='scrollbar-hide overflow-x-auto h-fit p-[5px] -m-[5px]'
        data-scroll-overflow
      >
        {children}
      </div>

      {/* Right shadow */}
      <div
        aria-hidden='true'
        className={cn(
          'absolute -right-[5px] top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none transition-opacity duration-200',
          showRightShadow ? 'opacity-100' : 'opacity-0',
        )}
      />
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

  // Scroll trigger into view when it becomes active, but only if content is overflowing
  useEffect(() => {
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
        triggerRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
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
  const { scrollRef, showLeftShadow, showRightShadow } = useScrollShadow();
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
      <ScrollShadow
        scrollRef={scrollRef}
        showLeftShadow={showLeftShadow}
        showRightShadow={showRightShadow}
      >
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
