export default function Layout({ children }: { children: React.ReactNode }) {
  let a;
  return (
    <div className="h-full w-full bg-[#1B1C22]">
      <main className="flex h-full w-full items-center justify-center">
        {children}
      </main>
    </div>
  );
}
