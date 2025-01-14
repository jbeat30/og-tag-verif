import Link from 'next/link'

export default function NotFound() {
  return (
      <div className="flex justify-center items-center w-screen min-h-screen flex-col gap-3 pb-5">
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <Link href="/mentor-column" className="text-gray-400">Return mentor-column</Link>
      </div>
  )
}