import React from 'react'
import Summary from '../components/Summary.js'
import { shallow, configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'

configure({ adapter: new Adapter() });
const mockStore = configureStore();
const mockHistory = { push: jest.fn() }

const initialState = {
    photos: [],
    audioRecordings: []
}

describe('<Summary>', () => {
    it('starts with no photos', () => {
        const summary = shallow(<Summary/>);
        const photos = summary.find('Grid.photoList');
        expect(photos.length).toBe(0);
    });

    it('starts with no recordings', () => {
        const summary = shallow(<Summary/>);
        const recordings = summary.find('Grid.audioList');
        expect(recordings.length).toBe(0);
    });

    it('goes to take photo on click', () => {
        mockHistory.push.mockClear();
        const summary = mount(<Provider store={mockStore(initialState)}><Summary history={mockHistory}/></Provider>);
        summary.find('Button#takePhotoButton').simulate('click');
        expect(mockHistory.push.mock.calls[0]).toEqual(['/CapturePhoto']);
    });

    it('goes to record audio on click', () => {
        mockHistory.push.mockClear();
        const summary = mount(<Provider store={mockStore(initialState)}><Summary history={mockHistory}/></Provider>);
        summary.find('Button#recordAudioButton').simulate('click');
        expect(mockHistory.push.mock.calls[0]).toEqual(['/CaptureAudio']);
    });

    it('goes to image on click', () => {
        const blob = "data:image/gif;base64,R0lGODlhyAAiALM";
        initialState.photos = [ { src: blob, id: 1 } ]
        mockHistory.push.mockClear();
        const summary = mount(<Provider store={mockStore(initialState)}><Summary context={mockStore(initialState)} history={mockHistory}/></Provider>);
        summary.find('Button#goToImage').simulate('click');
        expect(mockHistory.push.mock.calls[0]).toEqual(['/EditPhoto/1']);
    });
});

