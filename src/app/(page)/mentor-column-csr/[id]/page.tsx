'use client';
import { useEffect, useState } from "react";
import Image from "next/image";

async function getPostDetail(id: number | string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mentor-column/${id}`, {
      cache: "no-cache"
    });

    if (!response.ok) {
      return null; // 응답이 실패한 경우 null 반환
    }

    return response.json();
  } catch (e) {
    console.error('API 호출 중 에러 발생:', e);
    return null; // 에러 발생 시 null 반환
  }
}

export default function Page({ params } : { params: { id: number | string } }) {
  const { id } = params;
  const [data, setData] = useState<PostData>();

  useEffect(() => {
    const fetchData = async () => {
      const postData = await getPostDetail(id);
      setData(postData);
    };

    fetchData();
  }, [id]);

  if (!data) {
    return <div>로딩 중...</div>; // 데이터가 로딩 중일 때 표시할 내용
  }

  return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="w-full flex justify-center">
          <div className="relative w-10/12 h-[500px]">
            <Image
                src={data.mainImage}
                alt={data.title}
                fill
                quality={75}
                style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800">{data.title}</h2>
          <h3 className="text-lg text-gray-600 mt-2">{data.userType}: {data.name}</h3>
          <p className="text-gray-700 mt-4">{data.type} {data.creData}</p>
        </div>
      </div>
  );
}
