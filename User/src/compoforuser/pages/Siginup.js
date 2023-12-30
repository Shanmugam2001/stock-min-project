import { Box, Button, CardContent, CardHeader, Grid, TextField } from '@mui/material';
import React, { useState } from 'react'
import axios from 'axios';




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Siginup = () => {
    const [employee,setEmployee]=useState({
        name:'',
        passwd:'',
        phone:''
    })
    
     

    
    const saveEmployee = async (e) => {
        e.preventDefault()
        const nn=employee.name;
        const pp=employee.passwd;
        const pn=employee.phone;
        console.log(pn);
        console.log(employee.name);

        axios.post(
            `http://localhost:3002/user/add`,
            {nn,pp,pn}
        ).then(response=>{
            
            if(response.data === 'success'){
                setEmployee({
                    name:'',
                    passwd:'',
                    phone:''
                })
                alert("account created successfully..!")
            }
            else{
                alert("sry account not created..!")
            }
        }).catch(error=>
            alert("unable to create a account"))
    }
  return (
    <div className="m-sm-30">
         <CardContent
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                  }}
              >
                  <CardHeader
                      title="Add Customer"
                      style={{
                          textAlign: 'center',
                          color: '#5871fc',
                      }}
                  />
                  <form onSubmit={saveEmployee} encType="multipart/form-data">
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    type="text"
                                    id="outlined-basic"
                                    label="Employee Name"
                                    variant="outlined"
                                    name="name"
                                    value={employee.name}
                                    onChange={(event)=>setEmployee({...employee,name:event.target.value})}
                                    fullWidth
                                    required
                                    style={{ margin: '.5rem 0' }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type="password"
                                    id="outlined-basic"
                                    label="Password"
                                    variant="outlined"
                                    name="passwd"
                                    style={{ margin: '.5rem 0' }}
                                    value={employee.passwd}
                                    onChange={(event)=>setEmployee({...employee,passwd:event.target.value})}
                                    fullWidth
                                    required
    
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    type="number"
                                    id="outlined-basic"
                                    label="Phone Number"
                                    variant="outlined"
                                    name="phone"
                                    style={{ margin: '.5rem 0' }}
                                    value={employee.phone}
                                    onChange={(event)=>setEmployee({...employee,phone:event.target.value})}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            
                            
    
                        </Grid>
                        <Grid item xs={12} className="text-right">
                        
                            <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                fullWidth
                                style={{
                                    fontSize: '1.1rem',
                                    marginTop: '2px',
                                    fontWeight: 'bold',
                                }}
                                disabled={employee.name ==='' || employee.passwd === '' || employee.phone === ''? true:false}
                            >
                                Save
                            </Button>
                            
            
                        </Grid>
        
                    </form>

              </CardContent>
    </div>
  )
}

export default Siginup;