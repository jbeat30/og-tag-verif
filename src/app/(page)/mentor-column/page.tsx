import Link from "next/link";

async function getMentorColumn() {
  const response = await fetch('http://localhost:3000/api/mentor-column');
  return response.json();
}

export default async function Page() {
  const data = await getMentorColumn();

  return (
      <div>
        <h1>MentorColumn</h1>
        <div className="flex gap-4">
          {data.map((post:PostData) => (
              <div key={post.id} className="bg-slate-500 p-4">
                <Link href={`mentor-column/${post.id}`}>{post.title}</Link>
                <p>{post.content}</p>
              </div>
          ))}
        </div>
      </div>
  );
}