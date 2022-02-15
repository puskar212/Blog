import { Provider } from 'react-redux';

import store from '../store'
import MyTheme from '../theme/MyTheme'
import TemporaryDrawer from './theme/components/TemporaryDrawer';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <MyTheme>
        <TemporaryDrawer />
        <Component {...pageProps} />
      </MyTheme>
    </Provider>
  );
}

export default MyApp;
