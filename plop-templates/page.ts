{{#if isUsingSassStyles}}
import {html, css} from 'lit';
{{else}}
import {html} from 'lit';
{{/if}}
import {customElement, property, state} from 'lit/decorators.js';
import PageElement from '../abstract/page-element';
{{#if isUsingSassStyles}}
import styles from './{{dashCase name}}.scss';
{{else}}
import {styles} from './{{dashCase name}}-styles';
{{/if}}

@customElement('{{dashCase name}}')
export default class {{pascalCase name}} extends PageElement {
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

  constructor() {
    super({title: '{{sentenceCase name}}'});
  }
  {{#if isAddingLifeCycle}}

  connectedCallback(): void {
    super.connectedCallback();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  firstUpdated(): void {}
  {{/if}}

  render() {
    return html`<h1>{{pascalCase name}} page</h1>`;
  }
}
