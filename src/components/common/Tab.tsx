/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { NextPage } from 'next';
import React, { useState } from 'react';

import { TabItem as TabItemInterface } from '../list/List';
import TabItem from './TabItem';

const tabStyles = css`
  position: relative;
  transform: translate(0);
  width: 200px;
  border: 1px solid #cfcfcf;
  border-radius: 4px;
  height: 70px;
`;

const spanStyles = css`
  width: 100%;
  height: 35px;
  background: #cfcfcf;
  left: 50%;
  padding: 0 7px;
  position: absolute;
  transform: translateX(-50%);
  transition: all 1300ms;
  z-index: -1;
`;

interface TabProps {
  tabItems: TabItemInterface[];
  tab: string;
  onTab: (keyword: string) => void;
}

const Tab: NextPage<TabProps> = ({ tabItems, tab, onTab }) => {
  const [menuItems] = useState(tabItems);
  const [activeItemPosition, setActiveItemPosition] = useState(0);
  function handleMenuState(
    active: string,
  ): ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | void {
    const element = document.getElementById(active) as HTMLElement;
    if (element.offsetTop === activeItemPosition) null;
    onTab(active);
    setActiveItemPosition(element.offsetTop);
  }
  const menuItemList = menuItems.map((item, key) => (
    <TabItem key={key} item={item} tab={tab} onMenuState={handleMenuState} />
  ));
  return (
    <div css={[tabStyles]}>
      <span
        css={[
          spanStyles,
          activeItemPosition &&
            css`
              top: ${activeItemPosition}px;
            `,
        ]}
      />
      {menuItemList}
    </div>
  );
};

export default React.memo(Tab);
