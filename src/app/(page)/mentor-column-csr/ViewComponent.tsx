'use client';

import Image from "next/image";

export default function ViewComponent({data}: { data: PostData }) {
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
          <h3 className="text-lg text-gray-600 mt-2">
            {data.userType}: {data.name}
          </h3>
          <p className="text-gray-700 mt-4">
            {data.type} {data.creData}
          </p>
        </div>
      </div>
  );
}
