import '../../css/Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner-circle spinner-circle1"></div>
        <div className="spinner-circle spinner-circle2"></div>
        <div className="spinner-circle spinner-circle3"></div>
        <div className="spinner-circle spinner-circle4"></div>
      </div>
      <p className="loading-text">Cargando...</p>
    </div>
  );
};

export default Loading;
