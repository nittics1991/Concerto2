/********************************************************************************
*	OverRide
*********************************************************************************/
/**
*	serialize()データにID属性追加
**/
Gridster.defaults.serialize_params = function($w, wgd) { 
	return { 
		id: $($w).attr('id'), 
		col: wgd.col, 
		row: wgd.row, 
		size_x: wgd.size_x, 
		size_y: wgd.size_y 
	};
};

/********************************************************************************
*	ツールバー
*********************************************************************************/
Gridster.prototype.drowToolbar = function(elm) {
	var gridster = this;
	var gridId = (gridster.options.id != null)?	gridster.options.id:Math.floor(Math.random() * 10000);
	
	var template = '\
		<div class="gs-button">\
			<a href="javascript:void(0)" id="gs-button-help-' + gridId + '"><img src="../../../_js/gridster/concerto/help.png" title="ヘルプ"></a>\
			<a href="javascript:void(0)" id="gs-button-lock-' + gridId + '"><img src="../../../_js/gridster/concerto/lock.png" title="ロック"></a>\
			<a href="javascript:void(0)" id="gs-button-unlock-' + gridId + '"><img src="../../../_js/gridster/concerto/unlock.png" title="アンロック"></a>\
			<a href="javascript:void(0)" id="gs-button-save-' + gridId + '"><img src="../../../_js/gridster/concerto/save.png" title="設定保存"></a>\
			<a href="javascript:void(0)" id="gs-button-delete-' + gridId + '"><img src="../../../_js/gridster/concerto/delete.png" title="設定削除"></a>\
			<a href="javascript:void(0)" id="gs-button-download-' + gridId + '"><img src="../../../_js/gridster/concerto/download.png" title="設定ダウンロード"></a>\
			<a href="javascript:void(0)" id="gs-button-upload-' + gridId + '"><img src="../../../_js/gridster/concerto/upload.png" title="設定アップロード"></a>\
			<a href="javascript:void(0)" id="gs-button-add-' + gridId + '"><img src="../../../_js/gridster/concerto/add.png" title="追加(将来用)"></a>\
			<a href="javascript:void(0)" id="gs-button-remove-' + gridId + '"><img src="../../../_js/gridster/concerto/remove.png" title="削除(将来用)"></a>\
		</div>\
	';
	
	/**
	*	初期表示時操作ロック
	**/
	$(elm).append(template);
	gridster.disable();
	
	try {
		gridster.disable_resize();
	} catch (e) {
	}
	
	$("#gs-button-lock-" + gridId + " > img").css("visibility", "hidden");
	$("#gs-button-add-" + gridId + " > img").css("visibility", "hidden");
	$("#gs-button-remove-" + gridId + " > img").css("visibility", "hidden");
	
	/**
	*	ヘルプボタン
	**/
	$("#gs-button-help-" + gridId).click(function() {
//		window.open("http://gridster.net/");
		window.open("http://itcv1800005m.toshiba.local:8080/help/入門.pdf", "GridSter");
	});
	
	/**
	*	操作ロック
	**/
	$("#gs-button-lock-" + gridId).click(function() {
		if (this.style.cursor != "default") {
			gridster.disable();
			
			try {
				gridster.disable_resize();
				gridster.removeFlag = false;
			} catch (e) {
			}
			
			$("#gs-button-unlock-" + gridId + " > img").css("visibility", "visible");
			$("#gs-button-lock-" + gridId + " > img").css("visibility", "hidden");
			$("#gs-button-add-" + gridId + " > img").css("visibility", "hidden");
			$("#gs-button-remove-" + gridId + " > img").css("visibility", "hidden");
			alert("GRID LOCK");
		}
	});
	
	/**
	*	操作ロック解除
	**/
	$("#gs-button-unlock-" + gridId).click(function() {
		if (this.style.cursor != "default") {
			gridster.enable();
			
			try {
				gridster.enable_resize();
			} catch (e) {
			}
			
			$("#gs-button-unlock-" + gridId + " > img").css("visibility", "hidden");
			$("#gs-button-lock-" + gridId + " > img").css("visibility", "visible");
			$("#gs-button-add-" + gridId + " > img").css("visibility", "visible");
			$("#gs-button-remove-" + gridId + " > img").css("visibility", "visible");
			alert("GRID UNLOCK");
		}
	});
	
	/**
	*	設定保存
	**/
	$("#gs-button-save-" + gridId).click(function() {
		if (window.confirm("save the setting?")) {
			var serialize = gridster.serialize();
			var json = JSON.stringify(serialize);
			
			try {
				var config = lzbase62.compress(json);
			} catch (e) {
				var config = json;
			}
			
			localStorage.setItem(gridId, config);
		}
	});
	
	/**
	*	設定削除
	**/
	$("#gs-button-delete-" + gridId).click(function() {
		if (window.confirm("delete the setting?")) {
			localStorage.removeItem(gridId);
		}
	});
	
	/**
	*	設定ダウンロード
	**/
	$("#gs-button-download-" + gridId).click(function() {
		var filename = 'config.bin';
		var text = localStorage.getItem(gridId);
		
		if (text == null) {
			return;
		}
		
		var blob = new Blob([text], {type: "application/octet-stream"});
		
		if (window.navigator.msSaveBlob) {
			window.navigator.msSaveBlob(blob, filename);
		} else {
			var a = document.createElement("a");
			a.href = URL.createObjectURL(blob);
			a.target = '_blank';
			a.download = filename;
			a.click();
			URL.revokeObjectURL();
		}
	});
	
	/**
	*	設定アップロード
	**/
	$("#gs-button-upload-" + gridId).click(function() {
		if (gridster.uploadFlag) {
			return;
		}
		
		var outW = 300;
		var outH = 80;
		var outX = (($(window).width() - outW) / 2) + $(window).scrollLeft();
		var outY = (($(window).height() - outH) / 2) + $(window).scrollTop();
		
		var template = '<div id="gs-upload-' + gridId + '" style="position:absolute; background-color:#d0d0d0; border:1px solid #000000; z-index:9999;">\
				<div style="background-color:#e0e0e0; border-bottom:1px solid #000000;">File Upload</div>\
				<input type="file" id="gs-upload-file-' + gridId + '">\
				<div id="gs-upload-button-' + gridId + '" style="margin-left:auto; margin-right:auto;">\
					<input type="button" value="OK" id="gs-upload-ok-' + gridId + '">\
					<input type="button" value="Close"id="gs-upload-close-' + gridId + '">\
				</div>\
			</div>\
		';
		
		$("#gs-button-upload-" + gridId).after(template);
		
		$("#gs-upload-" + gridId).css({
			"width":outW,
			"height":outH,
			"left":outX,
			"top":outY
		});
		
		$("#gs-upload-file-" + gridId).css({
			"width":(outW * 0.95),
			"margin":"4px"
		});
		
		$("#gs-upload-button-" + gridId).css({
			"width":80
		});
		
		$("#gs-upload-ok-" + gridId).click(function() {
			var fileList = $("#gs-upload-file-" + gridId).prop("files");
			
			if (fileList.length) {
				try {
					var reader = new FileReader();
				} catch(e) {
					alert("File API unsupported.");
					return;
				}
				
				reader.readAsText(fileList[0]);
				
				reader.onload = function(ev){
					localStorage.setItem(gridId, reader.result);
					
					$("#gs-upload-" + gridId).remove();
					gridster.uploadFlag = false;
				}
			}
		});
		
		$("#gs-upload-close-" + gridId).click(function() {
			$("#gs-upload-" + gridId).remove();
			gridster.uploadFlag = false;
		});
		
		gridster.uploadFlag = true;
	});
	
	
	//grid追加・削除したgrid情報の反映処理は未作成
	
	/**
	*	grid追加
	**/
	$("#gs-button-add-" + gridId).click(function() {
		if (!gridster.drag_api.disabled) {
			try {
				gridster.beforeAdd();
				var html = gridster.add_widget('<' + gridster.options.widget_selector + '>', 1, 1);
				gridster.afterAdd(html);
			} catch (e) {
			}
		}
	});
	
	/**
	*	grid削除
	**/
	$("#gs-button-remove-" + gridId).click(function() {
		if (!gridster.drag_api.disabled) {
			if (gridster.removeFlag) {
				gridster.removeFlag = false;
			} else {
				gridster.removeFlag = true;
			}
		}
	});
	
	$(gridster.$el).on('click', '.gs-w', function(event) {
		if ((gridster.removeFlag != null) && (gridster.removeFlag)) {
			if (confirm('are you sure delete')) {
				try {
					gridster.beforeRemove(event.target);
					$(event.target).remove();
					gridster.afterRemove();
				} catch (e) {
				}
				gridster.removeFlag = false;
			}
		}
	});	
};

/********************************************************************************
*	Gridster.Service
*********************************************************************************/
/**
*	add,remove処理
*
*	
**/
Gridster.prototype.beforeAdd = function() {
}

Gridster.prototype.afterAdd = function($addElem) {
}

Gridster.prototype.beforeRemove = function(eventTarget) {
}

Gridster.prototype.afterRemove = function() {
}

/********************************************************************************
*	Gridster.Service
*********************************************************************************/
Gridster.Service = {};

/**
*	gridster保存情報取得・属性反映
*
*	@params string gridster ID
**/
Gridster.Service.sortConfig = function(id) {
	var gridster = this;
	var storage;
	if ((storage = localStorage.getItem(id)) != null) {
		try {
			try {
				var json = lzbase62.decompress(storage);
			} catch (e) {
				var json = storage;
			}
			
			var data = JSON.parse(json);
			
			$.each(data, function(idx, obj) {
				$("#" + obj.id).attr({
					"data-col" : obj.col,
					"data-row" : obj.row,
					"data-sizex" : obj.size_x,
					"data-sizey" : obj.size_y
				});
			});
		} catch(e){
		}
	}
};
