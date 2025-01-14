declare global {
  type AsyncColumn = Promise<{ id: number | string }>;

  interface PostData {
    id: number;
    name: string;
    title: string;
    user_type: string;
    content: string;
    thumbnail: string;
    mainImage: string;
  }
}

// 이 파일이 전역 모듈임을 나타내기 위해 빈 export 문 추가
export {};