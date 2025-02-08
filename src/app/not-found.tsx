import Link from 'next/link';
import React from 'react';

const NotFound = () => {
  return (
    <section>
      <div>
        <p>Go back</p>
        <Link href="/login">Login</Link>;
      </div>
    </section>
  );
};

export default NotFound;
