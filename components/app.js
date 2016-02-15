import Nav from './nav';

//Comment Component
export default ({nav, children, ...props}) => (
    <div>
        <Nav links={nav} />
        { children }
    </div>
);
