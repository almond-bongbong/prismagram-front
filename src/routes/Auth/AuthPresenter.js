import React from 'react';
import styled from 'styled-components';
import Input from '../../components/form/Input';
import Button from '../../components/form/Button';
import { Helmet } from 'react-helmet';

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  border-radius: 0;
  width: 100%;
  max-width: 350px;
  ${({ theme }) => theme.whiteBox}
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0;
`;

const Link = styled.span`
  color: ${(props) => props.theme.blueColor};
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;

function AuthPresenter({
  action,
  setAction,
  username,
  name,
  email,
  secret,
  handleUsername,
  handleName,
  handleEmail,
  handleSecret,
  onSubmit,
  required,
}) {
  return (
    <Wrapper>
      <Form>
        {action === 'logIn' && (
          <>
            <Helmet>
              <title>Log In | Prismagram</title>
            </Helmet>
            <form onSubmit={onSubmit}>
              <Input value={email} onChange={handleEmail} placeholder="Email" type="email" />
              <Button text="Log in" />
            </form>
          </>
        )}
        {action === 'confirm' && (
          <>
            <Helmet>
              <title>Confirm Secret | Prismagram</title>
            </Helmet>
            <form onSubmit={onSubmit}>
              <Input
                value={secret}
                onChange={handleSecret}
                placeholder="Paste your secret"
                required={required}
              />
              <Button text="Confirm" />
            </form>
          </>
        )}
        {action === 'signUp' && (
          <>
            <Helmet>
              <title>Sign Up | Prismagram</title>
            </Helmet>
            <form onSubmit={onSubmit}>
              <Input value={name} onChange={handleName} placeholder={'Name'} required={required} />
              <Input
                value={email}
                onChange={handleEmail}
                placeholder="Email"
                type="email"
                required={required}
              />
              <Input
                value={username}
                onChange={handleUsername}
                placeholder="Username"
                required={required}
              />
              <Button text="Sign up" />
            </form>
          </>
        )}
      </Form>
      {(action === 'logIn' || action === 'signUp') && (
        <StateChanger>
          {action === 'logIn' && (
            <>
              Don't have an account? <Link onClick={() => setAction('signUp')}>Sign up</Link>
            </>
          )}
          {action === 'signUp' && (
            <>
              Have an account? <Link onClick={() => setAction('logIn')}>Log in</Link>
            </>
          )}
        </StateChanger>
      )}
    </Wrapper>
  );
}

export default AuthPresenter;
