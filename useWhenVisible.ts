import { useEffect } from 'react';

const useWhenVisible = (
  target: Element | undefined,
  callback: () => void,
  root: Element | undefined = document.body
) => {
  useEffect(() => {
    if (!target || !root) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      },
      { root }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [target, callback, root]);
};

export default useWhenVisible;
