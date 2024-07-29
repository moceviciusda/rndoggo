const WorkTime = () => {
  const button = document.getElementById('headlessui-menu-button-5');

  const startWorkButton = document.querySelector(
    '#app > div > div > div > nav > div > div > div.flex.flex-row > div.nav-link.no-hover > div > button'
  ) as HTMLElement;

  button!.addEventListener(
    'click',
    () => {
      console.log('button clicked');
      setTimeout(() => {
        chrome.runtime.sendMessage('startWork');
      }, 11 * 60 * 1000);
    },
    { once: true }
  );

  chrome.runtime.onMessage.addListener((message) => {
    if (message === 'startWork') {
      console.log('received StartWork message');
      startWorkButton!.click();

      button!.addEventListener(
        'click',
        () => {
          console.log('button clicked');
          setTimeout(() => {
            chrome.runtime.sendMessage('start');
          }, 10000);
        },
        { once: true }
      );
    }
  });

  return <div>RNDOGS</div>;
};

export default WorkTime;
