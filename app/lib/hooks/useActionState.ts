// hooks/useActionState.ts
import { useState } from 'react';

export function useActionState(actionFunction: Function, initialState: any) {
  const [state, setState] = useState(initialState);

  const formAction = async (formData: FormData) => {
    const result = await actionFunction(state, formData);
    setState(result);
  };

  return [state, formAction] as const;
}
