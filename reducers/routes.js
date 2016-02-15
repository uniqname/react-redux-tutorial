import { UPDATE_LOCATION } from 'redux-simple-router';

export default (state={}, action) => {
    switch (action.type) {
        case UPDATE_LOCATION:
        return state;
        
        default:
        return state;
    }
};
