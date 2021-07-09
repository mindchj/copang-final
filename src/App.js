import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import RouteMain from './RouteMain';

import Reducer from './_reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import { Backdrop } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
const LazyRoute = React.lazy(() => import('./RouteMain'));
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);
//App.js 수정 다시함 또다시함
const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const App = () => {
    const classes = useStyles();
    return (
        <Provider
            store={createStoreWithMiddleware(
                Reducer,
                window.__REDUX_DEVTOOLS_EXTENSION__ &&
                window.__REDUX_DEVTOOLS_EXTENSION__()
            )}
        >

            <Router>
                <Suspense fallback={(
                    <div className={classes.root}>
                        <LinearProgress />

                    </div>
                )}>
                    <LazyRoute />
                </Suspense>
            </Router>
        </Provider>
    )
}

export default App;