// Important Imports
import React from 'react';

// Style sheet
import "../styles/main.css"

// Global Styles
import "../styles/global.css"

// Image imports
import Pringles from "../images/pringles.png" 
import Cheetos  from "../images/cheetos.png" 
import Taki     from "../images/taki.png" 

function Main() {
    return (
        <div className="main-page-container">
            <div className="main-page-photo-container">

                <img src={Pringles} alt="Pringles" className="main-page-photo-pringles" />
                <img src={Cheetos}  alt="Cheetos"  className="main-page-photo-cheetos"  /> 
                <img src={Taki}     alt="Taki"     className="main-page-photo-taki"     />
                
            </div>

            <div className="main-page-content-container">

                <div className="vertical-line"></div>

                <div className="main-page-content-text-container">
                    <h1>
                        Feeling obese?

                        <br />
                        Let's try get you back on TRACK!
                    </h1>

                    <p1>
                        We are not some knockoff! We are 100% original and we will help you get back on track. How do you think
                        you can get from one place to another? Let's find out.
                    </p1>

                    <br />
                    <button class="button-24">Get tracking!!!</button>
                </div>
            
            </div>
        </div>
    );
}

export default Main;
