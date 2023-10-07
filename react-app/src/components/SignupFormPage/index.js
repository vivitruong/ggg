import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import { Link, NavLink } from "react-router-dom";
import { useModal } from "../../context/Modal";


function SignupFormPage() {
  const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState('')
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();
  const user = useSelector(state => state.session.user);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const regex = RegExp(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
  );
  if (user) {
    return <Redirect to='/' />;
  }

// 	const handleSubmit = async (e) => {
//     e.preventDefault();
// 		if (password === confirmPassword) {
//       console.log('Password:', password);
// console.log('Confirm Password:', confirmPassword);
//       const formData = new FormData();
//       formData.append('username', username);
//       formData.append('email', email);
//       formData.append('password', password);
//       formData.append('first_name', first_name);
//       formData.append('last_name', last_name);

//     try {
//       await dispatch(signUp(formData));
//     }
//     catch(err) {
//       console.error('Error:', err); // Log the error for debugging
//       setErrors(["An error occurred. Please try again."]);

//     }
//   }
// }
console.log(username , 'this is username')
const handleSubmit = async (e) => {
  e.preventDefault();
  if (password === confirmPassword) {
    const info = {
      username,
      email,
      password,
      first_name,
      last_name,
    };
    const data = await dispatch(signUp(info));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  } else {
    setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  }
};



	return (
		<>
    <div class='centered-container'>
			      <div class="title-bar loginmodal">
					<div class="title-bar-text">Sign Up</div>
					<div className="title-bar-controls">
					<button aria-label="Minimize" />
					<button aria-label="Maximize" />
					<button onClick={closeModal} aria-label="Close" />
					</div>
					</div>
					<div class="window-body">
      <form onSubmit={handleSubmit} className="input-login">
      {errors.length > 0 && (
          <div className="validation-errors">
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <img className="logo-login" src='https://goldeneragrooves.s3.us-east-2.amazonaws.com/windowPG.png' alt='login'/>
        <span style={{
            color: '#222222',
            textAlign: 'center',
            fontFamily: 'MS Sans Serif Bold',
            fontSize: '15px',
            fontStyle: 'normal',
            fontWeight: '600',
            lineHeight: '12px',

          }}>Golden Era Grooves</span>
        <div class="login-content">
        <div className='login-username login-info'>
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          </div>
        <div className='login-email login-info'>
          <input
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

        </div>

		  <div className='login-username login-info'>
          <input
            type="text"
            value={first_name}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          </div>
		  <div className='login-username login-info'>
          <input
            type="text"
            value={last_name}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          </div>
		  <div className='login-password login-info'>
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          </div>
		  <div className='login-passwordconfirm login-info'>
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required

          />
          </div>
        </div>
        <div className="down-login">
        <button type="submit">Sign Up</button>
        <div>
      {/* Use the Link component to navigate to the login page */}
      <Link to="/login">Already have an account? Login instead</Link>
    </div>

        </div>

      </form>
      </div>
      </div>
      </>
  );
}

export default SignupFormPage;
