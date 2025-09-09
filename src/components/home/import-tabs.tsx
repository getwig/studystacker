'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';
import { bookImportOptions } from '@/lib/constants';

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
        'mx-auto group relative h-10 rounded-full border bg-muted/50 w-max',
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
        'px-4 rounded-full text-sm text-muted-foreground cursor-pointer h-10 relative z-10 transition-colors duration-200',
        'data-[state=active]:text-primary hover:text-primary/80',
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

    setPillStyle({
      left: buttonRect.left - listRect.left - 2,
      width: buttonRect.width + 2,
    });
  }, [activeTab]);

  // Function to scroll trigger into full view
  const scrollTriggerIntoView = useCallback(
    (triggerId: string, scrollRef: React.RefObject<HTMLDivElement | null>) => {
      const trigger = triggerRefs.current[triggerId];
      const scrollContainer = scrollRef.current;

      if (!trigger || !scrollContainer) return;

      const triggerRect = trigger.getBoundingClientRect();
      const scrollableRect = scrollContainer.getBoundingClientRect();

      const triggerRelativeLeft = triggerRect.left - scrollableRect.left;
      const triggerRelativeRight = triggerRelativeLeft + triggerRect.width;

      // Check if trigger is partially or fully out of view
      const isLeftCutOff = triggerRelativeLeft < 0;
      const isRightCutOff = triggerRelativeRight > scrollableRect.width;

      if (isLeftCutOff || isRightCutOff) {
        // Use scrollIntoView for more reliable scrolling
        trigger.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    },
    [],
  );

  // Update pill position when active tab changes or component mounts
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
      className={cn(
        'absolute -inset-y-px bg-background border border-border rounded-full shadow-sm z-0',
        mounted
          ? 'opacity-100 transition-all duration-300 ease-in-out'
          : 'opacity-0',
      )}
      style={pillStyle}
    />
  );
}

// Content Component
function ImportContent({
  icon: Icon,
  title,
  description,
  buttonText,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  buttonText: string;
}) {
  return (
    <div className='text-center space-y-4 py-8'>
      <div className='w-16 h-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center'>
        <Icon className='w-8 h-8 text-primary' />
      </div>
      <h4 className='text-lg font-semibold'>{title}</h4>
      <p className='text-muted-foreground max-w-md mx-auto'>{description}</p>
      <button className='bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary/90 transition-colors'>
        {buttonText}
      </button>
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
          <ImportContent
            icon={option.icon}
            title={option.title}
            description={option.description}
            buttonText={option.buttonText}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
