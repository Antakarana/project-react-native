const setEnteredCallNumber = (enteredCallNumber) => {
    return {
        type: "ENTERED_CALL_NUMBER",
        payload: enteredCallNumber
    }
}
export default setEnteredCallNumber;