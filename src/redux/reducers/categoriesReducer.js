import actionTypes from "../actions/actionTypes";

const initialState={
    pending:false,
    success:false,
    categories:[],
    fail:false,
    error:""
}

const categoriesReducer=(state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.categoryActions.GET_CATEGORIES_START:
            return{
                ...state,
                pending:true
            }
        case actionTypes.categoryActions.GET_CATEGORIES_SUCCESS:
            return{
                ...state,
                pending:false,
                success:true,
                categories:action.payload,
                fail:false
            }
        case actionTypes.categoryActions.GET_CATEGORIES_FAIL:
            return{
                ...state,
                pending:false,
                success:false,
                fail:true,
                error:action.payload
            }
    
        default:
            return state
    }
}

export default categoriesReducer