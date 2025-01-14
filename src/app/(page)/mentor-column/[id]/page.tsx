import Image from "next/image";

async function getPostDetail(id: number | string) {
  const response = await fetch(`http:localhost:3000/api/mentor-column/${id}`)
  return response.json()
}

export async function generateMetadata({params}: { params: AsyncColumn }) {
  const { id } = await params
  const data = await getPostDetail(id)
  return {
    title: data.title,
    description: '멘토 컬럼 상세 페이지에서 멘토링 정보를 확인할 수 있습니다.',
    keywords: data.type + ', 멘토컬럼, 카드 목록, 멘토링 정보, 멘토링 카드',
  }
}

export default async function Page({params}: { params: AsyncColumn }) {
  const { id } = await params
  const data = await getPostDetail(id)
  return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="w-full flex justify-center">
          <div className="relative w-10/12 h-[500px]">
            <Image
                src={data.mainImage}
                alt={data.title}
                fill
                quality={75}
                style={{objectFit: 'cover'}}
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