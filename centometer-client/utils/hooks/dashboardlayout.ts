import { Layouts } from "react-grid-layout";

export const defaultLayout : Layouts = {
    lg: [
        { i: "pinned_card", x: 0, y: 0, w: 12, h: 11, minH: 11, minW: 6, maxH: 11 },
        { i: "trending_symbols", x: 0, y: 0, w: 6, h: 23, minH: 23, minW: 3, maxH: 23 },
        { i: "market_screener", x: 6, y: 0, w: 6, h: 23, minH: 23, minW: 3, maxH: 23 },
        { i: "watchlist_news", x: 0, y: 0, w: 6, h: 15, minH: 15, minW: 3, maxH: 15 },
        { i: "business_news", x: 6, y: 0, w: 6, h: 15, minH: 15, minW: 3, maxH: 15 },
        { i: "world_news", x: 0, y: 0, w: 6, h: 15, minH: 15, minW: 3, maxH: 15 },
        { i: "heatmap", x: 6, y: 0, w: 6, h: 23, minH: 23, minW: 3, maxH: 23 },
    ],
    md: [
        { i: "pinned_card", x: 0, y: 0, w: 10, h: 11, minH: 11, minW: 5, maxH: 11 },
        { i: "trending_symbols", x: 0, y: 0, w: 5, h: 23, maxH: 23, minH: 23, minW: 5 },
        { i: "market_screener", x: 6, y: 0, w: 5, h: 23, maxH: 23, minH: 23, minW: 5 },
        { i: "watchlist_news", x: 0, y: 0, w: 5, h: 15, maxH: 15, minH: 15, minW: 5 },
        { i: "business_news", x: 6, y: 0, w: 5, h: 15, maxH: 15, minH: 15, minW: 5 },
        { i: "world_news", x: 0, y: 0, w: 5, h: 15, maxH: 15, minH: 15, minW: 5 },
        { i: "heatmap", x: 6, y: 0, w: 5, h: 23, maxH: 23, minH: 23, minW: 5 },
    ],
    sm: [
        { i: "pinned_card", x: 0, y: 0, w: 6, h: 12, static: true },
        { i: "trending_symbols", x: 0, y: 0, w: 6, h: 23, maxH: 23, minH: 23, minW: 6 },
        { i: "market_screener", x: 6, y: 0, w: 6, h: 23, maxH: 23, minH: 23, minW: 6 },
        { i: "watchlist_news", x: 0, y: 0, w: 6, h: 15, maxH: 15, minH: 15, minW: 6 },
        { i: "business_news", x: 6, y: 0, w: 6, h: 15, maxH: 15, minH: 15, minW: 6 },
        { i: "world_news", x: 0, y: 0, w: 6, h: 15, maxH: 15, minH: 15, minW: 6 },
        { i: "heatmap", x: 6, y: 0, w: 6, h: 23, maxH: 23, minH: 23, minW: 6 },
    ],
}

export function loadLayout(){

    if(typeof window !== "undefined" && localStorage){
        const userLayout = localStorage.getItem('user_layout')
        return userLayout ? JSON.parse(userLayout) : null;
    }

    return defaultLayout

}

export function saveLayout(newLayout:Layouts){
    if (localStorage) {
        localStorage.setItem("user_layout",JSON.stringify(newLayout)
        );
    }
}