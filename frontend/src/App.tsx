import { useState } from "react";
import "./App.css";
import LoginForm from "./components/loginForm";

function App() {
    const [logged, setLogged] = useState(false);

    return (
        <>
            <h1>Login form</h1>
            {!logged ? (
                <LoginForm setLogged={setLogged} />
            ) : (
                <>
                    <h3>Already logged in</h3>
                    <button
                        style={{ background: "red" }}
                        onClick={() => {
                            window.localStorage.clear();
                            setLogged(false);
                        }}
                    >
                        Exit
                    </button>
                </>
            )}
        </>
    );
}

export default App;
