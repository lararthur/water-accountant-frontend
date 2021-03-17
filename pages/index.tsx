import React, { useState } from 'react';

export default function Home() {
  const [isLoginForm, setisLoginForm] = useState(true);

  return (
    <div>
      <h1>Water Accountant</h1>

      <form>
        <input
          type="radio"
          id="login"
          name="formType"
          defaultChecked={isLoginForm}
          value={1}
          onChange={() => setisLoginForm(true)}
        />
        <input
          type="radio"
          id="register"
          name="formType"
          defaultChecked={!isLoginForm}
          value={0}
          onChange={() => setisLoginForm(false)}
        />
      </form>

      {isLoginForm ? (
        <form>
          <label htmlFor="email">
            E-mail
            <input type="email" id="email" />
          </label>
          <label htmlFor="password">
            Password
            <input type="password" id="password" />
          </label>

          <input type="button" value="Login" />
        </form>
      ) : (
        <form>
          <label htmlFor="email">
            E-mail
            <input type="email" id="email" />
          </label>
          <label htmlFor="password">
            Password
            <input type="password" id="password" />
          </label>
          <label htmlFor="confirm-password">
            Confirm Password
            <input type="password" id="confirm-password" />
          </label>

          <input type="button" value="Register" />
        </form>
      )}

    </div>
  );
}
