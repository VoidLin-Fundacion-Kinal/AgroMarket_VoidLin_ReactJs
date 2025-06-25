import { useEffect, useState } from 'react';
import { getBillsByUser } from '../services/api';

const useUserBills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await getBillsByUser();
        setBills(response.bills);
      } catch (err) {
        setError('Error al cargar facturas');
      } finally {
        setLoading(false);
      }
    };
    fetchBills();
  }, []);

  return { bills, loading, error };
};

export default useUserBills;
