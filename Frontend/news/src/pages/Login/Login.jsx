import { LoginForm } from "../../components/LoginForm/LoginForm";

export function Login() {
    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: " rgb(245, 245, 245)" }}>
            <LoginForm />
        </div>
    );
}