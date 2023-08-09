import styles from 'scss/App.module.scss';
import {createHashRouter, Navigate, RouterProvider} from 'react-router-dom';
import Main from 'routes/main';
import About from 'routes/about';
import Settings from 'routes/settings';

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

const App = () => {
    return (
        <div className={styles.app}>
            <div className={styles.container}>
                <RouterProvider router={router} />
            </div>
        </div>
    );
};

export default App;