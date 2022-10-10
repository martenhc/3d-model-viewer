import {makeAutoObservable} from 'mobx';

class {{pascalCase name}} {
  {{#each stateList}}
    public {{this}}: any = false;
  {{/each}}

  {{#each stateList}}
    public set{{pascalCase this}}({{this}}: any) {
      this.{{this}} = {{this}};
    }

  {{/each}}

  constructor() {
    makeAutoObservable(this);
  }
}

export const {{camelCase name}} = new {{pascalCase name}}();
