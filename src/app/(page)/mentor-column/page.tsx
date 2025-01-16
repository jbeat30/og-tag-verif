import Link from "next/link";
import Image from "next/image";
import {Metadata} from "next";
import {notFound} from "next/navigation";

export const dynamic = "force-dynamic"

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

const defaultMetadata: Metadata = {
  title: "멘토컬럼 목록",
  description: "멘토컬럼의 카드 목록을 볼 수 있습니다.",
  keywords: "멘토컬럼, 카드 목록, 멘토링 정보, 멘토링 카드",
  openGraph: {
    title: "멘토컬럼 목록",
    description: "멘토컬럼의 카드 목록을 볼 수 있습니다.",
    type: "website",
    locale: "ko_KR",
    siteName: "멘토컬럼",
  }
}

async function getMentorColumn() {
  try {
    const response = await fetch(`${process.env.API_URL}/mentor-column`, {
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

export async function generateMetadata(props: {
  searchParams: SearchParams
}):Promise<Metadata> {
  const searchParams = await props.searchParams
  const id = searchParams.id

  const data = await getMentorColumn();
  const target = data.find((post:PostData)=> post.id == id)

  if (!target) {
    return defaultMetadata
  }

  const title = target.title || defaultMetadata.title
  const descriptionValue = target.type && `멘토 컬럼 상세 페이지에서 멘토링 정보를 확인할 수 있습니다. ${target.type} ${target.creData}` || defaultMetadata.description
  const keywords = target.type + ', 멘토컬럼, 카드 목록, 멘토링 정보, 멘토링 카드' || defaultMetadata.keywords

  return {
    title: title,
    description: descriptionValue,
    keywords: keywords,
    openGraph: {
      title: title,
      description: descriptionValue,
      type: 'website',
      locale: 'ko_KR',
      siteName: '멘토컬럼 목록 페이지',
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

export default async function Page() {
  const data = await getMentorColumn();

  if (!data) {
    notFound();
  }

  return (
      <section className="bg-gray-2 pb-10 pt-20 lg:pb-20 lg:pt-[120px]">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((post: PostData) => (
                <div key={post.id}
                     className="mb-10 overflow-hidden rounded-lg bg-white shadow-1 duration-300 hover:shadow-3">
                  <div className="relative w-full h-[220px]">
                    <Image
                        src={post.mainImage}
                        alt={post.title}
                        fill
                        quality={75}
                        style={{objectFit: 'cover'}}
                    />
                  </div>

                  <div className="p-6 text-center sm:p-7 md:p-5 xl:p-7">
                    <Link
                        className="mb-4 text-gray-700 block text-xl font-semibold hover:text-primary sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
                        href={`/mentor-column/${post.id}`}>{post.title}</Link>
                    <p className="text-gray-700 mb-4 text-base leading-relaxed">{post.type} {post.creData}</p>
                  </div>

                </div>
            ))}
          </div>
        </div>
      </section>
  );
}