/* eslint-disable jsx-a11y/alt-text */
/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import { RootState } from '@stores/rootReducer';
import _ from 'lodash';
import { useSelector } from 'react-redux';

const popupStyles = css`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;
const innerPopupStyles = css`
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
  display: flex;
`;
const displayBolck = css`
  display: block;
`;
const closeBtn = css`
  width: 100px;
  height: 100px;
  background-color: black;
  color: white;
  :hover {
    cursor: pointer;
    color: #333;
    background-color: #fff;
  }
`;
interface ListPopupProps {
  detailVisible: boolean;
  onColsePopup: () => void;
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const ListPopup = ({ detailVisible, onColsePopup }: ListPopupProps) => {
  const { isLoading, error: channelDetailError, channelDetail } = useSelector(
    (state: RootState) => state.youtube,
  );
  if (isLoading) {
    return <h3>...Loading</h3>;
  }
  const {
    snippet: { title, description, publishedAt, thumbnails, country },
    contentDetails,
    statistics: { viewCount, commentCount, subscriberCount, hiddenSubscriberCount, videoCount },
    topicDetails,
    brandingSettings: {
      channel: {
        keywords,
        defaultTab,
        showRelatedChannels,
        showBrowseView,
        featuredChannelsTitle,
        featuredChannelsUrls,
      },
      image: { bannerMobileImageUrl },
    },
  } = channelDetail;
  if (channelDetailError) {
    return (
      <div>
        <h1>Something went wrong...</h1>
        <div>{channelDetailError.toString()}</div>
      </div>
    );
  }
  return (
    <>
      {isLoading ? (
        <h3>...Loading</h3>
      ) : (
        <div
          css={[
            popupStyles,
            detailVisible && displayBolck,
            css`
              background-image: url(${bannerMobileImageUrl});
            `,
          ]}
        >
          <div css={[innerPopupStyles]}>
            <div
              css={[
                css`
                  width: ${`${thumbnails.medium.width}px`};
                  height: ${`${thumbnails.medium.height}px`};
                  background-image: url(${thumbnails.medium.url});
                `,
              ]}
            />
            <div
              css={[
                css`
                  width: 900px;
                `,
              ]}
            >
              <div>{title}</div>
              <div>{description}</div>
              <div>publishedAt: {publishedAt}</div>
              <div>country: {country}</div>
              <div>viewCount: {viewCount}</div>
              <div>commentCount: {commentCount}</div>
              <div>subscriberCount: {subscriberCount}</div>
              <div>hiddenSubscriberCount: {hiddenSubscriberCount}</div>
              <div>videoCount: {videoCount}</div>
              <div>keywords: {keywords}</div>
              <div>showRelatedChannels: {showRelatedChannels}</div>
              <div>showBrowseView: {showBrowseView}</div>
              <div>featuredChannelsTitle: {featuredChannelsTitle}</div>
              {_.map(featuredChannelsUrls, (featuredChannelsUrlInfo, key) => (
                <div key={key}>{featuredChannelsUrlInfo}</div>
              ))}
            </div>
            <button css={[closeBtn]} onClick={onColsePopup} onKeyDown={onColsePopup}>
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ListPopup;
