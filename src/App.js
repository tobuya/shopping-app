import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notification from "./components/Notification";
import { uiActions } from "./store/uiSlice";

let isFirstRender = true;
function App() {
  const dispatch = useDispatch();

  const notification = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {

    if(isFirstRender) {
      isFirstRender = false;
      return;
    }

    const sendRequest = async () => {
      // Send state as sending request
      dispatch(uiActions.showNotification({
        open: true,
        message: "Sending request",
        type: "warning"
      }));

      const res = await fetch('https://redux-http-35046-default-rtdb.firebaseio.com/cartItems.json', {
        method: 'PUT',
        body: JSON.stringify(cart),
      });
      const data = await res.json();
      console.log(data)
      // Send state as request is successful
      dispatch(uiActions.showNotification({
        open: true,
        message: "Sending request to database successfully",
        type: "success"
      }));
    };
    sendRequest().catch((err) => {
      // Send state as error
      dispatch(uiActions.showNotification({
        open: true,
        message: "Sending request failed",
        type: "error"
      }));
    });
  }, [cart, dispatch])

  return (
    <div className="App">
      {notification && <Notification type={notification.type} message={notification.message} />}
      {!isLoggedIn && <Auth /> }
      {isLoggedIn && <Layout /> }
    </div>
  );
}

export default App;
