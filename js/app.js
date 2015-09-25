// json columns will be thumb_url_default, views, created_on, title, id

/** @jsx React.DOM */

var VideoTableApp = React.createClass({
	render: function() {
		return (
			<div>
				<SearchBar />
				<VideoTable />
			</div>
		)
	}
});

var VideoTable = React.createClass({

	loadData: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({data: data});
				console.log(data);
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
		this.loadData();
		setInterval(this.loadData, this.props.pollInterval);
	},

	render: function() {
		//<VideoRow data={this.state.data} />
		var rows = [];
		$.each(data, function(i, vid) {
			rows.push(<VideoRow />);
		});
		// return rows?
		//}

	return (
		<table>
			<thead>
				<td>Video Thumbnail</td>
				<td>Title</td>
				<td>Views</td>
				<td>Created Date</td>
				<td>Video Id</td>
			</thead>
			<tbody>
				{rows}
			</tbody>
		</table>
		);
	}
});

var VideoRow = React.createClass({
	render: function() {
		return (
			<tr>
				<td>{this.props.thumb_url_default}</td>
				<td>{this.props.title}</td>
				<td>{this.props.views}</td>
				<td>{this.props.created_on}</td>
				<td>{this.props.id}</td>
			</tr>
		);
	}	
});

var SearchBar = React.createClass({
	render: function() {
		return (
			<form>
				<input type="text" placeholder="Search..." />
			</form>
			)
	}
});

// React.render(
// 	<VideoTableApp url="videos.json" pollInterval={2000} />,
// 	document.getElementById('app')
// 	);


///////////////////////////////////

var CommentBox = React.createClass({

	loadCommentsFromServer: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({data: data});
				console.log(data);
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
			<div className="commentBox">
				<h1>Comments</h1>
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
					<td>{comment.title}</td>
					<td><img src={comment.thumb_url_default} /></td>
					<td>{comment.id}</td>
					<td>{comment.created_on}</td>
					
				</RowDiv>

				);
		}); // end commentNodes
		return (
			<table>
			<tbody className="commentList">
				{commentNodes}
			</tbody>
			</table>
			);
	}
});



React.render(
	<CommentBox url="videos.json" pollInterval={2000} />,
	document.getElementById('app')
	);
