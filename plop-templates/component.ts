{{#if isUsingSassStyles}}
import {LitElement, html, css} from 'lit';
{{else}}
import {LitElement, html} from 'lit';
{{/if}}
import {customElement, property, state} from 'lit/decorators.js';
{{#if isUsingSassStyles}}
import styles from './{{dashCase name}}.scss';
{{else}}
import {styles} from './{{dashCase name}}-styles';
{{/if}}

@customElement('{{dashCase name}}')
export class {{pascalCase name}} extends LitElement {
  {{#if isUsingSassStyles}}
  static styles = css([styles] as ReadonlyArray<string> as TemplateStringsArray);
  {{else}}
  static styles = styles;
  {{/if}}
  {{#if properties}}

  {{#each propertyList}}
  @property({type: String}) private {{this}}: string = '';
  {{/each}}
  {{/if}}
  {{#if state}}

  {{#each stateList}}
  @state() private {{this}}: any = false;
  {{/each}}
  {{/if}}
  {{#if isAddingLifeCycle}}

  constructor() {
    super();
  }

  connectedCallback(): void {
    super.connectedCallback();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  firstUpdated(): void {}
  {{/if}}

  render() {
    return html`<h2>{{sentenceCase name}} component</h2>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    '{{dashCase name}}': {{pascalCase name}};
  }
}