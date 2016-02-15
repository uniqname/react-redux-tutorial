import Nav from './nav';

//Comment Component
console.log('Nav: ', Nav);
export default ({nav, children, ...props}) => (
    <div>
        <Nav links={nav} />
        { children }
    </div>
);
