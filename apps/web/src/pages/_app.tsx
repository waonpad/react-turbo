// import { Modals } from '@generouted/react-router';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';

import { ErrorFallback } from '@/components/elements/error-fallback';
import { SuspenseFallback } from '@/components/elements/suspense-fallback';
import { MainLayout } from '@/components/layout/main';
import { Guard } from '@/config/guards/auth/auth-guard';
import { AuthProvider } from '@/context/auth/auth-provider';
import { queryClient } from '@/lib/react-query';
import { ToastProvider } from '@/lib/react-toastify';
import { Link, useModals, useNavigate } from '@/router';

// import { Link, useModals, useNavigate, useParams } from '../router';
import { Modals } from '../routes';

export default function App() {
  const navigate = useNavigate();
  const modals = useModals();
  // const { id, pid } = useParams('/posts/:id/:pid?');

  // const a = () => navigate('/posts/:id', { params: { id: 'a' } });
  // const b = () => navigate('/posts/:id', { params: { id: '' } });
  // const c = () => navigate(-1);
  // const d = () => navigate('/posts/:id/deep', { params: { id: 'd' } });
  const e = () => navigate('/posts/:id/deep', { params: { id: 'e' } });

  return (
    <Suspense fallback={<SuspenseFallback />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <ToastProvider />
              <Guard>
                <MainLayout>
                  <section style={{ margin: 24 }}>
                    <header style={{ display: 'flex', gap: 24 }}>
                      <Link to="/">Home</Link>
                      <Link to={{ pathname: '/about' }}>About</Link>
                      <Link to="/posts">Posts</Link>
                      <Link to="/posts/:id/:pid?" params={{ id: '1', pid: '2' }}>
                        Posts by id/pid
                      </Link>
                      <Link to="/posts/:id" params={{ id: 'id' }}>
                        Posts by id
                      </Link>
                      <button onClick={() => modals.open('/modal')}>
                        Global modal at current route
                      </button>
                      <button onClick={() => modals.open('/modal', { at: '/about' })}>
                        Global modal at /about
                      </button>
                      <button onClick={e}>navigate to</button>
                    </header>
                    <main>
                      <Outlet />
                    </main>
                  </section>
                </MainLayout>
                <Modals />
              </Guard>
            </AuthProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </Suspense>
  );
}
