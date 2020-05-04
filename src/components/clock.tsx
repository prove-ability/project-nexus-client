/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { NextPage } from 'next';
import { shallowEqual, useSelector } from 'react-redux';

import { RootState } from '../stores';

{
  /* <style jsx>{`
  div {
    padding: 15px;
    display: inline-block;
    color: #82fa58;
    font: 50px menlo, monaco, monospace;
    background-color: #000;
  }

  .light {
    background-color: #999;
  }
`}</style> */
}

const basicStyles = css`
  padding: 15px;
  display: inline-block;
  color: #82fa58;
  font: 50px menlo, monaco, monospace;
  background-color: #000;
`;

const formatTime = (time: number): string =>
  new Date(time).toJSON().slice(11, 19);

const Clock: NextPage = () => {
  const { lastUpdate, light } = useSelector(
    ({ clock: { lastUpdate, light } }: RootState) => ({
      lastUpdate,
      light,
    }),
    shallowEqual,
  );
  return <div className={light ? 'light' : ''}>{formatTime(lastUpdate)}</div>;
};

export default React.memo(Clock);
