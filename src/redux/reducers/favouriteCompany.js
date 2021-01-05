const favouriteCompany = (state = {}, action) => {
    switch (action.type) {
        case "SET_FAVOURITE_COMPANY":
            return {
                ...state,
                fav: action.payload,
            }
        default:
            return state
    }
}

export default favouriteCompany;