const trackingId = 'G-5NK2V38RCW';

if (typeof window !== 'undefined' && typeof window.gtag !== 'function') {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', trackingId, {anonymize_ip: true});
}
