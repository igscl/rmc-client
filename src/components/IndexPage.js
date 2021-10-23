import React from "react";
// import { Redirect } from "react-router";
import Actions from './Actions'
// import Events from './Events'
import Banner from "./Banner";
// import { useGlobalState } from "../config/store";

const IndexPage = () => {
    // const {store} = useGlobalState()
    // const {loggedInUser} = store

    return (
        <div>
            <>
                <Banner />
                <Actions />
            </>



            {/* <Events /> */}
        </div>
    )
}

export default IndexPage