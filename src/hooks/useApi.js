import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const apiUrl = process.env.REACT_APP_API_URL;

export function useGet(resource) {
  const [datas, setDatas] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const jwt = useSelector(state => state.authReducer.token);

  const request = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}${resource}`, {
        headers: {
          Authorization: "Bearer " + jwt,
          Accept: "application/json"
        }
      });
      setDatas(res.data);
    } catch (err) {
      console.log(err);
      setErrors(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    datas,
    errors,
    loading,
    request
  };
}

export function useRecursiveGet(resource, delay) {
  const [datas, setDatas] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const jwt = useSelector(state => state.authReducer.token);

  const request = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}${resource}`, {
        headers: {
          Authorization: "Bearer " + jwt,
          Accept: "application/json"
        }
      });
      setDatas(res.data);
    } catch (err) {
      console.log(err);
      setErrors(err);
    } finally {
      setLoading(false);
      setTimeout(() => {
        request();
      }, delay);
    }
  };

  return {
    datas,
    errors,
    loading,
    request
  };
}
