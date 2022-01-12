
import { act } from 'react-test-renderer';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { rentBikeAlert, RentABike, startBike } from '../CameraFunctions';
import { returnBike } from '../DriveFunctions';



Enzyme.configure({ adapter: new Adapter() });
describe('<Function test />', () => {
    describe('CameraFunctions', () => {
        it('<rentBikeAlert is /> is called correctly', async () => {
            let mockCallback;
            act(() => {

            
            let id = "31231232123213"
            let userData = {
                data: "data"
            }
            mockCallback = jest.fn(rentBikeAlert(id, userData))
        })
            expect(mockCallback.mock.calls.length).toBe(0);
        });

        it('<RentABike is /> is called with balance', async () => {
            let mockCallback;
            act(() => {
            let id = "31231232123213"
            let userData = {
                data: "data",
                balance: 20
            }
            let navigation = "";
            mockCallback = jest.fn(RentABike(id, userData, navigation))
        })
            expect(mockCallback.mock.calls.length).toBe(0);
        });
        it('<RentABike is /> is called without balance', async () => {
            let mockCallback;
            act(() => {

            
            let id = "31231232123213"
            let userData = {
                data: "data"
            }
            let navigation = "";
            mockCallback = jest.fn(RentABike(id, userData, navigation))
        })
            expect(mockCallback.mock.calls.length).toBe(0);
        });
        it('<startBike is /> is called', async () => {
        let mockCallback;
        act(() => {
            let loggObject = {
                data: "data"
            }
            let data = {
                data: [
                    {
                        _id: 231
                    }
                ]
            }
            let userData = {
                data: "data"
            }
            let navigation = "";
            mockCallback = jest.fn(startBike(loggObject, data, userData, navigation))
        })
            expect(mockCallback.mock.calls.length).toBe(0);
        });
    })
    describe('DriveFunctions', () => {
        it('<returnBike is /> is called correctly', async () => {
            let mockCallback;
            act(() => {
                let userData = {
                    data: "data"
                }
                let loggObject = {
                    data: "data"
                }
                let latitude = 21.31
                let longitude = 24.321
                let navigation = ""

                mockCallback = jest.fn(returnBike(loggObject, latitude, longitude, navigation, userData))
            })
            expect(mockCallback.mock.calls.length).toBe(0);
        });
    })
});