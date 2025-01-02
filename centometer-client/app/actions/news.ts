"use server";

import { createClient } from "@/utils/supabase/server";

export type NewsType = "world" | "business" | "watchlist";

export const getCardNews = async (newsType: NewsType) => {
  let url: string = process.env.NEXT_PUBLIC_LAMBDA_SEARCH_URL!;

  if (newsType === "watchlist") {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const user_id = user?.id;

    url += `news-service?type=pinned&id=${user_id}`;
  } else {
    url += `news-service?type=${newsType}`;
  }

  const response = await fetch(url, {
    next: {
      revalidate: 3600,
    },
  });
  if (!response.ok) {
    return [];
  }
  const json = await response.json();
  return json.watchlist;
};
