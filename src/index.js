import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import {animated} from 'react-spring';
import {Transition} from 'react-spring/renderprops';

import './index.css';

/**
 * Routes are a tree:
 *
 * - Each node has a parent and children
 * - Parent and child nodes are referenced by their pathname
 */
const routes = {
  '/': {
    title: 'Dashboard',
    parent: null,
    children: ['/builder', '/settings'],
  },
  '/builder': {
    title: 'Builder',
    parent: '/',
    children: ['/builder/name', '/builder/story'],
  },
  '/builder/name': {
    title: 'Name',
    parent: '/builder',
    children: null,
    body: 'Set the name here.',
  },
  '/builder/story': {
    title: 'Story',
    parent: '/builder',
    children: null,
    body: 'Set the story content here.',
  },
  '/settings': {
    title: 'Settings',
    parent: '/',
    children: ['/settings/language', '/settings/date-and-time'],
  },
  '/settings/language': {
    title: 'Language',
    parent: '/settings',
    body: 'Set the language settings here.',
  },
  '/settings/date-and-time': {
    title: 'Date & Time',
    parent: '/settings',
    body: 'Set the date and time settings here.',
    children: ['/settings/date-and-time/timezone'],
  },
  '/settings/date-and-time/timezone': {
    title: 'Time Zone',
    parent: '/settings/date-and-time',
    body: 'Set the timezone settings here.',
  },
};

function Sidebar() {
  // Current router location
  const location = useLocation();

  // Store a lazy version of the current path
  const [lazyPathname, setLazyPathname] = useState(location.pathname);

  useEffect(() => {
    setLazyPathname(location.pathname);
  }, [location.pathname]);

  return (
    <aside className="sidebar">
      <Transition
        items={location}
        keys={location => location.pathname}
        from={({pathname}) =>
          pathname !== lazyPathname && {
            transform:
              pathname === routes[lazyPathname].parent
                ? 'translateX(-100%)'
                : 'translateX(100%)',
          }
        }
        enter={{transform: 'translateX(0%)'}}
        leave={({pathname}) => ({
          transform:
            pathname === routes[location.pathname].parent
              ? 'translateX(-100%)'
              : 'translateX(100%)',
        })}
      >
        {item => props => (
          <Switch location={item}>
            {Object.entries(routes).map(
              ([path, {body, children, parent, title}]) => (
                <Route key={`sidebar${path}`} path={path} exact>
                  <animated.div className="sidebar__content" style={props}>
                    {parent && <Link to={parent}>{routes[parent].title}</Link>}
                    <h2>{title}</h2>
                    {children && (
                      <ul>
                        {children.map(child => (
                          <li key={`sidebar/child${child}`}>
                            <Link to={child}>{routes[child].title}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                    {body && <p>{body}</p>}
                  </animated.div>
                </Route>
              ),
            )}
          </Switch>
        )}
      </Transition>
    </aside>
  );
}

function App() {
  return (
    <Router>
      <Sidebar />
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
