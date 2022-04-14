import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Customer() {
  const { id } = useParams();
  const [obj, setObj] = useState(null);

  useEffect(() => {
    // TODO: get target data by id
    fetch('http://localhost:3001/customers')
      .then((res) => res.json())
      .then((items) => setObj(items.find((item) => item.id === id)));
  }, []);

  return (
    <>
      <div>id: {id}</div>
      <div>name: {obj ? obj.name : 'Loading...'}</div>
    </>
  );
}
