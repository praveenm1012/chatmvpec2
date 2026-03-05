import { useState } from 'react';
import type { CreateUserDto } from '../../types/auth.types';

interface LoginFormProps {
  onSubmit: (data: CreateUserDto) => Promise<void>;
  initialData?: Partial<CreateUserDto>;
  isLoading?: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginForm({ onSubmit, initialData, isLoading = false }: LoginFormProps) {
  const [email, setEmail] = useState(initialData?.email ?? '');
  const [password, setPassword] = useState(initialData?.password ?? '');
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    }

    return newErrors;
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(validate());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = { email: true, password: true };
    setTouched(allTouched);
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    await onSubmit({ email: email.trim(), password });
  };

  const fieldClass = (field: keyof FormErrors) =>
    `w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 transition-colors ${
      touched[field] && errors[field]
        ? 'border-red-400 focus:ring-red-300'
        : 'border-gray-300 focus:ring-indigo-300 focus:border-indigo-400'
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={() => handleBlur('email')}
          placeholder="you@example.com"
          className={fieldClass('email')}
          disabled={isLoading}
          autoComplete="email"
        />
        {touched.email && errors.email && (
          <p className="mt-1 text-xs text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onBlur={() => handleBlur('password')}
          placeholder="Enter your password"
          className={fieldClass('password')}
          disabled={isLoading}
          autoComplete="current-password"
        />
        {touched.password && errors.password && (
          <p className="mt-1 text-xs text-red-600">{errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-sm font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Signing in...
          </span>
        ) : (
          'Sign In'
        )}
      </button>
    </form>
  );
}
