import Swal from "sweetalert2";
import { getProductsRequest } from "../services/api";
import { useState } from "react";

export const useProducts = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getProducts = async () => {
        setIsLoading(true);

        try {
            const response = await getProductsRequest()

            if (response.data.error) {
                Swal.error({
                    title: 'Error',
                    text: response.data.error,
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }

            setProducts(response.data.products);

        } catch (error) {
            console.error("Error fetching products:", error);
            Swal.fire({
                title: 'Error',
                text: 'No se pudieron cargar los productos. Inténtalo más tarde.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    }

    return { products, isLoading, getProducts };
};