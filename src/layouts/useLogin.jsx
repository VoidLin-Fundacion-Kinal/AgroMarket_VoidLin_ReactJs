import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../services/api';
import Swal from 'sweetalert2';

const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const login = async (email, password) => {
        setIsLoading(true);

        const user = {
            userLogin: email,
            password
        };

        const response = await loginRequest(user);
        setIsLoading(false);

        if (response.error) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Intenta de nuevo",
            });
        }

        const {token, loggedUser} = response.data

        if(!loggedUser || !loggedUser.role){
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se puedo identificar el rol",
            });
        }















        return (
            <div>

            </div>
        )
    }
}

    export default useLogin
