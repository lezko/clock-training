import ReactDOM from 'react-dom/client';
import 'index.css';
import {StrictMode} from 'react';
import {Provider} from 'react-redux';
import store from 'store';
import {createHashRouter, Navigate, RouterProvider} from 'react-router-dom';
import Main from 'routes/main';
import About from 'routes/about';
import Settings from 'routes/settings';
import styles from 'scss/App.module.scss';

const router = createHashRouter([
    {
        path: '/main',
        element: <Main />
    },
    {
        path: '/about',
        element: <About />
    },
    {
        path: '/settings',
        element: <Settings />
    },
    {
        index: true,
        element: <Navigate to="/main" />,
        errorElement: <Navigate to="/main" />
    }
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <StrictMode>
        <Provider store={store}>
            <div className={styles.app}>
                <div className={styles.container}>
                    <RouterProvider router={router} />
                </div>
            </div>
        </Provider>
    </StrictMode>
);
