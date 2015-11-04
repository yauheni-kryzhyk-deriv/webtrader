define(["jquery","jquery-ui","color-picker","loadCSS"],function(a){function b(){a(this).dialog("close"),a(this).find("*").removeClass("ui-state-error")}function c(c,d){loadCSS("charts/indicators/sum/sum.css");var e=[];a.get("charts/indicators/sum/sum.html",function(f){var g="#cd0a0a";f=a(f),f.appendTo("body"),f.find("input[type='button']").button(),f.find("#sum_stroke").colorpicker({part:{map:{size:128},bar:{size:128}},select:function(b,c){a("#sum_stroke").css({background:"#"+c.formatted}).val(""),g="#"+c.formatted},ok:function(b,c){a("#sum_stroke").css({background:"#"+c.formatted}).val(""),g="#"+c.formatted}});var h=f.find("#sum_levels").DataTable({paging:!1,scrollY:100,autoWidth:!0,searching:!1,info:!1});a.each(e,function(b,c){a(h.row.add([c.level,'<div style="background-color: '+c.stroke+';width:100%;height:20px;"></div>',c.strokeWidth,c.dashStyle]).draw().node()).data("level",c).on("click",function(){a(this).toggleClass("selected")})}),f.find("#sum_level_delete").click(function(){h.rows(".selected").indexes().length<=0?require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Select levels to delete!"})}):h.rows(".selected").remove().draw()}),f.find("#sum_level_add").click(function(){require(["charts/indicators/sum/sum_level"],function(b){b.open(c,function(b){a.each(b,function(b,c){a(h.row.add([c.level,'<div style="background-color: '+c.stroke+';width:100%;height:20px;"></div>',c.strokeWidth,c.dashStyle]).draw().node()).data("level",c).on("click",function(){a(this).toggleClass("selected")})})})})}),f.dialog({autoOpen:!1,resizable:!1,width:350,modal:!0,my:"center",at:"center",of:window,buttons:[{text:"Ok",click:function(){require(["validation/validation"],function(c){return c.validateNumericBetween(f.find(".sum_input_width_for_period").val(),parseInt(f.find(".sum_input_width_for_period").attr("min")),parseInt(f.find(".sum_input_width_for_period").attr("max")))?(require(["charts/indicators/highcharts_custom/sum"],function(b){b.init();var c=[];a.each(h.rows().nodes(),function(){var b=a(this).data("level");b&&c.push({color:b.stroke,dashStyle:b.dashStyle,width:b.strokeWidth,value:b.level,label:{text:b.level}})});var d={period:parseInt(f.find(".sum_input_width_for_period").val()),stroke:g,strokeWidth:parseInt(f.find("#sum_strokeWidth").val()),dashStyle:f.find("#sum_dashStyle").val(),levels:c};a(a(".sum").data("refererChartID")).highcharts().series[0].addSUM(d)}),void b.call(f)):void require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Only numbers between "+f.find(".sum_input_width_for_period").attr("min")+" to "+f.find(".sum_input_width_for_period").attr("max")+" is allowed for "+f.find(".sum_input_width_for_period").closest("tr").find("td:first").text()+"!"})})})}},{text:"Cancel",click:function(){b.call(this)}}]}),"function"==typeof d&&d(c)})}return{open:function(b){return 0==a(".sum").length?void c(b,this.open):void a(".sum").data("refererChartID",b).dialog("open")}}});