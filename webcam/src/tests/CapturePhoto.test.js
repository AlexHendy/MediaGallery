import React from 'react'
import CapturePhoto from '../components/CapturePhoto'
import { shallow, configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { Types } from '../constants/Types';

configure({ adapter: new Adapter() });
const mockStore = configureStore([thunk]);
const mockHistory = { push: jest.fn() }
const initialState = {
    photos: [],
    isEditing: false,
    stream: {
        getAudioTracks: jest.fn().mockImplementation(() => {  
            return {
                length: 0
            }
        })
    }
}
const store = mockStore(initialState);

describe('<CapturePhoto>', () => {
    it('Renders wait animation', () => {
        const capture = mount(<Provider store={store}><CapturePhoto/></Provider>);
        const waitAnimation = capture.find('CircularProgress');
        expect(waitAnimation.exists()).toBe(true);
    });

    it('renders video element', () => {
        const capture = mount(<Provider store={store}><CapturePhoto/></Provider>);
        const video = capture.find('video');
        expect(video.exists()).toBe(true);
    });

    it('renders canvas element', () => {
        const capture = mount(<Provider store={store}><CapturePhoto/></Provider>);
        const canvas = capture.find('canvas');
        expect(canvas.exists()).toBe(true);
    });

    it('takes photo on click', () => {
        HTMLCanvasElement.prototype.getContext = jest.fn(() => {  
            return {
                drawImage: jest.fn()
            }
        })

        const capture = mount(<Provider store={store}><CapturePhoto/></Provider>);
        const canvas = capture.find('canvas').instance();
        let spy = jest.spyOn(canvas, 'getContext');
        capture.find('.take-photo-btn').first().simulate('click');
        expect(canvas.getContext).toHaveBeenCalledTimes(1);
        spy.mockRestore();
    });

    it('submits photo', () => {
        const capture = mount(<Provider store={store}><CapturePhoto history={mockHistory}/></Provider>);
        const capturephoto = capture.find('CapturePhoto').instance();
        capturephoto.submitPhoto();
        expect(mockHistory.push.mock.calls[0]).toEqual(['/EditPhoto/-1']);
    });

    // it.only('calls submit function photo', () => {
    //     const capture = mount(<Provider store={store}><CapturePhoto history={mockHistory}/></Provider>);
    //     const capturephoto = capture.find('CapturePhoto').instance();
    //     let spy = jest.spyOn(capturephoto, 'submitPhoto');
    //   //  capture.find('#submit-btn').first().simulate("click");
    //     capture.find('#submit-btn').first().instance().onClick();
    //     debugger;
    //     expect(spy).toHaveBeenCalledTimes(1);
    //     spy.mockRestore();
    // });

    it.only('calls submit function photo', () => {
        const capturephoto = shallow(<CapturePhoto/>);
        let spy = jest.spyOn(capturephoto, 'submitPhoto');
        capture.find('#submit-btn').first().instance().onClick();
        debugger;
        expect(spy).toHaveBeenCalledTimes(1);
        spy.mockRestore();
    });
});

