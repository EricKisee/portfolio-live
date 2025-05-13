import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  verificationLink: string;
  newsletterLink: string;
  servicesLink: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  verificationLink,
  newsletterLink,
  servicesLink,
}) => (
  <div
    style={{
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9f9f9',
      padding: '20px',
      color: '#333',
    }}
  >
    <div
      style={{
        backgroundColor: '#ffffff',
        maxWidth: '600px',
        margin: 'auto',
        borderRadius: '10px',
        padding: '30px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      }}
    >
      <h1 style={{ color: '#2b7a78' }}>Welcome to My Digital Home!</h1>

      <p>Hi {firstName} 👋,</p>

      <p>
        Thanks for reaching out! I&apos;m <strong>Eric</strong>, your future partner in building sleek,
        scalable, and smart software solutions. Whether you need stunning frontends, powerful
        backends, or full-stack magic — you’ve landed in the right place.
      </p>

      <p>
        I also specialize in software testing and QA to ensure your product is bulletproof, and I
        offer cloud engineering & consultation to make your infrastructure future-ready.
      </p>

      <p>
        🎁 <strong>Limited-Time Offer:</strong> Get <strong>15% off</strong> your first project with
        me — just mention this email!
      </p>

      <p>
        Before we dive in, please{' '}
        <a href={verificationLink} style={{ color: '#3aafa9' }}>
          verify your email address
        </a>{' '}
        so I know it’s really you.
      </p>

      <p>
        Want updates and insights from the tech world?{' '}
        <a href={newsletterLink} style={{ color: '#3aafa9' }}>
          Subscribe to my newsletter
        </a>
        .
      </p>

      <a
        href={servicesLink}
        style={{
          backgroundColor: '#3aafa9',
          color: '#fff',
          padding: '12px 20px',
          textDecoration: 'none',
          borderRadius: '5px',
          display: 'inline-block',
          marginTop: '20px',
        }}
      >
        Explore My Services
      </a>

      <div
        style={{
          marginTop: '40px',
          fontSize: '13px',
          textAlign: 'center',
          color: '#888',
        }}
      >
        <p>Follow me for tech tips & project showcases:</p>
        <div>
          <a href="https://twitter.com/yourhandle" style={{ margin: '0 10px', color: '#3aafa9' }}>
            Twitter
          </a>
          |
          <a href="https://github.com/yourhandle" style={{ margin: '0 10px', color: '#3aafa9' }}>
            GitHub
          </a>
          |
          <a href="https://linkedin.com/in/yourhandle" style={{ margin: '0 10px', color: '#3aafa9' }}>
            LinkedIn
          </a>
        </div>
        <p>Let’s build something amazing!</p>
      </div>
    </div>
  </div>
);
