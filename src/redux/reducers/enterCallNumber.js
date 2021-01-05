const enteredCallNumber = (state = {}, action) => {
    switch (action.type) {
        case "ENTERED_CALL_NUMBER":
            return {
                ...state,
                enteredCallNumber: action.payload,
            }
        default:
            return state
    }
}

export default enteredCallNumber;