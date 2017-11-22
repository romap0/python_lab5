var app = new Vue({
  el: "#app",

  data: {
    gameId: -1,
    level: -1,
    image: "",
    names: [],
    name: ""
  },

  created: function() {
    this.getNames();
  },

  methods: {
    getNames: function() {
      var xhr = new XMLHttpRequest();
      var self = this;
      xhr.open("GET", "/api/names");
      xhr.onload = function() {
        self.names = JSON.parse(xhr.responseText);
      };
      xhr.send();
    },
    
        startGame: function(event) {
          var xhr = new XMLHttpRequest();
          var self = this;
          xhr.open("GET", "/api/startGame/" + this.level);
          xhr.onload = function() {
            let response = JSON.parse(xhr.responseText);
            self.gameId = response.id;
            self.image = response.image;
          };
          xhr.send();
        },

    finishGame: function(event) {
      var xhr = new XMLHttpRequest();
      var self = this;
      xhr.open("GET", "/api/finishGame/" + this.gameId + "/" + this.name);
      xhr.onload = function() {
        let response = JSON.parse(xhr.responseText);
        alert(response);
      };
      xhr.send();
    }
  }
});
