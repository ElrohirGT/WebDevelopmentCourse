import WrapPromise, { WrapPromiseErrorMock, WrapPromisePrendingMock } from "src/utils/promiseWrapper";
import "./BlogDetailsView.css"
import { getBlogContent } from "src/dataAccess";
import { Suspense, useEffect, useState } from "react";


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
			<h1>{title}</h1>
			<p>{published}</p>
		</div>
		<Suspense fallback={<p>Loading content...</p>}>
			<BlogContentDisplay blogContentResource={contentResource} />
		</Suspense>
	</div>
}

function BlogContentDisplay({ blogContentResource }) {
	const blogContent = blogContentResource.read();
	return <p>{blogContent}</p>
}
