export default function Header({ title, subtitle, rightElement }: HeaderProps) {
  return (
    <div className="mb-7 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-[#d2d2d2]">{title}</h1>
        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
      </div>
      {rightElement && <div>{rightElement}</div>}
    </div>
  );
}
