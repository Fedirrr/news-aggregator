export const path = {
    newsApi: {
        main: "https://newsapi.org/v2",
        everything: "/everything",
        sources: "/top-headlines/sources",
    },
    NYT: {
        main: "https://api.nytimes.com/svc/search/v2",
        articleSearch: "/articlesearch.json",
    },
    guardian: {
        main: "https://content.guardianapis.com",
        search: "/search",
    },
    image: {
        main: "https://static01.nyt.com/",
        NYT: "https://www.pngkey.com/png/detail/385-3858875_nyt-logo-new-york-times-title.png",
        guardian: "https://logowik.com/content/uploads/images/the-guardian-new-20183613.logowik.com.webp",
    }
}

export const NYTApiKey = "k6snHqyQxfZ81rGL6H7tKLdgZumwj9QX";
export const newsApiKey = "16a87a9dc0794997a589c6bf540fa923";
export const guardianApiKey = "ca115ca2-d563-417d-b2de-7d290400a54d";
// All api keys will be moved to a .env file in a real project
