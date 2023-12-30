import { ThemeContext } from "@emotion/react"
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
} from "@mui/material"
import axios from "axios"
import Button from "@mui/material/Button"
import DeleteIcon from "@mui/icons-material/Delete"
import { Typography } from "@mui/material"
import Grid from "@mui/material/Grid"

import React, { useContext, useEffect, useMemo, useState } from "react"
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

const Orderitem = () => {
  const { user } = useContext(AuthContext)
  const [ordr, setOrdr] = useState([])
  const [deleteOpen, setDeleteOpen] = useState(false)

  const [open, setOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const handleClose = () => setOpen(false)
  const [count, setCount] = useState(null)
  const [sum, setSum] = useState(0)

  useEffect(() => {
    axios
      .get("http://localhost:3002/ordered")
      .then((result) => setOrdr(result.data))
  }, [])
  const getempl = () => {
    axios.get(`http://localhost:3002/ordered`).then((response) => {
      setOrdr(response.data)
    })
  }
  const atotal = 0

  const DeleteEmp = () => {
    axios
      .delete(`http://localhost:3002/order/delete/${deleteId}`)
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
              <h3>Are you sure to remove this Orders</h3>
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
        <Card>
          <TableContainer sx={{ maxHeight: 540 }}>
            <Table stickyHeader aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={5}>
                    <b>Number of Products to order:{ordr.length} </b>
                    <br />
                  </TableCell>
                  <TableCell>
                    <b>Toatal Amount:{atotal}</b>
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
                    <b>Price</b>
                  </TableCell>
                  <TableCell>
                    <b>Quantity</b>
                  </TableCell>
                  <TableCell>
                    <b>Total</b>
                  </TableCell>
                  <TableCell>
                    <b>Date</b>
                  </TableCell>
                  <TableCell>
                    <b>status</b>
                  </TableCell>
                  <TableCell>
                    <b>Action</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ordr.map((data, index) => (
                  <TableRow
                    key={data.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{data.prodeuct_name}</TableCell>
                    <TableCell>{data.price}</TableCell>
                    <TableCell>{data.quantity}</TableCell>
                    <TableCell>{data.total}</TableCell>
                    <TableCell>{data.date}</TableCell>
                    <TableCell>{data.conform}</TableCell>
                    <TableCell style={{ width: 180 }}>
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

export default Orderitem
