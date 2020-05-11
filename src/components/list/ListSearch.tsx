/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { NextPage } from 'next';
import { ChangeEvent, useRef } from 'react';

const commonStyles = css`
  padding: 12px 20px;
  border: 1px solid #ccc;
`;
const inputStyles = css`
  width: 100%;
  ${commonStyles}
  display: inline-block;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 20px;
`;
const buttonStyles = css`
  ${commonStyles}
  font-size: 20px;
  font-weight: bold;
  border-radius: 4px;
  width: 100px;
  :hover {
    background-color: #999;
  }
`;
interface ListSearchProps {
  keyword: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSearch: () => void;
}

const ListSearch: NextPage<ListSearchProps> = ({ keyword, onChange, onSearch }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const onKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };
  const onClick = (): void => {
    if (!inputRef.current) return;
    inputRef.current.focus();
    onSearch();
  };
  return (
    <>
      <input
        css={[inputStyles]}
        ref={inputRef}
        onChange={onChange}
        value={keyword}
        onKeyPress={onKeyPress}
        placeholder="검색어를 입렵하세요"
      />
      <button css={[buttonStyles]} onClick={onClick}>
        검색
      </button>
    </>
  );
};

export default ListSearch;
