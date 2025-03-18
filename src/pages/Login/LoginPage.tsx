// src/pages/Login.tsx
import classes from '../Page.module.css'

import LoginFeature from '../../features/LoginFeature/LoginFeature';

const Login = () => {

  return (
    <div className={classes.main}>
      <LoginFeature/>
    </div>
  );
};

export default Login;