import LoginForm from '../LoginForm';

export default function LoginFormExample() {
  return (
    <LoginForm onLogin={(email, password) => {
      console.log('Login submitted:', { email, password });
      alert(`Login attempt for: ${email}`);
    }} />
  );
}