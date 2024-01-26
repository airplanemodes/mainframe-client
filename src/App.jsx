import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Enter from "./components/enter";
import Main from "./components/main";
import Register from "./components/register";
import Write from "./components/write";
import Mailbox from "./components/mailbox";
import Profile from "./components/profile";
import Read from "./components/read";
import Edit from "./components/edit";
import NoPage from "./components/nopage";
import Look from "./components/look";
import UserAgreement from "./components/terms";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={ <Enter /> }/>
                <Route path="/main" element={ <Main /> }/>
                <Route path="/register" element={ <Register /> }/>
                <Route path="/write" element={ <Write /> }/>
                <Route path="/mailbox" element={ <Mailbox /> }/>
                <Route path="/profile" element={ <Profile /> }/>
                <Route path="/users/:username" element={ <Look /> }/>
                <Route path="/entries/:id" element={ <Read /> }/>
                <Route path="/edit/:id" element={ <Edit /> }/>
                <Route path="/terms" element={ <UserAgreement /> }/>
                <Route path="*" element={ <NoPage /> }/>
            </Routes>
        </BrowserRouter>
    );
}
