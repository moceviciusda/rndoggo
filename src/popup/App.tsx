function App() {
  return (
    <div
      style={{
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        minWidth: '320px',
        background: 'linear-gradient(90deg, #d53369 0%, #daae51 100%)',
        color: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h1>Hello from RNDogs</h1>

      <p>
        This is a simple extension that fetches a random dog image from an API
        and displays it on the RND page.
      </p>

      <p>
        It also has a timer that will alert you to start working after 11
        minutes
      </p>
    </div>
  );
}

export default App;
