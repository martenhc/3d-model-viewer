# State management

The state management is set up with [Mobx](https://mobx.js.org/the-gist-of-mobx.html).

## State

A state class looks like the following:

```typescript
import {makeAutoObservable} from 'mobx';

class Counter {
  public count = 1;

  public increment() {
    this.count += 1;
  }

  public incrementBy(amount: number) {
    this.count += amount;
  }

  constructor() {
    makeAutoObservable(this);
  }
}

export const counter = new Counter();

```

- `makeAutoObservable`: adds the correct decorators to the properties that are defined.

## Creating a state class

To create a new state class, run `npm run plop` and choose `state`. 

This will generate a new state class and create a new file in `./src/state`.


## Submitting a state change

To update state, import the state class and execute an action that updates it. 

For example:

```typescript
import {appState} from '../state/app';

class SomeClass {
  ...
  someMethod() {
    appState.setIsInitialized(true);
  }
  ...
}
```

## Retrieving state from store

In order to correctly rerender the page when the state changes you need to listen to it and update it as follows.
```typescript
import {LitElement, html} from 'lit';
import {when} from 'lit/directives/when.js'
import {state} from 'lit/decorators.js';
import {observe} from 'mobx';
import {appState} from '@state/app';

class SomeClass extends LitElement {
  ...
  
  @state() private _isInitialized = appState.isInitialized;
  
 constructor() {
    super();
    
    this._updateIsInitialized = this._updateIsInitialized.bind(this);
  }
  
  connectedCallback(): void {
    super.connectedCallback();
  
    observe(appState, 'isInitialized', this._updateIsInitialized);
  }
  
  protected firstUpdated() {
    appState.setIsInitialized(true);
  }
  
  private _updateIsInitialized() {
    this._isInitialized = appState.isInitialized;
  }

  render() {
    // use the class state in the render method to re-render when that state updates
    return when(
      this._isInitialized, 
      () => html`Hello World`, 
      () => html`Loading...`
    );
  }
}
```
