import { Banner } from "./Banner";
import { News } from "./News";
import { RecommendedBooks } from "./RecommendedBooks";
import { TrendingBooks } from "./TrendingBooks";

export const Home = () => {
  return (
    <>
      <Banner />
      <TrendingBooks />
      <RecommendedBooks />
      <News />
    </>
  );
};
