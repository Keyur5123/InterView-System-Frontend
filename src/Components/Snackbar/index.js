import React from "react";
// import Snackbar from '@mui/material/Snackbar';
import { Alert, Button } from "@mui/material";

function SnackbarCompo({ snackbar, setSnackbar }) {

    const handleClose = () => {
        setSnackbar({ ...snackbar, status: false });
    };

    return (
        <div>
            {snackbar.status && <Alert onClose={handleClose} severity={snackbar.severity}>{snackbar.message}</Alert>}
        </div>
    )
}

export default SnackbarCompo;