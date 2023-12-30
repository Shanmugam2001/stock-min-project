const express = require("express")
const { v4: uuidv4 } = require("uuid")
const app = express()
const mysql = require("mysql")
const cors = require("cors")
const { response } = require("express")
const multer = require("multer")
const path = require("path")

//body parser
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "stockk",
})

app.post("/login", (req, res) => {
  const user_name = req.body.user_name
  const password = req.body.password
  console.log(password)

  db.query(
    "SELECT * FROM users WHERE user_name=? AND passwd=?",
    [user_name, password],
    (err, rows) => {
      if (!err) {
        console.log("success")
        if (rows.length != 0) {
          const userData = {
            id: rows[0].id,
            user_name: rows[0].user_name,
            phone: rows[0].phone,
          }
          res.send({ userData: userData, status: 200 })
        } else {
          console.log("Nothing match")
          res.send({ status: 300 })
        }
      } else {
        console.log("erorrrrrrr...p?")
        console.log(err)
        res.send("errorrrrr............?")
      }
    }
  )
})

app.post("/addbrand", (req, res) => {
  const id = req.body.id
  const brand_name = req.body.brand_name
  const category_name = req.body.category_name
  const sup_name = req.body.sup_name
  const phone = req.body.phone

  db.query(
    "insert into stockk.brand (id,brand_name,category_name,sup_name,phone) VALUES(?,?,?,?,?)",
    [id, brand_name, category_name, sup_name, phone],
    (err, result) => {
      if (err) {
        console.log({ status: 300 })
      } else {
        res.send({ status: 200 })
      }
    }
  )
})
//product get

app.get("/brand", (req, res) => {
  db.query("select * from stockk.brand", (err, result) => {
    if (err) {
      res.send({ status: 300 })
    } else {
      res.send({ brand: result, status: 200 })
    }
  })
})

//brand update
app.put("/updatebrand", (req, res) => {
  const id = req.body.id
  const brand_name = req.body.brand_name
  const category_name = req.body.category_name
  const sup_name = req.body.sup_name
  const phone = req.body.phone
  db.query(
    "UPDATE brand SET brand_name = ?,category_name=?,sup_name=?,phone=? WHERE id = ?",
    [brand_name, category_name, sup_name, phone, id],
    (err, result) => {
      if (err) {
        console.log(err)
        res.send(err)
      } else {
        res.send(" currennt value is updated")
      }
    }
  )
})
//delete
app.delete("/brand/delete/:id", (req, res) => {
  db.query("DELETE FROM brand WHERE id = ?", [req.params.id], (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
})
//total amount

app.get("/sumofamount", (req, res) => {
  db.query("select sum(total) as total from oreders ", (err, result) => {
    if (err) {
      res.send({ status: 300 })
    } else {
      res.send(result)
    }
  })
})

//product

//product add
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})
const upload = multer({
  storage: storage,
  // limits: { fileSize: '10000000' },
  // fileFilter: (req, file, cb) => {
  //     const fileTypes = /jpeg|jpg|png|gif/
  //     const mimeType = fileTypes.test(file.mimetype)
  //     const extname = fileTypes.test(path.extname(file.originalname))

  //     if(mimeType && extname) {
  //         return cb(null, true)
  //     }
  //     cb('Give proper files formate to upload')
  // }
}) //.single('image')

app.post("/addproduct", upload.single("product_image"), (req, res) => {
  console.log(req.file)
  const id = req.body.id
  const pro_name = req.body.product_name
  const catagories = req.body.category
  const supplier = req.body.supplier_name
  const price = req.body.Selling_Price
  const buy_price = req.body.buying_price
  const date = new Date()
  const img = req.file.path
  const quan = req.body.quantity

  console.log(pro_name)
  db.query(
    "insert into productt (id,pro_name,catagories,supplier,quan,price,buy_price,img,date) VALUES (?,?,?,?,?,?,?,?,?)",
    [id, pro_name, catagories, supplier, quan, price, buy_price, img, date],
    (err, result) => {
      if (err) {
        res.send({ status: 300 })
        console.log(err)
      } else {
        res.send({ status: 200 })
      }
    }
  )
})
//get product
app.get("/product", (req, res) => {
  db.query("select * from productt", (err, result) => {
    if (err) {
      res.send({ status: 400 })
      console.log(err)
    } else {
      res.send({ status: 200, data: result })
    }
  })
})
//delete product
app.delete("/product/delete/:id", (req, res) => {
  db.query(
    "DELETE FROM productt WHERE id=?",
    [req.params.id],
    (err, response) => {
      if (err) {
        console.log("erorr")
      } else {
        res.send({ status: 200 })
      }
    }
  )
})
//Emplyee Details

