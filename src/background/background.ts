chrome.runtime.onMessage.addListener(async (message, sender) => {
  console.log('message received', message, sender);

  if (message === 'startWork' && sender.tab) {
    await chrome.windows.update(sender.tab.windowId, { focused: true });
    await chrome.tabs.update(sender.tab.id!, { active: true });
    await chrome.tabs.sendMessage(sender.tab.id!, 'startWork');
  }
});
