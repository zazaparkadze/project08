import { useReducer } from "react";

function reducer(
  state: { count: number; logged: boolean },
  action: { type: string }
) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1, logged: !state.logged };
    case "decrement":
      return { count: state.count - 1, logged: !state.logged };
    default:
      return state;
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0, logged: false });

  return (
    <div className="text-3xl text-amber-500 flex flex-col gap-3 items-center">
      <p>{state.count}</p>
      <p>{state.logged ? "true" : "false"}</p>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
    </div>
  );
}
