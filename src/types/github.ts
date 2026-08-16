interface CommitInfo {
  sha: string;
  message: string;
  date: string;
  additions: number;
  deletions: number;
  relativeTime: string;
}

const FALLBACK: CommitInfo = {
  sha: "unknown",
  message: "",
  date: "",
  additions: 0,
  deletions: 0,
  relativeTime: "unavailable",
};
