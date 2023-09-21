import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Root from './pages/Root';
import Auth from './components/Auth';
import UsersPage from './pages/UsersPage';

function App() {
  const router = createBrowserRouter([
    {
      path: '', element: <Root />,
      children: [
        { index: true, element: <Home /> },
        { path: 'users', element: <UsersPage /> },
        { path: 'login', element: <Auth /> }
      ]
    }
  ])
  return (
    <RouterProvider router={router} />
  );
}

export default App;
