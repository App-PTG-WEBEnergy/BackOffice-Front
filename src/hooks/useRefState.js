import  {useState, useRef, useEffect} from 'react';
export const useRefState = initialValue => {
    const [state, setState] = useState(initialValue)
    const stateRef = useRef(state)
    useEffect(
      () => { stateRef.current = state },
      [state]
    )
    return [state, stateRef, setState]
  }