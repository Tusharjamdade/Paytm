import axios from "axios";
import { atom, selector } from "recoil";

export const firstname = atom({
  key: "firstname",
  default: "",
});
export const lastname = atom({
  key: "lastname",
  default: "",
});
export const username = atom({
  key: "username",
  default: "",
});
export const password = atom({
  key: "password",
  default: "",
});

export const balance = atom({
  key: "balance",
  default: selector({
    key: "balanceselector",
    get: async ({ get }) => {
      const token =localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/v1/account/balance",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      // console.log("Balance value" + response.data.balance);
      // console.log("Token value" + localStorage.getItem("token"));
      return response.data.balance;
    },
  }),
});


export const userListResult = atom({
  key:"users",
  default:selector({
    key:"userSelector",
    get:async({get})=>{
      const userList =  await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=`);
      return userList.data.users
    }
  })
})