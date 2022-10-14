import {css} from 'lit';

export const styles = css`
  /* :host {
    display: block;
    padding: 20px;
    max-width: 60%;
    margin: 0 auto;
    background: var(--color-background-primary);
    color: var(--color-foreground-primary);
    font-size: 1.2rem;
  } */

  :host {
    left: 0;
    outline: none;
    position: fixed;
    top: 0;
  }

  .hotspots {
    cursor: help;
    left: 50%;
    position: absolute;
    top: 50%;
  }

  .hotspots.visible .label {
    transform: scale(1, 1);
  }

  .hotspots .label {
    background-color: #00000077;
    border-radius: 50%;
    color: #fff;
    font-family: 'Helvetica, Arial, sans-serif';
    font-size: 16px;
    font-weight: 100;
    height: 40px;
    left: -20px;
    line-height: 40px;
    position: absolute;
    text-align: center;
    top: -20px;
    transform: scale(0, 0);
    transition: transform 0.3s;
    width: 40px;
  }

  .hotspots .text {
    background: #00000077;
    border: 1px solid #ffffff77;
    border-radius: 4px;
    color: #ffffff;
    left: -120px;
    line-height: 1.3em;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: 100;
    opacity: 0;
    padding: 20px;
    pointer-events: none;
    position: absolute;
    top: 30px;
    text-align: center;
    transition: opacity 0.3s;
    width: 200px;
  }

  .hotspots:hover .text {
    opacity: 1;
  }

  .loader {
    width: 100px;
    height: 100px;
    margin: 1em auto;
    border-radius: 50%;
    background-image: conic-gradient(#1a73e8 0%, lightgrey 0%);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    margin-top: -50px;
  }

  .loader::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    background: white;
    border-radius: inherit;
  }
`;
