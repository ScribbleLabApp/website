import { useRef } from 'react';
import { FaFacebook, FaTwitter, FaLink, FaEnvelope } from 'react-icons/fa';

const ShareSheet = () => {
  const shareLinkInputRef = useRef<HTMLInputElement | null>(null);

  const shareViaMail = () => {
    const subject = 'ScribbleLabApp Blog Post';
    const body = window.location.href;
    const uri = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(uri);
  };

  const shareViaLink = () => {
    navigator.clipboard.writeText(window.location.href).then(
      (data) => {
        console.log('Copying to clipboard was successful!', data);
      },
      (err) => {
        console.log('Could not copy text: ', err);
      }
    );
  };

  return (
    <div className="sharesheet component mt-8 mb-10">
      <div className="component-content">
        <div className="sharesheet-content tooltip-wrapper">
          <ul className="sharesheet-options flex space-x-4">
            <li className="social-option opacity-50 hover:opacity-100 transition-opacity">
              <button
                className="icon icon-facebook social-icon p-2"
                title="Share via Facebook"
                aria-label="Share this article via Facebook (opens in new window)"
                onClick={() =>
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`
                  )
                }
              >
                <FaFacebook className="w-6 h-6" />
              </button>
            </li>
            <li className="social-option opacity-50 hover:opacity-100 transition-opacity">
              <button
                className="icon icon-twitter social-icon p-2"
                title="Share via Twitter"
                aria-label="Share this article via Twitter (opens in new window)"
                onClick={() =>
                  window.open(
                    `https://x.com/intent/tweet?url=${window.location.href}`
                  )
                }
              >
                <FaTwitter className="w-6 h-6" />
              </button>
            </li>
            <li className="social-option opacity-50 hover:opacity-100 transition-opacity">
              <button
                className="icon icon-mail social-icon p-2"
                title="Share via mail"
                aria-label="Share this article via Mail (opens in new window)"
                onClick={shareViaMail}
              >
                <FaEnvelope className="w-6 h-6" />
              </button>
            </li>
            <li className="social-option opacity-50 hover:opacity-100 transition-opacity">
              <button
                className="icon icon-link social-icon p-2"
                title="Share via link"
                aria-label="Share via link"
                onClick={shareViaLink}
              >
                <FaLink className="w-6 h-6" />
              </button>
            </li>
          </ul>
          <div
            className="sharesheet-link-container absolute left-0 top-full w-full opacity-0.01 bg-gray-100"
            aria-hidden="true"
          >
            <div className="sharesheet-link-content">
              <input
                ref={shareLinkInputRef}
                className="link-text w-full p-2 bg-gray-200 rounded-md"
                value={typeof window !== 'undefined' ? window.location.href : ''}
                readOnly
                aria-hidden="true"
              />
              <button
                className="icon icon-close sharesheet-link-close p-2"
                title="Close"
                aria-label="Close link"
                onClick={() => {
                  if (shareLinkInputRef.current) {
                    shareLinkInputRef.current.value = '';
                  }
                }}
              >
                <FaLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareSheet;