import { Outlet } from "react-router";

const App = () => {
  return (
    <div>
      <h1 className="text-red-500 text-2xl">Hello</h1>
      <Outlet></Outlet>
    </div>
  );
};

export default App;
