import { useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

export default function LogIn(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleLogIn(event){
        event.preventDefault();

        const response = await supabase.auth.signInWithPassword({email, password});

        if (response.error){
            console.error(response.error);
            return;
        }

        navigate("/reservation");
        
    }

    return (
        <>
        <h1> Log In</h1>

        <form onSubmit={handleLogIn}>
            <input type= "text" placeholder = "email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
            <button type="submit">Log In</button>
        </form>
        
        </>
    )
}