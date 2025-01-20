import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, Legend, LinearScale, LineElement, PointElement, Title, Tooltip, ArcElement, Colors, BarElement } from "chart.js";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTopTransaction, fetchTopUsers, fetchUserBalance } from "../../services/dashboard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Colors
);

export default function Dashboard() {
  const [balance, setBalance] = useState(0)
  const [topUsers, setTopUsers] = useState([])
  const [topTransaction, setTopTransaction] = useState([])

  useEffect(() => {
    getUserBalance()
    getTopUsers()
    getTopTransaction()
  }, [])

  function getUserBalance() {
    fetchUserBalance()
    .then((response) => {
      if(response.data.statusCode === 200){
        setBalance(response.data.data.balance)
      }
    })
  }

  function getTopTransaction() {
    fetchTopTransaction()
    .then((response) => {
      if(response.data.statusCode === 200){
        setTopTransaction(response.data.data)
      }
    })
  }

  function getTopUsers() {
    fetchTopUsers()
    .then((response) => {
      if(response.data.statusCode === 200){
        setTopUsers(response.data.data)
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
      <h3 className="text-3xl">Dashboard</h3>

      <div className="flex gap-6 md:flex-row flex-col">
        <div className="md:w-3/4 md:order-1 order-2">
          <div className="flex flex-col gap-6">
            <div className="text-sm text-left bg-gray-50 shadow-md sm:rounded-lg px-6 py-3">
              <div className="w-full flex md:flex-row flex-col">
                <div className="w-full md:h-80 py-3 flex md:flex-row flex-col gap-3">
                  <div className="md:w-1/3 md:!h-auto h-80">
                    <Doughnut
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          colors: {
                            enabled: true,
                            forceOverride: true
                          },
                          legend: {
                            position: 'top',
                          },
                          title: {
                            display: true,
                            text: 'Top 10 Users Debit'
                          }
                        },
                      }}
                      data={{
                        labels: topUsers.map(user => user.username),
                        datasets: [
                          {
                            label: 'Debit',
                            data: topUsers.map(user => user.amount),
                            borderWidth: 1,
                          },
                        ],
                      }} />
                  </div>
                  <div className="md:w-2/3 md:!h-auto h-80">
                    <Bar
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          colors: {
                            enabled: true,
                            forceOverride: true
                          },
                          legend: {
                            position: 'top',
                          },
                          title: {
                            display: true,
                            text: 'Top 10 Transaction User'
                          }
                        },
                      }}
                      data={{
                        labels: topTransaction.map(transaction => transaction.username),
                        datasets: [
                          {
                            label: 'Amount',
                            data: topTransaction.map(transaction => transaction.amount),
                          },
                        ],
                      }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white px-6 py-3 flex flex-col gap-4">
              <h3 className="text-2xl">Top Transaction User</h3>
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
                    <tr className="border-b border-gray-200" key={i}>
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
        <div className="md:w-1/4 md:order-2 order-1">
          <div className="flex flex-col gap-6 h-full">

            <div className="bg-gradient-to-t from-slate-800 to-slate-700 px-6 pt-5 pb-6 rounded-lg text-white flex flex-col gap-4 shadow-md">
              <h5>My Wallet</h5>
              <div>
                <span className="font-semibold">BALANCE</span>
                <h3 className="text-3xl">{ rupiah(balance) }</h3>
              </div>
              <div className="flex gap-10">
                <Link to={'/dashboard/transfer'}>
                  <span className="flex justify-center items-center gap-2">
                      <FontAwesomeIcon icon={faArrowDown} className="bg-slate-600 px-2 py-1.5 rounded-md" />
                      Transfer
                  </span>
                </Link>
                <Link to={'/dashboard/topup'}>
                  <span className="flex justify-center items-center gap-2">
                    <FontAwesomeIcon icon={faArrowUp} className="bg-slate-600 px-2 py-1.5 rounded-md" />
                    Topup
                  </span>
                </Link>
              </div>
            </div>

            <div className="bg-white px-6 py-5 rounded-lg h-full shadow-md">
              <h3 className="text-2xl">Top Users</h3>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-3">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-2 py-3 text-center">
                            No
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Username
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount
                        </th>
                    </tr>
                </thead>
                <tbody>
                  { topUsers?.map((user, i) => (
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50" key={ i }>
                      <td scope="row" className="px-2 py-4 text-center">
                        { i + 1}
                      </td>
                      <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        { user.username }
                      </td>
                      <td className="px-6 py-4">
                        { user.amount > 0
                          ? <span className="text-green-600">+{ rupiah(user.amount) }</span>
                          : <span className="text-red-700">{ rupiah(user.amount) }</span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
