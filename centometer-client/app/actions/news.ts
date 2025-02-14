"use server";

import { createClient } from "@/utils/supabase/server";
import { google, GoogleGenerativeAIProviderMetadata } from "@ai-sdk/google";
import { generateText, streamText } from "ai";
import { createStreamableValue } from "ai/rsc";

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

export const getNewsSummary = async (symbol: string) => {
  const stream = createStreamableValue("");

  (async () => {
    const { textStream } = await streamText({
      model: google("gemini-2.0-flash-exp", {
        useSearchGrounding: true,
      }),
      prompt: `List 4 key points about the latest news on the ${symbol} stock symbol.`,
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
};
