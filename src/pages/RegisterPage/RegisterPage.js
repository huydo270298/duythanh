import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit'

import FormRegister from '../components/Auth/FormRegister';
import { register } from '../components/userSlice';
import styles from './RegisterPage.module.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

let cx = classNames.bind(styles);

const RegisterPage = () => {

  let navigate = useNavigate();

  const dispatch = useDispatch();
  const [mesError, setMesError] = useState(null)

  const handleSubmit = async(values) => {
    
    try {
      const action = register(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);
      if (user) {
        return navigate("/");
      }
    } catch (error) {
      setMesError(error.message);
    }
  }

  return (
    <div className={cx('wrapper')}>
      <FormRegister onSubmit={handleSubmit} message={mesError} />
    </div>
  )

};

export default RegisterPage;