/// <reference lib="webworker" />

postMessage({ action: 'check-processes' });

setInterval(() => {
  postMessage({ action: 'check-processes' });
}, 2 * 60 * 1000);