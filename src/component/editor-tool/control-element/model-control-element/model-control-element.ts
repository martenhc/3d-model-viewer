import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {when} from 'lit/directives/when.js';
import {styles} from './styles';

@customElement('model-control-element')
export class ModelControlElement extends LitElement {
  static styles = styles;

  private PLACEHOLDER = '/static/model/astronaut.glb';

  @property({type: String}) errorMessage: string = '';

  _onModelUrlChange(event: Event) {
    const newModelUrl = (event.target as HTMLInputElement).value;
    this.dispatchEvent(
      new CustomEvent('model-change', {
        detail: newModelUrl !== '' ? newModelUrl : this.PLACEHOLDER,
      })
    );
  }

  render() {
    return html`<span class="text">Model URL:</span>
      <input
        class="model-url-input"
        @change=${this._onModelUrlChange}
        type="text"
        placeholder="${this.PLACEHOLDER}"
      />
      ${when(!!this.errorMessage, () => {
        return html`<div class="error-text">
          Error loading model, please try again. <br /><br />
          ${this.errorMessage}
        </div>`;
      })}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'model-control-element': ModelControlElement;
  }
}
