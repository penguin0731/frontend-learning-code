let isRun = false;
export function scheduler(effectFn) {
  Promise.resolve().then(() => {
    if (!isRun) {
      isRun = true;
      effectFn();
    }
  });
}
