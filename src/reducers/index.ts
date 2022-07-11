import { ActionType } from "@redux-saga/types";
import { totalStates } from "../state";

export default function (state = totalStates, action: any) {
    switch (action.type) {
        case 'GET_TIMESTAMPS':
            return Object.assign({}, state, { timestamps: action.value })
        default:
            return state
    }

}