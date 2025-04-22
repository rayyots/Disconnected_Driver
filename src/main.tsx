
import { AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent('DisconnectedDriver', () => App);

// Web support
if (typeof document !== 'undefined') {
  const rootTag = document.getElementById('root');
  if (rootTag) {
    AppRegistry.runApplication('DisconnectedDriver', { rootTag });
  }
}
