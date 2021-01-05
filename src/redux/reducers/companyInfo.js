const companyInfo = (state = {}, action) => {
    switch (action.type) {
        case "SET_COMPANY_INFO":
            return {
                ...state,
                companyInfo: action.payload,
            }
        default:
            return state
    }
}

export default companyInfo;