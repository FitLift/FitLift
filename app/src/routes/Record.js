import record from '../modules/record/App';
import { recordTabIcon } from '../components/icons';

export default {
  record: {
    navigationOptions: {
      tabBarIcon: recordTabIcon,
    },
    screen: record,
  },
};
