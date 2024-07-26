import { useState } from 'react';

function RandomDog() {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '0.5rem',
        backgroundColor: 'rgb(43 44 47)',
        borderBottom: '1px solid rgb(32 33 36)',
      }}
    >
      <h1>Vite + React</h1>
      <div>
        <button
          onClick={() => setCount((count) => count + 1)}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            borderRadius: '0.5rem',
            backgroundColor: 'rgb(32 33 36)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </div>
  );
}

export default RandomDog;
