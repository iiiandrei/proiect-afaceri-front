import React, { useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import axios from '../../../services/apiService';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true); 
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');

  const toggleForm = () => setIsLogin(!isLogin);

  const submitLogin = () => {
    setLoginError('');
    if (username.length < 4) {
      setUsernameError('Username must be at least 4 characters long');
      return;
    }
    setUsernameError('');
    if (password.length < 4) {
      setPasswordError('Password must be at least 4 characters long');
      return;
    }
    setPasswordError('');

    axios
      .post(process.env.REACT_APP_API_URL + '/auth/login', { username, password })
      .then((response) => {
        if (response.data.token) {
          dispatch({ type: 'set', authToken: response.data.token });
          dispatch({ type: 'set', refreshToken: response.data.refreshToken });
          dispatch({ type: 'set', userId: response.data.data });
          navigate('/all-announcements');
        }
      })
      .catch((error) => {
        setLoginError(error.response?.data?.message || 'An error occurred');
      });
  };

  const submitRegister = () => {
    setRegisterError('');
    if (password !== retypePassword) {
      setRegisterError('Passwords do not match');
      return;
    }

    axios
      .post(process.env.REACT_APP_API_URL + '/auth/register', {
        firstName,
        lastName,
        username,
        password,
        phoneNumber
      })
      .then(() => {
        setIsLogin(true);
      })
      .catch((error) => {
        setRegisterError(error.response?.data?.message || 'An error occurred');
      });
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  {isLogin ? (
                    <CForm>
                      <h1>Login</h1>
                      <p className="text-medium-emphasis">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          onChange={(event) => setUsername(event.target.value)}
                          placeholder="Username"
                          autoComplete="username"
                        />
                      </CInputGroup>
                      {usernameError && <div className="text-danger">{usernameError}</div>}
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          onChange={(event) => setPassword(event.target.value)}
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                        />
                      </CInputGroup>
                      {passwordError && <div className="text-danger">{passwordError}</div>}
                      <button className="btn btn-ok" onClick={submitLogin}>
                        Login
                      </button>
                      {loginError && <div className="text-danger">{loginError}</div>}
                      <div className="mt-3">
                        <button className="btn btn-ok" onClick={toggleForm}>
                          Don't have an account? Register here
                        </button>
                      </div>
                    </CForm>
                  ) : (
                    <CForm>
                      <h1>Register</h1>
                      <p className="text-medium-emphasis">Create your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>First Name</CInputGroupText>
                        <CFormInput
                          onChange={(event) => setFirstName(event.target.value)}
                          placeholder="First Name"
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>Last Name</CInputGroupText>
                        <CFormInput
                          onChange={(event) => setLastName(event.target.value)}
                          placeholder="Last Name"
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                      <CInputGroupText>Username</CInputGroupText>
                        <CFormInput
                          onChange={(event) => setUsername(event.target.value)}
                          placeholder="Username"
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                      <CInputGroupText>Phone Number</CInputGroupText>
                        <CFormInput
                          onChange={(event) => setPhoneNumber(event.target.value)}
                          placeholder="Phone number"
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                      <CInputGroupText>Password</CInputGroupText>
                        <CFormInput
                          onChange={(event) => setPassword(event.target.value)}
                          type="password"
                          placeholder="Password"
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>Retype Password</CInputGroupText>
                        <CFormInput
                          onChange={(event) => setRetypePassword(event.target.value)}
                          type="password"
                          placeholder="Retype Password"
                        />
                      </CInputGroup>
                      <button className="btn btn-ok" onClick={submitRegister}>
                        Register
                      </button>
                      {registerError && <div className="text-danger">{registerError}</div>}
                      <div className="mt-3">
                        <button className="btn btn-ok" onClick={toggleForm}>
                          Already have an account? Login here
                        </button>
                      </div>
                    </CForm>
                  )}
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
