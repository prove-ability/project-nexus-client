import { PayloadAction } from '@reduxjs/toolkit';
import { NextPage } from 'next';
import Head from 'next/head';
import { useDispatch } from 'react-redux';

import useInterval from '../lib/useInterval';
import clock, { ClockState } from '../stores/clock';

const IndexPage: NextPage = () => {
  const dispatch = useDispatch();
  const tick = (): PayloadAction<ClockState> =>
    dispatch(clock.actions.tick({ light: true, lastUpdate: Date.now() }));
  useInterval(() => {
    tick();
  }, 1000);
  return (
    <>
      <Head>
        <title>Home! use title tag</title>
      </Head>
    </>
  );
};

export default IndexPage;
