import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function Reservation(){
    {/* usestate holds whether the user is logged in*/}
    const [session, setSession] = useState(null);
    const navigate = useNavigate();

    return(
        <>
            <h1> reservation page</h1>

            {/* if the user is not logged in, then show create and login screen using conditional rendering */}
            {!session &&
                <div className="determineSession">
                    <> Sign Up or log in </>
                    <button onClick={() => navigate("/signUp")}> Sign Up </button>
                    <button> Log in </button>

                </div>
            }
        
        
        
        
        
        </>
    )
}