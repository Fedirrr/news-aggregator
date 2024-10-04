import { path } from "../components/constants";

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (!dateString) return "";
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString();
};

export const getNytImageUrl = (articles, articleSource) => {
    if (articles?.urlToImage) return articles.urlToImage;
    if (articleSource === "nyt") {
        const [selectedImage] = articles || [];
        return selectedImage ? `${path.image.main}${selectedImage.url}` : path.image.NYT;
    }

    return path.image.guardian;
};

export const mapArticleSource = (article) => {
    if (article.id) return "guardian"
    if (article._id) return "nyt"
    return "newsApi"
}
