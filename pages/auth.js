import FirebaseAuth from '../components/FirebaseAuth'

const Auth = () => {
    return (
        <div>
        	<p style={{
                color: 'blue',
                textDecoration: 'underline',
                textAlign: 'center',
                fontSize: '40px',
                }}>
                Log In -/- Sign Up
            </p>
      		<div>
        		<FirebaseAuth />
      		</div>
    	</div>
    )
}

export default Auth