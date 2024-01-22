// export const loginAction = async ({ request }) => {
//   console.log("Login Action triggered");

//   const data = await request.formData();
//   console.log("Data = " + data);
//   const user = {
//     email: data.get("email"),
//     password: data.get("password"),
//   };
//   console.log("Email =" + user.email);
//   console.log("Password =" + user.password);

//   //   const response = await fetch("/api/user/login", {
//   //     method: "POST",
//   //     body: JSON.stringify(user),
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //     },
//   //   });

//   //   const json = await response.json();

//   //   if (!response.ok) {
//   //     throw Error("Check your internet connection");
//   //   }

//   //   const userCredentials = {
//   //     email: json.email,
//   //     token: json.token
//   //   }

//   //   localStorage.setItem('user',JSON.stringify(userCredentials));
//   return user;
// };
