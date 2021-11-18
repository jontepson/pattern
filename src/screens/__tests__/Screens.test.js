import {
    StartScreen,
    LoginScreen,
    CameraScreen,
    LoggedInScreen,
    MapScreen,
    DriveScreen
  } from '../'
import React from 'react';
import renderer from 'react-test-renderer';

describe('<App />', () => {
    it('<StartScreen /> renders correctly', () => {
        const tree = renderer.create(<StartScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('<CameraScreen /> renders correctly', () => {
        const tree = renderer.create(<CameraScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('<LoggedInScreen /> renders correctly', () => {
        const tree = renderer.create(<LoggedInScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('<DriveScreen /> renders correctly', () => {
        const tree = renderer.create(<DriveScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});