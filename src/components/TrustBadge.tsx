const TrustBadge = () => {
    return (
        <a
            id="mlh-trust-badge"
            href="https://s3.amazonaws.com/logged-assets/trust-badge/2025/mlh-trust-badge-2025-black.svg"
            target="_blank"
            rel="noopener noreferrer"
            style={{
                display: 'block',
                maxWidth: '100px',
                minWidth: '60px',
                right: '50px',
                top: '0',
                width: '10%',
                zIndex: 10000,
            }}
        >
            <img
                src="https://s3.amazonaws.com/logged-assets/trust-badge/2025/mlh-trust-badge-2025-white.svg"
                alt="Major League Hacking 2025 Hackathon Season"
                style={{ width: '100%' }}
            />
        </a>
    );
};

export default TrustBadge;
