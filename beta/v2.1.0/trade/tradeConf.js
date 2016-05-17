define(["lodash","jquery","moment","websockets/binary_websockets","common/rivetsExtra","charts/chartingRequestMap","text!trade/tradeConf.html","css!trade/tradeConf.css"],function(a,b,c,d,e,f,g){function h(b,e){function g(g){if(-1===a.findIndex(b.ticks.array,function(a){return a.epoch===g.time/1e3})&&h>0){var j=f.digits_after_decimal(e.pip,i);b.ticks.array.push({quote:g.close,epoch:g.time/1e3|0,number:b.ticks.array.length+1,tooltip:c.utc(g.time).format("dddd, MMM D, HH:mm:ss")+"<br/>"+e.symbol_name+" "+g.close,decimal_digits:j}),--h}0===h&&(b.ticks.update_status(),b.buy.update(),b.back.visible=!0,d.events.off("tick",k)),"Digits"!==b.ticks.category&&b.ticks.update_status()}var h=1*e.tick_count,i=e.symbol,k=(1*b.buy.purchase_time,null);a.defer(function(){k=d.events.on("tick",function(a){if(a.tick.symbol==i){var c=f.keyFor(a.tick.symbol,0),d=1e3*b.buy.start_time;j.chain().find({$and:[{time:{$gt:d}},{instrumentCdAndTp:c}]}).simplesort("time",!0).limit(5).data().sort(function(a,b){return a.time-b.time}).forEach(g)}})})}function i(c,i,j,k){var l=b(g),m=c.buy,n=f.digits_after_decimal(i.pip,i.symbol),o={title:{text:"Contract Confirmation"},buy:{message:m.longcode,balance_after:m.balance_after,buy_price:m.buy_price,purchase_time:m.purchase_time,start_time:m.start_time,transaction_id:m.transaction_id,payout:m.payout,currency:i.currency,potential_profit:m.payout-m.buy_price,potential_profit_text:"Profit",show_result:!1},spreads:{amount_per_point:m.amount_per_point||"0",stop_loss_level:m.stop_loss_level||"0",stop_profit_level:m.stop_profit_level||"0"},ticks:{array:[],average:function(){for(var a=this.array,b=0,c=0;c<a.length;++c)b+=1*a[c].quote;var d=b/(a.length||1);return d},getPlotX:function(){var a=this.array.length;return 1===a?{value:a,label:"Entry Spot"}:a===this.tick_count?{value:a,label:"Exit Spot"}:null},getPlotY:function(){var a=this.array.length,b=this.array[a-1];if("Up/Down"===this.category&&1===a)return{value:1*b.quote,label:"Barrier ("+b.quote+")",id:"plot-barrier-y"};if("Asians"===this.category){var c=this.average().toFixed(n);return{value:c,label:"Average ("+c+")",id:"plot-barrier-y"}}return null},tick_count:i.tick_count,value:(i.digits_value||"0")+"",category:i.category,category_display:i.category_display,status:"waiting",chart_visible:i.show_tick_chart},arrow:{visible:!i.show_tick_chart&&"Digits"!==i.category},back:{visible:!1}};o.buy.update=function(){var a=o.ticks.status;o.title.text={waiting:"Contract Confirmation",won:"This contract won",lost:"This contract lost"}[a],"lost"===a&&(o.buy.potential_profit=-o.buy.buy_price,o.buy.payout=0,o.buy.potential_profit_text="Lost"),"won"===a&&(o.buy.balance_after=1*m.balance_after+1*o.buy.payout,d.sell_expired()),o.buy.show_result=!0},o.ticks.update_status=function(){var b=f.digits_after_decimal(i.pip,i.symbol),c=a.head(o.ticks.array).quote.toFixed(b)+"",d=a.last(o.ticks.array).quote.toFixed(b)+"",e=o.ticks.value+"",g=o.ticks.average().toFixed(5),h=o.ticks.category,j=o.ticks.category_display,k={Digits:{matches:a.last(d)===e,differs:a.last(d)!==e,over:1*a.last(d)>1*e,under:1*a.last(d)<1*e,odd:1*a.last(d)%2===1,even:1*a.last(d)%2===0},"Up/Down":{rise:1*d>1*c,fall:1*c>1*d},Asians:{"asian up":1*d>g,"asian down":g>1*d}};o.ticks.status=k[h][j]?"won":"lost"},o.back.onclick=function(){k(l)},o.arrow.onclick=function(a){var c=b(a.target);c.hasClass("disabled")||(c.addClass("disabled"),require(["viewtransaction/viewTransaction"],function(a){a.init(i.contract_id,i.transaction_id).then(function(){c.removeClass("disabled")})}))},o.arrow.visible?o.back.visible=!0:h(o,i);e.bind(l[0],o);j(l)}require(["websockets/stream_handler"]);var j=f.barsTable;return e.binders["tick-chart"]={priority:65,bind:function(a){var b=this.model;a.chart=new Highcharts.Chart({title:"",credits:{enabled:!1},chart:{type:"line",renderTo:a,backgroundColor:null,width:1*(a.getAttribute("width")||350),height:1*(a.getAttribute("height")||120)},tooltip:{formatter:function(){var a=b.array[this.x-1];return a&&a.tooltip||!1}},xAxis:{type:"linear",min:1,max:1*a.getAttribute("tick-count")+1,labels:{enabled:!1}},yAxis:{labels:{align:"left",x:0},title:"",gridLineWidth:0},series:[{data:[]}],exporting:{enabled:!1,enableImages:!1},legend:{enabled:!1}})},routine:function(b,c){var d=this.model,e=function(a,b){a.xAxis[0].addPlotLine({value:b.value,id:b.id||b.value,label:{text:b.label||"label"},color:b.color||"#e98024",width:b.width||2})},f=function(a,b){a.yAxis[0].addPlotLine({id:b.id||b.label,value:b.value,label:{text:b.label,align:"center"},color:"green",width:2})},g=c.length;if(0!=g){var h=a.last(c);b.chart.series[0].addPoint([g,1*h.quote]);var i=d.getPlotX();i&&e(b.chart,i);var j=d.getPlotY();j&&b.chart.yAxis[0].removePlotLine(j.id),j&&f(b.chart,j)}}},{init:i}});