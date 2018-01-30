import Feed from '../modules/Feed/App';
import { FeedTabIcon } from '../components/icons';

export default {
  Feed: {
    navigationOptions: {
      tabBarIcon: FeedTabIcon,
    },
    screen: Feed,
  },
};
