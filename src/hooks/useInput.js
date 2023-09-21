import { useReducer } from 'react'

const initialInputState = {
    input: '',
    inputIsTouched: false
}

const inputStateReducer = (state, action) => {
    if (action.type === 'INPUT')
        return { input: action.payload, inputIsTouched: state.inputIsTouched }
    if (action.type === 'BLUR')
        return { input: state.input, inputIsTouched: true }
    if (action.type === 'RESET')
        return initialInputState
    return state

}
const useInput = (validateInput) => {

    const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState)

    const inputIsValid = validateInput(inputState.input);
    const inputHasError = !inputIsValid && inputState.inputIsTouched;

    const inputChangeHandler = (event) => dispatch({ type: 'INPUT', payload: event.target.value })

    const inputBlurHandler = () => dispatch({ type: 'BLUR' })

    const reset = () => dispatch({ type: "RESET" })

    return {
        input: inputState.input,
        inputIsValid,
        inputHasError,
        inputChangeHandler,
        inputBlurHandler,
        reset
    }
}

export default useInput