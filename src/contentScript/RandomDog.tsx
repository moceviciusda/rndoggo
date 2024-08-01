import { useEffect, useState } from 'react';
import { type TState, type TSettings } from '../background/background';

function RandomDog() {
  const [loading, setLoading] = useState(true);
  const [containerHovered, setContainerHovered] = useState(false);

  const [settings, setSettings] = useState<TSettings>({
    dogs: true,
    cats: false,
    autoStartWork: true,
  });

  const [state, setState] = useState<TState>({
    dogSrc: null,
    // catSrc: `https://cataas.com/cat/gif?rand=${Math.random()}`,
    catSrc: null,
  });

  const { dogSrc, catSrc } = state;

  const fetchDog = () => {
    setLoading(true);
    fetch('https://random.dog/woof')
      .then((response) => response.text())
      .then((data) => {
        setState((prev) => ({ ...prev, dogSrc: data }));
        setLoading(false);
      });
  };

  const fetchCat = () => {
    setLoading(true);
    fetch('https://api.thecatapi.com/v1/images/search?gif=true')
      .then((response) => response.json())
      .then((data) => {
        setState((prev) => ({ ...prev, catSrc: data[0].url }));
        setLoading(false);
      });
  };

  useEffect(() => {
    chrome.storage.sync.get('settings', (data) => {
      setSettings(data.settings);
    });

    chrome.storage.sync.get('state', (data) => {
      setState(data.state);
    });

    chrome.storage.onChanged.addListener((changes) => {
      if (changes.settings) {
        setSettings(changes.settings.newValue);
      }
      if (changes.state) {
        setState(changes.state.newValue);
      }
    });
  }, []);

  useEffect(() => {
    !dogSrc && fetchDog();
    !catSrc && fetchCat();
  }, []);

  useEffect(() => {
    chrome.storage.sync.set({ state });
  }, [state]);

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
        overflow: 'hidden',
        position: 'relative',
        maxHeight: 360,
      }}
      onMouseEnter={() => setContainerHovered(true)}
      onMouseLeave={() => setContainerHovered(false)}
    >
      {settings.dogs ? (
        dogSrc?.includes('.mp4') || dogSrc?.includes('.webm') ? (
          <video autoPlay loop muted style={{ objectFit: 'cover' }}>
            <source src={`https://random.dog/${dogSrc}`} type='video/mp4' />
          </video>
        ) : (
          <img
            src={`https://random.dog/${dogSrc}`}
            alt='Random dog'
            style={{ objectFit: 'cover' }}
          />
        )
      ) : catSrc?.includes('.mp4') ? (
        <video autoPlay loop muted style={{ objectFit: 'cover' }}>
          <source src={catSrc} type='video/mp4' />
        </video>
      ) : (
        <img
          // src={catSrc ?? undefined}
          src={catSrc ?? ''}
          alt='Random cat'
          style={{ objectFit: 'cover' }}
        />
      )}
      <button
        onClick={() => (settings.dogs ? fetchDog() : fetchCat())}
        disabled={loading}
        style={{
          padding: '0.5rem 1rem',
          marginTop: '1rem',
          backgroundColor: 'rgb(32 33 36)',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: loading ? 'progress' : 'pointer',
          opacity: containerHovered ? 1 : 0,
          transition: 'opacity 0.2s',
          position: 'absolute',
          bottom: '1rem',
          fontSize: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          whiteSpace: 'nowrap',
        }}
      >
        {settings.dogs ? (
          <>new dog {loading ? <LoadingSpinner /> : '🐕'}</>
        ) : (
          <>new cat {loading ? <LoadingSpinner /> : '😻'}</>
        )}
      </button>
    </div>
  );
}

const LoadingSpinner = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
    }}
  >
    <div
      style={{
        width: '20px',
        height: '20px',
        border: '5px solid rgb(32 33 36)',
        borderTop: '5px solid white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }}
    />
  </div>
);

export default RandomDog;
