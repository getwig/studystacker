'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';
import { bookImportOptions } from '@/lib/constants';
import Image from 'next/image';

// Scroll Shadow Hook
function useScrollShadow() {
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const updateShadows = useCallback(() => {
    const element = scrollRef.current;
    if (!element) return;

    const { scrollLeft, scrollWidth, clientWidth } = element;

    setShowLeftShadow(scrollLeft > 0);
    setShowRightShadow(scrollLeft < scrollWidth - clientWidth);
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
        className={cn(
          'absolute -left-1 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none transition-opacity duration-300',
          showLeftShadow ? 'opacity-100' : 'opacity-0',
        )}
      />

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        className='scrollbar-hide overflow-x-auto h-fit p-1 -m-1'
        data-scroll-overflow
      >
        {children}
      </div>

      {/* Right shadow */}
      <div
        className={cn(
          'absolute -right-1 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none transition-opacity duration-300',
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
        'mx-auto group relative h-10 rounded-full border w-max',
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        'px-4 rounded-full text-sm text-muted-foreground data-[state=active]:text-primary cursor-pointer h-10 relative z-10 transition-colors duration-200',
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn('mt-6 data-[state=inactive]:hidden', className)}
      {...props}
    />
  );
}

// Custom Hook for Pill Positioning
function useSlidingPill(activeTab: string) {
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });
  const tabsListRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Memoized function to calculate pill position and dimensions
  const updatePillPosition = useCallback(() => {
    const activeButton = triggerRefs.current[activeTab];
    const tabsList = tabsListRef.current;

    if (!activeButton || !tabsList) return;

    const listRect = tabsList.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();

    const newStyle = {
      left: buttonRect.left - listRect.left - 2,
      width: buttonRect.width + 2,
    };

    // Only update if values have changed to prevent unnecessary re-renders
    setPillStyle((prev) =>
      prev.left === newStyle.left && prev.width === newStyle.width
        ? prev
        : newStyle,
    );
  }, [activeTab]);

  // Optimized scroll function with early returns and cached calculations
  const scrollTriggerIntoView = useCallback(
    (triggerId: string, scrollRef: React.RefObject<HTMLDivElement | null>) => {
      const trigger = triggerRefs.current[triggerId];
      const scrollContainer = scrollRef.current;

      if (!trigger || !scrollContainer) return;

      const scrollContainerWidth =
        scrollContainer.getBoundingClientRect().width;
      const triggersWidth = tabsListRef.current?.getBoundingClientRect().width;

      if (!triggersWidth || triggersWidth <= scrollContainerWidth) return;

      trigger.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    },
    [],
  );

  // Update pill position when active tab changes
  useEffect(() => {
    updatePillPosition();
  }, [updatePillPosition]);

  return {
    pillStyle,
    tabsListRef,
    triggerRefs,
    updatePillPosition,
    scrollTriggerIntoView,
  };
}

// Sliding Pill Component
function SlidingPill({
  pillStyle,
}: {
  pillStyle: { left: number; width: number };
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className='absolute -inset-y-px bg-input/30 border border-border rounded-full shadow-sm z-0 transition-all duration-300 ease-in-out'
      style={pillStyle}
    />
  );
}

// Content Component
function ImportContent({ imagePath }: { imagePath: string }) {
  return (
    <div className='w-full p-1 sm:p-2 rounded-lg sm:rounded-xl border'>
      <Image
        src={imagePath}
        alt='In App Screenshot'
        width={2048}
        height={1260}
        className='w-full h-full rounded-sm sm:rounded-md border'
        loading='lazy'
      />
    </div>
  );
}

// Main Component
export function ImportTabs() {
  const [activeTab, setActiveTab] = useState(bookImportOptions[0].id);
  const { pillStyle, tabsListRef, triggerRefs, scrollTriggerIntoView } =
    useSlidingPill(activeTab);

  const { scrollRef, showLeftShadow, showRightShadow } = useScrollShadow();

  // Scroll active tab into view whenever activeTab changes
  useEffect(() => {
    scrollTriggerIntoView(activeTab, scrollRef);
  }, [activeTab, scrollTriggerIntoView, scrollRef]);

  const handleTabTriggerClick = useCallback((triggerId: string) => {
    setActiveTab(triggerId);
  }, []);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <ScrollShadow
        scrollRef={scrollRef}
        showLeftShadow={showLeftShadow}
        showRightShadow={showRightShadow}
      >
        <TabsList ref={tabsListRef}>
          <SlidingPill pillStyle={pillStyle} />

          {bookImportOptions.map((option) => (
            <TabsTrigger
              key={option.id}
              value={option.id}
              ref={(el) => {
                triggerRefs.current[option.id] = el;
              }}
              onClick={() => handleTabTriggerClick(option.id)}
            >
              {option.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </ScrollShadow>

      {bookImportOptions.map((option) => (
        <TabsContent key={option.id} value={option.id}>
          <ImportContent imagePath={option.imagePath} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
