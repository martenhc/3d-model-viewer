import {css} from 'lit';

export const styles = css`
  :host {
    display: block;
    font-family: 'Google Sans Display', Arial, sans-serif;
    font-size: 1.2rem;
    margin: 0 auto;
    padding: 2rem;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .controls-wrapper {
    padding-top: 2rem;
    display: block;
    position: absolute;
    color: var(--blue);
    font-size: 1.5rem;
  }

  .delete-button {
    position: absolute;
    margin-top: -1rem;
    width: 4rem;
    transition: font-size 0.15s ease-in-out;
  }

  .delete-button:hover {
    font-size: 1.75rem;
  }

  .headline {
    font-size: 1.8rem;
    margin-top: -1rem;
    position: absolute;
  }

  .axis-controls-container {
    line-height: 3rem;
    margin: 1rem 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease-in-out;
  }

  .is-open {
    max-height: 15rem;
  }

  .text-preview {
    color: gray;
    font-size: 1.2rem;
    margin-top: 1.25rem;
  }

  .hotspot-settings {
    border: 2px solid var(--blue);
    border-radius: 1rem;
    margin-bottom: 3.5rem;
    padding: 0 1rem;
    animation: fadeIn 0.5s;
  }

  .text-control-wrapper {
    margin: 0.5rem 0 0.75rem 0.5rem;
  }

  .closing {
    animation: fadeOut 0.25s;
  }
`;
