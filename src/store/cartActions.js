import { cartActions } from "./cartSlice";
import { uiActions } from "./uiSlice";

export const fetchData = () => {
    return async (dispatch) => {

        const fetchHandler = async () => {
            const res = await fetch('https://redux-http-35046-default-rtdb.firebaseio.com/cartItems.json');
            const data = await res.json();
            return data;
        }
        try {
            const cartData = await fetchHandler();
            dispatch(cartActions.replaceData(cartData));
        } catch (err) {
            dispatch(uiActions.showNotification({
                open: true,
                message: "Sending request failed",
                type: "error"
              }));
        }
    };
};

export const sendCartData = (cart) => {
    return  async (dispatch) => {
        dispatch(uiActions.showNotification({
            open: true,
            message: "Sending request",
            type: "warning"
          }));
          const sendRequest = async () => {
            // Send state as sending request
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
          try {
            await sendRequest()
          } catch (err) {
            dispatch(uiActions.showNotification({
                open: true,
                message: "Sending request failed",
                type: "error"
              }));
          }
    }
};