'use client';
import {useState, useEffect} from "react";

export default function Page() {
  const [data, setData] = useState<PostData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mentor-column`, {
          cache: "no-cache",
        });

        if (!response.ok) {
          setData(null);
          return;
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Fetch error:', error);
        setData(null);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
      <div>
        <h1>csr입니다</h1>
        {data ? (
            <div className="dummy-data">{JSON.stringify(data)}</div>
        ) : (
            <p>데이터를 불러오는 중입니다...</p>
        )}
      </div>
  );
}
