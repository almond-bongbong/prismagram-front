import React, { useState } from 'react';

function useInput(defaultValue) {
  const [value, setValue] = useState(defaultValue);
  const handleValue = (e) => setValue(e.target.value);

  return [value, handleValue];
}

export default useInput;
