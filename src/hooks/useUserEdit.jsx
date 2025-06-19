// hooks/useUserEdit.jsx
import { useState, useEffect } from "react";
import {
  getUserRequest,
  updateUser,
  updatePassword,
  updateUserLogo
} from "../services/api";
import toast from "react-hot-toast";

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
          name: data.user.name || "",
          surname: data.user.surname || "",
          email: data.user.email || "",
          address: data.user.address || "",
          phone: data.user.phone || "",
        });
      } catch (err) {
        setError("Error al cargar datos de usuario");
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
      toast.success("Datos actualizados correctamente");
    } catch (err) {
      setError("Error al actualizar datos");
      toast.error("Error al actualizar datos");
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
        toast.success("Contraseña actualizada correctamente");
        setPasswordData({ oldPassword: "", newPassword: "" });
      } else {
        toast.error(response.message || "Error al cambiar la contraseña");
      }
    } catch (err) {
      setError("Error al cambiar la contraseña");
      toast.error("Error al cambiar la contraseña");
    } finally {
      setLoading(false);
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      toast.error("Debes seleccionar una imagen");
      return;
    }

    const formData = new FormData();
    formData.append("photo", selectedImage);

    setLoading(true);
    setError(null);
    try {
      const response = await updateUserLogo(formData);
      if (response.success) {
        toast.success("Imagen de perfil actualizada");
        setSelectedImage(null);
      } else {
        toast.error(response.message || "Error al subir la imagen");
      }
    } catch (err) {
      setError("Error al subir la imagen");
      toast.error("Error al subir la imagen");
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
