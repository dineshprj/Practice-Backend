import React, { useState } from "react";

const Form = () => {
  const [form, setform] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPaassword: "",
  });

  const [response, setresponse] = useState([]);

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
      const res = await fetch("http://localhost:3000/formdata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setresponse((prev)=>[...prev,data]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
   <div className="min-h-screen bg-rose-800 p-6">

  <h1 className="bg-amber-500 text-center text-3xl font-bold py-4 rounded mb-6">
    Fill Your Application
  </h1>

  <div className="flex gap-6">

    {/* LEFT SIDE - FORM */}
    <div className="w-1/2 bg-white p-6 rounded-xl shadow-lg">

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <h3 className="text-xl font-semibold text-center">User Data</h3>

        <label>Enter First Name</label>
        <input
          className="border p-2 rounded"
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="Enter First Name"
        />

        <label>Enter Last Name</label>
        <input
          className="border p-2 rounded"
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Enter Last Name"
        />

        <label>Enter Your Email</label>
        <input
          className="border p-2 rounded"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        <label>Enter Password</label>
        <input
          className="border p-2 rounded"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />

        <label>Confirm Password</label>
        <input
          className="border p-2 rounded"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
        />

        <button
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          type="submit"
        >
          Submit
        </button>

      </form>
    </div>

    {/* RIGHT SIDE - DATA */}
    <div className="w-1/2 bg-white p-6 rounded-xl shadow-lg overflow-y-auto max-h-[500px]">

      <h2 className="text-xl font-semibold mb-4 text-center">Submitted Data</h2>

      {response.length === 0 ? (
        <p className="text-gray-500 text-center">No data yet</p>
      ) : (
        response.map((item, index) => (
          <div key={index} className="border p-4 mb-3 rounded shadow-sm">
            <h3 className="font-bold">User {index + 1}</h3>
            <p>Name: {item.data.firstName} {item.data.lastName}</p>
            <p>Email: {item.data.email}</p>
          </div>
        ))
      )}

    </div>

  </div>
</div>
  );
};

export default Form;
