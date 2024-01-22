import { setupWorker } from 'msw/browser';

import { handlers } from 'mocks/handlers';

export const deferRender = async () => {
  if (MOCKING_ENV !== 'true') {
    return;
  }

  const worker = setupWorker(...handlers);

  await worker.start();
};
