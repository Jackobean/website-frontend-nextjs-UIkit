import Moment from "react-moment";
import ReactMarkdown from "react-markdown";

import Seo from "../../components/seo";
import Layout from "../../components/layout";
import NextJsCarousel from "../../components/react-carousel";
import EmblaCarousel from "../../components/embla-carousel";

import { fetchAPI } from "../../lib/api";
import { getStrapiMedia } from "../../lib/media";

const Article = ({ article, categories }) => {
  const imageUrl = getStrapiMedia(article.attributes.image);
  // const imagesUrls = getStrapiMedia(article.attributes.images);
  console.log(article.attributes);
  const seo = {
    metaTitle: article.attributes.title,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.image,
    article: true,
  };

  return (
    <Layout categories={categories.data}>
      <Seo seo={seo} />
      <div
        id="banner"
        className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
        data-src={imageUrl}
        data-srcset={imageUrl}
        data-uk-img
      >
        <h1>{article.attributes.title}</h1>
      </div>
      <div className="uk-section">

        <div className="uk-container uk-container-large uk-text-justify">
          <EmblaCarousel images={article.attributes.images}></EmblaCarousel>
          <h3>{article.attributes.title}</h3>
          <ReactMarkdown>{article.attributes.content}</ReactMarkdown>
          <hr className="uk-divider-small uk-text-center" />
          <div className="uk-grid-small uk-flex-left" data-uk-grid="true">

          </div>
        </div>
      </div>
    </Layout >
  );
};

export async function getStaticPaths() {
  const articlesRes = await fetchAPI("/articles", { fields: ["slug"] });

  return {
    paths: articlesRes.data.map((article) => ({
      params: {
        slug: article.attributes.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const articlesRes = await fetchAPI("/articles", {
    filters: {
      slug: params.slug,
    },
    populate: ["image", "category", "images"],
  });
  const categoriesRes = await fetchAPI("/categories");

  return {
    props: { article: articlesRes.data[0], categories: categoriesRes },
    revalidate: 1,
  };
}

export default Article;