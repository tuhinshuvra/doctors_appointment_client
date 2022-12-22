import { RouterProvider } from 'react-router-dom';
import route from './Router/Router';

function App() {
  return (
    <div className="max-w-[1300px] mx-auto">
      <RouterProvider router={route} ></RouterProvider>
    </div>
  );
}

export default App;
