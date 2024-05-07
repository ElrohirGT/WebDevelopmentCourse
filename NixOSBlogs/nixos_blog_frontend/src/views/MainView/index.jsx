import { Suspense } from "react";
import BlogList from "src/components/BlogList";
import FeaturedBlog from "src/components/FeaturedBlog";
import "./MainView.css";
import TitleBar from "src/components/TitleBar";

/**
 * @typedef {Object} MainViewProps
 * @property {()=>void} navigateToLogin
 * @property {string} loginToken
 * @property {import("src/utils/promiseWrapper").SuspenseResource<import("src/dataAccess").BlogPreview[]>} blogsPreviewsResource
 * @property {(blogId: number)=>void} navigateToBlogDetails
 * @property {()=>void} resetLoginToken
 */

/**
 * @param {MainViewProps} props
 */
export default function MainView(
  { navigateToLogin, navigateToBlogDetails, loginToken, blogsPreviewsResource, resetLoginToken },
) {
  return (
    <div className="MainViewContainer">
      <TitleBar navigateToLogin={navigateToLogin} loginToken={loginToken} resetLoginToken={resetLoginToken} />
      <Suspense fallback={<LoadingView />}>
        <h2 className="mainTitle">Most Recent</h2>
        <FeaturedBlog blogsResource={blogsPreviewsResource} navigateToBlogDetails={navigateToBlogDetails} />
        <h2 className="mainTitle">Historical</h2>
        <BlogList blogsResource={blogsPreviewsResource} navigateToBlogDetails={navigateToBlogDetails} />
      </Suspense>
    </div>
  );
}

function LoadingView() {
  return (
    <>
      <h1 className="mainTitle">Most Recent</h1>
      <img
        style={{
          width: "100%",
          height: "100vh",
        }}
      />
      <h1 className="mainTitle">Historical</h1>
      <div>
        <p>Loading...</p>
      </div>
    </>
  );
}
