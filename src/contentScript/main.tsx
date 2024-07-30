import React from 'react';
import ReactDOM from 'react-dom/client';
import RandomDog from './RandomDog';
import WorkTime from './WorkTime';

const dogsRoot = document.createElement('div');
dogsRoot.id = 'rndogs-content-script-root';
dogsRoot.style.display = 'flex';
dogsRoot.style.flexGrow = '1';
dogsRoot.style.flexBasis = '25%';
dogsRoot.style.alignSelf = 'stretch';
dogsRoot.style.alignItems = 'stretch';

const headerRoot = document.createElement('div');
headerRoot.id = 'rndogs-content-script-header-root';

const rndCardContainer = document.querySelector(
  'main > div.flex.flex-wrap.md\\:flex-nowrap.gap-4.md\\:gap-y-0'
)!;
rndCardContainer.appendChild(dogsRoot);

document
  .querySelector(
    '#app > div > div > div > header > div > div > div.flex.items-center'
  )!
  .insertAdjacentElement('afterend', headerRoot);

ReactDOM.createRoot(document.getElementById(dogsRoot.id)!).render(
  <React.StrictMode>
    <RandomDog />
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById(headerRoot.id)!).render(
  <React.StrictMode>
    <WorkTime />
  </React.StrictMode>
);
