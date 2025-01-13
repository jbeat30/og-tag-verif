async function getMentorColumn() {
  const response = await fetch('http://localhost:3000/api/mentor-column')
  return response.json();
}

export default async function Page() {
  const data = await getMentorColumn();
  console.log(data);

  return (
      <div>
        <h1>MentorColumn</h1>
        <p>{data.message}</p>
      </div>
  );
}