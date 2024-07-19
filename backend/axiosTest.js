const axios = require("axios");
// let main = async () => {
//     let result = await fetch("http://localhost:3000/post", {
//       method: "POST",
//       body: JSON.stringify({ username: "Tushar" }), // Convert object to JSON string
//       headers: {
//         "Content-Type": "application/json", // Specify content type as JSON
//         "auth": "auth123"
//       },
//     });
//     const resultJson = await result.json();
//     console.log(resultJson);
//   };
let main = async () => {
  let result = await fetch("http://localhost:3000/post", {
    method: "POST",
    body: JSON.stringify({ username: "Tushar" }),
    headers: {
                "Content-Type": "application/json", // Specify content type as JSON
                "auth": "auth123"
              },
  });
  const resultJson = await result.json();
  console.log(resultJson);
};

// let main = async () => {
//   let result = await axios.post(
//     "http://localhost:3000/post",
//     { username: "example" },
//     { headers: { auth: "auth123" } }
//   );
//   console.log(result.data);
// };
main();
