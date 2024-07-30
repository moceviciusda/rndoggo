import { useEffect, useState } from 'react';
import { TSettings, defaultSettings } from '../background/background';

function App() {
  const [settings, setSettings] = useState<TSettings>(defaultSettings);

  useEffect(() => {
    chrome.runtime.sendMessage({ type: 'getSettings' }, (response) => {
      console.log('response', response);
      setSettings(response);
    });
  }, []);

  return (
    <div
      style={{
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        minWidth: '320px',
        background: 'linear-gradient(90deg, #d53369, #daae51)',
        color: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h1 style={{ height: '3rem', display: 'flex', alignItems: 'center' }}>
        Hello from RN
        {settings.dogs ? (
          'Dogs'
        ) : (
          <>
            <span
              style={
                {
                  // textDecorationLine: 'line-through',
                  // textDecorationColor: 'red',
                  // textDecorationThickness: '0.2em',
                }
              }
            >
              Dogs
            </span>
            <div
              style={{
                // purpleish to pinkish gradient
                background: 'linear-gradient(90deg, #210542, #d53369)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                position: 'relative',
                display: 'inline-block',
                marginLeft: '-3.5rem',
                transform: 'rotate(-10deg)',
                top: '0.5rem',
                fontSize: '2.5rem',
                fontStyle: 'italic',
                fontWeight: 'bolder',
              }}
            >
              Cats
            </div>
          </>
        )}
      </h1>

      <p>
        This is a simple extension that fetches a random dog image from an API
        and displays it on the RND page.
      </p>

      <p>It can also end your lunch break automatically after 11 minutes.</p>

      <p>
        <strong>Settings:</strong>
      </p>

      <div
        style={{
          width: '90px',
          height: '48px',
          backgroundColor: 'gray',
          borderRadius: '25px',
          position: 'relative',
          border: '2px solid white',
          cursor: 'pointer',
        }}
        onClick={() => {
          setSettings((prev) => ({
            ...prev,
            dogs: !prev.dogs,
            cats: !prev.cats,
          }));
        }}
      >
        <div
          style={{
            width: '54px',
            height: '54px',
            backgroundColor: 'white',
            borderRadius: '999px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            position: 'absolute',
            left: settings.dogs ? '0' : '36px',
            top: '-3px',
            transition: 'left 0.3s',
            fontSize: '2.5rem',
            lineHeight: '54px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          {settings.dogs ? (
            <span>🐶</span>
          ) : (
            <span
              style={{
                position: 'relative',
                top: '-6px',
              }}
            >
              😻
            </span>
          )}
        </div>
      </div>

      <label>
        <input
          type='checkbox'
          checked={settings.autoStartWork}
          onChange={(e) =>
            setSettings((prev) => ({
              ...prev,
              autoStartWork: e.target.checked,
            }))
          }
        />
        Auto start work
      </label>
      <button
        onClick={() => {
          chrome.runtime.sendMessage({
            type: 'setSettings',
            payload: settings,
          });
        }}
      >
        Save
      </button>
    </div>
  );
}

export default App;
