import rootReducer from '../reducers'
import { Types } from '../constants/Types';

let initialState;

describe('Reducer', () => {
    beforeEach(() => {
        initialState = {
            isEditing: false,
            photos: [],
            audioRecordings: [],
            stream: null,
            audioSrc: ""
        }
    })

    it('should return default state', () => {
      const action = { type: 'dummy_action' };
  
      expect(rootReducer(undefined, action)).toEqual(initialState);
    });

    it('should handle EditStatusChanged', () => {
        initialState.isEditing = true;

        const action = { type: Types.EditStatusChanged, payload: true };
        
        expect(rootReducer(undefined, action)).toEqual(initialState);
    });

    it('should handle SavePhoto', () => {
        initialState.photos = [{ src: "test.jpg", id: 0 }]
        const action = { type: Types.SavePhoto, payload: "test.jpg" };
        
        expect(rootReducer(undefined, action)).toEqual(initialState);
    });
});