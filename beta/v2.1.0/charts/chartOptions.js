define(["jquery","charts/chartingRequestMap","charts/chartWindow","common/util"],function(a,b){"use strict";function c(b,c){var d=a("#"+b+"_header").find("li.overlay");isDataTypeClosePriceOnly(c)?d.removeClass("ui-state-disabled"):d.addClass("ui-state-disabled"),d.closest("ul.ui-menu").menu("refresh")}b.barsTable;return{init:function(b,d,e,f){require(["text!charts/chartOptions.html","css!charts/chartOptions.css"],function(g){g=a(g),g.find(".chartMenuHamburgerMenu").hover(function(){a(this).toggleClass("ui-state-hover").toggleClass("ui-state-active")}).click(function(){return a(this).toggleClass("active").next("ul:first").toggle(),!1}).focusout(function(){a(this).removeClass("active").next("ul:first").menu().hide()}),g.find("ul:first").menu(),isTick(d)&&g.find(".candlestick, .ohlc").addClass("ui-state-disabled"),f||g.find(".chartType li.table").hide(),g.find(".chartType li."+e).find("span:first").addClass("ui-icon ui-icon-check"),g.find(".chartType li").click(function(){if(!a(this).hasClass("ui-state-disabled")){var d=a(this).attr("class").split(" ")[0].replace(".","").trim();"table"===d?f():(g.find(".chartType li span").removeClass("ui-icon ui-icon-check"),a(this).find("span:first").addClass("ui-icon ui-icon-check"),a("#"+b+"_chart").data("type",d),require(["charts/charts"],function(a){a.refresh("#"+b+"_chart")})),c(b,d),a(this).closest(".chartOptions").find(".chartMenuHamburgerMenu").click()}}),g.find("ul:first > li").each(function(){a(this).click(function(){if(!a(this).hasClass("ui-state-disabled"))if(a(this).hasClass("logScaleLI")){var c=a("#"+b+"_chart").highcharts().series[0],d=a(this).find("span:first").hasClass("ui-icon-check");c.yAxis.update({type:d?"linear":"logarithmic"}),a(this).find("span:first").toggleClass("ui-icon ui-icon-check");var e=a(this).closest(".chartOptions").find(".chartMenuHamburgerMenu");e.hasClass("active")&&e.click()}else if(a(this).hasClass("crosshairLI"))require(["charts/crosshair"],function(a){a.toggleCrossHair("#"+b+"_chart")}),a(this).find("span:first").toggleClass("ui-icon ui-icon-check"),a(this).closest(".chartOptions").find(".chartMenuHamburgerMenu").click();else if(a(this).hasClass("refresh"))require(["charts/charts"],function(a){a.refresh("#"+b+"_chart")}),a(this).closest(".chartOptions").find(".chartMenuHamburgerMenu").click();else if(a(this).hasClass("currentPriceLI")){var f=a(this);require(["currentPriceIndicator"],function(){var c="#"+b+"_chart",d=a(c).highcharts(),e=!f.find("span:first").hasClass("ui-icon-check");e?a.each(d.series,function(a,b){b.options.isInstrument&&b.removeCurrentPrice()}):d.series.forEach(function(a){a.options.isInstrument&&a.addCurrentPrice()})}),a(this).find("span:first").toggleClass("ui-icon ui-icon-check"),a(this).closest(".chartOptions").find(".chartMenuHamburgerMenu").click()}})}),g.find(".indicators li").click(function(){a(this).hasClass("addInidicators")?require(["charts/indicators/indicators_add"],function(a){a.openDialog("#"+b+"_chart")}):a(this).hasClass("removeIndicators")&&require(["charts/indicators/indicators_remove"],function(a){a.openDialog("#"+b+"_chart")})}),g.find(".overlay li").click(function(){a(this).hasClass("addOverlay")?require(["overlay/overlay_add"],function(a){a.openDialog("#"+b+"_chart")}):a(this).hasClass("removeOverlay")&&require(["overlay/overlay_remove"],function(a){a.openDialog("#"+b+"_chart")})}),g.find(".drawLI li").click(function(){a(this).hasClass("addChartObject")?require(["charts/draw/chartobject_add"],function(a){a.openDialog("#"+b+"_chart")}):a(this).hasClass("removeChartObject")&&require(["charts/draw/chartobject_remove"],function(a){a.openDialog("#"+b+"_chart")})}),a("#"+b+"_header").prepend(g),c(b,e)})},disableEnableLogMenu:function(b,c){var d=a("#"+b+"_header").find("li.logScaleLI");c?d.removeClass("ui-state-disabled"):d.addClass("ui-state-disabled")},triggerToggleLogScale:function(b){a("#"+b+"_header").find("li.logScaleLI").click()},isCurrentViewInLogScale:function(b){var c=a("#"+b+"_header").find("li.logScaleLI");return c.find("span:first").hasClass("ui-icon-check")&&!c.hasClass("ui-state-disabled")},disableEnableCandlestick:function(b,c){var d=a("#"+b+"_header").find("li.candlestick");c?d.removeClass("ui-state-disabled"):d.addClass("ui-state-disabled")},disableEnableOHLC:function(b,c){var d=a("#"+b+"_header").find("li.ohlc");c?d.removeClass("ui-state-disabled"):d.addClass("ui-state-disabled")},disableEnableOverlay:function(a,b){c(a,b)}}});