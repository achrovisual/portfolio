import { getLastCommit } from "@/lib/github";
import { SiGithub } from "@icons-pack/react-simple-icons";
import Image from "next/image";

export default async function Header() {
  const commit = await getLastCommit();

  return (
    <header className="flex items-center justify-between px-8 py-4 text-sm">
      <div className="flex flex-row items-start content-stretch justify-start gap-4">
        {/* avatar */}
        <div className="flex flex-row items-center bg-pill p-1 rounded-full">
          <div className="flex flex-row items-center h-9 pl-1 justify-start content-stretch">
            <Image
              src="/avatar.png"
              alt="Gino"
              width={28}
              height={28}
              className="rounded-full"
            />
            <span className="font-medium px-4">Gino</span>
          </div>
        </div>

        {/* links */}
        <div className="flex flex-row items-center bg-pill p-1 rounded-full">
          <div className="flex flex-row items-center h-9 justify-start content-stretch">
            <a
              href="https://github.com/achrovisual"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex items-center justify-center w-9 h-9 rounded-full text-pill-text hover:bg-pill-hover transition-colors"
            >
              <SiGithub size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* github commit info */}
      <div className="flex flex-row items-center bg-pill p-1 rounded-full">
        <div className="flex items-center h-9 gap-2 px-3 font-mono text-xs text-pill-text">
          <span>{commit.sha}</span>
          <span>·</span>
          <span className="text-green-600">+{commit.additions}</span>
          <span className="text-red-500">-{commit.deletions}</span>
          <span>·</span>
          <span>{commit.relativeTime}</span>
        </div>
      </div>
    </header>
  );
}
