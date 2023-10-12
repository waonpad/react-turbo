import { Link } from '@/router';

export const Loader = () => 'Route loader';
export const Action = () => 'Route action';
export const Catch = () => <div>Route errorrrrrr</div>;

export default function Home() {
  return (
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
    </header>
  );
}
