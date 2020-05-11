/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { NextPage } from 'next';

const headerStyles = css`
  background-color: #333;
  color: white;
  height: 60px;
  font-size: 26px;
`;

const Header: NextPage = () => (
  <div css={[headerStyles]}>
    <span>Header</span>
  </div>
);

export default Header;
