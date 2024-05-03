import { useState } from 'react';
import './BlogForm.css';
import { logError } from 'src/utils/general';

/**
	* @typedef {object} BlogData
	* @property {number} id
	* @property {string} title
	* @property {string} banner
	* @property {string} content
	*/

/**
	* @typedef {object} BlogFormProps
	* @property {BlogData} blogInfo
	* @property {(blog: BlogData)=>void} onSubmit
	*/

/**
	* @param {BlogFormProps} props
	*/
export default function BlogForm({ blogInfo, onSubmit }) {
	const [title, setTitle] = useState(blogInfo?.title ?? "");
	const [content, setContent] = useState(blogInfo?.content ?? "");
	const [banner, setBanner] = useState(blogInfo?.banner ?? "");
	const [canSubmit, setCanSubmit] = useState(true);

	const onSubmitForm = () => {
		if (!canSubmit) {
			return;
		}

		const id = blogInfo?.id ?? 0
		const formBlog = {
			id,
			title,
			banner,
			content,
		};
		onSubmit({ ...blogInfo, ...formBlog });
	};

	const contentPlaceholder = `
Contenido:
# Título del blog
Blog de ejemplo con un [link](www.google.com)
	`;

	return (
		<>
			<input
				type="text"
				placeholder="Título:"
				className='FormInput'
				defaultValue={blogInfo?.title ? blogInfo.title : ""}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<img
				src={banner}
				className='FormBanner'
				style={{
					height: banner ? "30vh" : "0px",
					alignSelf: "center",
					width: "auto",
					maxWidth: "100%",
				}}
			/>
			<input
				type="file"
				placeholder="Banner:"
				onChange={async (e) => {
					setCanSubmit(false);
					const file = e.target.files[0];
					const dataURL = await new Promise((res, rej) => {
						const reader = new FileReader();
						reader.onloadend = (_) => res(reader.result);
						reader.onerror = (e) => rej(e);
						reader.readAsDataURL(file);
					}).catch(
						logError("An error ocurred while retrieving banner binary data!"),
					);

					if (dataURL === undefined) {
						return;
					}

					setBanner(dataURL);
					setCanSubmit(true);
				}}
			/>
			<textarea
				style={{
					height: "10rem",
				}}
				className='FormInput'
				placeholder={contentPlaceholder}
				defaultValue={blogInfo?.content ? blogInfo.content : ""}
				onChange={(e) => setContent(e.target.value)}
			/>
			<button
				onClick={onSubmitForm}
				disabled={!canSubmit}
				className='PrimaryButton'
			>
				Subir
			</button>
		</>
	);
}
