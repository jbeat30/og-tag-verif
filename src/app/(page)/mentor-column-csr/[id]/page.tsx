import ViewComponent from "@/app/(page)/mentor-column-csr/ViewComponent";
import {Suspense} from "react";

async function getPostDetail(id: number | string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mentor-column/${id}`, {
      cache: "no-cache",
    });

    if (!response.ok) {
      return null; // 응답 실패 시 null 반환
    }

    return response.json();
  } catch (e) {
    console.error("API 호출 중 에러 발생:", e);
    return null; // 에러 발생 시 null 반환
  }
}

export default async function Page({params}: { params: AsyncColumn }) {
  const {id} = await params;
  const data = await getPostDetail(id);

  if (!data) {
    return <div>데이터를 불러오는 중 문제가 발생했습니다.</div>;
  }

  return (
      <Suspense fallback={<div>로딩 중...</div>}>
        <ViewComponent data={data}/>;
      </Suspense>
  )
}
