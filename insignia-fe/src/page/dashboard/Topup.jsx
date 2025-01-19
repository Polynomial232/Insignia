import { useState } from "react"
import { postTopupBalance } from "../../services/dashboard"
import Swal from "sweetalert2"

export default function Topup() {
  const [amount, setAmount] = useState(0)

  function handleTopupBalance(e) {
    e.preventDefault()

    postTopupBalance(Number(amount))
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
      <div className="flex justify-between items-center">
        <h3 className="text-3xl">Topup</h3>
      </div>

      <div className="bg-gray-50 w-full py-20 flex justify-center items-center rounded-lg">
        <div className="md:w-1/3 flex flex-col gap-3">
          <div className="grid md:grid-cols-4 grid-cols-2 gap-5 [&>div]:cursor-pointer hover:[&>div]:bg-slate-800 hover:[&>div]:text-white [&>div]:ease-in-out [&>div]:duration-100 [&>div]:bg-slate-200 [&>div]:text-center [&>div]:py-10 [&>div]:rounded-lg [&>div]:font-bold">
            <div onClick={() => setAmount(10_000)} className={[amount === 10_000 ? "!bg-slate-800 text-white" : ""]}>Rp 10.000</div>
            <div onClick={() => setAmount(20_000)} className={[amount === 20_000 ? "!bg-slate-800 text-white" : ""]}>Rp 20.000</div>
            <div onClick={() => setAmount(50_000)} className={[amount === 50_000 ? "!bg-slate-800 text-white" : ""]}>Rp 50.000</div>
            <div onClick={() => setAmount(100_000)} className={[amount === 100_000 ? "!bg-slate-800 text-white" : ""]}>Rp 100.000</div>
            <div onClick={() => setAmount(200_000)} className={[amount === 200_000 ? "!bg-slate-800 text-white" : ""]}>Rp 200.000</div>
            <div onClick={() => setAmount(300_000)} className={[amount === 300_000 ? "!bg-slate-800 text-white" : ""]}>Rp 300.000</div>
            <div onClick={() => setAmount(500_000)} className={[amount === 500_000 ? "!bg-slate-800 text-white" : ""]}>Rp 500.000</div>
            <div onClick={() => setAmount(1_000_000)} className={[amount === 1_000_000 ? "!bg-slate-800 text-white" : ""]}>Rp 1.000.000</div>
          </div>
          <input type="text" name="" id="" inputMode="numeric" className="bg-slate-200 py-3 px-3 rounded-lg text-slate-800" placeholder="Rp 10,000,000" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <button className="bg-slate-800 w-full py-2.5 text-white rounded-lg font-bold text-lg" onClick={(e) => handleTopupBalance(e)}>Topup</button>
        </div>
      </div>
    </div>
  )
}
