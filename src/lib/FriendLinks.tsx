import Image from "next/image";

export default function FriendLinks() {
  return (
    <div className="flex gap-2">
      <a
        href="https://www.lindsaydareshoop.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center p-2 bg-gray-100 rounded hover:bg-gray-200 text-gray-800 hover:text-gray-900 h-[69px]"
      >
        <Image
          src="/assets/lindsay.png"
          alt="Lindsay Dare Shoop, OLY logo"
          height={69}
          width={69}
          className="h-full w-auto max-h-full"
        />
        <span className="ml-2 force-hide-sm">Lindsay Dare Shoop, OLY</span>
      </a>

      <a
        href="https://wearekuzaa.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center p-2 bg-gray-100 rounded hover:bg-gray-200 text-gray-800 hover:text-gray-900 h-[69px]"
      >
        <Image
          src="/assets/kuzaa.png"
          alt="Kuzaa logo"
          height={69}
          width={123}
          className="h-full w-auto max-h-full"
        />
      </a>

      <a
        href="https://inocula.novacove.ai/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center p-2 bg-gray-100 rounded hover:bg-gray-200 text-gray-800 hover:text-gray-900 h-[69px]"
      >
        <Image
          src="/assets/novacove.png"
          alt="Novacove.ai logo"
          height={55}
          width={59}
          className="h-full w-auto max-h-full"
        />
        <span className="ml-2 force-hide-sm">Novacove.ai</span>
      </a>
    </div>
  );
}
