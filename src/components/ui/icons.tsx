export function ChromeIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <line x1="21.17" x2="12" y1="8" y2="8" />
        <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
        <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
      </svg>
    )
  }

  export function YouTubeIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="currentColor"
      >
        <path d="M23.498 6.186a2.828 2.828 0 0 0-1.994-1.997C19.568 3.6 12 3.6 12 3.6s-7.567 0-9.504.589A2.828 2.828 0 0 0 .502 6.186C0 8.126 0 12 0 12s0 3.874.502 5.814a2.828 2.828 0 0 0 1.994 1.997C4.433 20.4 12 20.4 12 20.4s7.567 0 9.504-.589a2.828 2.828 0 0 0 1.994-1.997C24 15.874 24 12 24 12s0-3.874-.502-5.814zM9.546 15.569v-7.138L15.82 12l-6.274 3.569z" />
      </svg>
    );
  }