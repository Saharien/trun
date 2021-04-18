var app = new Vue({
    el: '#app',
    data: {
        showWhat: 'run/hitlist', // Alternative 'biking/hitlist'
        timeSpan: '4',
        activities: [],
        apiUrl: 'https://atlantis:443/api',
        pass: 'gi9k3C4F4FER',
        urlToLoad: '',
        currentSort:'rank',
        currentSortDir:'asc'
    },
    mounted: function () {
        this.$nextTick(function () {
          this.loadData();
        })
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

            getFetchData(this.urlToLoad, this.pass).then(a => {

                rank = 0;
                lastTotalAmount = 0;

                this.activities = a.data;

                // Platzierung setzen
                this.activities.forEach(function (element, index) {

                    // calculate distance
                    element.distance = Math.round((element.totalAmount + Number.EPSILON) * 100) / 100;
                    
                    // calculate height meter
                    element.heightMeter = Math.round((element.elevgain + Number.EPSILON) * 1) / 1;

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
        },
        sort:function(s) {
            //if s == current sort, reverse
            if(s === this.currentSort) {
              this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
            }
            this.currentSort = s;
          }    
    },
    computed:{
        sortedActivities:function() {
          return this.activities.sort((a,b) => {
            let modifier = 1;
            if(this.currentSortDir === 'desc') modifier = -1;
            if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
            if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
            return 0;
          });
        }
      }
});