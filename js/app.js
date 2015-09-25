// json columns will be thumb_url_default, views, created_on, title, id

/** @jsx React.DOM */

var CommentBox = React.createClass({

	loadCommentsFromServer: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({data: data});
				// console.log(data);
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

	getInitialState: function() {
		return {data: [] };
	},

	componentDidMount: function() {
		this.loadCommentsFromServer();
		setInterval(this.loadCommentsFromServer, this.props.pollInterval);
	},

	render: function() {
		return (
			<div className="commentBox col-md-8 col-md-offset-1">
				<h1>Videos Table</h1>
				<CommentList data={this.state.data} />
				
			</div>
			);
	}
});

var RowDiv = React.createClass({
	render: function() {
		return (
			<tr className="comment">
				{this.props.children}
			</tr>
			)
	}
});

var CommentList = React.createClass({
	render: function() {

		var commentNodes = this.props.data.map(function(comment, index) {
			return (

				<RowDiv title={comment.title} key={index}>
					<td><img src={comment.thumb_url_default} /></td>
					<td>{comment.title}</td>
					<td>{comment.views}</td>
					<td>{comment.id}</td>
					<td>{comment.created_on}</td>
					
				</RowDiv>

				);
		}); // end commentNodes
		return (
			<table className="table">
				<thead>
					<tr>
						<th>Video Thumbnail</th>
						<th>Title</th>
						<th>Views</th>
						<th>Video Id</th>
						<th>Created Date</th>
					</tr>
				</thead>
				<tbody className="commentList">
					{commentNodes}
				</tbody>
			</table>
			);
	}
});

// var SearchBar = React.createClass({
// 	render: function() {
// 		return (
// 			<form>
// 				<input type="text" placeholder="Search..." />
// 			</form>
// 			)
// 	}
// });


React.render(
	<CommentBox url="videos.json" pollInterval={2000} />,
	document.getElementById('app')
	);
