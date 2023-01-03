import {css} from 'lit';

export const styles = css`
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

  .axis-controls-container {
    line-height: 3rem;
    margin: 1rem 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease-in-out;
  }

  .delete-button {
    background-image: url('/static/icon/trashbin.svg');
    background-repeat: no-repeat;
    background-position: center;
    height: 2rem;
    position: absolute;
    margin-top: -0.75rem;
    width: 3rem;
  }

  .headline {
    font-size: 1.4rem;
    margin-top: -1rem;
    position: absolute;
  }

  .hotspot-settings {
    border: 2px solid var(--blue-light);
    border-radius: 1rem;
    margin-bottom: 3.5rem;
    padding: 0 1rem;
    animation: fadeIn 0.5s;
  }

  .label-input {
    color: hsl(var(--grey-800));
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
    padding: 0.5rem;
    width: 92%;
  }

  .text-preview {
    color: hsl(var(--grey-600));
    font-size: 1.4rem;
    margin-top: 1.8rem;
  }

  .is-open {
    max-height: 20rem;
  }

  .closing {
    animation: fadeOut 0.25s;
  }
`;
