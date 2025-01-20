import { fetchTransaction } from "../../services/dashboard";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"

export default function Transaction() {
  const [searchParams, setSearchParams] = useSearchParams({
    page: 1
  })

  const [transaction, setTransaction] = useState([])
  const [transactionPagination, setTransactionPagination] = useState({})
  const [transactionFilter, setTransactionFilter] = useState({
    page: 1,
    ...Object.fromEntries(searchParams.entries())
  })

  useEffect(() => {
    getTransaction()
  }, [searchParams])

  function getTransaction() {
    fetchTransaction(searchParams)
    .then((response) => {
      if(response.data.statusCode === 200){
        setTransaction(response.data.data)
        setTransactionPagination(response.data.pagination)
      }
    })
  }

  function handlePagination(page) {
    if(page > 0 && page <= transactionPagination.totalPage){
      setSearchParams({
        ...transactionFilter,
        page: page
      })
    }
  }

  function handleSearch(e) {
    e.preventDefault()
    setSearchParams({
      ...transactionFilter,
      page: 1
    })
  }

  const rupiah = (number)=>{
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }

  return (
    <div className="bg-gray-100 min-w-svw min-h-svh flex flex-col gap-3 px-6 py-6">
      <h3 className="text-3xl">Top Transaction User</h3>

      <div className="bg-gray-50 px-6 py-3" onSubmit={(e) => handleSearch(e)}>
        <form action="">
          <div className="flex justify-between items-end gap-10">
            <div className="grid grid-cols-4 w-full gap-4">
              <div className="w-full">
                <label htmlFor="">Transaction Code</label>
                <input type="text" name="transaction_code" id="" placeholder="TRF000001" className="bg-slate-200 px-4 py-2 rounded w-full mt-1"
                  value={transactionFilter.transaction_code ?? ''}
                  onChange={
                    (e) => setTransactionFilter(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
                  }
                />
              </div>
              <div className="w-full">
                <label htmlFor="">Username</label>
                <input type="text" name="username" id="" placeholder="username00001" className="bg-slate-200 px-4 py-2 rounded w-full mt-1"
                  value={transactionFilter.username ?? ''}
                  onChange={
                    (e) => setTransactionFilter(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
                  }
                  />
              </div>
            </div>
            <div className="flex gap-3">
              <button className="bg-slate-800 text-white px-4 py-2 rounded">Search</button>
            </div>
          </div>
        </form>
      </div>

      <div className="bg-gray-50 px-6 py-3 rounded-lg flex flex-col gap-4">
        <nav aria-label="Page navigation example" className="self-end">
          <ul className="flex items-center -space-x-px h-8 text-sm">
            <li onClick={() => handlePagination(transactionPagination.page - 1)} className="hover:cursor-pointer">
              <span className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
                <span className="sr-only">Previous</span>
                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                </svg>
              </span>
            </li>
            { Array.from({ length: transactionPagination.totalPage }).map((_, i) => (
              <li key={i} onClick={() => handlePagination(i + 1)} className="hover:cursor-pointer">
                <span className={"flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 " + [transactionPagination.page == i + 1 ? "bg-gray-100 text-gray-700" : "text-gray-500 bg-white "]}>{ i + 1 }</span>
              </li>
            ))}
            <li onClick={() => handlePagination(transactionPagination.page + 1)} className="hover:cursor-pointer">
              <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
                <span className="sr-only">Next</span>
                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
              </span>
            </li>
          </ul>
        </nav>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase">
              <tr>
                <th scope="col" className="px-2 py-3 border-b text-center">
                  No
                </th>
                <th scope="col" className="px-6 py-3 border-b bg-gray-50">
                  Transaction Code
                </th>
                <th scope="col" className="px-6 py-3 border-b">
                  Username
                </th>
                <th scope="col" className="px-6 py-3 border-b bg-gray-50">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 border-b">
                  Transacation Date
                </th>
              </tr>
            </thead>
            <tbody>
              { transaction?.map((transaction, i) => (
                <tr className="border-b border-gray-200" key={transaction.transfer_code}>
                  <td className="px-2 py-4 text-center">
                    { ((transactionPagination.page - 1 ) * 10) + i + 1 }
                  </td>
                  <td className="px-6 py-3 border-b bg-gray-50 font-bold">
                    { transaction.transfer_code }
                  </td>
                  <td className="px-6 py-3 border-b">
                    { transaction.username }
                  </td>
                  <td className="px-6 py-3 border-b bg-gray-50">
                    { transaction.amount > 0
                      ? <span className="text-green-600">+{ rupiah(transaction.amount) }</span>
                      : <span className="text-red-700">{ rupiah(transaction.amount) }</span>
                    }
                  </td>
                  <td className="px-6 py-3 border-b">
                    { transaction.transfer_date }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
