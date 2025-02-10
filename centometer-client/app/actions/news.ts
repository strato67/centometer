"use server";

import { createClient } from "@/utils/supabase/server";

export type NewsType = "world" | "business" | "watchlist";

export const getCardNews = async (newsType: NewsType) => {
  if (newsType === "watchlist") {
    return await getWatchlistNews();
  }

  const url: string =
    process.env.NEXT_PUBLIC_LAMBDA_SEARCH_URL + `news-service?type=${newsType}`;
  const response = await fetch(url, {
    next: {
      revalidate: 3600,
    },
  });
  if (!response.ok) {
    return [];
  }
  const json = await response.json();
  return json.data;
};

const getWatchlistNews = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const user_id = user?.id;
  const url: string =
    process.env.NEXT_PUBLIC_LAMBDA_SEARCH_URL +
    `news-service?type=pinned&id=${user_id}`;

  const response = await fetch(url, {
    next: {
      revalidate: 3600,
    },
  });
  if (!response.ok) {
    return [];
  }
  const json = await response.json();
  return json;
};

export const getStockNews = async (query: string) => {
  const url: string =
    process.env.NEXT_PUBLIC_LAMBDA_SEARCH_URL +
    `news-service?type=stock&symbol=${query}`;

  const response = await fetch(url, {
    next: {
      revalidate: 3600,
    },
  });
  if (!response.ok) {
    return [];
  }
  const json = await response.json();
  return json;
};
