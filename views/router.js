import { Router, Route, Link } from 'react-router';


export default (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
        <Route path="about" component={About}/>
        <Route path="users" component={Users}>
        <Route path="/user/:userId" component={User}/>
        </Route>
        <Route path="*" component={NoMatch}/>
        </Route>
    </Router>
);
