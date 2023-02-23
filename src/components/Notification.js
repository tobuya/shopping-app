import React from "react";
import { Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../store/uiSlice";

const Notification = ({type, message}) => {
    const dispatch = useDispatch();
    const notification = useSelector((state) => state.ui.notification);

    const handleClose = () => {
        dispatch(uiActions.showNotification({
            open: false,
        }))
    };

    return (
        <div>
            {notification.open && <Alert severity={type} onClose={handleClose}>{message}</Alert>}
        </div>
    )
}

export default Notification;
