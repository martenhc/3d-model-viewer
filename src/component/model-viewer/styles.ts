import {css} from 'lit';

export const styles = css`
  :host {
    left: 0;
    outline: none;
    position: fixed;
    top: 0;
  }

  .hotspot {
    cursor: help;
    left: 50%;
    position: absolute;
    top: 50%;
  }

  .hotspot.visible .label {
    transform: scale(1, 1);
  }

  .hotspot .label {
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

  .hotspot .text {
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

  .hotspot:hover .text {
    opacity: 1;
  }

  .reset {
    position: relative;
    float: right;
    font-size: 3rem;
    left: -5rem;
  }
`;
