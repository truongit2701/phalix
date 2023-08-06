import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { UserContext } from "../context/userContext";
import "./LoginForm.css";

function LoginForm() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [failedText, setFailedText] = useState("");
  const navigate = useNavigate();
  const cookies = new Cookies();

  const { updateUser } = useContext(UserContext);

  async function signIn() {
    try {
      await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Something went wrong");
          }
          return response.json();
        })
        .then((data) => {
          setFailedText("");
          if (data.status !== undefined && data.status !== 200) {
            setFailedText(data.message);
            return;
          }
          navigate("/");
          decodeAndSetCookieToken(data);
          getProfile();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      throw new Error(err);
    }
  }

  function decodeAndSetCookieToken(data) {
    const jwt_token = data.access_token;

    //setCookie
    cookies.set("token", jwt_token);
  }

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
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        // Xử lý dữ liệu trả về
        updateUser(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <form
      className="login-form"
      onSubmit={(e) => {
        e.preventDefault();
        setUsername("");
        setPassword("");
        signIn();
      }}
    >
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn w-100">Login</button>
      {setFailedText !== "" ? (
        <p className="py-2 text-danger">{failedText}</p>
      ) : (
        <></>
      )}
    </form>
  );
}

export default LoginForm;
