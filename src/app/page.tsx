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

  const skillsData = [
    { title: "Amazon Web Services", icon: "simple-icons:amazon" },
    { title: "Proxmox", icon: "simple-icons:proxmox" },
    { title: "K3s", icon: "simple-icons:k3s" },
    { title: "Helm", icon: "simple-icons:helm" },
    { title: "Argo CD", icon: "simple-icons:argo" },
    { title: "Docker", icon: "simple-icons:docker" },
    { title: "NGINX", icon: "simple-icons:nginx" },
    { title: "Terraform", icon: "simple-icons:terraform" },
    { title: "Tailscale", icon: "simple-icons:tailscale" },
    { title: "Next.js", icon: "simple-icons:nextdotjs" },.
    { title: "Tailwind CSS", icon: "simple-icons:tailwindcss" },
    { title: "Django", icon: "simple-icons:django" },
    { title: "Figma", icon: "simple-icons:figma" },
    { title: "Sketch", icon: "simple-icons:sketch" },
    { title: "VS Code", icon: "simple-icons:visualstudiocode" },
    { title: "Git", icon: "simple-icons:git" },
    { title: "Jira", icon: "simple-icons:jira" },
    { title: "Confluence", icon: "simple-icons:confluence" },
    { title: "Notion", icon: "simple-icons:notion" },
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
    />
  );
}