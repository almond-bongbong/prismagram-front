import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Redirect({ path }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(path);
  }, [navigate, path]);
  return null;
}

export default Redirect;