//add Employee
app.post("/employee/add", (req, res) => {
  id = req.body.id
  user_name = req.body.nn
  password = req.body.pp
  phone = req.body.pn

  db.query(
    "INSERT INTO emp (id,user_name,password,phone) VALUES (?,?,?,?)",
    [id, user_name, password, phone],
    (err, result) => {
      if (err) {
        res.send("error")
      } else {
        res.send("suceess")
      }
    }
  )
})
//get Employee List
app.get("/emp", (req, res) => {
  db.query("SELECT COUNT(id) as kk FROM emp", (err, result) => {
    if (err) {
      res.send(err)
    } else {
      res.json(result)
    }
  })
})
app.get("/employee", (req, res) => {
  db.query("SELECT * FROM emp", (err, response) => {
    if (err) {
      res.send("error")
    } else {
      res.send(response)
    }
  })
})
//delete employee
app.delete("/employee/delete/:id", (req, res) => {
  db.query("DELETE FROM emp WHERE id=?", [req.params.id], (err, response) => {
    if (err) {
      console.log("erorr")
    } else {
      res.send({ status: 200 })
    }
  })
})
//update employee
app.put("/employee/update", (req, res) => {
  const datt = req.body.currentEmp
  db.query(
    "UPDATE emp SET user_name=?,password=?,phone=? WHERE id=?",
    [datt.user_name, datt.password, datt.phone, datt.id],
    (err, result) => {
      if (err) {
        connsole.log("errorr da")
        res.send(err)
      } else {
        res.send({ status: 200 })
      }
    }
  )
})

//ordered product
app.get("/ordered", (req, res) => {
  db.query("select * from oreders", (err, result) => {
    if (err) {
      res.send({ status: 400 })
    } else {
      res.send(result)
    }
  })
})
//order product id
app.get("/ordered/:id", (req, res) => {
  db.query(
    "select * from oreders where id=?",
    [req.params.id],
    (err, result) => {
      if (err) {
        res.send({ status: 400 })
      } else {
        res.send(result)
      }
    }
  )
})

//update
app.put("/ordered/update", (req, res) => {
  const datt = req.body.currentEmp
  db.query(
    "UPDATE oreders SET conform=? WHERE id=?",
    [datt.conform, datt.id],
    (err, result) => {
      if (err) {
        connsole.log("errorr da")
        res.send(err)
      } else {
        res.send({ status: 200 })
      }
    }
  )
})
//add user

app.post("/user/add", (req, res) => {
  const id = uuidv4()
  const user_name = req.body.nn
  const passwd = req.body.pp
  const phone = req.body.pn

  db.query(
    "INSERT INTO users (id,user_name,passwd,phone) VALUES (?,?,?,?)",
    [id, user_name, passwd, phone],
    (err, result) => {
      if (err) {
        res.send("error")
        console.log("error")
      } else {
        res.send("success")
        console.log("success")
      }
    }
  )
})

//get user for admin

app.get("/users", (req, res) => {
  db.query("select * from users", (err, result) => {
    if (err) {
      res.send({ status: 300 })
      console.log("can't get a data from user table")
    } else {
      res.send(result)
    }
  })
})

//cart
app.get("/cart", (req, res) => {
  db.query("select * from cart", (err, result) => {
    if (err) {
      res.send("errorrr...?")
      res.connsole(err)
    } else {
      res.send({ status: 200, data: result })
    }
  })
})

