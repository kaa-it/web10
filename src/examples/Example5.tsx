import React, { ReactElement, SyntheticEvent, useState } from "react"

//ui-kit
type ClickHandler = (event: SyntheticEvent<HTMLButtonElement, MouseEvent>) => void;

interface ButtonProps {
  text: string;
  onClick: ClickHandler;
  className?: string;
}

function Button({ text }: ButtonProps): ReactElement {
  return <button>{text}</button>
}

// section
interface ParentProps {
  count: number;
  increment: () => void;
}

function Counter({ count, increment }: ParentProps) {
  return <div>
    <input value={String(count)} />
    <Button text="Press me" onClick={() => increment()} />
  </div>
}

// connection
type CounterState = [
  number,
  {
    increment: () => void;
    decrement: () => void;
  }
];

interface CounterArgs {
  initial: number;
  step: number;
}

function useCounter({ initial, step }: CounterArgs): CounterState {
  const [count, setCount] = useState<number>(initial);

  const increment = () => setCount(state => state + step);
  const decrement = () => setCount(state => state - step);

  return [count, {
    increment,
    decrement
  }];
}

function ConnectedCounter(props: CounterArgs) {
  const [count, { increment }] = useCounter(props);

  return (
    <Counter count={count} increment={increment} />
  )
}

// use case
function Example5() {
  return <>
    <ConnectedCounter initial={0} step={1} />
    <ConnectedCounter initial={0} step={10} />  
  </>
}