import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../layouts";
import AircraftList from "../pages/aircraft/AircraftList";
import AircraftMaintenance from "../pages/aircraft/AircraftMaintenance";
import Dispatchinglist from "../pages/dispatching_management/dispatchinglist";
import Stafflist from "../pages/dispatching_management/stafflist";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,    
    children: [
      {
        index: true,
        element: <AircraftList/>
      },
      {
        path: "aircraft/list",
        element: <AircraftList />
      },
      {
        path: "aircraft/maintenance",
        element: <AircraftMaintenance />
      },
      {
        path: "dispatch/schedule",
        element: <Dispatchinglist />
      },
      {
        path: "dispatch/staff",
        element: <Stafflist />
      }
    ]
  }
]);
export default router;