import { useState, useRef } from "react";

export default function FilePreviewer() {
	// FIles States
	const [imagePreview, setImagePreview] = useState(null);
	const [videoPreview, setVideoPreview] = useState(null);

	// FIle Picker Ref because we are not useing the standard File picker input
	const filePicekerRef = useRef(null);

	function previewFile(e) {
		// Reading New File (open file Picker Box)
		const reader = new FileReader();

		// Gettting Selected File (user can select multiple but we are choosing only one)
		const selectedFile = e.target.files[0];
		if (selectedFile) {
			reader.readAsDataURL(selectedFile);
		}

		// As the File loaded then set the stage as per the file type
		reader.onload = (readerEvent) => {
			if (selectedFile.type.includes("image")) {
				setImagePreview(readerEvent.target.result);
			} else if (selectedFile.type.includes("video")) {
				setVideoPreview(readerEvent.target.result);
			}
		};
	}

	function clearFiles() {
		setImagePreview(null);
		setVideoPreview(null);
	}

	return (
		<div class="container">
			<h3 class = 'title'>
				Select file to upload:
			</h3>

			<div>
				<input
					ref={filePicekerRef}
					accept="image/*, video/*"
					onChange={previewFile}
					type="file"
					hidden
					required
				/>
				<button className="btn" onClick={() => filePicekerRef.current.click()}>
					CHOOSE VIDEO FILE
				</button>
				{(imagePreview || videoPreview) && (
					<button className="btn btn-danger" onClick={clearFiles}
					style={{
						backgroundColor: 'red',
					}}
					>
						clear
					</button>
				)}
			</div>
			<div className="preview">
				{imagePreview != null && <img src={imagePreview} alt="" />}
				{videoPreview != null && <video controls src={videoPreview}></video>}
			</div>
			<br/>
				<table className="table">
					<tr>
						<td>
							<label for="name">NAME :</label>
						</td>
						<td>
							<input 
							type="text" 
							required 
							name="name"
							style={{
								width: '80%'
							}}
							/>
						</td>
					</tr>
					<tr>
						<td>
						<label for="name">DESCRIPTION :</label>
						</td>
						<td>
							<textarea 
							required 
							name="description"
							style={
								{
									height: '100px',
									width: '80%'
								}
							}
							>
							</textarea>
						</td>
					</tr>
					<tr>
						<td>
							VIDEO VISIBILITY :
						</td>
						<td>
							<input type="radio" id="public" name="age" value="public" required />
							<label for="public"> Public</label><br/>
							<input type="radio" id="private" name="age" value="private" />
							<label for="private"> Private</label><br/>  
							<input type="radio" id="unlisted" name="age" value="unlisted" />
							<label for="unlisted"> Unlisted</label><br/><br/>
						</td>
					</tr>
				</table>
				<input 
				className="btn" 
				type="submit" 
				style={{
					backgroundColor: 'gold'
				}}
				/>
				<br/><br/>
		</div>
	);
}
