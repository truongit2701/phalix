import Cookies from "universal-cookie";
import "./App.css";
import UserIndex from "./pages/user/UserIndex";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/userContext";
import AdminIndex from "./pages/admin/AdminIndex";
function App() {
  const { user, updateUser } = useContext(UserContext);
  const apiUrl = process.env.REACT_APP_API_URL;
  const cookies = new Cookies();
  useEffect(() => {
    // if (!user && cookies.get("token") == undefined) {
    getProfile();
    // }
  }, []);

  function getProfile() {
    const token = cookies.get("token");
    fetch(`${apiUrl}/api/auth/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log("CHƯA CÓ TOKEN, CẦN ĐĂNG NHẬP!");
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === 200) {
          updateUser(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="App">
      <AdminIndex />
      <UserIndex />
    </div>
  );
}

export default App;
