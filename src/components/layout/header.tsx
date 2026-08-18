import { getLastCommit } from "@/lib/github";
import Image from "next/image";
import { Github, Linkedin, Envelope } from "@boxicons/react";
import NavItem from "@/components/ui/nav-item";

export default async function Header() {
  const commit = await getLastCommit();

  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL ?? "#";
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "#";
  const email = process.env.NEXT_PUBLIC_EMAIL ?? "";

  return (
    <header className="flex items-center justify-between px-4 md:px-8 py-4 text-sm">
      <div className="flex flex-row items-start content-stretch justify-between grow md:justify-start gap-4">
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
            <NavItem
              href={githubUrl}
              ariaLabel="GitHub"
              icon={<Github className="w-5 h-5 fill-current shrink-0" />}
              external
            />
            <NavItem
              href={linkedinUrl}
              ariaLabel="LinkedIn"
              icon={<Linkedin className="w-5 h-5 fill-current shrink-0" />}
              external
            />
            <NavItem
              href={email ? `mailto:${email}` : "#"}
              ariaLabel="Email"
              icon={<Envelope className="w-5 h-5 fill-current shrink-0" />}
            />
          </div>
        </div>
      </div>

      {/* github commit info */}
      <div className="hidden md:flex flex-row items-center bg-pill p-1 rounded-full">
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
