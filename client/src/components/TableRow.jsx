import React from 'react'

const TableRow = ({ app}) => {
    const { id, company_name, job_title, location, status, applied_at, notes,  } = app;
   
  return (
    <tr className='h-8 hover:cursor-pointer hover:bg-amber-100 '>
      <th>{id}</th>
      <th>{company_name}</th>
      <th>{job_title}</th>
      <th>{status}</th>
      <th>{location}</th>
      <th>{notes}</th>
      <th>{applied_at}</th>
      <th> <button>hi</button></th>

    </tr>
  );
}

export default TableRow