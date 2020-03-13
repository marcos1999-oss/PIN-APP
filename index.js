/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { AppRegistry } from "react-native";
import { App } from "./src/App";
import { name as appName } from "./app.json";
// import { Client, Configuration } from 'rollbar-react-native';
// const Rollbar = new Client(new Configuration('MY-ACCESS-TOKEN', {
//   payload: {
//     client: {
//       JavaScript: {
//         source_map_enabled: true,
//         code_version: 'rn',
//         environment: 'production'
//       }
//     }
// }
// }));
console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => App);
