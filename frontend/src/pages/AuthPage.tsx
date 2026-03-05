import { useState } from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import LoginForm from '../components/auth/LoginForm';
import * as api from '../api/auth.api';
import type { CreateUserDto } from '../types/auth.types';

type AuthMode = 'login' | 'register';

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (data: CreateUserDto) => {
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const response = await api.login(data);
      localStorage.setItem('accessToken', response.accessToken);
      setSuccessMessage('Login successful! Redirecting...');
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Login failed. Please try again.';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: CreateUserDto) => {
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      await api.register(data);
      setSuccessMessage('Registration successful! You can now log in.');
      setMode('login');
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Registration failed. Please try again.';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome</h1>
          <p className="mt-2 text-gray-600">
            {mode === 'login' ? 'Sign in to your account' : 'Create a new account'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="flex rounded-lg overflow-hidden border border-gray-200 mb-6">
            <button
              onClick={() => { setMode('login'); setErrorMessage(null); setSuccessMessage(null); }}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                mode === 'login'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('register'); setErrorMessage(null); setSuccessMessage(null); }}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                mode === 'register'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Register
            </button>
          </div>

          {successMessage && (
            <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
              {errorMessage}
            </div>
          )}

          {mode === 'login' ? (
            <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
          ) : (
            <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
          )}
        </div>

        <p className="text-center mt-4 text-sm text-gray-500">
          {mode === 'login' ? (
            <>
              Don&apos;t have an account?{' '}
              <button
                onClick={() => { setMode('register'); setErrorMessage(null); setSuccessMessage(null); }}
                className="text-indigo-600 hover:underline font-medium"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                onClick={() => { setMode('login'); setErrorMessage(null); setSuccessMessage(null); }}
                className="text-indigo-600 hover:underline font-medium"
              >
                Sign In
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
