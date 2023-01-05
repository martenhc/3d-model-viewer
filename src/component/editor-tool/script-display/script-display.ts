import {Hotspot} from '@data/type/hotspot';
import {html, LitElement} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import {buttonStyle} from 'src/style/button';
import {styles} from './styles';

@customElement('script-display')
export class ScriptDisplay extends LitElement {
  static styles = [styles, buttonStyle];

  @property({type: Array}) hotspots!: Array<Hotspot>;
  @property({type: String}) modelUrl!: string;

  @query('.code-wrapper') $codeWrapper!: HTMLElement;

  private _onCopyButtonClick() {
    navigator.clipboard.writeText(this.$codeWrapper.innerText);
  }

  render() {
    return html`<div class="display-container">
      <div class="headline">Script</div>
      <button @click=${this._onCopyButtonClick} class="copy-button">
        <span class="button-icon"></span>
        <span class="button-text">Copy to clipboard</span>
      </button>

      <code class="code-wrapper">
        &lt;model-viewer-setup modelUrl="${this.modelUrl}"
        hotspots='[${this.hotspots.map(
          (hotspot, index) =>
            `{"position": [
              ${hotspot.position[0]},
              ${hotspot.position[1]},
              ${hotspot.position[2]}
            ], "text": "${hotspot.text}"}${
              index != this.hotspots.length - 1 ? ', ' : ''
            }`
        )}]'&gt;&lt;/model-viewer-setup&gt;
      </code>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'script-display': ScriptDisplay;
  }
}
