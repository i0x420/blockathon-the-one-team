"use client";

import { Tab } from "@headlessui/react";
import React, { Fragment } from "react";
import { twMerge } from "tailwind-merge";
import { TabButton, VariantType } from "./TabButton";

export type TabItem = {
  title: string;
  content: React.ReactNode;
  isHide?: boolean;
};

interface TabsProps {
  items?: TabItem[];
  tabListClassName?: string;
  isCenterTabs?: boolean;
  variant: VariantType;
}

export const defaultItems: TabItem[] = [
  {
    title: "Tab 1",
    content: "Content Tab 1"
  },
  {
    title: "Tab 2",
    content: "Content Tab 2"
  }
];

export const Tabs = ({
  items = defaultItems,
  tabListClassName,
  isCenterTabs,
  variant = "background"
}: TabsProps) => {
  const filterItems = items.filter(item => !item.isHide);

  return (
    <div className="h-[10rem] w-[40rem] bg-background-surface rounded-xl text-text-primary p-8">
      <Tab.Group>
        <Tab.List
          className={twMerge(
            "flex gap-4 mb-8 overflow-x-auto no-scrollbar",
            isCenterTabs && "justify-start sm:justify-center",
            tabListClassName
          )}
        >
          {filterItems.map(item => (
            <Tab as={Fragment} key={item.title}>
              {({ selected }) => (
                <TabButton variant={variant} isSelected={selected}>
                  {item.title}
                </TabButton>
              )}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {filterItems.map(item => (
            <Tab.Panel key={item.title}>{item.content}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
