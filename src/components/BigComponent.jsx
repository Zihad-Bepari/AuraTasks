import React from 'react';

function BigComponent() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
      <h2>This is a Big Component</h2>
      <p>
        Imagine this has lots of content, images, charts, or heavy UI elements.
      </p>
      <p>
        By lazy-loading this, we reduce the initial bundle size of our app.
      </p>
    </div>
  );
}

export default BigComponent;
