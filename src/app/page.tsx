import { Metadata } from "next";
import { fetchGalleryData, GalleryItem } from "../api/gallery/route";
import { fetchGitHubActivity, DailyActivity } from "../api/github/route";
import DynamicPageContent from "../components/DynamicPageContent";

import logger from "@/lib/logger";
import { getCorrelationId } from "@/lib/correlation";

export const metadata: Metadata = {
  title: "Home - Eugenio Pastoral",
};

export default async function Home() {
  const correlationId = await getCorrelationId();
  const pageLogger = logger.child({ correlationId, module: "HomePage" });

  pageLogger.info("Home page rendering started.");

  let myGalleryData: GalleryItem[] = [];
  let errorFetchingGalleryData: boolean = false;

  let gitActivityData: DailyActivity[] = [];
  let errorFetchingGitActivity: boolean = false;

  try {
    myGalleryData = await fetchGalleryData(correlationId);
    pageLogger.info("Gallery data fetched successfully for Home component.");
  } catch (error: any) {
    errorFetchingGalleryData = true;
    pageLogger.error("Failed to load gallery data in Home component", {
      error: error.message,
      stack: error.stack,
    });
  }

  try {
    gitActivityData = await fetchGitHubActivity(correlationId);
    pageLogger.info(
      "GitHub activity data fetched successfully for Home component."
    );
  } catch (error: any) {
    errorFetchingGitActivity = true;
    pageLogger.error("Failed to load GitHub activity data in Home component", {
      error: error.message,
      stack: error.stack,
    });
  }

  const notesData = [
    {
      id: "intro-to-devops",
      title: "An Intro to DevOps",
      date: "2024-07-25",
      summary:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      tags: ["DevOps", "Software Engineering"],
    },
    {
      id: "my-first-docker-container",
      title: "My First Docker Container",
      date: "2024-08-01",
      summary:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      tags: ["Docker", "Containerization", "DevOps"],
    },
    {
      id: "getting-started-with-nextjs",
      title: "Getting Started with Next.js",
      date: "2024-08-10",
      summary:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      content:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      tags: ["Next.js", "Web Development", "React"],
    },
  ];

  const skillsData = [
    // Cloud & DevOps
    { title: "Amazon Web Services", icon: "simple-icons:amazonwebservices" },
    { title: "Docker", icon: "simple-icons:docker" },
    { title: "K3s", icon: "simple-icons:k3s" },
    { title: "Helm", icon: "simple-icons:helm" },
    { title: "Argo CD", icon: "simple-icons:argo" },
    { title: "Terraform", icon: "simple-icons:terraform" },
    { title: "GitHub Actions", icon: "simple-icons:githubactions" },
    { title: "Proxmox", icon: "simple-icons:proxmox" },

    // Development & Scripting
    { title: "Next.js", icon: "simple-icons:nextdotjs" },
    { title: "Django", icon: "simple-icons:django" },
    { title: "Tailwind CSS", icon: "simple-icons:tailwindcss" },
    { title: "Bash", icon: "simple-icons:gnubash" },

    // Networking
    { title: "NGINX", icon: "simple-icons:nginx" },
    { title: "Cloudflare", icon: "simple-icons:cloudflare" },
    { title: "Tailscale", icon: "simple-icons:tailscale" },
    { title: "UniFi", icon: "simple-icons:ubiquiti" },
    { title: "MikroTik", icon: "simple-icons:mikrotik" },
    { title: "Omada", icon: "simple-icons:omadacloud" },

    // Tools & Collaboration
    { title: "Git", icon: "simple-icons:git" },
    { title: "VS Code", icon: "simple-icons:visualstudiocode" },
    { title: "Jira", icon: "simple-icons:jira" },
    { title: "Confluence", icon: "simple-icons:confluence" },
    { title: "Notion", icon: "simple-icons:notion" },
    { title: "Figma", icon: "simple-icons:figma" },
    { title: "Sketch", icon: "simple-icons:sketch" },
  ];

  const skillTags = [
    "Software Development",
    "System Architecture",
    "DevOps",
    "Cloud Computing",
    "Network Engineering",
    "Infrastructure Management",
    "UI/UX",
    "Cybersecurity",
  ];

  return (
    <DynamicPageContent
      galleryItemsData={myGalleryData}
      errorFetchingGalleryData={errorFetchingGalleryData}
      gitActivityData={gitActivityData}
      errorFetchingGitActivity={errorFetchingGitActivity}
      skillsData={skillsData}
      skillTags={skillTags}
      notesData={notesData}
    />
  );
}
