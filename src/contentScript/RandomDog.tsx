import { useEffect, useState } from 'react';

function RandomDog() {
  const [dogSrc, setDogSrc] = useState<string | null>(null);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [containerHovered, setContainerHovered] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch('https://random.dog/woof')
      .then((response) => response.text())
      .then((data) => {
        setDogSrc(data);
        setLoading(false);
      });
  }, [refetch]);

  return (
    <div
      style={{
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '0.5rem',
        backgroundColor: 'rgb(43 44 47)',
        borderBottom: '1px solid rgb(32 33 36)',
        overflow: 'hidden',
        position: 'relative',
        maxHeight: 360,
      }}
      onMouseEnter={() => setContainerHovered(true)}
      onMouseLeave={() => setContainerHovered(false)}
    >
      {dogSrc?.includes('.mp4') ? (
        <video autoPlay loop muted style={{ objectFit: 'cover' }}>
          <source src={`https://random.dog/${dogSrc}`} type='video/mp4' />
        </video>
      ) : (
        <img
          src={`https://random.dog/${dogSrc}`}
          alt='Random dog'
          style={{ objectFit: 'cover' }}
        />
      )}
      <button
        onClick={() => {
          setRefetch((prev) => !prev);
        }}
        disabled={loading}
        style={{
          padding: '0.5rem 1rem',
          marginTop: '1rem',
          backgroundColor: 'rgb(32 33 36)',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          opacity: containerHovered ? 1 : 0,
          transition: 'opacity 0.2s',
          position: 'absolute',
          bottom: '1rem',
        }}
      >
        {loading ? 'Loading...' : 'New dog 🐶'}
      </button>
    </div>
  );
}

export default RandomDog;
