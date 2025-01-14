// async function generateMetadata({params}: { params: AsyncColumn }) {
//   const data = await params
// }

async function getPostDetail(id: number | string) {
  const response = await fetch(`http:localhost:3000/api/mentor-column/${id}`)
  return response.json()
}

export default async function Page({params}: { params: AsyncColumn }) {
  const { id } = await params
  const data = await getPostDetail(id)
  console.log(data)
  return (
      <div>
        <h1>MentorColumn</h1>
      </div>
  );
}