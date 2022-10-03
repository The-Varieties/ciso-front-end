import React from 'react';
import ReactDOM from 'react-dom/client';
import { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import Enzyme from 'enzyme';
import store from '../../../store/store';
import DashboardCard from '..';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import renderer from 'react-test-renderer';


const mockStore = configureStore([]);

it("Renders without crashing", () => {
    const root = ReactDOM.createRoot(document.createElement("div"));
    root.render(<DashboardCard></DashboardCard>);
})

describe("Test", () => {
    Enzyme.configure({ adapter: new Adapter() });
    let store;
    let component;
    let instance = {name: "Instance 1", id: "de8q9dn9", ipAddress: "192.168.77.43", instanceStatus: "Optimized"};

    beforeEach(() => {
        store = mockStore({
            instance: [],
            loading: true,
            instanceList: [],
        });

        component = renderer.create(
            <BrowserRouter>
                <Provider store={store}>
                    <DashboardCard cardContent = {instance} hasOnClick = {true} nextPageRoute = {"/data-vis-page"}/>
                </Provider>
            </BrowserRouter>
        )
    })

    it("Render Card correctly", () => {
        expect(component.toJSON().children[0].children[0].children[1]).toEqual('de8q9dn9');

        // console.log(component.root.findByType('button').props.onClick())
    })
})
