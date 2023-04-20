import React, { useState } from 'react';
import TextField from "../../Elements/TextField/index";
import validatorConstant from "../../Utility/Constants/validatorConstant";
import Snackbar from "../../../src/Components/Snackbar";
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function Index() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })
    const [itemValidationError, setItemValidationError] = useState({
        email: '',
        password: ''
    })
    const [snackbarData, setSnackbarData] = useState({
        status: false,
        message: '',
        severity: ''
    })

    let checkTableItemValues = () => {
        let temp = {}
        temp.email = userData.email ? '' : validatorConstant.FIELD_REQUIRED
        temp.password = userData.password ? '' : validatorConstant.FIELD_REQUIRED
        setItemValidationError({ ...itemValidationError, email: temp.email, password: temp.password })
        return Object.values(temp).every(val => val == '')
    }

    const handleChange = (e) => {
        e.preventDefault();

        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    async function handleSubmit() {
        let checkError = checkTableItemValues()
        if (checkError) {
            let { email, password } = userData
            await fetch('http://localhost:4000/interview-system/auth/login',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                }
            )
                .then(data => data.json())
                .then(data => {
                    if (data.status == 200) {
                        localStorage.setItem('token', data.data);
                        setSnackbarData({ ...snackbarData, status: true, message: `${data.msg} : ${data.data}`, severity: validatorConstant.SUCCESS });
                        navigate("/home");
                    }
                    else {
                        setSnackbarData({ ...snackbarData, status: true, message: `${data.msg} : ${data.err}`, severity: validatorConstant.ERROR });
                    }
                })
                .catch(err => {
                    setSnackbarData({ ...snackbarData, status: true, message: err.err, severity: validatorConstant.ERROR })
                })
        }
    }

    return (
        <React.Fragment>
            <div>
                <Snackbar
                    snackbar={snackbarData}
                    setSnackbar={setSnackbarData}
                />
            </div>
            <React.Fragment>
                <p className='text-center text-2xl font-bold mb-5'>Login</p>
                {['email', 'password'].map((ele, id) => {
                    return (
                        <div key={id} className='flex flex-col mb-3'>
                            <TextField
                                required
                                defaultValue={ele}
                                label={ele}
                                name={ele}
                                onChange={handleChange}
                                placeholder={ele}
                                size='small'
                                variant="outlined"
                                {...(itemValidationError[ele] && ({ error: true, helperText: itemValidationError[ele] }))}
                            />
                        </div>
                    )
                })}
                <div className='text-center mt-5 mb-11'>
                    <Button variant="contained" onClick={handleSubmit}>
                        Submit
                    </Button>
                </div>
                <div className='flex'>
                    <p className='pr-2'>Already have an account?</p>
                    <Link to='/register'>
                        <h6 className='bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text'>Sign In</h6>
                    </Link>
                </div>
            </React.Fragment>
        </React.Fragment>
    )
}

export default Index