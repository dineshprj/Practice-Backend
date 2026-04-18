import React, { useState } from "react";

const Form = () => {
  const [form, setform] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPaassword: "",
  });

  const [response, setresponse] = useState(null);

  //Handle Input Change

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //Handle Submit

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Basic Validation

    if (form.password !== form.confirmPaassword) {
      alert("password does not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setresponse(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Fill Your Application</h1>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <h3>User Data</h3>

        <label>Enter First Name</label>
        <input
          className="border-2 w-100"
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="Enter First Name"
        />

        <label>Enter Last Name</label>
        <input
          className="border-2 w-100"
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Enter Last Name"
        />

        <label>Enter Your Email</label>
        <input
          className="border-2 w-100"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        <label>Enter Password</label>
        <input
          className="border-2 w-100"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />

        <label>Confirm Password</label>
        <input
          className="border-2 w-100"
          type="password"
          name="confirmPassword"
          value={form.confirmPaassword}
          onChange={handleChange}
          placeholder="ConfirmPassword"
        />

        <button className="border-2 w-100 cursor-pointer" type="submit">
          Submit
        </button>
      </form>

    {/* Show backend response */}

    {response&&(
        <div>
            <h2>response from backend</h2>
            <pre>{JSON.stringify(response,null,2)}</pre>
        </div>
    )
    }

    </div>
  );
};

export default Form;
