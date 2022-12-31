import { useState } from 'react';

export const useActivity = () => {
  const [activity, setActivity] = useState(false);

  return { activity, setActivity };
};
