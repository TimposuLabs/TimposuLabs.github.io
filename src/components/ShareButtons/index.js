import React, {useEffect, useState} from 'react';
import {
  FaFacebookF,
  FaLink,
  FaTelegram,
  FaThreads,
  FaWhatsapp,
  FaXTwitter,
} from 'react-icons/fa6';
import styles from './styles.module.css';

async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  let copied;
  try {
    textarea.select();
    copied = document.execCommand('copy');
  } finally {
    textarea.remove();
  }

  if (!copied) {
    throw new Error('Clipboard is unavailable');
  }
}

export default function ShareButtons() {
  const [pageUrl, setPageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    setPageUrl(window.location.href);
    setTitle(document.title);
  }, []);

  const shareText = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(pageUrl);

  async function handleCopy() {
    try {
      await copyToClipboard(window.location.href);
      setStatus('Link copied.');
    } catch {
      setStatus('Unable to copy link.');
    }
  }

  return (
    <section className={styles.share} aria-label="Share this article">
      <h2 className={styles.heading}>Share</h2>
      <div className={styles.links}>
        <a
          className={styles.link}
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${shareText}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X">
          <FaXTwitter aria-hidden="true" />
        </a>
        <a
          className={styles.link}
          href={`https://www.threads.net/intent/post?text=${encodeURIComponent(`${title} ${pageUrl}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Threads">
          <FaThreads aria-hidden="true" />
        </a>
        <a
          className={styles.link}
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook">
          <FaFacebookF aria-hidden="true" />
        </a>
        <a
          className={styles.link}
          href={`https://wa.me/?text=${shareText}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on WhatsApp">
          <FaWhatsapp aria-hidden="true" />
        </a>
        <a
          className={styles.link}
          href={`https://t.me/share/url?url=${encodedUrl}&text=${shareText}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Telegram">
          <FaTelegram aria-hidden="true" />
        </a>
        <button
          className={styles.link}
          type="button"
          onClick={handleCopy}
          aria-label="Copy article link">
          <FaLink aria-hidden="true" />
        </button>
      </div>
      <p className={styles.status} role="status" aria-live="polite">
        {status}
      </p>
    </section>
  );
}
