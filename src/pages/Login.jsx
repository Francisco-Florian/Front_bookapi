import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Suppose que le token JWT est renvoyé dans `data.token`
        const token = data.token;
        console.log('User logged in:', data);

        // Stocker le token dans localStorage (ou autre)
        localStorage.setItem('token', token);

        // Rediriger après connexion
        navigate('/');
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-amber-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-amber-800">Connexion</h1>
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
}

export default Login;
