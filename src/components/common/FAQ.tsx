'use client';
import { ReactNode, useMemo, useState } from 'react';
import { IconType } from 'react-icons';
import { FiPlus, FiMinus } from 'react-icons/fi';
import Heading from './Heading';
export type FAQVariant = 'default' | 'bordered' | 'minimal' | 'card';
export type FAQIndicator = 'icon' | 'number' | 'both' | 'none';
export type FAQMode = 'accordion' | 'sidebar';
export type FAQItem = {
  id?: string;
  question: string;
 answer: string;
};
export type FAQGroup = {
  id: string;
  title?: string;
  items: FAQItem[];
};
export type FAQProps = {
  items?: FAQItem[];
  groups?: FAQGroup[];
  mode?: FAQMode;
  variant?: FAQVariant;
  indicator?: FAQIndicator;
  closedIcon?: IconType;
  openedIcon?: IconType;
  rotateIcon?: boolean;
  rotateClassName?: string;
  allowMultiple?: boolean;
  openFirstItem?: boolean;
  defaultOpen?: number[];
  showGroupTitle?: boolean;
  resetNumberPerGroup?: boolean;
  numberFormat?: '1' | '01' | '001';
  className?: string;
  titleClassName?: string;
  itemClassName?: string;
  questionClassName?: string;
  answerClassName?: string;
  numberClassName?: string;
  iconClassName?: string;
  activeItemClassName?: string;
};
export default function FAQ({
  items,
  groups,
  mode = 'accordion',
  variant = 'default',
  indicator = 'icon',
  closedIcon: ClosedIcon = FiPlus,
  openedIcon: OpenedIcon = FiMinus,
  rotateIcon = false,
  rotateClassName = 'rotate-180',
  allowMultiple = false,
  openFirstItem = false,
  defaultOpen = [],
  showGroupTitle = true,
  resetNumberPerGroup = true,
  numberFormat = '01',
  className = '',
  titleClassName = '',
  itemClassName = '',
  questionClassName = '',
  answerClassName = '',
  numberClassName = '',
  iconClassName = '',
  activeItemClassName = ''
}: FAQProps) {
  const sourceGroups = useMemo(() => {
    if (groups?.length) return groups;
    return [
      {
        id: 'default',
        items: items || []
      }
    ];
  }, [groups, items]);
  const [openItems, setOpenItems] = useState<number[]>(openFirstItem ? [0] : defaultOpen);
  const [activeGroup, setActiveGroup] = useState(0);
  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
      return;
    }
    setOpenItems((prev) => (prev.includes(index) ? [] : [index]));
  };
  const formatNumber = (value: number) => {
    switch (numberFormat) {
      case '001':
        return String(value).padStart(3, '0');
      case '01':
        return String(value).padStart(2, '0');
      default:
        return String(value);
    }
  };
  const variants = {
    default: {
      wrapper: 'space-y-4',
      item: 'overflow-hidden rounded-2xl border border-neutral-200 bg-white',
      button: 'flex w-full items-center gap-4 px-6 py-5 text-left',
      content: 'px-6 pb-6'
    },
    bordered: {
      wrapper: 'space-y-0',
      item: 'border-b border-white-blue',
      button: 'flex w-full items-center gap-4 py-5 text-left',
      content: 'pb-5'
    },
    minimal: {
      wrapper: 'space-y-3',
      item: '',
      button: 'flex w-full items-center gap-4 py-4 text-left',
      content: 'pb-4'
    },
    card: {
      wrapper: 'space-y-4',
      item: 'overflow-hidden rounded-3xl bg-neutral-100',
      button: 'flex w-full items-center gap-4 px-6 py-5 text-left',
      content: 'px-6 pb-6'
    }
  };
  let globalCounter = 0;
  return (
    <div className={`flex flex-col md:flex-row items-start gap-10 ${className}`}>
      {mode === 'sidebar' && sourceGroups.length > 1 && (
        <div className="w-full md:w-64 shrink-0 lg:sticky lg:top-34">
          <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            {sourceGroups.map((group, idx) => (
              <button
                key={group.id}
                onClick={() => setActiveGroup(idx)}
                className={`whitespace-nowrap md:w-full text-left px-4 py-2 rounded-lg transition bg-secondary/5 lg:bg-transparent ${
                  activeGroup === idx ? 'text-primary font-medium' : 'text-secondary lg:hover:text-primary'
                }`}>
                {group.title || `Group ${idx + 1}`}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="flex-1 space-y-14">
        {sourceGroups.map((group, groupIndex) => {
          if (mode === 'sidebar' && groupIndex !== activeGroup) return null;
          let groupCounter = 0;
          return (
            <div key={group.id}>
              {showGroupTitle && group.title && (
                <Heading variant="xxl" className="font-bold! uppercase mb-5">
                  {group.title}
                </Heading>
              )}
              <div className={variants[variant].wrapper}>
                {group.items.map((item) => {
                  const currentIndex = globalCounter++;
                  const isOpen = openItems.includes(currentIndex);
                  const nextIsOpen = openItems.includes(currentIndex + 1);
                  groupCounter++;
                  const displayNumber = resetNumberPerGroup ? groupCounter : currentIndex + 1;
                  return (
                    <div
                      key={item.id || `${group.id}-${currentIndex}`}
                      className={`${variants[variant].item} ${itemClassName} ${isOpen ? activeItemClassName : ''} ${
                        variant === 'bordered' && nextIsOpen ? 'border-b-transparent' : ''
                      }`}>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => toggleItem(currentIndex)}
                        className={variants[variant].button}>
                        {(indicator === 'number' || indicator === 'both') && (
                          <span className={`font-semibold ${numberClassName}`}>{formatNumber(displayNumber)}</span>
                        )}
                        <span className={`flex-1 ${questionClassName}`}>{item.question}</span>
                        {(indicator === 'icon' || indicator === 'both') && (
                          <span className={iconClassName}>
                            {rotateIcon ? (
                              <ClosedIcon className={`h-5 w-5 transition-transform duration-300 ${isOpen ? rotateClassName : ''}`} />
                            ) : isOpen ? (
                              <OpenedIcon className="h-5 w-5" />
                            ) : (
                              <ClosedIcon className="h-5 w-5" />
                            )}
                          </span>
                        )}
                      </button>
                      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                        <div className="overflow-hidden">
                          <div
  className={`
    ${variants[variant].content}
    ${answerClassName}
  `}
  dangerouslySetInnerHTML={{
    __html: item.answer,
  }}
/>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
