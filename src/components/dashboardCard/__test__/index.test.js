import React from 'react';
import ReactDOM from 'react-dom/client';
import DashboardCard from '..';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Enzyme from 'enzyme';
import store from '../../../store/store';
import { Provider } from 'react-redux';


it("Renders without crashing", () => {
    const root = ReactDOM.createRoot(document.createElement("div"));
    root.render(<DashboardCard></DashboardCard>);
})

it("Render Card correctly", () => {
    Enzyme.configure({ adapter: new Adapter() });

    let instance = {name: "Instance 1", id: "de8q9dn9", ipAddress: "192.168.77.43", instanceStatus: "Optimized"};

    <Provider store={store}>
        const dashCard = shallow(<DashboardCard cardContent = {instance} hasOnClick = {true} nextPageRoute = {"/data-vis-page"} />);
        expect(dashCard.text()).toContain("Instance 1");
    </Provider>
})