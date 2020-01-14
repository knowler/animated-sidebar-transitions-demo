import React, {useCallback, useState} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import {motion, AnimatePresence} from 'framer-motion';

import {useLogChange} from './utils';

import './index.css';

/**
 * Routes are a tree:
 *
 * - Each node has a parent and children
 * - Parent and child nodes are referenced by their index in the array
 */
const routes = [
  {
    title: 'Dashboard',
    path: '/',
    parent: null,
    children: [1],
  },
  {
    title: 'Builder',
    path: '/builder',
    parent: 0,
    children: [2],
  },
  {
    title: 'Story',
    path: '/builder/story',
    parent: 1,
    children: null,
    body: 'Set the story content here.',
  },
];

function LinkToRoute({path, title, ...props}) {
  return (
    <Link to={path} {...props}>
      {title}
    </Link>
  );
}

const defaultTransition = {
  duration: 0.3,
  ease: 'linear',
};

function App() {
  // Direction of intent
  const [direction, setDirection] = useState();

  // This is called when going up the tree to a parent
  const up = useCallback(() => {
    setDirection('up');
  }, []);

  // This is called when going down the tree to a child
  const down = useCallback(() => {
    setDirection('down');
  }, []);

  // Log the direction state
  useLogChange(direction);

  /**
   * Variants for Motion
   *
   * For callback variants, the first parameter is the value of
   * custom set on the AnimatePresence component
   *
   * TODO: find a better way to explain what is happening with
   * enter and exit
   */
  const variants = {
    // the param will be out of sync if we use it so, we use direction directly instead
    enter: () => ({
      x: {up: '-100%', down: '100%'}[direction],
      transition: defaultTransition,
    }),
    // the direction will be out of sync if we use it so, we use the param instead
    exit: intendedDirection => ({
      x: {up: '100%', down: '-100%'}[intendedDirection],
      transition: defaultTransition,
    }),
    current: {x: '0%', transition: defaultTransition},
  };

  return (
    <Router>
      <aside className="sidebar">
        <Route
          render={({location}) => (
            <AnimatePresence custom={direction}>
              <Switch location={location} key={location.pathname}>
                {routes.map(({body, children, parent, path, title}) => (
                  <Route key={`sidebar${path}`} path={path} exact>
                    <motion.div
                      className="sidebar__content"
                      initial="enter"
                      animate="current"
                      exit="exit"
                      variants={variants}
                    >
                      {typeof parent === 'number' && (
                        <LinkToRoute onClick={up} {...routes[parent]} />
                      )}
                      <h2>{title}</h2>
                      {children && (
                        <ul>
                          {children.map(child => (
                            <li key={`sidebar/child.${child}`}>
                              <LinkToRoute onClick={down} {...routes[child]} />
                            </li>
                          ))}
                        </ul>
                      )}
                      {body && <p>{body}</p>}
                    </motion.div>
                  </Route>
                ))}
              </Switch>
            </AnimatePresence>
          )}
        />
      </aside>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
