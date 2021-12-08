
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
    MapScreen2,
    SettingsScreen
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
        expect(component.length).toBe(1);
        expect(component.html()).toMatchSnapshot();
        
        //expect(tree).toMatchSnapshot();
    });
    it('<StartScreen  /> Buttons', async () => {
        /**
         * Skriv tester för att testa knappar
         */
        component = shallow(<StartScreen />)
        const button1 = component.find(".login")
        expect(button1.simulate("press")).toEqual({});
        //expect(tree).toMatchSnapshot();
    });

    it('<SettingsScreen  /> renders correctly', async () => {
        const tree = await renderer.create(<SettingsScreen  />).toJSON();
        /**
         * Skriv tester för att testa knappar
         */
        component = shallow(<SettingsScreen />)
        expect(component.length).toBe(1);
        expect(component.html()).toMatchSnapshot();
        
        //expect(tree).toMatchSnapshot();
    });

    it('<SettingsScreen  /> Buttons', async () => {
        /**
         * Skriv tester för att testa knappar
         */
        component = shallow(<SettingsScreen />)
        const button2 = component.find(".map")
        const button3 = component.find(".mypage")
        const button4 = component.find(".logout")
        expect(button2.simulate("press")).toEqual({});
        expect(button3.simulate("press")).toEqual({});
        expect(button4.simulate("press")).toEqual({});
        //expect(tree).toMatchSnapshot();
    });
    it('<DriveScreen /> renders correctly', () => {
        act(() => {
            
           tree = renderer.create(<DriveScreen />).toJSON();
        })
        expect(tree).toMatchSnapshot();
    });

    it('<MapScreen2 /> renders correctly', async () => {
        let test = await renderer.create(<MapScreen2 />).toJSON();
        expect(test).toMatchSnapshot();
    });
    it('<MapScreen2 /> buttons', async () => {
        component = shallow(<MapScreen2 />)
        const button1 = component.find(".camera")
        expect(button1.simulate("press")).toEqual({});
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
    it('<LoginScreen /> buttons', async () => {
        component = shallow(<LoginScreen navigation={"StartScreen"}/>)
        const button1 = component.find(".loginImage")
        const button2 = component.find(".loginHeader")
        expect(button1.simulate("press")).toEqual({});
        expect(button2.simulate("press")).toEqual({});
    });
    
});