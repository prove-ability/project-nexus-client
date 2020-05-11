/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { NextPage } from 'next';

const footerStyles = css`
  background-color: #333;
  color: white;
  height: 60px;
  font-size: 26px;
`;

const Footer: NextPage = () => <div css={[footerStyles]}>Footer</div>;

export default Footer;
