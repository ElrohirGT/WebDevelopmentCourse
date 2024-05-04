import WrapPromise from "src/utils/promiseWrapper";
import "./BlogDetailsView.css";
import { Suspense } from "react";
import Markdown from "react-markdown";
import { getBlogContent } from "src/dataAccess";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { stackoverflowDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import remarkGfm from "remark-gfm";
import { lambdaThrows } from "src/utils/general";

/**
	* @typedef {Object} BlogDetailsViewProps
	* @property {import('../../dataAccess').BlogPreview} blogPreview
	* @property {(newContent: string)=>void} navigateToUpdateBlogForm
	* @property {()=>void} navigateToMainView
	* @property {string} loginToken
	*/

/**
 * @param {BlogDetailsViewProps} props
 */
export default function BlogDetailsView({ blogPreview, navigateToMainView, loginToken, navigateToUpdateBlogForm }) {
	if (!blogPreview) {
		navigateToMainView();
	}

	const { title, published, banner, id } = blogPreview;
	const contentResource = WrapPromise(getBlogContent(id));
	const onEditClick = () => {
		if (!lambdaThrows(contentResource.read)) {
			navigateToUpdateBlogForm(contentResource.read())
		}
	}

	return (
		<div className="BlogDetailsContainer">
			<div className="DetailsHeader">
				<button className="PrimaryButton" type="button" onClick={navigateToMainView}>Main Menu</button>
				<h3>{new Date(published).toLocaleString()} - {title}</h3>
				{loginToken === null ?
					null
					:
					<button className="PrimaryButton" type="button" onClick={onEditClick}>Edit</button>
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

	return <Markdown
		children={blogContent}
		remarkPlugins={[remarkGfm]}
		components={{
			code(props) {
				const { children, className, node, ...rest } = props
				const match = /language-(\w+)/.exec(className || '')
				return match ? (
					<SyntaxHighlighter
						{...rest}
						PreTag="div"
						children={`${children}`}
						language={match[1]}
						style={stackoverflowDark}
					/>
				) : (
					<code {...rest} className={className}>
						{children}
					</code>
				)
			}
		}}
	/>
}
