import React, { useState } from 'react';
import AuthPresenter from './AuthPresenter';
import useInput from '../../hooks/useInput';
import { useMutation } from 'react-apollo-hooks';
import { LOG_IN } from './AuthQueries';
import Loading from '../../components/common/Loading';

function AuthContainer() {
  const [action, setAction] = useState('logIn');
  const [username, handleUsername] = useInput('');
  const [name, handleName] = useInput('');
  const [email, handleEmail] = useInput('');
  const [requestSecret, { loading }] = useMutation(LOG_IN, { variables: { email } });

  const onLogin = async (e) => {
    e.preventDefault();

    if (email) {
      const result = await requestSecret();
      console.log(result);
    }
  };

  return (
    <>
      <AuthPresenter
        action={action}
        setAction={setAction}
        username={username}
        name={name}
        email={email}
        handleUsername={handleUsername}
        handleName={handleName}
        handleEmail={handleEmail}
        onLogin={onLogin}
      />

      {loading && <Loading />}
    </>
  );
}

export default AuthContainer;
