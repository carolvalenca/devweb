import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Main from "../pages/Main";
import ReadingDetails from "../pages/ReadingDetails";

const AppRoutes = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={ <Main /> }  path="/" exact />
                <Route element={ <ReadingDetails /> }  path="/details/:id" />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;