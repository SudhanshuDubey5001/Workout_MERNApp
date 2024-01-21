export const signupAction = async ({ request }) => {
  console.log("Signup Action triggered");

  const data = await request.formData();
  const _user = {
    email: data.get("email"),
    password: data.get("password"),
    retypePassword: data.get("retypePassword"),
  };

  console.log("Email = "+_user.email);
  console.log("Pass = "+_user.password);

  if(_user.password!==_user.retypePassword){
    return { error: 'The passwords do not match' }
  }

  const user = {
    email: _user.email,
    password: _user.password
  }

  const response = await fetch("/api/user/signup", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("Response ="+ response.error);

  if (!response.ok) {
    throw Error("Check your internet connection");
  }

  // console.log("User successfully signed up");
  return { success: "true" };
};
