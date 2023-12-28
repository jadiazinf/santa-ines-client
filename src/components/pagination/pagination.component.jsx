export const CustomPagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  const renderizarComponente = () => {
    const componentes = [];
    for (let i = 1; i <= totalPages; i++) {
      componentes.push(<SpamComponent key={i} numberPage={i} currentPage={currentPage} />);
    }
    return componentes;
  };

  return (
    <section aria-label="Page navigation example">
      <ul className="flex items-center -space-x-px h-8 text-sm">
        <li>
          <button className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight text-black-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700`} onClick={() => handlePageChange(currentPage - 1)} >
            <span className="sr-only">Previous</span>
            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
            </svg>
          </button>
        </li>
        {renderizarComponente()}
        <li>
          <button className={`flex items-center justify-center px-3 h-8 leading-tight text-black-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 `} onClick={() => handlePageChange(currentPage + 1)} >
            <span className="sr-only">Next</span>
            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
          </button>
        </li>
      </ul>
    </section>
  );
};

const SpamComponent = ({ numberPage, currentPage }) => {
  return (
    <li>
      <span className={`flex items-center justify-center px-3 h-8 leading-tight text-black-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${currentPage === numberPage ? 'bg-primary text-white ' : 'bg-white '}`}>{numberPage}</span>
    </li>
  )
}