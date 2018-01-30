import Record from '../modules/Record/App';
import { RecordTabIcon } from '../components/icons';

export default {
  Record: {
    navigationOptions: {
      tabBarIcon: RecordTabIcon,
    },
    screen: Record,
  },
};
