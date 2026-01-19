import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "./loginReducer";
import registerReducer from "./registerReducer";
import filterReducer from "./filterReducer";
import eventReducer from "./EventReducer";
import NetworkReducer from "./NetworkReducer";
import Stories from "./StoryReducer"
import NoticeReducer from "./NoticeReducer";
import PatrikaReducer from "./PatrikaReducer";
import VideoReducer from "./VideoReducer";
import EventCornerReducer from "./EventCornerReducer";

const rootReducer = combineReducers({
    login:loginReducer,
    register:registerReducer,
    filter:filterReducer,
    event:eventReducer,
    network:NetworkReducer,
    stories:Stories,
    notice:NoticeReducer,
    patrika:PatrikaReducer,
    video:VideoReducer,
    eventCorner:EventCornerReducer
})

export default rootReducer