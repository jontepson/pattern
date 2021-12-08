import React from 'react';

import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
Enzyme.configure({ adapter: new Adapter() });
describe('<App />', () => {
    it('<App /> renders correctly', async () => {
        let test = shallow(<App />);
        expect(test.length).toBe(1);
    });
});