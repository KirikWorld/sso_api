// components/my-user-editor.jsx

import React from "react";
import { Box, Label, Select } from "@adminjs/design-system";
import { ApiClient } from "adminjs";

const api = new ApiClient();

const RoleUser = (props) => {
    const [selected, setSelected] = React.useState([]);
    const [roles, setRoles] = React.useState([]);
    const [email, setEmail] = React.useState(props.record.params.email);
    const [secret, setSecret] = React.useState("");
    const [rolesIn, setRolesIn] = React.useState([]);

    React.useEffect(() => {
        // Fetch all users from your API
        createToken();
    }, []);

    React.useEffect(() => {
        if (secret) {
            getRoles();
            getUser().then((data) => setRolesIn(data.role));
        }
    }, [secret]);

    const handleChange = (event) => {
        // Update the record with the selected users
        const selectedOptions = Array.from(event.target.selectedOptions);
        // Преобразуем массив в список значений
        const selectedValues = selectedOptions.map((option) => option.value);
        // Обновляем состояние
        setSelected(selectedValues);
    };

    const createToken = async () => {
        const response = await fetch("/api/auth/signin/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: "admin@mail.com",
                password: "admin",
            }),
        });
        let data = await response.json();
        setSecret(data.token);
        return data;
    };

    const getRoles = async () => {
        const response = await fetch("/api/roles/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                secret: secret,
            }),
        });
        let data = await response.json();
        setRoles(Object.values(data));
        return data;
    };

    const getUser = async () => {
        const response = await fetch("/api/user/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                secret: secret,
                idOrEmail: email,
            }),
        });
        let data = await response.json();
        return data;
    };

    const saveRoles = async () => {
        const response = await fetch("/api/user/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                secret: secret,
                email: email,
                role: selected,
            }),
        });
        let data = await response.json();
        return data;
    };

    return (
        <Box variant="grey">
            <div>
                Selected roles:{" "}
                {rolesIn.map((role) => (
                    <p key={Math.random()}>{role.title}</p>
                ))}
            </div>
            <br />
            <Label>Role</Label>
            <select value={selected} onChange={handleChange} multiple>
                {roles.map((role) => (
                    <option key={role.id} value={role.title}>
                        {role.title}
                    </option>
                ))}
            </select>
            <button onClick={() => saveRoles()}>Save roles</button>
        </Box>
    );
};

export default RoleUser;
