import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100 p-4">
      <div className="text-center">
        <h1 className="mb-6 text-5xl font-bold text-gray-800">
          Welcome to MODN AI
        </h1>
        <p className="mb-8 text-xl text-gray-600">
          음성 인식 기능을 체험해보세요
        </p>
        <Link
          href="/voice-input"
          className="inline-block rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-blue-700 hover:shadow-xl"
        >
          음성 입력 데모 시작하기 →
        </Link>
      </div>
    </div>
  );
}
