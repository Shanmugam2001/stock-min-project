import { Grid } from "@mui/material"
import React, { useState, useEffect, useMemo, useContext } from "react"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import MediaCard from "./Card"
import axios from "axios"
import { AuthContext } from "../AuthProvider"

const ProductPage = () => {
  const [data, setData] = useState([])
  const [count, setCount] = useState(0)
  const [cart, setCart] = useState([])
  const { user } = useContext(AuthContext)
  useEffect(() => {
    axios
      .get("http://localhost:3002/product")
      .then((response) => setData(response.data.data))
  }, [])

  const addCart = (val) => {
    const pro_id = val.id
    const pro_name = val.pro_name
    const price = val.price
    const user_id = user.id
    console.log(user_id)
    axios
      .post(`http://localhost:3002/addcart`, {
        user_id,
        pro_name,
        pro_id,
        price,
      })
      .then((response) => {
        if (response.data.status === 200) {
          alert("add")
        } else {
          alert("errorrr....!")
        }
      })
  }

  return (
    <div>
      <br />
      <br />
      <Grid sx={{ flexGrow: 1 }} container spacing={13}>
        <Grid item xs={30}>
          <Grid container justifyContent="center" spacing={1}>
            {data.map((val, index) => (
              <Card
                sx={{ minWidth: 300, margin: 2, minHeight: 400 }}
                key={index}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image=".\image\hqdefault-2.jpg"
                  alt={val.img}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {val.pro_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {val.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => addCart(val)}
                  >
                    Add to cart
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default ProductPage
