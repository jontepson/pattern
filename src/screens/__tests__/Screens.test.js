
import React from 'react';
import renderer, { act } from 'react-test-renderer';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
    StartScreen,
    LoginScreen,
    CameraScreen,
    LoggedInScreen,
    MapScreen,
    DriveScreen,
    MapScreen2
  } from '..'



Enzyme.configure({ adapter: new Adapter() });
describe('<Screens />', () => {
    let tree;
    let component;
    let instance;
    let spy;
    it('<StartScreen /> renders correctly', async () => {
        const tree = await renderer.create(<StartScreen />).toJSON();
        /**
         * Skriv tester för att testa knappar
         */
        component = shallow(<StartScreen/>)
        console.log(component.html())
        expect(component.length).toBe(1);
        expect(component.html()).toMatchSnapshot();
        
        //expect(tree).toMatchSnapshot();
    });

    it('<LoggedInScreen /> renders correctly', async () => {
        const tree = await renderer.create(<LoggedInScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('<DriveScreen /> renders correctly', () => {
        act(() => {
           tree = renderer.create(<DriveScreen />).toJSON();
        })
        expect(tree).toMatchSnapshot();
    });

    it('<MapScreen2 /> renders correctly', async () => {
        act(() => {
            tree = renderer.create(<MapScreen2 />).toJSON();
        })
        expect(tree).toMatchSnapshot();
    });
   
    it('<CameraScreen /> renders correctly',  () => {
        act(() => {
            tree = renderer.create(<CameraScreen navigation={"StartScreen"}/>).toJSON();
        })
        expect(tree).toMatchSnapshot();
    });

    it('<LoginScreen /> renders correctly', async () => {
        const tree = await renderer.create(<LoginScreen navigation={"StartScreen"}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});