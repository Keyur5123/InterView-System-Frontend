import React, { useState } from 'react';
import TextField from "../../Elements/TextField/index";
import Snackbar from "../../../src/Components/Snackbar";
import validatorConstant from "../../Utility/Constants/validatorConstant";
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

function Index() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        user_name: '',
        email: '',
        password: ''
    })
    const [itemValidationError, setItemValidationError] = useState({
        user_name: '',
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
        temp.user_name = userData.user_name ? '' : validatorConstant.FIELD_REQUIRED
        temp.email = userData.email ? '' : validatorConstant.FIELD_REQUIRED
        temp.password = userData.password ? '' : validatorConstant.FIELD_REQUIRED
        setItemValidationError({ ...itemValidationError, user_name: temp.user_name, email: temp.email, password: temp.password })
        return Object.values(temp).every(val => val == '')
    }

    const handleChange = (e) => {
        e.preventDefault();

        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    async function handleSubmit() {
        let checkError = checkTableItemValues()
        if (checkError) {
            let { user_name, email, password } = userData
            await fetch('http://localhost:4000/interview-system/auth/register',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ user_name, email, password })
                }
            )
                .then(data => data.json())
                .then(data => {
                    if (data.status == 200) {
                        setSnackbarData({ ...snackbarData, status: true, message: data.msg, severity: validatorConstant.SUCCESS });
                        navigate("/login");
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

            <p className='text-center text-2xl font-bold mb-5'>Register</p>

            {['user_name', 'email', 'password'].map((ele, id) => {
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

            <div className='text-center mt-5'>
                <Button variant="contained" onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
        </React.Fragment>
    )
}

export default Index