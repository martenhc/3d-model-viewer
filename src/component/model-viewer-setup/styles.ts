import {css} from 'lit';

export const styles = css`
  :host {
    display: block;
    font-size: 1.4rem;
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
    color: var(--blue-600);
    font-size: 1.4rem;
  }

  .closing {
    animation: fadeOut 0.25s;
  }

  .add-text {
    margin-left: 0.8rem;
  }
`;
