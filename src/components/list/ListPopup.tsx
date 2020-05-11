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
`;
const displayBolck = css`
  display: block;
`;
interface ListPopupProps {
  detailVisible: boolean;
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const ListPopup = ({ detailVisible }: ListPopupProps) => {
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
            <img
              css={[
                css`
                  width: ${thumbnails.medium.width};
                  height: ${thumbnails.medium.height};
                  background-image: url(${thumbnails.medium.url});
                `,
              ]}
            />
            <div>{title}</div>
            <div>{description}</div>
            <div>{publishedAt}</div>
            <div>{country}</div>
            <div>{viewCount}</div>
            <div>{commentCount}</div>
            <div>{subscriberCount}</div>
            <div>{hiddenSubscriberCount}</div>
            <div>{videoCount}</div>
            <div>{keywords}</div>
            <div>{showRelatedChannels}</div>
            <div>{showBrowseView}</div>
            <div>{featuredChannelsTitle}</div>
            {_.map(featuredChannelsUrls, (featuredChannelsUrlInfo, key) => (
              <div key={key}>{featuredChannelsUrlInfo}</div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ListPopup;
