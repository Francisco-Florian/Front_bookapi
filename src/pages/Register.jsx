import RegisterForm from '../components/RegisterForm'
import { useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()

  const handleRegister = async (userData) => {
    try {
      // Envoi des données d'inscription à l'API
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      const data = await response.json();
      console.log('User registered:', data);

      // Si la requête a été un succès, redirige l'utilisateur vers la page de connexion
      if (response.ok) {
        navigate('/login');
      } else {
        console.error('Error during registration:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  }

  return (
    <div className="container mx-auto p-4 bg-amber-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-amber-800">Inscription</h1>
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <RegisterForm onRegister={handleRegister} />
      </div>
    </div>
  )
}

export default Register;
