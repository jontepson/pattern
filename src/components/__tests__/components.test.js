import React from 'react';
import renderer, { act } from 'react-test-renderer';

import Background from '../Background';
import BackButton from '../BackButton';
import Button from '../Button';
import Footer from '../Footer';
import Header from '../Header';
import Logo from '../Logo';
import Paragraph from '../Paragraph';


describe('<Components />', () => {
    it('<Background /> renders correctly', async () => {
        let tree;
        act(() => {
            tree = renderer.create(<Background />).toJSON();
        })
        expect(tree).toMatchSnapshot();
    });

    it('<BackButton /> renders correctly', async () => {
        let tree;
        act(() => {
            tree = renderer.create(<BackButton />).toJSON();
        })
        expect(tree).toMatchSnapshot();
    });

    it('<Button /> renders correctly', async () => {
        let tree;
        act(() => {
            tree = renderer.create(<Button />).toJSON();
        })
        expect(tree).toMatchSnapshot();
    });

    it('<Footer /> renders correctly', async () => {
        let tree;
        act(() => {
            tree = renderer.create(<Footer />).toJSON();
        })
        expect(tree).toMatchSnapshot();
    });

    it('<Header /> renders correctly', async () => {
        let tree;
        act(() => {
            tree = renderer.create(<Header />).toJSON();
        })
        expect(tree).toMatchSnapshot();
    });

    it('<Logo /> renders correctly', async () => {
        let tree;
        act(() => {
            tree = renderer.create(<Logo />).toJSON();
        })
        expect(tree).toMatchSnapshot();
    });

    it('<Paragraph /> renders correctly', async () => {
        let tree;
        act(() => {
            tree = renderer.create(<Paragraph />).toJSON();
        })
        expect(tree).toMatchSnapshot();
    });
  });