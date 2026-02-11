export default function SkipToMain() {
  return (
    <a 
      href="#main-content" 
      className="skip-to-main"
      style={{
        position: 'absolute',
        left: '-9999px',
        zIndex: 999
      }}
      onFocus={(e) => {
        e.currentTarget.style.left = '0';
      }}
      onBlur={(e) => {
        e.currentTarget.style.left = '-9999px';
      }}
    >
      Skip to main content
    </a>
  );
}