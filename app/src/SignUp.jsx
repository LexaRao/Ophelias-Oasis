import { useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const navigate = useNavigate();

    async function handleSignUp(event){
        event.preventDefault();
        
        const response = await supabase.auth.signUp({ email, password });
        if (response.error){
            console.error(response.error);
            return;
        }

        if (!response.data.user) {
            console.error("Could not retrieve the new user.");
            return;
        }

        const userId = response.data.user.id;
        const profileResponse = await supabase.from("profiles").insert(
            { id: userId, first_name: firstName, last_name: lastName });
        
        if (profileResponse.error){
            console.error(profileResponse.error);
            return;
        }
        navigate("/reservation");

    }

    return (
        <>
        <h1>Create an Account</h1>

        <form onSubmit={handleSignUp}>
            <input type= "text" placeholder = "email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
            <input type= "text" placeholder = "First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required></input>
            <input type= "text" placeholder = "Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required></input>
            <button type="submit">Sign Up</button>
        </form>
        
        </>
    )

}