import { useNavigate } from "react-router-dom";

export const ButtonBack = ({ style, onClick }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); //TODO -> Tratar de cambiar esto para que vaya a una ruta especifica la DASHBOARD
  };
  return (
    <button onClick={handleGoBack || onClick} type="button" className={`${style} text-primary border border-primary hover:bg-green-600 hover:text-white  font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2`}>
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
      </svg>
      <span className="sr-only">Volver</span>
    </button>
  )
}
