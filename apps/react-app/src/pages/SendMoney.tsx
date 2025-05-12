import axios from "axios";
import Button from "../components/Button";
import LabelledInput from "../components/LabelledInput";
import { Endpoints, StorageKeys } from "../config";
import { useState } from "react";


const headers = {
  authorization: `Bearer ${localStorage.getItem(StorageKeys.userToken)}`
}

function SendMoney() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);  
  
  return (
    <div className="w-full h-screen bg-black/95 flex-center">
        <div className="w-120 p-4 text-white flex flex-col items-center neon-glow-card">
          <p className="text-2xl font-semibold text-neon/80">Send Money</p>
            <LabelledInput label="Receiver" hintText="john@gmail.com" onChange={(v) => setEmail(v.target.value)} />
            <LabelledInput label="Amount" hintText="250" onChange={(v) => setAmount(Number(v.target.value))} />
            <Button
            classes="my-4"
            onClick={async () => {
              try {
                const res = await axios.post(
                  Endpoints.transfer,
                  { email, amount: amount*100 },
                  { headers }
                );              
                
                console.log(JSON.stringify(res));
              } catch (error) {
                console.error(error);
              }
            }}>Transfer</Button>
        </div>
      
    </div>
  )
}

export default SendMoney;