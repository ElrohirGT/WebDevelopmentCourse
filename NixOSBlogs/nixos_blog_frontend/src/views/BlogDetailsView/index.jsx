import WrapPromise from "src/utils/promiseWrapper";
import "./BlogDetailsView.css";
import { Suspense } from "react";
import Markdown from "react-markdown";
import { getBlogContent } from "src/dataAccess";

/**
	* @typedef {Object} BlogDetailsViewProps
	* @property {import('../../dataAccess').BlogPreview} blogPreview
	* @property {()=>void} navigateToMainView
	* @property {string} loginToken
	*/

/**
 * @param {BlogDetailsViewProps} props
 */
export default function BlogDetailsView({ blogPreview, navigateToMainView, loginToken }) {
	if (!blogPreview) {
		navigateToMainView();
	}

	const { title, published, banner, id } = blogPreview;
	const contentResource = WrapPromise(getBlogContent(id));

	return (
		<div className="BlogDetailsContainer">
			<div className="DetailsHeader">
				<button className="PrimaryButton" type="button" onClick={navigateToMainView}>Main Menu</button>
				<h3>{new Date(published).toLocaleString()} - {title}</h3>
				{loginToken === null ?
					null
					:
					<button className="PrimaryButton" type="button">Edit</button>
				}
			</div>
			<img src={banner} />
			<Suspense fallback={<p>Loading content...</p>}>
				<BlogContentDisplay blogContentResource={contentResource} />
			</Suspense>
		</div>
	);
}

function BlogContentDisplay({ blogContentResource }) {
	const blogContent = blogContentResource.read();
	return <Markdown>{blogContent}</Markdown>;
}
