export type TSettings = {
  dogs: boolean;
  cats: boolean;
  autoStartWork: boolean;
};

export type TState = {
  dogSrc: string | null;
  catSrc: string | null;
};

export type TMessage<MType = 'getSettings' | 'setSettings' | 'endWork'> = {
  type: MType;
  payload: MType extends 'setSettings' ? TSettings : undefined;
};

export const defaultSettings: TSettings = {
  dogs: true,
  cats: true,
  autoStartWork: true,
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set(
    { settings: defaultSettings, state: { dogSrc: null, catSrc: null } },
    () => console.log('Settings initialized')
  );
});

chrome.runtime.onMessage.addListener(
  (message: TMessage, sender, sendResponse) => {
    console.log('message received', message, sender);

    if (message.type === 'getSettings') {
      chrome.storage.sync.get('settings', (data) => {
        sendResponse(data.settings);
      });
    }

    if (message.type === 'setSettings') {
      const { payload } = message;
      chrome.storage.sync.set({ settings: payload }, () => {
        sendResponse(payload);
      });
    }

    if (message.type === 'endWork' && sender.tab) {
      const tab = sender.tab;
      setTimeout(async () => {
        await chrome.windows.update(tab.windowId, { focused: true });
        await chrome.tabs.update(tab.id!, { active: true });
        await chrome.tabs.sendMessage(tab.id!, 'startWork');
      }, 11 * 60 * 1000);

      let timeRemaining = 11 * 60;
      const interval = setInterval(() => {
        timeRemaining -= 10;
        console.log('Time remaining until startWork:', timeRemaining);
      }, 10 * 1000);

      setTimeout(() => {
        clearInterval(interval);
      }, 11 * 60 * 1000);

      return;
    }

    return true;
  }
);
