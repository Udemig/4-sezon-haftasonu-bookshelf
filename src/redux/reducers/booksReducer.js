import actionTypes from "../actions/actionTypes";

const initialState={
    pending:false,
    success:false,
    books:[],
    fail:false,
    error:""
}

const booksReducer=(state=initialState,action)=>{
    //console.log(action);
    switch (action.type) {
        case actionTypes.bookActions.GET_BOOKS_START:
            return{
                ...state,
                pending:true
            }
        case actionTypes.bookActions.GET_BOOKS_SUCCESS:
            return{
                ...state,
                pending:false,
                success:true,
                fail:false,
                books:action.payload
            }
        case actionTypes.bookActions.GET_BOOKS_FAIL:
            return{
                ...state,
                pending:false,
                success:false,
                fail:true,
                error:action.payload
            }
        case actionTypes.bookActions.DELETE_BOOK_START:
            return{
                ...state,
                pending:true
            }
        case actionTypes.bookActions.DELETE_BOOK_SUCCESS:
            var filteredBooks=state.books.filter(item => item.id !== action.payload)
            return{
                ...state,
                pending:false,
                success:true,
                fail:false,
                books:filteredBooks
            }
        case actionTypes.bookActions.DELETE_BOOK_FAIL:
            return{
                ...state,
                pending:false,
                success:false,
                fail:true,
                error:action.payload
            }
        case actionTypes.bookActions.ADD_BOOK:
            return{
                ...state,
                books:[...state.books,action.payload]
            }
        case actionTypes.bookActions.EDIT_BOOK:
            let temp=[]
            for(let i=0;i<state.books.length;i++){
                if(state.books[i].id !== action.payload.id){
                    temp.push(state.books[i])
                }else{
                    temp.push(action.payload)
                }
            }
            //var filteredBooks=state.books.filter(item=>item.id !== action.payload.id)
            
            return{
                ...state,
                books:temp
            }
        default:
            return state
    }
}

export default booksReducer