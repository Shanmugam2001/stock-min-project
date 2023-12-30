import { Box, Button, Grid, TextField } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { AuthContext } from "../AuthProvider"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

const Login = () => {
  const { user, setUser } = useContext(AuthContext)
  const [user_name, setUser_name] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState(false)
  const [errmsg, setErrMsg] = useState("")

  const LoginToApp = () => {
    console.log(user_name)
    axios
      .post(`http://localhost:3002/login`, { user_name, password })
      .then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("lst", true)
          localStorage.setItem("id", res.data.userData.id)
          localStorage.setItem("user_name", res.data.userData.user_name)
          localStorage.setItem("phone", res.data.userData.phone)
          setUser(res.data.userData)
        } else {
          if (res.data.status === 400) {
            setErrMsg("This account  is not available")
            setError(true)
          } else {
            setErrMsg("Username or Password is incorrect")
            setError(true)
          }
        }
      })
      .catch((error) => {})
  }
  return (
    <div>
      <Box sx={style}>
        {error ? <b style={{ color: "red" }}>{errmsg}</b> : null}
        <br />
        <br />
        <TextField
          id="standard-basic"
          variant="outlined"
          label="User Name"
          style={{ width: "100%", padding: 10 }}
          onChange={(event) => {
            setError(false)
            setUser_name(event.target.value)
          }}
        />
        <TextField
          id="standard-basic"
          variant="outlined"
          label="Password"
          style={{ width: "100%", padding: 10 }}
          type="password"
          onChange={(event) => {
            setError(false)
            setPassword(event.target.value)
          }}
        />
        <br />

        <Button
          variant="contained"
          color="primary"
          style={{ width: "100%" }}
          disabled={user_name === "" || password === "" ? true : false}
          onClick={LoginToApp}
        >
          Login
        </Button>
        <br />
        <br />
        <a href="/signup">Register Here</a>
      </Box>
    </div>
  )
}

export default Login
