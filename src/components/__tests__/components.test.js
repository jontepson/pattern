import React from 'react';
import renderer from 'react-test-renderer';

import Background from '../Background';
import BackButton from '../BackButton';
import Button from '../Button';
import Footer from '../Footer';
import Header from '../Header';
import Logo from '../Logo';
import Paragraph from '../Paragraph';
import TextInput from '../TextInput';

describe('<Components />', () => {
    it('<Background /> renders correctly', () => {
        const tree = renderer.create(<Background />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('<BackButton /> renders correctly', () => {
        const tree = renderer.create(<BackButton />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('<Button /> renders correctly', () => {
        const tree = renderer.create(<Button />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('<Footer /> renders correctly', () => {
        const tree = renderer.create(<Footer />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('<Header /> renders correctly', () => {
        const tree = renderer.create(<Header />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('<Logo /> renders correctly', () => {
        const tree = renderer.create(<Logo />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('<Paragraph /> renders correctly', () => {
        const tree = renderer.create(<Paragraph />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('<TextInput /> renders correctly', () => {
        const tree = renderer.create(<TextInput />).toJSON();
        expect(tree).toMatchSnapshot();
    });
  });