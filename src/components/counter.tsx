import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@stores';
import clock from '@stores/clock';
import { NextPage } from 'next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

interface UseCounterInterface {
  count: number;
  increment(): PayloadAction;
  decrement(): PayloadAction;
  reset(): PayloadAction;
}

function useCounter(): UseCounterInterface {
  const dispatch = useDispatch();
  const count = useSelector(
    ({ clock: { count } }: RootState) => count,
    shallowEqual,
  ) as number;
  const increment = (): PayloadAction => dispatch(clock.actions.increment());
  const decrement = (): PayloadAction => dispatch(clock.actions.decrement());
  const reset = (): PayloadAction => dispatch(clock.actions.reset());
  return { count, increment, decrement, reset };
}

const Counter: NextPage = () => {
  const { count, increment, decrement, reset } = useCounter();
  return (
    <div>
      <h1>
        Count: <span>{count}</span>
      </h1>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default React.memo(Counter);
