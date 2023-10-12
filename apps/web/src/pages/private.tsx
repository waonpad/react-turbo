import { useAuth } from '@/context/auth/use-auth';

export default function Private() {
  const auth = useAuth();

  console.log('auth', auth);

  return <h1>Private</h1>;
}
