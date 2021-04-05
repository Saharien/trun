var app = new Vue({
    el: '#app',
    data: {
        showWhat: 'run/hitlist', // Alternative 'biking/hitlist'
        timeSpan: '4',
        message: 'Hello Vue!',
        todos: [],
        apiUrl: 'http://localhost:8080/api', // http://localhost:8080/api/run/hitlist/4  / biking
        pass: 'gi9k3C4F4FER',
        urlToLoad: ''
    },

    methods: {
        loadData: function () {

            this.urlToLoad = this.apiUrl + '/' + this.showWhat + '/' + this.timeSpan;

            async function getFetchData(urlToLoad, pass) {
                const response = await fetch(urlToLoad, {
                    headers: { "pass": pass }
                });
                const myJson = await response.json(); //extract JSON from the http response
                return myJson;
            }

            getFetchData(this.urlToLoad, this.pass).then(activities => {

                rank = 0;
                lastTotalAmount = 0;

                this.todos = activities.data;



                // Platzierung setzen
                this.todos.forEach(function (element, index) {

                    if (element.totalAmount != lastTotalAmount) {
                        rank++;
                    }

                    element.rank = rank;
                    lastTotalAmount = element.totalAmount;
                });
            });
        },
        showRuns: function () {
            this.showWhat = 'run/hitlist';
            this.loadData();
        },
        showBikings: function () {
            this.showWhat = 'biking/hitlist';
            this.loadData();
        },
        setApril: function () {
            this.timeSpan = 4;
            this.loadData();
        },
        setMai: function () {
            this.timeSpan = 5;
            this.loadData();
        },
        setJuni: function () {
            this.timeSpan = 6;
            this.loadData();
        }
    }
});