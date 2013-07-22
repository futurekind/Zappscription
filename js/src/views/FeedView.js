var FeedView = Backbone.View.extend({

	feeds: null,

	tagName: 'ol',

	className: 'feeds',

	id: 'app-feeds',

	events: {
		'click .feed': 'showDetailView'
	},

	initialize: function(){
		this.template = App.loadTemplate('templates/feedView.html');
	},


	loadUnreadFeeds: function(){

		var _this = this;

		var params = {
			method: 'getUnreadFeeds',
			userpass: App.appView.apiUser + ':' + App.appView.apiPassword
		};

		this.feeds = new Feeds();

		this.feeds.load(params, function(data){
			if(data) {
				_this.render();
			}
		});
	},

	render: function(){

		var templateHtml = _.template(this.template, {data: this.feeds.models});

		this.$el.html(templateHtml);

		$('#app-main')
			.append(this.$el)
			.append('<div id="app-detail-panel" class="l-details"/>');

		this.trigger('didRender');

	},

	showDetailView: function(e){
		var feedId = parseInt($(e.currentTarget).data('feed-id'), 10);

		var content = this.feeds.get(feedId).get('content');

		$('#app-detail-panel').addClass('is-visible').html(content);

	}

});