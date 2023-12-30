import {
  CarCrash,
  Delete,
  LineAxisOutlined,
  TableBar,
} from "@mui/icons-material"
import {
  Box,
  Card,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import Button from "@mui/material/Button"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { Typography } from "@mui/material"
import Grid from "@mui/material/Grid"
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

const Cartt = () => {
  const { user } = useContext(AuthContext)
  const [car, setCar] = useState([])
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [currentEmp, setCurrentEmp] = useState({})
  const [open, setOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const handleClose = () => setOpen(false)
  const [count, setCount] = useState(null)

  useEffect(() => {
    axios.get("http://localhost:3002/cart").then((response) => {
      if (response.data.status === 200) {
        setCar(response.data.data)
      }
    })
  }, [])
  const getempl = () => {
    axios.get(`http://localhost:3002/cart`).then((response) => {
      setCar(response.data.data)
    })
  }
  const getDataById = (vv, ss, r) => {
    const id = vv
    const quan = r === 1 ? ss + 1 : ss - 1
    axios
      .put("http://localhost:3002/updatecart", { id, quan })
      .then((response) => {
        if (response.data.status === 200) {
          getempl()
        } else {
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const getDataaById = (val) => {
    const filteredRows = car.filter((row) => {
      return row.id === val
    })
    setCurrentEmp(filteredRows[0])
    setOpen(true)
  }

  const addorder = () => {
    console.log(user)
    axios
      .put("http://localhost:3002/proupate", { currentEmp })
      .then((result) => {
        if (result.data.status === 200) {
          axios
            .post(`http://localhost:3002/addorder`, { currentEmp, user })
            .then((response) => {
              if (response.data.status === 200) {
                DeleteEmp()
              } else {
                alert("can't add the order....!")
                console.log(response.data.data)
              }
            })
            .catch((error) => {
              console.log(error)
            })

          setOpen(false)
        } else {
          alert("Pleace reduce the  quantity ur product")
        }
      })
  }

  const DeleteEmp = () => {
    axios
      .delete(`http://localhost:3002/cart/delete/${deleteId}`)
      .then((response) => {
        console.log(response.data)
        if (response.data.status === 200) {
          getempl()
        } else {
        }
      })
      .catch((error) => {
        console.log(error)
      })
    setDeleteOpen(false)
  }

  return (
    <div>
      <Box>
        <Modal
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography style={{ textAlign: "center" }}>
              <h3>Are you sure to remove this product from cart</h3>
            </Typography>

            <Grid container>
              <Grid
                lg={6}
                md={6}
                sm={6}
                xs={6}
                item
                style={{ padding: 10, alignItems: "center" }}
              >
                <Button
                  variant="contained"
                  style={{
                    width: "100%",
                    backgroundColor: "#ccc",
                    color: "#000",
                  }}
                  onClick={() => setDeleteOpen(false)}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid
                lg={6}
                md={6}
                sm={6}
                xs={6}
                item
                style={{ padding: 10, alignItems: "center" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "100%" }}
                  onClick={DeleteEmp}
                >
                  Yes
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography style={{ textAlign: "center" }}>
              <h3>Are you sure to Order this Item</h3>
            </Typography>
            <Grid container>
              <Grid
                lg={6}
                md={6}
                sm={6}
                xs={6}
                item
                style={{ padding: 10, alignItems: "center" }}
              >
                <Button
                  variant="contained"
                  style={{
                    width: "100%",
                    backgroundColor: "#ccc",
                    color: "#000",
                  }}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid
                lg={6}
                md={6}
                sm={6}
                xs={6}
                item
                style={{ padding: 10, alignItems: "center" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "100%" }}
                  onClick={addorder}
                >
                  Order
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
        <Card>
          <TableContainer sx={{ maxHeight: 540 }}>
            <Table stickyHeader aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={5}>
                    <b>Number of PProducts to order:{car.length} </b>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Index</b>
                  </TableCell>
                  <TableCell>
                    <b>Product Name</b>
                  </TableCell>
                  <TableCell>
                    <b>Quantity</b>
                  </TableCell>
                  <TableCell>
                    <b>Price</b>
                  </TableCell>
                  <TableCell>
                    <b>Total</b>
                  </TableCell>
                  <TableCell>
                    <b>Action</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {car.map((data, index) => (
                  <TableRow
                    key={data.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{data.pro_name}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => getDataById(data.id, data.quan, 1)}
                      >
                        +
                      </button>
                      {data.quan}
                      <button
                        onClick={() => getDataById(data.id, data.quan, 2)}
                      >
                        -
                      </button>
                    </TableCell>
                    <TableCell>{data.price}</TableCell>
                    <TableCell>{data.price * data.quan}</TableCell>
                    <TableCell style={{ width: 180 }}>
                      <Button
                        variant="contained"
                        style={{ fontSize: 10 }}
                        onClick={() => getDataaById(data.id)}
                      >
                        conform
                      </Button>
                      &nbsp;
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "#0f1d6b" }}
                        onClick={() => {
                          setDeleteOpen(true)
                          setDeleteId(data.id)
                        }}
                      >
                        <DeleteIcon style={{ fontSize: 16 }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </div>
  )
}

export default Cartt
