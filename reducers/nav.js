import { uniqueBy } from '../utils';

import { UPDATE_NAV_LINKS } from '../actions/action-types';

export default (state=[{
    href:'',
    text:'',
    position:0
}], action) => {
    switch (action.type) {
        case UPDATE_NAV_LINKS:
        return uniqueBy('position')([...state, ...action.links]);

        default:
        return state;
    }
};
