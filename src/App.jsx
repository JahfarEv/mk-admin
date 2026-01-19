// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import ShopList from "./pages/ShopList";
// import ShopDetails from "./pages/ShopDetails";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//                 <Route path="/shops" element={<ShopList />} />
//  <Route path="/shops/:shopId" element={<ShopDetails />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }



import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ShopList from "./pages/ShopList";
import ShopDetails from "./pages/ShopDetails";
import ProtectedRoute from "./components/ProtectedRoute";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* Public Route */}
//         <Route path="/" element={<Login />} />

//         {/* Protected Routes */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/shops"
//           element={
//             <ProtectedRoute>
//               <ShopList />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/shops/:shopId"
//           element={
//             <ProtectedRoute>
//               <ShopDetails />
//             </ProtectedRoute>
//           }
//         />

//       </Routes>
//     </BrowserRouter>
//   );
// }



export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/shops"
            element={
              <ProtectedRoute>
                <ShopList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/shops/:shopId"
            element={
              <ProtectedRoute>
                <ShopDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
