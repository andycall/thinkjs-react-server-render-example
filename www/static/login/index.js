import React from 'react'

export default class Login extends React.Component {
    render() {
        return (
            <div class="module form-module">
                <div class="toggle"><i class="fa fa-times fa-pencil"></i>
                    <div class="tooltip">Click Me</div>
                </div>
                <div class="form">
                    <h2>Login to your account</h2>
                    <form>
                        <input type="text" placeholder="Username"/>
                        <input type="password" placeholder="Password"/>
                        <button>Login</button>
                    </form>
                </div>
                <div class="form">
                    <h2>Create an account</h2>
                    <form>
                        <input type="text" placeholder="Username"/>
                        <input type="password" placeholder="Password"/>
                        <input type="email" placeholder="Email Address"/>
                        <input type="tel" placeholder="Phone Number"/>
                        <button>Register</button>
                    </form>
                </div>
                <div class="cta"><a href="http://andytran.me">Forgot your password?</a></div>
            </div>
        )
    }
}