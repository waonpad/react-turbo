import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useAuth } from '@/context/auth/use-auth';
import { Path, useNavigate } from '@/router';

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();

  const location = useLocation();
  const returnTo = new URLSearchParams(location.search).get('returnTo');

  const [email, setEmail] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const login = () => {
    auth.login(email);

    console.log('returnTo', returnTo);

    navigate((returnTo && (decodeURIComponent(returnTo) as Path)) || '/');
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex w-full max-w-screen-lg flex-col items-center justify-center lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
              exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="w-full max-w-sm rounded-lg shadow-2xl">
            <div className="p-8">
              <div className="mb-4">
                <label className="mb-2 block font-bold text-gray-700" htmlFor="email">
                  Email
                </label>
                <input
                  value={email}
                  onChange={handleChange}
                  type="text"
                  placeholder="email"
                  className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
                  id="email"
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block font-bold text-gray-700" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
                  id="password"
                />
                <label className="mt-2 block font-bold text-gray-700">
                  <a href="#" className="text-blue-500 hover:text-blue-700">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="flex justify-center">
                <button
                  className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                  onClick={() => login()}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
