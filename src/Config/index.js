import DebugConfig from './DebugConfig'

if (__DEV__) {
  console.disableYellowBox = !DebugConfig.yellowBox;
}

export default {
  BASE_URL: 'http://35.190.168.62/v1'
}