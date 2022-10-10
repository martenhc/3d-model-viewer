# Device State Management

[Seng device state tracker](https://github.com/mediamonks/seng-device-state-tracker) handles browser breakpoint tracking in this scaffold.

## Configuration

- Open the config file found here: `./src/data/seng/device-state-config.ts`.
- Update the breakpoint pixel values in the `mediaQueries` variable to match the breakpoints that you are using with your CSS.

## Usage

```typescript
// import package helpers and config data
import DeviceStateTracker, {DeviceStateEvent} from 'seng-device-state-tracker';
import {mediaQueries, DeviceState} from './data/seng/device-state-config';

// initialize deviceStateTracker
const deviceStateTracker: DeviceStateTracker = new DeviceStateTracker({
  mediaQueries,
  deviceState: DeviceState,
});

export class AppRoot extends LitElement {
  // use this lifecycle hook to set the device listener
  connectedCallback() {
    super.connectedCallback();
    deviceStateTracker.addEventListener(DeviceStateEvent.STATE_UPDATE, () => {
      const {state} = deviceStateTracker.currentDeviceState;

      if (state === DeviceState.MEDIUM) {
        // do something at this breakpoint
      }
    });
  }

  // use this lifecycle hook to destory the event listener when the component is unmounted
  disconnectedCallback() {
    super.disconnectedCallback();
    deviceStateTracker.removeEventListener(
      DeviceStateEvent.STATE_UPDATE,
      () => {}
    );
  }

  protected render() {}
}
```
