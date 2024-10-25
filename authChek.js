export const checkAuthToken = () => {
    const token = localStorage.getItem('token');
  
    // Si no hay token, recarga la página
    if (!token) {
      window.location.reload(); // Recarga la página
    }
  };