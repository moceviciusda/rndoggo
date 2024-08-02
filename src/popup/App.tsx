import { useEffect, useState } from 'react';
import { type TSettings, defaultSettings } from '../background/background';

function App() {
  const [settings, setSettings] = useState<TSettings>(defaultSettings);
  const [iconScale, setIconScale] = useState(1);

  const [checkboxHovered, setCheckBoxHovered] = useState(false);

  useEffect(() => {
    chrome.storage.sync.get('settings', (data) => {
      setSettings(data.settings);
    });

    chrome.storage.sync.onChanged.addListener((changes) => {
      if (changes.settings) {
        setSettings(changes.settings.newValue);
      }
    });
  }, []);

  useEffect(() => {
    setIconScale(1.2);
    setTimeout(() => setIconScale(1), 300);
  }, [settings.dogs]);

  return (
    <div
      style={{
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        minWidth: '326px',
        background: 'linear-gradient(70deg, #d53369, #daae51)',
        color: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h1
        style={{
          height: '3rem',
          display: 'flex',
          alignItems: 'center',
          fontSize: '2rem',
        }}
      >
        Hello from RNDogs
        <div
          style={{
            background: 'linear-gradient(90deg, #210542, #d53369)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            position: 'relative',
            display: 'inline-block',
            marginLeft: '-5rem',
            transform: `scale(${settings.dogs ? 0 : iconScale}) rotate(${
              (settings.dogs ? 0 : 360 * iconScale) - 10
            }deg)`,
            transition: 'transform 0.3s',
            top: '0.5rem',
            fontSize: '3rem',
            fontStyle: 'italic',
            fontWeight: 'bolder',
          }}
        >
          Cats
        </div>
      </h1>

      <div style={{ fontSize: '1.25rem', paddingInline: '0.5rem' }}>
        <p>
          This is a simple extension that fetches a random cute image from an
          API and displays it on the RND page.
        </p>
        <p>It can also end your lunch break automatically after 11 minutes.</p>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          alignItems: 'stretch',
          marginBottom: '1rem',
        }}
      >
        <h2 style={{ paddingInline: '0.5rem' }}>
          <strong>Settings:</strong>
        </h2>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <div
            style={{
              width: '90px',
              height: '48px',
              background: 'linear-gradient(90deg, #210542, #d53369)',
              borderRadius: '25px',
              position: 'relative',
              border: '2px solid white',
              cursor: 'pointer',
            }}
            onClick={() => {
              chrome.storage.sync.set({
                settings: {
                  ...settings,
                  dogs: !settings.dogs,
                  cats: !settings.cats,
                },
              });
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
                <span
                  style={{
                    transform: `scale(${iconScale})`,
                    transition: 'transform 0.3s',
                  }}
                >
                  🐶
                </span>
              ) : (
                <span
                  style={{
                    transform: `scale(${iconScale})`,
                    transition: 'transform 0.3s',
                    position: 'relative',
                    top: '-6px',
                  }}
                >
                  😻
                </span>
              )}
            </div>
          </div>

          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              whiteSpace: 'wrap',
              wordBreak: 'break-word',
              cursor: 'pointer',
              fontSize: checkboxHovered ? '1.25rem' : '1rem',
              background: checkboxHovered
                ? settings.autoStartWork
                  ? 'crimson'
                  : 'rgb(113, 131, 86)'
                : 'transparent',
              transition: 'font-size 0.3s, background 0.3s',
              gap: '0.25rem',
              width: '50%',
              fontWeight: 'bold',
              borderRadius: '999px',
              border: '2px solid white',
              height: '48px',
            }}
            onMouseEnter={() => setCheckBoxHovered(true)}
            onMouseLeave={() => setCheckBoxHovered(false)}
          >
            <input
              type='checkbox'
              checked={settings.autoStartWork}
              onChange={(e) =>
                chrome.storage.sync.set({
                  settings: { ...settings, autoStartWork: e.target.checked },
                })
              }
              style={{
                margin: 0,
                appearance: 'none',
                minWidth: '54px',
                minHeight: '54px',
                borderRadius: '999px',
                border: '4px solid white',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background 0.3s, opacity 0.3s',
                background: settings.autoStartWork
                  ? 'linear-gradient(110deg, #210542, #d53369)'
                  : 'transparent',
              }}
            />
            {!checkboxHovered
              ? 'Auto start work'
              : settings.autoStartWork
              ? 'Disable'
              : 'Enable'}
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
