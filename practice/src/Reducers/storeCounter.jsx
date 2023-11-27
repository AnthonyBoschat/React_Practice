export const ACTIONS = {
    INCREMENT:"INCREMENT",
    DECREMENT:"DECREMENT",
    CHANGECOLOR:"CHANGECOLOR",
    CHANGESIZE:"CHANGESIZE",
}

export const initialState = {
    count:0,
    style:{
        color:"black",
        fontSize:"10px"
    }
}

export const counterReducer = (state, action) => {


    switch(action.type){
        case ACTIONS.INCREMENT:
            return {...state, count : state.count + action.payload.value}
        case ACTIONS.DECREMENT:
            return {...state, count : state.count - action.payload.value}
        case ACTIONS.CHANGECOLOR:
            return {...state, style: {...state.style, color:action.payload}}
        case ACTIONS.CHANGESIZE:
            return {...state, style: {...state.style, fontSize:`${action.payload}px`}}
        default:
            return state
    }
}