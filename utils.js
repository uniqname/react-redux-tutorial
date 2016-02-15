export const union = (...lists) => Array.from( new Set( [].concat(...lists) ) );

export const uniqueBy = (key) => (...lists) => {

    const o = [].concat(...lists)
        .reduce((obj, item) => {
            obj[ item[key] ] = item;
            return obj;
        }, {});

    return Object.keys(o).map(key => o[key]);
};
