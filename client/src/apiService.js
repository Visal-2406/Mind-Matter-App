import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const submitPHQ9 = async (userId, date, responses, token) => {
  const response = await axios.post(
    `${API_URL}/phq9/submit`,
    { userId, date, responses },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export { submitPHQ9 };
