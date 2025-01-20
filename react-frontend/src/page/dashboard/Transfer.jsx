import { faPlusCircle, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { postTransfer } from "../../services/dashboard";
import Swal from "sweetalert2";

export default function Transfer() {
  const [transferDatas, setTransferDatas] = useState({})
  const [numRow, setNumRow] = useState(1)

  function handleTransfer(e) {
    e.preventDefault()

    const data = Object.values(transferDatas).map(data => ({
      username: data.username,
      amount: Number(data.amount),
    }))

    postTransfer(data)
    .then((response) => {
      if(response.data.statusCode === 200){
        Swal.fire({
          title: 'Success!',
          text: response.data.message,
          icon: 'success',
          confirmButtonText: 'OK',
        })
      }else{
        Swal.fire({
          title: 'Error!',
          text: response.data.message,
          icon: 'error',
          confirmButtonText: 'OK',
        })
      }
    })
    .catch((e) => {
      Swal.fire({
        title: 'Error!',
        text: e,
        icon: 'error',
        confirmButtonText: 'OK',
      })
    })
  }

  return (
    <div className="bg-gray-100 min-w-svw min-h-svh flex flex-col gap-3 px-6 py-6">
      <h3 className="text-3xl">Transfer</h3>

      <div>
        <button className="bg-slate-800 text-white px-4 py-2 rounded" onClick={(e) => handleTransfer(e)} >Transfer</button>
      </div>

      <div className="bg-gray-50 px-6 py-3">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase">
              <tr>
                <th scope="col" className="px-2 py-3 border-b text-center">
                  No
                </th>
                <th scope="col" className="px-6 py-3 border-b bg-gray-50">
                  Username
                </th>
                <th scope="col" className="px-6 py-3 border-b">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 border-b bg-gray-50"></th>
              </tr>
            </thead>
            <tbody>
                { Array.from({ length: numRow }).map((_, i) => (
                  <tr className="border-b border-gray-200" key={ i }>
                    <td className="px-2 py-4 text-center">
                      { i + 1 }
                    </td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                      <input type="text" name="username" id="" className="w-full bg-gray-200 py-2 px-3 rounded"
                        placeholder="username5143"
                        value={transferDatas[i]?.username ?? ''}
                        onChange={
                          (e) => setTransferDatas(prevState => ({
                            ...prevState,
                            [i]: {
                              ...prevState[[i]],
                              username: e.target.value
                            }
                          }))
                        } />
                    </td>
                    <td className="px-6 py-4">
                      <input type="text" name="amount" id="" inputMode="numeric" className="w-full bg-gray-200 py-2 px-3 rounded"
                        pattern="\d*"
                        placeholder="Rp 100.000"
                        value={transferDatas[i]?.amount ?? ''}
                        onChange={
                          (e) => {
                            if(Number(e.target.value)){
                              setTransferDatas(prevState => ({
                                ...prevState,
                                [i]: {
                                  ...prevState[[i]],
                                  amount: e.target.value
                                }
                              }))
                            }
                          }
                        }
                      />
                    </td>
                    <td className="px-6 py-4 bg-gray-50 text-center">
                      <span className="text-white bg-red-600 px-2 py-1 rounded hover:cursor-pointer"
                        onClick={() => {
                          const newState = Object.entries(transferDatas).filter(([key, value]) => key != i)
                          setTransferDatas(Object.fromEntries(newState))
                        }} >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </span>
                    </td>
                  </tr>
                )) }
              <tr className="border-b border-gray-200 text-center">
                <td colSpan={4} className="py-3">
                  <span className="text-2xl text-green-600" onClick={() => setNumRow(prevState => (prevState + 1))}>
                    <FontAwesomeIcon icon={faPlusCircle} className="hover:scale-110 ease-in-out duration-300 hover:cursor-pointer" />
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}