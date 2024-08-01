import { useEffect, useState } from 'react';
import { type TSettings } from '../background/background';

const autoStart = document.createElement('div');
autoStart.style.fontSize = '18px';
autoStart.style.fontWeight = 'bold';
autoStart.style.fontFamily = 'Oswald, sans-serif';
autoStart.style.lineHeight = '1.25rem';
autoStart.style.textTransform = 'uppercase';
autoStart.style.marginRight = '1rem';

const navBarContainer = document.querySelector(
  '#app > div > div > div > nav > div > div > div.flex.flex-row'
) as HTMLElement | null;

if (navBarContainer) {
  navBarContainer.style.alignItems = 'center';
  navBarContainer.insertBefore(autoStart, navBarContainer.firstChild);
}

const workButton = document.querySelector(
  '#app > div > div > div > nav > div > div > div.flex.flex-row > div.nav-link.no-hover > div > button'
) as HTMLElement;

workButton.addEventListener('click', () => {
  console.log('work button clicked');
  const confirmButton = selectConfirmButton();
  if (confirmButton) {
    confirmButton.removeEventListener('click', endWorkCallback);
    confirmButton.addEventListener('click', endWorkCallback, { once: true });
    confirmButton.appendChild(document.createTextNode(' 😜'));
    confirmButton.style.fontSize = '1.5rem';
  } else {
    console.log('confirm button not found');
  }
});

const selectConfirmButton = () =>
  document.querySelector(
    '#headlessui-portal-root > div > div > div > div > div > div.modal-content.inline-block.relative.w-full.text-left.align-middle.rounded-md.shadow-xl.transition-all.transform.bg-lmBg.dark\\:bg-dmBgElevated.text-lmTextPrimary.dark\\:text-dmTextPrimary.overflow-auto.mb-16.max-w-md > div.overflow-y-visible.p-4.pt-2.w-auto > div > button'
  ) as HTMLElement | null;

const endWorkCallback = async () => {
  await chrome.runtime.sendMessage({ type: 'endWork' });
  console.log('endWork message sent');
};

const WorkTime = () => {
  const [settings, setSettings] = useState<TSettings>({
    dogs: true,
    cats: false,
    autoStartWork: true,
  });

  const { autoStartWork } = settings;

  useEffect(() => {
    chrome.storage.sync.get('settings', (data) => {
      setSettings(data.settings);
    });
    chrome.storage.onChanged.addListener((changes) => {
      if (changes.settings) {
        setSettings(changes.settings.newValue);
      }
    });
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === 'startWork') {
        console.log('message received', message);
        console.log('autoStartWork', autoStartWork);

        autoStartWork && workButton.click();
      }
    });
  }, []);

  useEffect(() => {
    autoStart.textContent = settings.autoStartWork
      ? 'Auto Start Work Enabled'
      : 'Auto Start Work Disabled';
  }, [settings.autoStartWork]);

  return (
    <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
      {settings.dogs ? 'RNDogs 🐶' : 'Catsss 😼'}
    </h2>
  );
};

export default WorkTime;
