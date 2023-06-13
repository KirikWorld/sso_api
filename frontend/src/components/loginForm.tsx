import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

export default function LoginForm(props: any) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [secret, setSecret] = useState("");
    const [country, setCountry] = useState("");
    const params = new URLSearchParams(window.location.search);
    const utm_source = params.get("utm_source");
    const utm_to = params.get("utm_to");
    // const navigate = useNavigate();

    const loginFormStyle = {
        border: "1px solid white",
        borderRadius: "10px",
        maxWidth: "500px",
        width: "100%",
        height: "300px",
        display: "flex",
    };

    const signin = async () => {
        // const response = await fetch("http://localhost:3030/api/auth/signin/", {
        const response = await fetch("/api/auth/signin/", {
        method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: login,
                password: password,
                source: utm_source,
            }),
        });
        const data = await response.json();
        if (response.status !== 200) return props.setLogged(false);
        if (data.token) {
            setSecret(data.token);
            window.localStorage.setItem("secret", data.token);
            props.setLogged(true);
        }
        setCountry(data.country);
        return data;
    };

    const checkToken = async (localsecret: any) => {
        const response = await fetch("http://localhost:3030/api/auth/check/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                token: localsecret,
            }),
        });
        if (response.status === 200) {
            await response.json().then((data) => {
                setCountry(data.country);
                if (utm_source && utm_to) {
                    window.location.replace(
                        `http://${utm_source}/${utm_to}?secret=${localsecret}&CU=${data.country}`
                    );
                }
                props.setLogged(true);
            });
            return true;
        }
        props.setLogged(false);
        return false;
    };

    useEffect(() => {
        const localsecret = window.localStorage.getItem("secret");
        secret
        country
        checkToken(localsecret);
    }, []);

    return (
        <div className="login-form" style={loginFormStyle}>
            <input
                type="text"
                name=""
                id="login"
                value={login}
                placeholder="Login"
                onChange={(e) => setLogin(e.target.value)}
            />
            <input
                type="password"
                name=""
                id="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                onClick={() => {
                    signin().then((data) => {
                        if (utm_source && utm_to) {
                            window.location.replace(
                                `http://${utm_source}/${utm_to}?secret=${data.token}&CU=${data.country}`
                            );
                        }
                        // console.log(
                        //     `http://${utm_source}/${utm_to}?secret=${secret}`
                        // );
                    });
                }}
            >
                Login
            </button>
        </div>
    );
}
