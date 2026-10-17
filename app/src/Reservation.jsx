import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';


export default function Reservation(){
    /* usestate holds whether the user is logged in*/
    const [session, setSession] = useState(null);
    const navigate = useNavigate();

    // This gets the user session which tells use if they are logged in. 
    useEffect(() =>{
        async function getSession(){
            const response = await supabase.auth.getSession();

            if (response.error){
                console.error(response.error);
                return;
            }

            setSession(response.data.session);
        }

        getSession();
    }, []);

    return(
        <>
            <h1> reservation page</h1>

            {/* if the user is not logged in, then show create and login screen using conditional rendering */}
            {!session &&
                <div className="determineSession">
                    <> Sign Up or log in </>
                    <button onClick={() => navigate("/signUp")}> Sign Up </button>
                    <button onClick={() => navigate("/logIn")}> Log in </button>
                </div>
            }

            {/* if the user is logged in show normal reservation page. */}
        
        </>
    )
}