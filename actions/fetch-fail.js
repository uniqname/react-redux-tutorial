import { FETCH_FAILED } from '../actions/action-types';

export default (error) => ({
    type: FETCH_FAILED,
    error
});
