import { useEffect, useState } from 'react';
import { type TState, type TSettings } from '../background/background';

function RandomDog() {
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [containerHovered, setContainerHovered] = useState(false);

  const [settings, setSettings] = useState<TSettings>({
    dogs: true,
    cats: false,
    autoStartWork: true,
  });

  const [state, setState] = useState<TState>({
    dogSrc: null,
    catSrc: `https://cataas.com/cat/gif?rand=${Math.random()}`,
  });

  const { dogSrc, catSrc } = state;

  console.log('dogSrc', dogSrc);
  console.log('catSrc', catSrc);

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
    });
  }, []);

  useEffect(() => {
    setLoading(true);

    if (settings.dogs) {
      fetch('https://random.dog/woof')
        .then((response) => response.text())
        .then((data) => {
          setState((prev) => ({ ...prev, dogSrc: data }));
          setLoading(false);
        });
    } else {
      setState((prev) => ({
        ...prev,
        catSrc: `https://cataas.com/cat/gif?rand=${Math.random()}`,
      }));
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [refetch, settings.dogs]);

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
        dogSrc?.includes('.mp4') ? (
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
          src={catSrc ?? undefined}
          alt='Random cat'
          style={{ objectFit: 'cover' }}
        />
      )}
      <button
        onClick={() => {
          setRefetch((prev) => !prev);
        }}
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
        }}
      >
        {loading ? 'Loading...' : settings.dogs ? 'New dog 🐕' : 'New cat 😻'}
      </button>
    </div>
  );
}

export default RandomDog;
