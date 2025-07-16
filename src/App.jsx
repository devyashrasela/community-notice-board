// App.js
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import routes from '../Routes/Routes';
import store from '../Redux/Store';
import { listenToPosts } from '../Redux/Reducers/PostsReducer';
import { listenToUsers } from '../Redux/Reducers/UserListReducer';
import DataInitializer from './components/DataInitializer';

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listenToPosts());
    dispatch(listenToUsers());
  }, [dispatch]);

  return <RouterProvider router={routes} />;
}

function App() {
  return (
    <Provider store={store}>
      <DataInitializer>
        <AppContent />
      </DataInitializer>
    </Provider>
  );
}

export default App;
