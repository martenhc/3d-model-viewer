import {css} from 'lit';

export const styles = css`
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
