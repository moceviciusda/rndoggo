const WorkTime = () => {
  const selectConfirmButton = () =>
    document.querySelector(
      '#headlessui-portal-root > div > div > div > div > div > div.modal-content.inline-block.relative.w-full.text-left.align-middle.rounded-md.shadow-xl.transition-all.transform.bg-lmBg.dark\\:bg-dmBgElevated.text-lmTextPrimary.dark\\:text-dmTextPrimary.overflow-auto.mb-16.max-w-md > div.overflow-y-visible.p-4.pt-2.w-auto > div > button'
    ) as HTMLElement | null;

  const endWorkCallback = async () => {
    await chrome.runtime.sendMessage('endWork');
    console.log('endWork message sent');
  };

  const workButton = document.querySelector(
    '#app > div > div > div > nav > div > div > div.flex.flex-row > div.nav-link.no-hover > div > button'
  ) as HTMLElement;

  workButton!.addEventListener('click', () => {
    console.log('work button clicked');
    const confirmButton = selectConfirmButton();
    if (confirmButton) {
      confirmButton.removeEventListener('click', endWorkCallback);
      confirmButton.addEventListener('click', endWorkCallback, { once: true });
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      confirmButton.style.backgroundColor = `#${randomColor}`;
    } else {
      console.log('confirm button not found');
    }
  });

  chrome.runtime.onMessage.addListener((message) => {
    if (message === 'startWork') {
      console.log('message received', message);
      workButton!.click();
    }
  });

  return <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>RNDogs 🐶</h2>;
};

export default WorkTime;
