"use server";

import { NewsArticle } from "@/components/home/news-card";
import { createClient } from "@/utils/supabase/server";
import { google } from "@ai-sdk/google";
import { streamText, generateText, smoothStream } from "ai";
import { createStreamableValue } from "ai/rsc";
import { getUserPinnedStocks } from "./stock-info";

export type NewsType = "world" | "business" | "watchlist";

type NewsResponse = {
  data: NewsArticle[];
  LastEvaluatedKey?: string;
};

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

export const getNewsFeed = async (
  newsType: NewsType,
  lastKey?: string
): Promise<NewsArticle[] | NewsResponse> => {
  if (newsType === "watchlist") {
    return await getWatchlistNews();
  }
  const url: string =
    process.env.NEXT_PUBLIC_LAMBDA_SEARCH_URL +
    `news-service?type=${newsType}&page=${lastKey}`;
  const response = await fetch(url, {
    next: {
      revalidate: 3600,
    },
  });
  const json: NewsResponse = await response.json();
  return json;
};

const getWatchlistNews = async (): Promise<NewsArticle[]> => {
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

export const generateAIStreamSummary = async (prompt: string) => {
  const stream = createStreamableValue("");

  (async () => {
    const { textStream } = await streamText({
      model: google("gemini-2.0-flash-exp", {
        useSearchGrounding: true,
      }),
      prompt: prompt,
      experimental_transform: smoothStream()
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
}

export const generateAISummary = async (prompt:string) => {
  const {text} = await generateText({
    model: google("gemini-2.0-flash-exp", {
        useSearchGrounding: true,
      }),
    prompt: prompt

  })

  return text
}