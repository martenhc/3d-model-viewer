import {css} from 'lit';

export const styles = css`
  :host {
    display: block;
    width: 24.8rem;
  }

  .display-container {
    border: 2px solid var(--blue-light);
    border-radius: 1rem;
    margin-bottom: 3.5rem;
    padding: 1.5rem 1rem 1rem;
  }

  .copy-button {
    background: var(--blue-600);
    border-radius: 0.4rem;
    color: white;
    font-size: 1.6rem;
    height: 5.6rem;
    padding: 1.6rem;
    width: 22.4rem;
    align-items: center;
  }

  .copy-button:active {
    background: var(--blue-800);
  }

  .button-icon {
    background-image: url('/static/icon/content_copy.svg');
    background-repeat: no-repeat;
    height: 2rem;
    position: absolute;
    width: 2rem;
  }

  .button-text {
    padding-left: 2.5rem;
  }

  .headline {
    background-color: white;
    color: hsl(var(--grey-800));
    font-size: 1.4rem;
    margin-top: -2.5rem;
    padding: 0 0.6rem;
    position: absolute;
  }

  .code-wrapper {
    display: block;
    background: #f1f3f4;
    border-style: 1px solid #dadce0;
    height: 6rem;
    margin-top: 2rem;
    overflow-y: scroll;
    padding: 1rem 1.5rem;
  }
`;
