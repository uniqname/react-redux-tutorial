export const uniqueBy = (key) => (...lists) => {

    const o = [].concat(...lists)
        .reduce((obj, item) => {
            obj[ item[key] ] = item;
            return obj;
        }, {});

    return Object.keys(o).map(key => o[key]);
};
