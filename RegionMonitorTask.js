import { store } from './src/App';
import * as pinActions from "./src/redux/actions/pinActions"

module.exports = async (event) => {
  const { didEnter, didExit, region, location } = event;
  const { identifier } = region;

  if (didEnter) {
    const { latitude, longitude } = location;

    store.dispatch(pinActions.visitPin({ id: identifier, latitude, longitude }));
  }
};
