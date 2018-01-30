import Profile from '../modules/Profile/App';
import { ProfileTabIcon } from '../components/icons';

export default {
  Profile: {
    navigationOptions: {
      tabBarIcon: ProfileTabIcon,
    },
    screen: Profile,
  },
};
