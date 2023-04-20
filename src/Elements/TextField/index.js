import React from 'react';
import { TextField } from '@mui/material';

export default function TextFieldControl({ size, label, name, variant, onChange, error = null }) {
    return (
        <TextField
            size={size}
            label={label}
            name={name}
            variant={variant}
            onChange={onChange}
            {...(error && { error: true, helperText: error })}
        />
    )
}