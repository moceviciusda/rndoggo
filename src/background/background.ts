chrome.runtime.onMessage.addListener(async (message, sender) => {
  console.log('message received', message, sender);

  if (message === 'endWork' && sender.tab) {
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
});
