import * as Actions from "../actions";
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Types } from '../constants/Types';
import thunk from 'redux-thunk'

configure({ adapter: new Adapter() });
const mockStore = configureStore([thunk]);
const initialState = {
    photos: [],
    audioRecordings: []
}
const store = mockStore(initialState)

describe('select_actions', () => {
    beforeEach(() => {
      store.clearActions();
    });

    it('Dispatches the EditStatusChanged action and payload', () => {
        const expectedActions = [
          {
            payload: true,
            type: Types.EditStatusChanged
          },
        ];
    
        store.dispatch(Actions.EditStatusChanged(true));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('Dispatches the SavePhoto action and payload', () => {
        const expectedActions = [
          {
            payload: "data:image/gif;base64,R0lGODlhyAAiALM",
            type: Types.SavePhoto
          },
          {
            payload: false,
            type: Types.EditStatusChanged
          },
        ];
    
        store.dispatch(Actions.SavePhoto("data:image/gif;base64,R0lGODlhyAAiALM"));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('Dispatches the Error action and payload', () => {
        navigator.mediaDevices = undefined;

        const expectedActions = [
            {
                type: "/Error",
                payload: {
                    args: [
                        "/Error",
                    ],
                    method: "push",
                },
                type: "@@router/CALL_HISTORY_METHOD",
            }
        ];
        
        store.dispatch(Actions.OpenMedia({ audio: true }));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('Dispatches the Error action and payload on catch', () => {
        navigator.mediaDevices = { getUserMedia: jest.fn().mockImplementation(() => Promise.reject(undefined))};
        
        const expectedActions = [
            {
                type: "/Error",
                payload: {
                    args: [
                        "/Error",
                    ],
                    method: "push",
                },
                type: "@@router/CALL_HISTORY_METHOD",
            }
        ];
        
        store.dispatch(Actions.OpenMedia({ audio: true }))
          .then(() => { expect(store.getActions()).toEqual(expectedActions)});
    });

    it('Dispatches the SaveStream action and payload', () => {
        var stream = "test";
        navigator.mediaDevices = { getUserMedia: jest.fn().mockImplementation(() => Promise.resolve(stream))};
        debugger;
        const expectedActions = [
          {
            type: Types.SaveStream,
            payload: stream
          },
        ];
        
        store.dispatch(Actions.OpenMedia({ audio: true }))
          .then(() => { expect(store.getActions()).toEqual(expectedActions)});
    });
});