define(["jquery","jquery-ui","color-picker","ddslick"],function(a){function b(){a(this).dialog("close"),a(this).find("*").removeClass("ui-state-error")}function c(c,d){require(["css!charts/indicators/min/min.css"]),require(["text!charts/indicators/min/min.html"],function(e){var f="#cd0a0a";e=a(e),e.appendTo("body"),e.find("input[type='button']").button(),e.find("#min_stroke").colorpicker({part:{map:{size:128},bar:{size:128}},select:function(b,c){a("#min_stroke").css({background:"#"+c.formatted}).val(""),f="#"+c.formatted},ok:function(b,c){a("#min_stroke").css({background:"#"+c.formatted}).val(""),f="#"+c.formatted}});var g="Solid";a("#min_dashStyle").ddslick({imagePosition:"left",width:138,background:"white",onSelected:function(b){a("#min_dashStyle .dd-selected-image").css("max-width","105px"),g=b.selectedData.value}}),a("#min_dashStyle .dd-option-image").css("max-width","105px"),e.dialog({autoOpen:!1,resizable:!1,modal:!0,width:280,my:"center",at:"center",of:window,dialogClass:"min-ui-dialog",buttons:[{text:"OK",click:function(){var c=a(".min_input_width_for_period");if(!_.isInteger(_.toNumber(c.val()))||!_.inRange(c.val(),parseInt(c.attr("min")),parseInt(c.attr("max"))+1))return void require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Only numbers between "+c.attr("min")+" to "+c.attr("max")+" is allowed for "+c.closest("tr").find("td:first").text()+"!"})});var d={period:parseInt(e.find(".min_input_width_for_period").val()),stroke:f,strokeWidth:parseInt(e.find("#min_strokeWidth").val()),dashStyle:g,appliedTo:parseInt(e.find("#min_appliedTo").val())};a(a(".min").data("refererChartID")).highcharts().series[0].addIndicator("min",d),b.call(e)}},{text:"Cancel",click:function(){b.call(this)}}]}),e.find("select").selectmenu({width:140}),"function"==typeof d&&d(c)})}return{open:function(b){return 0==a(".min").length?void c(b,this.open):void a(".min").data("refererChartID",b).dialog("open")}}});