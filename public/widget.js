(function() {
  if (document.getElementById('beacon-studios-widget')) return;

  const BOT_URL = window.BeaconStudiosConfig?.botUrl || 
    'https://restaurant-chatbot-eight.vercel.app';

  const style = document.createElement('style');
  style.textContent = `
    #beacon-studios-widget * { box-sizing: border-box; margin: 0; padding: 0; }
    #beacon-studios-launcher {
      position: fixed; bottom: 24px; right: 24px;
      width: 56px; height: 56px; border-radius: 50%;
      background: var(--beacon-color, #1a3a4a);
      border: none; cursor: pointer; z-index: 999999;
      box-shadow: 0 4px 16px rgba(0,0,0,0.2);
      display: flex; align-items: center; justify-content: center;
      font-size: 24px; transition: transform 0.2s ease;
    }
    #beacon-studios-launcher:hover { transform: scale(1.08); }
    #beacon-studios-frame-wrapper {
      position: fixed; bottom: 92px; right: 24px;
      width: 340px; z-index: 999998;
      border-radius: 16px; overflow: hidden;
      box-shadow: 0 8px 32px rgba(0,0,0,0.18);
      border: 1px solid rgba(0,0,0,0.1);
      display: none; flex-direction: column;
      transition: opacity 0.2s ease, transform 0.2s ease;
      opacity: 0; transform: translateY(10px);
    }
    #beacon-studios-frame-wrapper.open {
      display: flex; opacity: 1; transform: translateY(0);
    }
    #beacon-studios-iframe {
      width: 100%; height: 480px; border: none; display: block;
    }
    @media (max-width: 600px) {
      #beacon-studios-frame-wrapper {
        bottom: 0; right: 0; left: 0; width: 100%;
        border-radius: 16px 16px 0 0; bottom: 80px;
      }
      #beacon-studios-iframe { height: 420px; }
    }
  `;
  document.head.appendChild(style);
  const wrapper = document.createElement('div');
  wrapper.id = 'beacon-studios-widget';
  const frameWrapper = document.createElement('div');
  frameWrapper.id = 'beacon-studios-frame-wrapper';
  const iframe = document.createElement('iframe');
  iframe.id = 'beacon-studios-iframe';
  iframe.src = BOT_URL + '/embed';
  iframe.title = 'Chat Assistant';
  iframe.allow = 'microphone';
  frameWrapper.appendChild(iframe);
  const launcher = document.createElement('button');
  launcher.id = 'beacon-studios-launcher';
  launcher.setAttribute('aria-label', 'Open chat');
  launcher.innerHTML = window.BeaconStudiosConfig?.emoji || '🍽️';
  let isOpen = true;
  launcher.addEventListener('click', () => {
    isOpen = !isOpen;
    if (isOpen) {
      frameWrapper.classList.add('open');
      launcher.innerHTML = '✕';
      launcher.setAttribute('aria-label', 'Close chat');
    } else {
      frameWrapper.classList.remove('open');
      launcher.innerHTML = window.BeaconStudiosConfig?.emoji || '🍽️';
      launcher.setAttribute('aria-label', 'Open chat');
    }
  });
  setTimeout(() => {
    frameWrapper.classList.add('open');
    launcher.innerHTML = '✕';
  }, 1000);
  wrapper.appendChild(frameWrapper);
  wrapper.appendChild(launcher);
  document.body.appendChild(wrapper);
})();
