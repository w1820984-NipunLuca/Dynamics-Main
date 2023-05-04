import { useNavigate, useLocation,useHistory } from "react-router-dom";
import React, { useState } from "react";
import {
    H2,
    Main,
    BackLink

} from "govuk-react";
import Header from "../../Components/DefaultHeader";
import Footer from "../../Components/Footer";

const ViewDoctorList = () => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    let history = useNavigate();
    return (
        <div>
            <Header />
                <Main>
                    <BackLink onClick={() => history(-1)}> Back </BackLink>

                    <H2>View Doctor List</H2>
                    <b color='black'>Select the doctor for which you want to view and edit their appointments</b>
                    <ul>
                        <li>Dr.Smith</li>
                        <li>Dr.Brown</li>
                        <li>Dr.Wilson</li>
                        <li>Dr.Thomson</li>
                        <li>Dr.Robertson</li>
                        <li>Dr.Campbell</li>
                        <li>Dr.Stewart</li>
                        <li>Dr.Anderson</li>
                        <li>Dr.Reid</li>
                
                    </ul>
                </Main>
            <Footer />
        </div>
    );
};

export default ViewDoctorList;