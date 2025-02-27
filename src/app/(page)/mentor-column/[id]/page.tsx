import Image from "next/image";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic"

async function getPostDetail(id: number | string) {
  try {
    const response = await fetch(`${process.env.API_URL}/mentor-column/${id}`,{
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

export async function generateMetadata({ params }: { params: AsyncColumn }) {
  const { id } = await params;
  const data = await getPostDetail(id);

  return {
    title: data.title,
    description: `멘토 컬럼 상세 페이지에서 멘토링 정보를 확인할 수 있습니다. ${data.type} ${data.creData}`,
    keywords: data.type + ', 멘토컬럼, 카드 목록, 멘토링 정보, 멘토링 카드',
    openGraph: {
      title: data.title,
      description: `멘토 컬럼 상세 페이지에서 멘토링 정보를 확인할 수 있습니다. ${data.type} ${data.creData}`,
      type: 'website',
      locale: 'ko_KR',
      siteName: '멘토컬럼 상세 페이지',
      images: [
        {
          url: data.mainImage,
          width: 800,
          height: 600,
          alt: data.title,
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: AsyncColumn }) {
  const { id } = await params;
  const data = await getPostDetail(id);

  if (!data) {
    notFound(); // 데이터가 없으면 notFound 호출
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