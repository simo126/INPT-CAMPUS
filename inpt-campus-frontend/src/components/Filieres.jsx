import { useEffect, useState } from "react";
import axios from "axios";
import api from "../api/apiClient";

const getFilieres = () => api.get("/filieres");

const Filieres = () => {
  const [filieres, setFilieres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios;
    getFilieres()
      .then((response) => {
        setFilieres(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch filieres");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading filieres...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Filieres List</h2>
      <ul>
        {filieres.map((filiere) => (
          <li key={filiere.id}>
            <strong>{filiere.name}</strong> ({filiere.code}) – Students:{" "}
            {filiere.studentCount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filieres;
