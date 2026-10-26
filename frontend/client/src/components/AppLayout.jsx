import { Link } from 'react-router-dom';

const AppLayout = ({ children }) => {
  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Courses', to: '/course' },
    { label: 'Create Course', to: '/create-course' },
    { label: 'Login', to: '/login' },
    { label: 'Sign In', to: '/signup' },
  ];

  return (
    <>
      <header className="site-header" style={{ padding: '16px 24px', background: '#1f2937', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ fontWeight: 700, fontSize: '1.25rem' }}>Learning Hub</div>
          <nav style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  background: 'rgba(255,255,255,0.08)',
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main>{children}</main>
    </>
  );
};

export default AppLayout;