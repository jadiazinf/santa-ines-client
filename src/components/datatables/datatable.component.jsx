import { useCounter } from "../../hooks";

const TableHeadComponent = ({columns}) => {
  return (
    <thead className=''>
      <trow>
      {
        columns.map( column => {
          return (<th >{column}</th>);
        })
      }
      </trow>
    </thead>
  );
}

const TableBodyComponent = ({useRTK}) => {

  const {count, handleIncrement, handleDecrement} = useCounter(1);

  let { data = [], isLoading } = useRTK(count);

  if (isLoading) data = data.response

  return (
    <>
      <tbody className=''>
      {
        isLoading ?
          <p>Loading</p> :
          data.map(row => (
            <tr>
            {
              Object.keys(row).map((prop, index) => (
                <td key={index}>{row[prop]}</td>
              ))
            }
            </tr>
          ))
      }
      </tbody>
      <tfoot className=''>
        <PaginationControls
          count={count}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
          isLoading={isLoading}
        />
      </tfoot>
    </>
  )
}

const PaginationControls = (obj) => {

  const {count, handleIncrement, handleDecrement, isLoading} = obj;

  return (
    <div>
      <button className='' onClick={handleDecrement} disabled={isLoading}>Prev</button>
      {count}
      <button className='' onClick={handleIncrement} disabled={isLoading}>Next</button>
    </div>
  );
}

export const DatatableComponent = ({columns, useRTK}) => {
  return (
    <table className=''>
      <TableHeadComponent columns={columns} />
      <TableBodyComponent useRTK={useRTK}/>
    </table>
  );
}
