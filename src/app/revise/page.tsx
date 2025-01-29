import ReviseBoard from "./revise-board";

export default async function Home() {
  return (
    <div className="flex flex-col items-center py-8 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center h-full w-full">
        <h1>Revise</h1>
        <ReviseBoard />
      </main>
    </div>
  );
}
