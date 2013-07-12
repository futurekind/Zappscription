var SubscriptionBarView = Backbone.View.extend({

	subscriptions: null,

	initialize: function(){
		this.template = App.loadTemplate('templates/subscriptionBar.html');
		this.loadSubscriptions();
	},

	loadSubscriptions: function(){

		var loading = new MessageView({
			showLoadingIndicator: true,
			title: 'Loading your subscriptions!'
		});

		var _this = this;
		var params = {
			command: 'getSubscriptions'
		};

		$.get('scripts/feedbinApiProxy.php', params, function(data){

			loading.close();

			if(data.data.http_code == '401'){
				var message = new MessageView({
					type: 'error',
					title: 'Owe noes!',
					body: 'It looks like you have to login into Feedbin!',
					showCloseButton: true
				});
			}

		});
	},

	render: function() {
		var templateHtml = _.template(this.template, {data: this.subscriptions});

		this.$el.html(templateHtml);

		App.appView.$el.find('.l-tools.text-right').append(this.$el);
	}
});