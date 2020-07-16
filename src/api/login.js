import axiosHeader from "./axiosHeader"

const loginUser = user => {
    axiosHeader.post('/users/login', {
      email: user.email.value,
      password: user.password.value
    })
      .then(function (response) {
        window.location.href = "/home";
      })
      .catch(function (error) {
        alert("Check credentials");
      });

  };

const singUp = data => {
    axiosHeader.post('/users/register', {
      firstName: data.firstName.value,
      lastName: data.lastName.value,
      email: data.email.value,
      password: data.password.value,
    })
      .then(function (response) {
        window.location.href = "/home";
      })
      .catch(function (error) {
        console.log(error)
        alert("Check credentials");
      });

  };

export {
    loginUser,
    singUp,
} 