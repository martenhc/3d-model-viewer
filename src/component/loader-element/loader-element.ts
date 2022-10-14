import {html, LitElement, nothing} from 'lit';
import {styles} from './styles';
import {customElement, query, state} from 'lit/decorators.js';
import {when} from 'lit/directives/when.js';

@customElement('loader-element')
export class LoaderElement extends LitElement {
  static styles = styles;

  @query('.loader') private $loader!: HTMLDivElement;

  @state() private _isLoading = true;

  public onProgressUpdate = (
    _: string, // url
    loadedItemAmount: number,
    totalItemAmount: number
  ) => {
    const currentValue = (loadedItemAmount / totalItemAmount) * 100;
    this.$loader.style.backgroundImage = `conic-gradient(#1a73e8 ${currentValue}%, lightgrey 0%)`;
  };

  public onProgressFinish = () => (this._isLoading = false);

  protected render() {
    return when(
      this._isLoading,
      () => html`<div class="loader"></div>`,
      () => nothing
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'loader-element': LoaderElement;
  }
}
