/* eslint-disable jsx-a11y/click-events-have-key-events */
/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useEffect, useState } from 'react';

const TabItemStyles = css`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  padding-left: 20px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  height: 35px;
  &:nth-of-type(2) {
    border-top: 1px solid #cfcfcf;
    border-bottom: 1px solid #cfcfcf;
  }
`;

const fontColorTrueStyles = css`
  color: #333;
`;
const fontColorFalseStyles = css`
  color: f4f4f4;
`;

interface Item {
  name: string;
  text: string;
}
interface MenuItemProps {
  item: Item;
  tab: string;
  onMenuState(
    active: string,
  ): ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | void;
}

const TabItem: React.FC<MenuItemProps> = ({ tab, item, onMenuState }) => {
  const name = item.name;
  const [fontColor, setFontColor] = useState(false);
  useEffect(() => {
    setFontColor(tab === name ? true : false);
  }, [name, tab]);
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      css={[TabItemStyles, fontColor ? fontColorTrueStyles : fontColorFalseStyles]}
      id={name}
      onClick={() => onMenuState(name)}
    >
      {item.text}
    </div>
  );
};

export default React.memo(TabItem);
