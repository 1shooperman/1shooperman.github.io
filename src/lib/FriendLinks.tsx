export default function FriendLinks() {
  return (
    <div className="flex space-x-4">
      <a
        href="https://www.lindsaydareshoop.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 p-2 bg-gray-100 rounded hover:bg-gray-200 text-gray-800 hover:text-gray-900 h-[69px]"
      >
        <img
          src="/assets/lindsay.png"
          alt="Lindsay Dare Shoop, OLY logo"
          className="h-full w-auto max-h-full"
        />
        <span>Lindsay Dare Shoop, OLY</span>
      </a>

      <a
        href="https://wearekuzaa.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="space-x-2 p-2 bg-gray-100 rounded hover:bg-gray-200 text-gray-800 hover:text-gray-900 h-[69px]"
      >
        <img
          src="/assets/kuzaa.png"
          alt="Kuzaa logo"
          className="h-full w-auto max-h-full"
        />
      </a>

      <a
        href="https://inocula.novacove.ai/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 p-2 bg-gray-100 rounded hover:bg-gray-200 text-gray-800 hover:text-gray-900 h-[69px]"
      >
        <img
          src="/assets/novacove.png"
          alt="Novacove.ai logo"
          className="h-full w-auto max-h-full"
        />
        <span>Novacove.ai</span>
      </a>
    </div>
  );
}
