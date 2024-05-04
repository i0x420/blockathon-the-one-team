'use client';

import { useEffect } from 'react';
import * as NProgress from 'nprogress';

export type TopLoaderProps = {
  color?: string;
  initialPosition?: number;
  crawlSpeed?: number;
  height?: number;
  crawl?: boolean;
  showSpinner?: boolean;
  easing?: string;
  speed?: number;
  shadow?: string | false;
};

const TopLoader = ({
  color: propColor,
  height: propHeight,
  showSpinner,
  crawl,
  crawlSpeed,
  initialPosition,
  easing,
  speed,
  shadow,
}: TopLoaderProps) => {
  // variables
  const defaultColor = '#cda439';
  const defaultHeight = 3;

  const color = propColor ?? defaultColor;
  const height = propHeight ?? defaultHeight;

  const boxShadow =
    !shadow && shadow !== undefined
      ? ''
      : shadow
      ? `box-shadow:${shadow}`
      : `box-shadow:0 0 10px ${color},0 0 5px ${color}`;

  const styles = (
    <style>
      {`#nprogress{pointer-events:none}#nprogress .bar{background:${color};position:fixed;z-index:1031;top:0;left:0;width:100%;height:${height}px}#nprogress .peg{display:block;position:absolute;right:0;width:100px;height:100%;${boxShadow};opacity:1;-webkit-transform:rotate(3deg) translate(0px,-4px);-ms-transform:rotate(3deg) translate(0px,-4px);transform:rotate(3deg) translate(0px,-4px)}#nprogress .spinner{display:block;position:fixed;z-index:1031;top:15px;right:15px}#nprogress .spinner-icon{width:18px;height:18px;box-sizing:border-box;border:2px solid transparent;border-top-color:${color};border-left-color:${color};border-radius:50%;-webkit-animation:nprogress-spinner 400ms linear infinite;animation:nprogress-spinner 400ms linear infinite}.nprogress-custom-parent{overflow:hidden;position:relative}.nprogress-custom-parent #nprogress .bar,.nprogress-custom-parent #nprogress .spinner{position:absolute}@-webkit-keyframes nprogress-spinner{0%{-webkit-transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg)}}@keyframes nprogress-spinner{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}
    </style>
  );

  // functions
  const isAnchorOfCurrentUrl = (currentUrl: string, newUrl: string) => {
    const currentUrlObj = new URL(currentUrl);
    const newUrlObj = new URL(newUrl);
    // Compare hostname, pathname, and search parameters
    if (
      currentUrlObj.hostname === newUrlObj.hostname &&
      currentUrlObj.pathname === newUrlObj.pathname &&
      currentUrlObj.search === newUrlObj.search
    ) {
      // Check if the new URL is just an anchor of the current URL page
      const currentHash = currentUrlObj.hash;
      const newHash = newUrlObj.hash;
      return (
        currentHash !== newHash &&
        currentUrlObj.href.replace(currentHash, '') ===
          newUrlObj.href.replace(newHash, '')
      );
    }
    return false;
  };

  const findClosestAnchor = (
    element: HTMLElement | null,
  ): HTMLAnchorElement | null => {
    while (element && element.tagName.toLowerCase() !== 'a') {
      element = element.parentElement;
    }
    return element as HTMLAnchorElement;
  };

  useEffect(() => {
    NProgress.configure({
      showSpinner: showSpinner ?? false,
      trickle: crawl ?? true,
      trickleSpeed: crawlSpeed ?? 200,
      minimum: initialPosition ?? 0.08,
      easing: easing ?? 'ease',
      speed: speed ?? 200,
    });

    const htmlNode = document.querySelectorAll('html');

    const handleClick = (event: MouseEvent) => {
      // check case open new tab with command + click
      if (event.metaKey || event.ctrlKey) return;

      try {
        const target = event.target as HTMLElement;
        const anchor = findClosestAnchor(target);

        if (anchor) {
          const currentUrl = window.location.href;
          const newUrl = anchor.href;
          const isExternalLink = anchor.target === '_blank';
          const isAnchor = isAnchorOfCurrentUrl(currentUrl, newUrl);

          // check case is current url
          if (newUrl === currentUrl || isAnchor || isExternalLink) {
            // trigger progress bar
            NProgress.start();
            NProgress.done();

            // remove class progress bar after it done
            Array.prototype.forEach.call(htmlNode, function (el: Element) {
              el.classList.remove('nprogress-busy');
            });

            return;
          }

          // check case is not current url
          // trigger progress bar
          NProgress.start();
          // execute function IIFE
          ((history) => {
            const pushState = history.pushState;
            // custom window.history.pushState function with progress bar
            history.pushState = function () {
              NProgress.done();

              // remove class progress bar after it done
              // [].forEach.call(htmlNode, function (el: Element) {} ==>> shorthand typing
              Array.prototype.forEach.call(htmlNode, function (el: Element) {
                el.classList.remove('nprogress-busy');
              });
              return pushState.apply(history, arguments);
            };
          })(window.history);
        }
      } catch (err) {
        NProgress.start();
        NProgress.done();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return styles;
};

export default TopLoader;
