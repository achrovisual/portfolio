import type { CommitInfo } from "@/types/github";

const FALLBACK: CommitInfo = {
  sha: "unknown",
  message: "",
  date: "",
  additions: 0,
  deletions: 0,
  relativeTime: "unavailable",
};

export async function getLastCommit(): Promise<CommitInfo> {
  const username = process.env.GITHUB_USERNAME;
  const repo = process.env.GITHUB_REPO;

  if (!username || !repo) {
    console.warn(
      "GITHUB_USERNAME or GITHUB_REPO not set — using fallback commit info",
    );
    return FALLBACK;
  }

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": `${repo}-portfolio`,
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(
      `https://api.github.com/repos/${username}/${repo}/commits/main`,
      { headers },
    );

    if (!res.ok) {
      const body = await res.text();
      console.warn(`GitHub API returned ${res.status}: ${body}`);
      return FALLBACK;
    }

    const data = await res.json();

    return {
      sha: data.sha.slice(0, 7),
      message: data.commit.message,
      date: data.commit.committer.date,
      additions: data.stats?.additions ?? 0,
      deletions: data.stats?.deletions ?? 0,
      relativeTime: formatRelativeTime(data.commit.committer.date),
    };
  } catch (err) {
    console.warn("GitHub fetch failed — using fallback commit info", err);
    return FALLBACK;
  }
}

function formatRelativeTime(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diffMs / 86_400_000);
  if (days < 1) return "today";
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months > 1 ? "s" : ""} ago`;
}
