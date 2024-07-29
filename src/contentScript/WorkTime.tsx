const WorkTime = () => {
  const button = document.getElementById('headlessui-menu-button-5');

  const startWorkButton = document.querySelector(
    '#app > div > div > div > nav > div > div > div.flex.flex-row > div.nav-link.no-hover > div > button'
  ) as HTMLElement;

  button!.addEventListener('click', () => {
    console.log('button clicked');
    // alert after 5s
    setTimeout(() => {
      chrome.runtime.sendMessage('start');
    }, 11 * 60 * 1000);
  });

  chrome.runtime.onMessage.addListener((message) => {
    if (message === 'startWork') {
      console.log('received StartWork message');
      //   button!.click();

      startWorkButton.click();
    }
  });

  //   useEffect(() => {
  //     console.log('WorkTime mounted');
  //     chrome.runtime.sendMessage('hello');

  //     return () => {
  //       console.log('WorkTime unmounted');
  //     };
  //   }, []);

  return <div>RNDOGS</div>;
};

export default WorkTime;
