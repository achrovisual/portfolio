import { NextResponse } from "next/server";
import { headers } from "next/headers";
import logger from "@/lib/logger";

const GH_API_TOKEN = process.env.GH_API_TOKEN;
const GH_USERNAME = process.env.GH_USERNAME;

export interface DailyActivity {
  date: string;
  commitCount: number;
}

export async function fetchGitHubActivity(
  correlationId: string = "N/A"
): Promise<DailyActivity[]> {
  const githubLogger = logger.child({
    correlationId,
    module: "GitHubActivityFetcher",
  });

  githubLogger.info("Fetching GitHub activity (GraphQL)", {
    username: GH_USERNAME,
  });
  githubLogger.debug("Value of GH_API_TOKEN (first 5 chars):", {
    tokenPreview: GH_API_TOKEN ? GH_API_TOKEN.substring(0, 5) : "Not set",
  });

  if (!GH_USERNAME) {
    githubLogger.error(
      "ERROR: GH_USERNAME environment variable is missing or empty. Cannot fetch GitHub data."
    );
    return [];
  }
  if (!GH_API_TOKEN) {
    githubLogger.error(
      "ERROR: GH_API_TOKEN environment variable is missing or empty. Cannot fetch GitHub GraphQL data."
    );
    return [];
  }

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const oneYearAgo = new Date(today);
  oneYearAgo.setUTCDate(oneYearAgo.getUTCDate() - 365);

  const fromDate = oneYearAgo.toISOString();
  const toDate = today.toISOString();

  githubLogger.debug("GraphQL Query Range Start (UTC):", { fromDate });
  githubLogger.debug("GraphQL Query Range End (UTC):", { toDate });

  const query = `
    query UserContributions($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${GH_API_TOKEN}`,
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: JSON.stringify({
        query: query,
        variables: {
          username: GH_USERNAME,
          from: fromDate,
          to: toDate,
        },
      }),
      next: {
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      githubLogger.error(
        `GitHub GraphQL API error: ${response.status} - ${errorBody.substring(
          0,
          500
        )}...`,
        {
          status: response.status,
          statusText: response.statusText,
          responseBody: errorBody.substring(0, 500),
          username: GH_USERNAME,
        }
      );
      throw new Error(
        `Failed to fetch GitHub GraphQL contributions: ${
          response.statusText || "Unknown error"
        } - ${errorBody.substring(0, 500)}...`
      );
    }

    const data = await response.json();

    if (data.errors) {
      githubLogger.error("GitHub GraphQL API returned errors in data payload", {
        apiErrors: data.errors,
        username: GH_USERNAME,
      });
      throw new Error(
        `GitHub GraphQL API errors: ${JSON.stringify(data.errors)}`
      );
    }

    const dailyActivity: DailyActivity[] = [];
    const weeks =
      data.data.user.contributionsCollection.contributionCalendar.weeks;

    weeks.forEach((week: any) => {
      week.contributionDays.forEach((day: any) => {
        dailyActivity.push({
          date: day.date,
          commitCount: day.contributionCount,
        });
      });
    });

    dailyActivity.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const filledActivity: DailyActivity[] = [];
    let currentDate = new Date(oneYearAgo);
    currentDate.setUTCHours(0, 0, 0, 0);

    const activityMap = new Map<string, number>();
    dailyActivity.forEach((item) =>
      activityMap.set(item.date, item.commitCount)
    );

    while (currentDate.getTime() <= today.getTime()) {
      const dateString = currentDate.toISOString().split("T")[0];
      const commitCount = activityMap.get(dateString) || 0;
      filledActivity.push({ date: dateString, commitCount });
      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }

    githubLogger.info("GitHub activity fetched successfully", {
      dataLength: filledActivity.length,
      firstDate: filledActivity[0]?.date,
      lastDate: filledActivity[filledActivity.length - 1]?.date,
    });

    return filledActivity;
  } catch (error: any) {
    githubLogger.error("Unhandled error in fetchGitHubActivity", {
      error: error.message,
      stack: error.stack,
      username: GH_USERNAME,
    });
    throw error;
  }
}

export async function GET(request: Request) {
  const requestHeaders = headers();
  const correlationId = requestHeaders.get("x-correlation-id") || "N/A";
  const apiRouteLogger = logger.child({ correlationId, apiRoute: "GitHub" });

  apiRouteLogger.info("GitHub API route accessed");

  try {
    const activity = await fetchGitHubActivity(correlationId);
    return NextResponse.json(activity);
  } catch (error: any) {
    apiRouteLogger.error("Failed to fetch GitHub activity for API route", {
      error: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      { error: "Failed to retrieve GitHub activity", details: error.message },
      { status: 500 }
    );
  }
}
