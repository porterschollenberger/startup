import React from 'react';
import './Home.css';

function Home() {
    return (
        <main className="home-page">
            <div className="form-container">
                <div className="form-section">
                    <h2>Login</h2>
                    <form>
                        <label htmlFor="loginEmail">Email</label>
                        <input type="email" name="loginEmail" id="loginEmail" placeholder="example@email.com" required />
                        <label htmlFor="loginPassword">Password</label>
                        <input type="password" name="loginPassword" id="loginPassword" placeholder="Password" required />
                        <input type="submit" value="Login" />
                    </form>
                </div>
                <div className="form-section">
                    <h2>Register</h2>
                    <form>
                        <label htmlFor="registerEmail">Email</label>
                        <input type="email" name="registerEmail" id="registerEmail" placeholder="example@email.com" required />
                        <label htmlFor="registerPassword">Password</label>
                        <input type="password" name="registerPassword" id="registerPassword" placeholder="Password" required />
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" required />
                        <input type="submit" value="Register" />
                    </form>
                </div>
            </div>
        </main>
    );
}

export default Home;