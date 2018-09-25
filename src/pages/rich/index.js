import React from 'react';
import {Card, Button, Modal} from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draft from 'draftjs-to-html';
export default class RichText extends React.Component {

	state = {
		showRichText:false,
		editorState:''
	}

	onEditorStateChange = (editorState)=>{
		this.setState({
			editorState,
		})
	}
	handleClearContent = ()=> {
		this.setState({
			editorState: '',
		})
	}

	handleGetContent = ()=> {
		this.setState({
			showRichText: true,
		})
	}

	onContentStateChange = (contentState)=> {
		this.setState({
			contentState
		})
	}



	render() {
		const {editorState} = this.state;

		return (
			<div>
				<Card>
					<Button type="primary" onClick={this.handleClearContent}>清空内容</Button>
					<Button type="primary" onClick={this.handleGetContent}>获取HTML文本</Button>
				</Card>
				<Card title="富文本编辑器">
					<Editor
						editorState={editorState}
						// toolbarClassName="toolbarClassName"
						// wrapperClassName="wrapperClassName"
						// editorClassName="editorClassName"
						onContentStateChange={this.onContentStateChange}
						onEditorStateChange={this.onEditorStateChange}
					/>
				</Card>
				<Modal title="富文本"
						visible={this.state.showRichText}
				       onCancel={()=>{
				       	this.setState({
					        showRichText: false,
				        })
				       }}
				       footer={null}
				>
					{draft(this.state.contentState)}
				</Modal>
			</div>
		)
	}
}