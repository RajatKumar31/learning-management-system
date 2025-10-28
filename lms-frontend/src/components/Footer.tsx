import Link from "next/link";

export default function Footer() {
  return (
    <div className="bottom-0 mt-10 w-full bg-[#25262F] py-8 text-center text-sm text-white">
      <p>&copy; 2025 RAJAT. All Rights Reserved.</p>
      <div className="mt-2">
        {["About", "Privacy Policy", "Licensing", "Contact"].map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase().replace(" ", "-")}`}
            className="mx-2 text-[#b3b3fd]"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}
