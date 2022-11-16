import {VectorUpdate} from '@data/type/hotspot';
import {html, LitElement} from 'lit';
import {repeat} from 'lit/directives/repeat.js';
import {customElement, property, queryAll} from 'lit/decorators.js';

@customElement('vector-control-element')
export class VectorControlElement extends LitElement {
  @queryAll('.slidebar') private $slidebars!: Array<HTMLInputElement>;
  @queryAll('.number') private $numbers!: Array<HTMLInputElement>;

  @property({type: Function}) onValueChanged!: (
    vectorUpdate: VectorUpdate
  ) => void;
  @property({type: Number}) hotspotIndex!: number;

  protected firstUpdated(): void {
    const that = this;

    function _onInput(this: GlobalEventHandlers) {
      const passedValue = (this as HTMLInputElement).value;
      const axisIndex = parseInt(
        (this as HTMLInputElement).getAttribute('data-axis-index') || '0'
      );

      (that.$numbers[axisIndex] as HTMLInputElement).value = passedValue;
      (that.$slidebars[axisIndex] as HTMLInputElement).value = passedValue;
      that.onValueChanged({
        hotspotIndex: that.hotspotIndex,
        value: parseInt(passedValue) / 100,
        axisIndex,
      });
    }

    this.$slidebars.forEach(slidebar => (slidebar.oninput = _onInput));
    this.$numbers.forEach(number => (number.oninput = _onInput));
  }

  render() {
    return html`<h4>Controls for hotspot nr. ${this.hotspotIndex + 1}</h4>
      ${repeat(
        ['x', 'y', 'z'],
        (axisName, index) => html`<div>
          ${axisName}:
          <input
            data-axis-index=${index}
            class="slidebar"
            type="range"
            min="-100"
            max="100"
            value="0"
          />
          <input
            data-axis-index=${index}
            class="number"
            type="number"
            value="0"
            min="-100"
            max="100"
          />
        </div>`
      )}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vector-control-element': VectorControlElement;
  }
}
