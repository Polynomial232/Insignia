import { fetchTopTransaction } from "../../services/dashboard";
import { useEffect, useState } from "react";

export default function TopUserTransaction() {
  const [topTransaction, setTopTransaction] = useState([])

  useEffect(() => {
    getTopTransaction()
  }, [])

  function getTopTransaction() {
    fetchTopTransaction()
    .then((response) => {
      if(response.data.statusCode === 200){
        setTopTransaction(response.data.data)
      }
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

      <div className="bg-gray-50 px-6 py-3">
        <div className="flex justify-between items-end gap-10">
          <div className="grid grid-cols-4 w-full gap-4">
            <div className="w-full">
              <label htmlFor="">Tranasction Code</label>
              <input type="text" name="" id="" placeholder="trf190001" className="bg-slate-200 px-4 py-2 rounded w-full mt-1" />
            </div>
            <div className="w-full">
              <label htmlFor="">Username</label>
              <input type="text" name="" id="" placeholder="username61412" className="bg-slate-200 px-4 py-2 rounded w-full mt-1" />
            </div>
            <div className="w-full">
              <label htmlFor="">Transaction Date</label>
              <input type="text" name="" id="" placeholder="2024-01-09 - 2024-01-19" className="bg-slate-200 px-4 py-2 rounded w-full mt-1" />
            </div>
          </div>
          <div className="flex gap-3">
            <button className="bg-slate-800 text-white px-4 py-2 rounded">Search</button>
            <button className="border border-slate-800 text-slate-800 px-4 py-2 rounded">Download</button>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-3 rounded-lg flex flex-col gap-4">
        <nav aria-label="Page navigation example" className="self-end">
          <ul className="flex items-center -space-x-px h-8 text-sm">
            <li>
              <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span className="sr-only">Previous</span>
                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                </svg>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
            </li>
            <li>
              <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
            </li>
            <li>
              <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">3</a>
            </li>
            <li>
              <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span className="sr-only">Next</span>
                <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
              </a>
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
              { topTransaction?.map((transaction, i) => (
                <tr className="border-b border-gray-200">
                  <td className="px-2 py-4 text-center">
                    { i + 1 }
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
