/** @jsx React.DOM */

var VideoTable = React.createClass({

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
		$('table').tablesorter({debug: true});
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
			<div className="videoBox">
				<h1>Videos Table</h1>
				<VideoList data={this.state.data} />
				
			</div>
			);
	}
});

var RowDiv = React.createClass({
	render: function() {
		return (
			<tr className="video">
				{this.props.children}
			</tr>
			)
	}
});

var VideoList = React.createClass({
	render: function() {

		var videoNodes = this.props.data.map(function(vid, index) {
			return (

				<RowDiv title={vid.title} key={index}>
					<td><img src={vid.thumb_url_default} /></td>
					<td>{vid.title}</td>
					<td>{vid.views}</td>
					<td>{vid.id}</td>
					<td>{vid.created_on}</td>
					
				</RowDiv>

				);
		}); // end videoNodes
		return (

			<table className="table table-striped tablesorter" id="table-sort">
				<thead>
					<tr>
						<th>Video Thumbnail</th>
						<th>Title</th>
						<th>Views</th>
						<th>Video Id</th>
						<th>Created Date</th>
					</tr>
				</thead>
				<tbody className="videoList">
					{videoNodes}
				</tbody>
			</table>
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


React.render(
	<VideoTable url="videos.json" pollInterval={2000} />,
	document.getElementById('app')

	);
