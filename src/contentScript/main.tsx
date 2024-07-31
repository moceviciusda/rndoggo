import React from 'react';
import ReactDOM from 'react-dom/client';
import RandomDog from './RandomDog';
import WorkTime from './WorkTime';

const injectRandomDog = () => {
  const existingRoot = document.getElementById('rndogs-content-script-root');
  if (existingRoot) return;

  const dogsRoot = document.createElement('div');
  dogsRoot.id = 'rndogs-content-script-root';
  dogsRoot.style.display = 'flex';
  dogsRoot.style.flexGrow = '1';
  dogsRoot.style.flexBasis = '25%';
  dogsRoot.style.alignSelf = 'stretch';
  dogsRoot.style.alignItems = 'stretch';

  const rndCardContainer = document.querySelector(
    'main > div.flex.flex-wrap.md\\:flex-nowrap.gap-4.md\\:gap-y-0'
  );

  if (rndCardContainer) {
    rndCardContainer.appendChild(dogsRoot);
    ReactDOM.createRoot(dogsRoot).render(
      <React.StrictMode>
        <RandomDog />
      </React.StrictMode>
    );
  }
};

const injectWorkTime = () => {
  const existingRoot = document.getElementById(
    'rndogs-content-script-header-root'
  );
  if (existingRoot) return;

  const headerRoot = document.createElement('div');
  headerRoot.id = 'rndogs-content-script-header-root';

  const headerContainer = document.querySelector(
    '#app > div > div > div > header > div > div > div.flex.items-center'
  );

  if (headerContainer) {
    headerContainer.insertAdjacentElement('afterend', headerRoot);
    ReactDOM.createRoot(headerRoot).render(
      <React.StrictMode>
        <WorkTime />
      </React.StrictMode>
    );
  }
};

const inject = () => {
  injectRandomDog();
  injectWorkTime();
};

inject();

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === 'childList') {
      inject();
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

const cleanup = () => {
  observer.disconnect();
  const dogsRoot = document.getElementById('rndogs-content-script-root');
  const headerRoot = document.getElementById(
    'rndogs-content-script-header-root'
  );
  if (dogsRoot) dogsRoot.remove();
  if (headerRoot) headerRoot.remove();
};

window.addEventListener('beforeunload', cleanup);
