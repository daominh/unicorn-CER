(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{40:function(e,t,n){e.exports=n(78)},46:function(e,t,n){},72:function(e,t){},75:function(e,t,n){},78:function(e,t,n){"use strict";n.r(t);var a=n(1),o=n.n(a),i=n(31),s=n.n(i),c=(n(45),n(46),n(32)),r=n(33),u=n(38),l=n(34),m=n(39),p=n(35),h=n.n(p),f=(n(75),n(80)),d=n(81),v=n(82),w=n(3),b=n.n(w),y=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(n=Object(u.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(o)))).state={coins:{}},n}return Object(m.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=new XMLHttpRequest;t.open("GET","https://min-api.cryptocompare.com/data/top/totalvolfull?limit=100&tsym=THB"),t.send(null),t.onload=function(){var n=JSON.parse(t.response);e.parseApiData(n.Data)}}},{key:"parseApiData",value:function(e){var t={};e.forEach(function(e){e={name:e.RAW.THB.FROMSYMBOL,price:e.RAW.THB.PRICE.toFixed(2)},t[e.name]=e}),this.setState({coins:t}),this.subscribeStream(Object.keys(t))}},{key:"subscribeStream",value:function(e){var t=this,n=h.a.connect("https://streamer.cryptocompare.com"),a=[];e.forEach(function(e){a.push("5~CCCAGG~"+e+"~THB")}),n.emit("SubAdd",{subs:a}),n.on("m",function(e){t.handleMessage(e)})}},{key:"handleMessage",value:function(e){if("1"===(e=e.split("~"))[4]||"2"===e[4]){var t={name:e[2],price:e[5]};"1"===e[4]?(t.isUp=!0,t.isDown=!1):"2"===e[4]&&(t.isUp=!1,t.isDown=!0),this.updateCoin(t)}}},{key:"updateCoin",value:function(e){var t=this,n=this.state.coins;n[e.name]=e,this.setState(n[e.name]),window.setTimeout(function(){n[e.name].isUp=!1,n[e.name].isDown=!1,t.setState(n[e.name])},500)}},{key:"render",value:function(){var e=this;return o.a.createElement(f.a,{fluid:!0},o.a.createElement(d.a,{noGutters:!0},Object.keys(this.state.coins).map(function(t,n){return o.a.createElement(v.a,{key:n,xs:"4",md:"3",lg:"2"},o.a.createElement("section",{className:b()({Coin:!0,tickGreen:e.state.coins[t].isUp,tickRed:e.state.coins[t].isDown})},o.a.createElement("span",null,o.a.createElement("b",null,e.state.coins[t].name)),o.a.createElement("span",null,String.fromCharCode(3647),e.state.coins[t].price)))})))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[40,1,2]]]);
//# sourceMappingURL=main.bf3fa965.chunk.js.map