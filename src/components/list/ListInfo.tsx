/**@jsx jsx */
import { Snippet } from '@api/youtubeAPI';
import { css, jsx } from '@emotion/core';
import { NextPage } from 'next';

const template = css`
  display: flex;
  border-bottom: 2px solid black;
  padding: 20px;
  color: white;
`;
const titleStyles = css`
  font-weight: 600;
  font-size: 22px;
  margin: 8px 0;
`;
const imgStyles = css`
  margin-right: 20px;
  border-radius: 4px;
`;
const popupButton = css`
  font-size: 18px;
  margin-left: auto;
  background-color: #777;
  padding: 26px;
  :hover {
    background-color: #aaa;
    color: #f11;
    cursor: pointer;
  }
`;
interface ListProps {
  onPopup: (id: string) => void;
  channel: Snippet;
}
const ListInfo: NextPage<ListProps> = ({
  onPopup,
  channel: { title, publishedAt, channelId, description, thumbnails },
}: ListProps) => {
  const handleOnMouseUp = (): void => {
    onPopup(channelId);
  };
  return (
    <div css={[template]}>
      <img css={[imgStyles]} src={thumbnails.default.url} alt="thumbnail" />
      <div>
        <div css={[titleStyles]}>{title}</div>
        <div>{publishedAt}</div>
        <div>{description}</div>
      </div>
      <button css={[popupButton]} onClick={handleOnMouseUp} onKeyDown={handleOnMouseUp}>
        <div>test</div>
      </button>
    </div>
  );
};

export default React.memo(ListInfo);
