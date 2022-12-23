import {css} from 'lit';

export const styles = css`
  :host {
    display: block;
    font-family: 'Google Sans Display', Arial, sans-serif;
    font-size: 1.2rem;
    margin: 0 auto;
    padding: 2rem;
  }

  .controls-wrapper {
    padding-top: 2rem;
    display: block;
    position: absolute;
    color: var(--blue);
    font-size: 1.5rem;
  }

  .button {
    background: none;
    background-color: #fff;
    border: none;
    border-color: #dadce0;
    box-shadow: none;
    cursor: pointer;
    -webkit-appearance: none;
    color: var(--blue);
    font-size: 1.8rem;
  }

  .axis-controls-container {
    line-height: 3rem;
    margin: 0.5rem 0 0.5rem 2.5rem;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease-in-out;
  }

  .is-open {
    max-height: 15rem;
  }
`;
