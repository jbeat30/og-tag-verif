'use client';
import {useState, useEffect} from "react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const [data, setData] = useState<PostData[] | null>(null);

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
        ) : (
            <p>데이터를 불러오는 중입니다...</p>
        )}
      </div>
  );
}
