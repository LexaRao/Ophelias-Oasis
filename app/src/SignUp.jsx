import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");


    async function handleSignUp(event){
        event.preventDefault();
        
        const response = await supabase.auth.signUp({ email, password });
        if (response.error){
            console.error(response.error);
            return;
        }

        const userId = response.data.user.id;
        const profileResponse = await supabase.from("profiles").insert(
            { id: userId, first_name: firstName, last_name: lastName });
        
        if (profileResponse.error){
            console.error(profileResponse.error);
            return;
        }


    }

    return (
        <>
        <h1>Create an Account</h1>

        <form onSubmit={handleSignUp}>
            <input  type= "text" placeholder = "email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <input  type= "text" placeholder = "First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}></input>
            <input  type= "text" placeholder = "Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}></input>
            <button type="submit">Sign Up</button>
        </form>
        
        
        
        
        </>
    )



}