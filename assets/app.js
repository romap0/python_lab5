var app = new Vue({
  el: "#app",

  data: {
    levels: [],
    gameId: undefined,
    selectedLevel: undefined,
    image: "http://www.clker.com/cliparts/A/Y/O/m/o/N/placeholder-hi.png",
    names: [],
    selectedName: undefined,
    game: {}
  },

  created: function () {
    this.levels = [{
        id: 1,
        name: "Уровень 1"
      },
      {
        id: 2,
        name: "Уровень 2"
      },
      {
        id: 3,
        name: "Уровень 3"
      }
    ];

    this.selectedLevel = this.levels[0];
    this.getNames();
  },

  methods: {
    selectLevel: function (level) {
      this.selectedLevel = level;
    },

    getNames: function () {
      var xhr = new XMLHttpRequest();
      var self = this;
      xhr.open("GET", "/api/names");
      xhr.onload = function () {
        self.names = JSON.parse(xhr.responseText);
      }
      xhr.send();
    },

    startGame: function (event) {
      var xhr = new XMLHttpRequest();
      var self = this;
      xhr.open("GET", "/api/startGame/" + this.selectedLevel.id);
      xhr.onload = function () {
        let response = JSON.parse(xhr.responseText);
        self.gameId = response.id;
        self.image = response.image;
      };
      xhr.send();
    },

    finishGame: function (event) {
      var xhr = new XMLHttpRequest();
      var self = this;
      xhr.open("GET", "/api/finishGame/" + this.gameId + "/" + this.selectedName);
      xhr.onload = function () {
        self.game = JSON.parse(xhr.responseText);
        $('#resultModal').modal('show')
      };
      xhr.send();
    }
  }
});