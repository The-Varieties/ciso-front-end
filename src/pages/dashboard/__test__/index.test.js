import React from 'react';
import ReactDOM from 'react-dom/client';
import DashboardCard from '..';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Enzyme from 'enzyme';
import store from '../../../store/store';
import { Provider } from 'react-redux';
import Dashboard from '..';

it("Testing Fetching Data using Redux", () => {
    Enzyme.configure({ adapter: new Adapter() });

    <Provider store={store}>
        const dashboard = shallow(<Dashboard />);
        expect(dashboard.text()).toContain("Instance 1");
    </Provider>
})