//cart insert
app.post("/addcart", (req, res) => {
  const id = uuidv4()
  const quan = 1

  const { user_id, pro_name, pro_id, price } = req.body
  console.log(id)
  db.query(
    "insert into cart (id,user_id,pro_name,product_id,quan,price) values(?,?,?,?,?,?)",
    [id, user_id, pro_name, pro_id, quan, price],
    (err, result) => {
      if (err) {
        res.send({ status: 300 })
        console.log(err)
      } else {
        res.send({ status: 200 })
      }
    }
  )
})

//update cart
app.put("/updatecart", (req, res) => {
  console.log(req.body.quan)
  db.query(
    "UPDATE cart SET quan=? WHERE id=?",
    [req.body.quan, req.body.id],
    (err, result) => {
      if (err) {
        res.send("errorr...!")
      } else {
        res.send({ status: 200 })
      }
    }
  )
})
//delete the cart product
app.delete("/cart/delete/:id", (req, res) => {
  db.query("delete from cart where id=?", [req.params.id], (err, result) => {
    if (err) {
      res.send({ status: 300 })
      console.log("cart element is deleted")
    } else {
      res.send({ status: 200 })
    }
  })
})

//insert a order in user page

app.post("/addorder", (req, res) => {
  const user = req.body.user.name
  const user_id = req.body.user.id
  const pro_id = req.body.currentEmp.product_id
  const pro_name = req.body.currentEmp.pro_name
  const price = req.body.currentEmp.price
  const quan = req.body.currentEmp.quan
  const id = uuidv4()
  console.log(user)
  const date = new Date()
  const total = price * quan
  db.query(
    "insert into oreders (id,user,pro_id,prodeuct_name,quantity,price,total,date,user_id,conform) values(?,?,?,?,?,?,?,?,?,?)",
    [
      id,
      user,
      pro_id,
      pro_name,
      quan,
      price,
      total,
      date,
      user_id,
      "resquested",
    ],
    (err, result) => {
      if (err) {
        res.send({ status: 300, data: err })
      } else {
        res.send({ status: 200 })
      }
    }
  )
})

//orderdelete in user page

app.delete("/order/delete/:id", (req, res) => {
  db.query(
    "delete from  oreders where id=?",
    [req.params.id],
    (err, result) => {
      if (err) {
        res.send({ status: 300 })
        console.log("errorr in orederr delete in user side")
      } else {
        res.send({ status: 200 })
      }
    }
  )
})

//quan check in product table

app.put("/prouodate", (req, res) => {
  const pro_id = req.body.currentEmp.product_id
  const quan = req.body.currentEmp.quan
})

function betweenRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

//add or insert  bill
app.post("/addbill", (req, res) => {
  const id = req.body.id
  const invoice_no = betweenRandomNumber(10000000, 11111111)
  const user_id = req.body.currentEmp.user_id
  const user_name = req.body.currentEmp.user
  const product_id = req.body.currentEmp.pro_id
  const product_name = req.body.currentEmp.prodeuct_name
  const price = req.body.currentEmp.price
  const quantity = req.body.currentEmp.quantity
  const total = req.body.currentEmp.total
  const date = new Date()
  console.log(req.body.id)
  db.query(
    "insert into bill(id,invoice_no,user_id,user_name,product_id,product_name,price,quantity,total,date) values(?,?,?,?,?,?,?,?,?,?)",
    [
      id,
      invoice_no,
      user_id,
      user_name,
      product_id,
      product_name,
      price,
      quantity,
      total,
      date,
    ],
    (err, result) => {
      if (err) {
        res.send({ status: 300 })
      } else {
        res.send({ status: 200 })
      }
    }
  )
})

app.post("/bills", (req, res) => {
  const id = req.body.id
  console.log(req.body.id)
  db.query("select * from bill where id=?", [id], (err, result) => {
    if (err) {
      res.send({ status: 300 })
      console.log("error in bill id ")
    } else {
      res.send(result)
    }
  })
})

app.listen(3002, () => {
  console.log("success")
})
