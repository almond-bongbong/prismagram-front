import React, { useState } from 'react';
import AuthPresenter from './AuthPresenter';
import useInput from '../../hooks/useInput';
import { useMutation } from 'react-apollo-hooks';
import { CONFIRM_SECRET, CREATE_ACCOUNT, LOCAL_LOG_IN, LOG_IN } from './AuthQueries';
import Loader from '../../components/common/Loader';
import { toast } from 'react-toastify';

function AuthContainer() {
  const [action, setAction] = useState('logIn');
  const [username, handleUsername] = useInput('');
  const [name, handleName] = useInput('');
  const [email, handleEmail] = useInput('');
  const [secret, handleSecret] = useInput('');
  const [requestSecret, { loading: loadingRequestSecret }] = useMutation(LOG_IN, {
    variables: { email },
  });
  const [createAccount, { loading: loadingCreateAccount }] = useMutation(CREATE_ACCOUNT, {
    variables: { username, email, name },
  });
  const [confirmSecret, { loading: loadingConfirmSecret }] = useMutation(CONFIRM_SECRET, {
    variables: { secret, email },
  });
  const [localLogin, { loading: loadingLocalLogin }] = useMutation(LOCAL_LOG_IN);

  const submitLogin = async () => {
    if (!email) return toast('Input email');

    try {
      const { data } = await requestSecret();

      if (data.requestSecret) {
        toast.success('Check your inbox for your login secret');
        setAction('confirm');
      } else {
        toast.error("You don't have an account yet, create one");
        setTimeout(() => {
          setAction('signUp');
        }, 3000);
      }
    } catch (e) {
      toast.error("Can't request secret, try again");
    }
  };

  const submitConfirm = async () => {
    if (!secret) {
      return toast.error('Input your secret');
    }

    try {
      const { data } = await confirmSecret();
      const token = data.confirmSecret;

      if (token) {
        await localLogin({ variables: { token } });
      } else {
        toast.error("Can't confirm secret");
      }
    } catch (e) {
      toast.error("Can't confirm secret");
    }
  };

  const submitSignUp = async () => {
    if (!email || !username) {
      return toast.error('All field are required');
    }

    try {
      const { data } = await createAccount();

      if (data.createAccount) {
        toast.success('Account created! Log In now');
        setTimeout(() => setAction('logIn'), 3000);
      } else {
        toast.error("Can't create account");
      }
    } catch (e) {
      console.dir(e);
      toast.error(e.message || "Can't create account, try again");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (action === 'logIn') {
      submitLogin();
    }

    if (action === 'confirm') {
      submitConfirm();
    }

    if (action === 'signUp') {
      submitSignUp();
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
        secret={secret}
        handleUsername={handleUsername}
        handleName={handleName}
        handleEmail={handleEmail}
        handleSecret={handleSecret}
        onSubmit={onSubmit}
      />

      {(loadingRequestSecret ||
        loadingConfirmSecret ||
        loadingCreateAccount ||
        loadingLocalLogin) && <Loader />}
    </>
  );
}

export default AuthContainer;
