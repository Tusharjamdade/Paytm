import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil";
import { balance, lastname ,userListResult} from "../stores/atoms";
import axios from "axios";
import { SendMoney } from "./SendMoney";
import { useNavigate } from "react-router-dom";


export const Users = () => {
    // Replace with backend call
    const navigate = useNavigate();
    const [users, setUsers] = useRecoilState(userListResult)
    // const [search,setSearch] =useState("Default");
const balanceValue = useRecoilValue(balance);
    return <div className="px-7">
    <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    U
                </div>
            </div>
        </div>
    </div>
    <div className="flex p-4">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {balanceValue}
        </div>
    </div>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={onChangeSearch} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User user={user} />)}
        </div>
    </div>
    
async function onChangeSearch(e){
    const search = e.target.value;
    const searchResult =  await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${search}`);
    setUsers(searchResult.data.users)
    console.log(searchResult.data.users);
}


function User({user}) {
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
        <button onClick={(e)=>{
            navigate("/sendmoney?id="+user._id+"&name="+user.firstName);
        }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Send Money</button>
        </div>
    </div>
}
// function onClickSendMoney({user}){
//     const to = user._id;
//     // console.log(user._id);
//     <SendMoney firstName={user.firstName}/>
//     history.pushState("/sendmoney",)
//     // useEffect(()=>{
//         // navigate("/sendmoney")
//     // })

// }
}