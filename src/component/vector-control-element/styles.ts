import {css} from 'lit';

export const styles = css`
  :host {
    color: var(--blue);
    font-size: 1.5rem;
  }

  .vector-control-wrapper {
    padding-bottom: 1.5rem;
  }

  .axis-controls-container {
    line-height: 3rem;
    margin: 0.5rem 0 0.5rem 2.5rem;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.25s ease-in-out;
  }

  .is-open {
    max-height: 10rem;
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
    font-size: 1.5rem;
  }

  input[type='range']::-webkit-slider-runnable-track {
    height: 5px;
    cursor: pointer;
    box-shadow: 0px 0px 0px #000000;
    border-radius: 1px;
    border: 0px solid #000000;
  }

  input[type='range']::-webkit-slider-runnable-track {
    height: 10px;
    -webkit-appearance: none;
    color: var(--blue);
    margin-top: -5px;
  }

  input[type='number'] {
    border: 1px solid var(--blue);
    border-radius: 0.5rem;
    color: var(--blue);
    width: 4rem;
  }
`;
