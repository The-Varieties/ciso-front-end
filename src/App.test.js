import { render, screen } from '@testing-library/react';
import App from './App';
import store from './store/store';
import { Provider } from 'react-redux';


test('renders learn react link', () => {
  <Provider store={store}>
    render(<App />);
  </Provider>
});
