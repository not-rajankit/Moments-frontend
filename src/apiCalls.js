import axios from "axios";
import { BaseUrl } from "./config";

export const loginCall = async (userCredential, dispatch) => {
  const BU = BaseUrl;
  dispatch({ type: "LOGIN_START" });
  // console.log(userCredential);
  try {
    const res = await axios.post(BU + "auth/login", userCredential);
    // console.log(userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    // console.log(err);
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};
