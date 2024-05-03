import WrapPromise from "src/utils/promiseWrapper";
import "./BlogDetailsView.css"
import { getBlogContent } from "src/dataAccess";
import { Suspense, useEffect, useState } from "react";
import Markdown from "react-markdown";


/**
	* @param {Object} props 
	* @param {import('../../dataAccess').BlogPreview} props.blogPreview 
	* @param {()=>void} navigateToMainView
	*/
export default function BlogDetailsView({ blogPreview, navigateToMainView }) {
	if (!blogPreview) {
		navigateToMainView()
	}

	const { title, published, banner, id } = blogPreview;
	const contentResource = WrapPromise(getBlogContent(id))

	return <div className='BlogDetailsContainer'>
		<div className='DetailsHeader'>
			<button className="PrimaryButton" type="button" onClick={navigateToMainView}>Main Menu</button>
			<h3>{new Date(published).toLocaleString()}</h3>
			<button className="PrimaryButton" type="button">Edit</button>
		</div>
		<img src={banner} />
		<Suspense fallback={<p>Loading content...</p>}>
			<BlogContentDisplay blogContentResource={contentResource} />
		</Suspense>
	</div>
}

function BlogContentDisplay({ blogContentResource }) {
	const blogContent = blogContentResource.read();
	return <Markdown>{blogContent}</Markdown>
}
