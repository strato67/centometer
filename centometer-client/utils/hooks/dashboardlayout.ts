"use client";

import { Layouts } from "react-grid-layout";
import { createClient } from "../supabase/client";

export type VisibleWidgets = {
  pinned_card: boolean;
  trending_symbols: boolean;
  market_screener: boolean;
  heatmap: boolean;
  watchlist_news: boolean;
  business_news: boolean;
  world_news: boolean;
};


export const defaultLayout: Layouts = {
  lg: [
    { i: "pinned_card", x: 0, y: 0, w: 12, h: 11, minH: 11, minW: 6, maxH: 11 },
    {
      i: "trending_symbols",
      x: 0,
      y: 0,
      w: 6,
      h: 23,
      minH: 23,
      minW: 3,
      maxH: 23,
    },
    {
      i: "market_screener",
      x: 6,
      y: 0,
      w: 6,
      h: 23,
      minH: 23,
      minW: 3,
      maxH: 23,
    },
    {
      i: "watchlist_news",
      x: 0,
      y: 0,
      w: 6,
      h: 15,
      minH: 15,
      minW: 3,
      maxH: 15,
    },
    {
      i: "business_news",
      x: 6,
      y: 0,
      w: 6,
      h: 15,
      minH: 15,
      minW: 3,
      maxH: 15,
    },
    { i: "world_news", x: 0, y: 0, w: 6, h: 15, minH: 15, minW: 3, maxH: 15 },
    { i: "heatmap", x: 6, y: 0, w: 6, h: 23, minH: 23, minW: 3, maxH: 23 },
  ],
  md: [
    { i: "pinned_card", x: 0, y: 0, w: 10, h: 11, minH: 11, minW: 5, maxH: 11 },
    {
      i: "trending_symbols",
      x: 0,
      y: 0,
      w: 5,
      h: 23,
      maxH: 23,
      minH: 23,
      minW: 5,
    },
    {
      i: "market_screener",
      x: 6,
      y: 0,
      w: 5,
      h: 23,
      maxH: 23,
      minH: 23,
      minW: 5,
    },
    {
      i: "watchlist_news",
      x: 0,
      y: 0,
      w: 5,
      h: 15,
      maxH: 15,
      minH: 15,
      minW: 5,
    },
    {
      i: "business_news",
      x: 6,
      y: 0,
      w: 5,
      h: 15,
      maxH: 15,
      minH: 15,
      minW: 5,
    },
    { i: "world_news", x: 0, y: 0, w: 5, h: 15, maxH: 15, minH: 15, minW: 5 },
    { i: "heatmap", x: 6, y: 0, w: 5, h: 23, maxH: 23, minH: 23, minW: 5 },
  ],
  sm: [
    { i: "pinned_card", x: 0, y: 0, w: 6, h: 12, static: true },
    {
      i: "trending_symbols",
      x: 0,
      y: 0,
      w: 6,
      h: 23,
      maxH: 23,
      minH: 23,
      minW: 6,
    },
    {
      i: "market_screener",
      x: 6,
      y: 0,
      w: 6,
      h: 23,
      maxH: 23,
      minH: 23,
      minW: 6,
    },
    {
      i: "watchlist_news",
      x: 0,
      y: 0,
      w: 6,
      h: 15,
      maxH: 15,
      minH: 15,
      minW: 6,
    },
    {
      i: "business_news",
      x: 6,
      y: 0,
      w: 6,
      h: 15,
      maxH: 15,
      minH: 15,
      minW: 6,
    },
    { i: "world_news", x: 0, y: 0, w: 6, h: 15, maxH: 15, minH: 15, minW: 6 },
    { i: "heatmap", x: 6, y: 0, w: 6, h: 23, maxH: 23, minH: 23, minW: 6 },
  ],
};

export const defaultCards: VisibleWidgets = {
  pinned_card: true,
  trending_symbols: true,
  market_screener: true,
  heatmap: true, 
  watchlist_news: true,
  business_news: true,
  world_news: true,
}

export async function loadLayout() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const user_id = user?.id;

  const { data, error } = await supabase
    .from("dashboard_config")
    .select("config")
    .eq("id", user_id);

  if (error || data.length === 0) {
    return defaultLayout;
  }

  const [user_config] = data;
  return user_config.config;
}

export async function saveLayout(newLayout: Layouts) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const user_id = user?.id;

  await supabase
    .from("dashboard_config")
    .upsert({ id: user_id, config: newLayout });
}

export type WidgetKeys =
  | "pinned_card"
  | "trending_symbols"
  | "market_screener"
  | "heatmap"
  | "watchlist_news"
  | "business_news"
  | "world_news";

  