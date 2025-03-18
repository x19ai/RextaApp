const Pumpfun = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="rotate(45, 12, 12)">
        <path
          d="M14 1.5c-3.6 0-6.5 2.9-6.5 6.5v8c0 3.6 2.9 6.5 6.5 6.5s6.5-2.9 6.5-6.5V8c0-3.6-2.9-6.5-6.5-6.5z"
          className="fill-transparent stroke-current"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M14 1.5c-3.6 0-6.5 2.9-6.5 6.5v8c0 3.6 2.9 6.5 6.5 6.5s6.5-2.9 6.5-6.5V8c0-3.6-2.9-6.5-6.5-6.5z"
          className="fill-current stroke-none"
          clipPath="inset(0 0 50% 0)"
        />
      </g>
    </svg>
  );
};

export default Pumpfun; 