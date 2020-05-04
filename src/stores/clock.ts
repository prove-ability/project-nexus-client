import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ClockState {
  light: boolean;
  lastUpdate: number;
  count?: number;
}

const initialState: ClockState = {
  light: false,
  lastUpdate: 0,
  count: 0,
};

const clock = createSlice({
  name: 'clock',
  initialState,
  reducers: {
    tick(state, action: PayloadAction<ClockState>) {
      const { lastUpdate, light } = action.payload;
      state.lastUpdate = lastUpdate;
      state.light = !!light;
    },
    increment(state) {
      state.count = +1;
    },
    decrement(state) {
      state.count = -1;
    },
    reset(state) {
      state.count = initialState.count;
    },
  },
});

export default clock;
