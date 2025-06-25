import { useState, useEffect } from "react";
import {
  getUserRequest,
  updateUser,
  updatePassword,
  updateUserLogo
} from "../services/api";
import Swal from "sweetalert2";

const useUserEdit = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    address: "",
    phone: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getUserRequest();
        setFormData({
          name: data.name || "",
          surname: data.surname || "",
          address: data.address || "",
        });
      } catch (err) {
        setError("Error al cargar datos de usuario");
        console.log(err);
        
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await updateUser(formData);
      Swal.fire({ icon: 'success', title: '¡Éxito!', text: 'Datos actualizados correctamente' });
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Error al actualizar datos' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await updatePassword(passwordData);
      console.log("Response from updatePassword:", response);
      if (response.success) {
        Swal.fire({ icon: 'success', title: '¡Éxito!', text: 'Contraseña actualizada correctamente' });
        setPasswordData({ oldPassword: "", newPassword: "" });
      } else {
        Swal.fire({ icon: 'error', title: 'Error', text: response.message || "Error al cambiar la contraseña" });
      }
    } catch (err) {
      setError("Error al cambiar la contraseña");
      Swal.fire({ icon: 'error', title: 'Error', text: respose.message });
    } finally {
      setLoading(false);
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Debes seleccionar una imagen' });
      return false;
    }

    const formData = new FormData();
    formData.append("photo", selectedImage);

    setLoading(true);
    setError(null);
    try {
      const response = await updateUserLogo(formData);
      if (response.success) {
        Swal.fire({ icon: 'success', title: '¡Éxito!', text: 'Imagen de perfil actualizada' });
        setSelectedImage(null);
        return true;
      } else {
        Swal.fire({ icon: 'error', title: 'Error', text: response.message || "Error al subir la imagen" });
        return false;
      }
    } catch (err) {
      setError("Error al subir la imagen");
      Swal.fire({ icon: 'error', title: 'Error', text: 'Error al subir la imagen' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    passwordData,
    loading,
    error,
    handleChange,
    handlePasswordChange,
    handleSubmit,
    handlePasswordSubmit,
    handleImageChange,
    handleImageSubmit,
  };
};

export default useUserEdit;
