/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { NextPage } from 'next';
const buttonStyles = css`
  display: flex;
  margin: 0 auto;
  background-color: #555;
  border: none;
  font-size: 26px;
  :hover {
    cursor: pointer;
    color: red;
  }
`;
interface ListPagingnationProps {
  onAdditionalRequest: () => void;
}
const ListPagingnation: NextPage<ListPagingnationProps> = ({ onAdditionalRequest }) => (
  <>
    <button css={[buttonStyles]} onClick={onAdditionalRequest} onKeyDown={onAdditionalRequest}>
      @@@더보기@@@
    </button>
  </>
);

export default ListPagingnation;
