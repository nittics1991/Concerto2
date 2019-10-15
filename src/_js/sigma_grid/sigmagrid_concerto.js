/*-------------------------------------------------------------------------------
*	Sigmagrid for Concerto
*	
*	@import lzbase62 encoding.js [jquery-ui(datepicker)] [jquery-ui(sortable)]
*	
*--------------------------------------------------------------------------------*/

/********************************************************************************
*	OverRide
*********************************************************************************/
/**
*	ツールバーでスキンを変更した時に、スキン情報が変わらない
*	ツールバーでスキンを変更した時に、メニュー表示が閉じない
**/
Sigma.Grid.changeSkin = function(grid, skinName) {
	grid=Sigma.$grid(grid);
	var classNames=grid.gridDiv.className.split(" ");
	
	for (var i=0;i<classNames.length ;i++ ){
		if (classNames[i].indexOf(Sigma.Const.Grid.SKIN_CLASSNAME_PREFIX)===0){
			classNames[i]='';
		}
	}
	classNames.push(Sigma.Const.Grid.SKIN_CLASSNAME_PREFIX+skinName);
	grid.gridDiv.className=classNames.join(" ");
	
	/*change==>*/
	grid.skin = skinName;
	grid.closeGridMenu();
	/*<==change*/
}

/**
*	IE11でcustomHeaderを設定するとfrozen列設定ででエラー停止する
**/
Sigma.isIE11 = window.navigator.userAgent.toLowerCase().indexOf("trident") > -1;

Sigma.ColumnDefault.freezeCell = function(row, freezeTable ,freezeRow,rowNo,colNo,cellTemplate,grid,isHead){
		if (!grid.hasIndexColumn){
			freezeRow= row.cloneNode(false);
			freezeRow.id="";
			freezeRow.appendChild(cellTemplate.cloneNode(true));
			freezeTable.appendChild(freezeRow);
		}
		var colL=row.cells[colNo].cloneNode(true);
		freezeRow.appendChild(colL);
		if (isHead && rowNo===0){
			this.frozenHeadCell = colL;
			this.frozenSortIcon = Sigma.Grid.getSortIcon(this,this.frozenHeadCell);
			this.frozenHdTool = Sigma.Grid.getHdTool(this,this.frozenHeadCell);
			
			/*change==>*/
			//if (!Sigma.isIE){
			
			try {
				Sigma.Grid.initColumnEvent(grid,this,this.frozenHeadCell,this.frozenSortIcon);
			} catch(e) {
			}
				
			//}
			/*<==change*/
		}
	}

/**
*	IE9以降frozen列のソートが出来ない
*	customHeadでソートが出来ない
*	注意：customHeadの場合、移動列と固定列でクリックに反応するセルが異なる
*		customHeadの移動列イベント設定に改造が必要(initColumnEvent()??)
**/
Sigma.GridDefault.updateFreezeState = function(){
		if (this.frozenColumnList){
			var i,colObj;
			
			for (i=0;i<this.frozenColumnList.length;i++){
				colObj= this.columnMap[ this.frozenColumnList[i] ];
				if (colObj)	{
					this.moveColumn( colObj.colIndex ,i,true );
				}
			}
			
			for (i=0;i<this.frozenColumnList.length;i++){
				colObj= this.columnMap[ this.frozenColumnList[i] ];
				if (colObj)	{
					colObj.freeze(true);
				}
			}
			
			
			/*change==>*/
			var grid = this;
			var gtFreezeTable = Sigma.$byId(grid.id + '_headTable_freeze');
			//var gtFreezeRow = gtFreezeTable.childNodes[0].childNodes[0];
			
			
			var grid = this;
			
			for (var x=0; x<gtFreezeTable.childNodes[0].childNodes.length; x++) {
				var gtFreezeRow = gtFreezeTable.childNodes[0].childNodes[x];
				
				for (i=0; i<this.frozenColumnList.length; i++) {
					colObj= this.columnMap[this.frozenColumnList[i]];
					
					
					
					var clsName = ("gt-col-" + grid.id + "-" + this.frozenColumnList[i]).toLowerCase();
					var headCell = null;
					
					for (var y=0; y<gtFreezeRow.childNodes.length; y++) {
						if (gtFreezeRow.childNodes[y].className == clsName) {
							headCell = gtFreezeRow.childNodes[y];
							break;
						}
					}
					
					if (headCell == null) {
						continue;
					}
					
					
					
					
					
					Sigma.U.addEvent(headCell,"mousedown",function(event){
						grid.activeMe();
						if (grid.endEdit()===false){
							return;
						}
						grid.closeGridMenu();
						if (!grid.customHead ){
							Sigma.U.stopEvent(event);
							Sigma.Grid.startColumnMove(event,colObj);
						}
					} );
					
					//oncontextmenu
					
					Sigma.U.addEvent(headCell,'click',function(event){
						colObj = arguments[1];
						
						// Sigma.U.stopEvent(event);
						var et =Sigma.U.getEventTarget(event);
						if ( !grid.isColumnResizing ){
							Sigma.$invoke(grid,'onHeadClick',[event,headCell,colObj,grid]);
		
							if (  Sigma.U.getTagName(et)=='INPUT' && et.type=='checkbox' && Sigma.U.hasClass(et,'gt-f-totalcheck')  ){
								Sigma.checkTotalBox(et,grid,colObj);
							}else if (colObj.sortable && et.className!='gt-hd-button' )	{
								grid.lastAction='sort';
								grid.sorting=true;
								var sortOrder = colObj.sortOrder=='asc'?'desc': (colObj.sortOrder=='desc'&& colObj.enableDefaultSort ?'defaultsort':'asc');
								var si=grid.createSortInfo(colObj);si.sortOrder=sortOrder;
								grid.addSortInfo(si);
								//grid.showWaiting();
								//todo : 
								//Sigma.$thread(function(){
									grid.sortGrid( );
								//} );
		
							}
						}
						
						if ( Sigma.isOpera ){
							grid.isColumnResizing=false;
						}
					}, null , colObj);
					
					if (!colObj.sortable && !colObj.resizable && colObj.hdTool){
						colObj.hdTool.style.display="none";
					}
				}
			
			}	//END rows loop
			
			/*<==change*/
		}
	}

/**
*	render前処理を追加
*
*	@example gridOption.beforeRender = function() {
*				alert("TEST");
*			}
**/
Sigma.GridDefault.beforeRender = Sigma.$empty;

Sigma.GridDefault.render = function(container){
		if(!this.rendered){
			container=Sigma.getDom(container);
			this.container =container||this.container;
			
			/*change==>*/
			Sigma.$invoke(this,'beforeRender')
			/*change==>*/
			
			this.initColumns();
			this.initCSS();
			this.createMain();
			this.createFormIFrame();
			this.createGridGhost();
			this.initToolbar();
			this.initMainEvent();
			this.createBody();
			this.rendered = true;
		}
		return this;
	}

/**
*	IE9/10でcreateElementの引数に'<div>'と山かっこが使えなくなった
**/
Sigma.$element = function(el,props){
		if (Sigma.$type(el,'string') ){
			if (Sigma.isIE && props && (props.name || props.type)){
				var name = (props.name) ? ' name="' + props.name + '"' : '';
				var type = (props.type) ? ' type="' + props.type + '"' : '';
				delete props.name;
				delete props.type;
				el = '<' + el + name + type + '>';
			}
			
			/*change==>*/
			//el = Sigma.doc.createElement(el);
			
			if (el.substr(0,1) == '<') {
				var pos = el.indexOf(' ');
				var element = el.substr(1, pos-1);
				var parent = document.createElement(element);
				parent.innerHTML=el;
				el = parent.firstChild;
			} else {
				el = Sigma.doc.createElement(el);
			}
			/*<==change*/
			
		}
		if (props){
			if (props.style){
				Sigma.$extend(el.style,props.style);
				delete props.style;
			}
			Sigma.$extend(el,props);
		}
		return el;
	};

Sigma.$e = Sigma.$element;

/**
*	チェックボックスのname属性を行毎別々に
**/
Sigma.Grid.createCheckColumn = function(grid,cfg){
			var id = cfg.id;
			grid=Sigma.$grid(grid);
			var gridId=grid.id;
			var checkValid = cfg.checkValid;
			var checkValue = cfg.checkValue;
			var checkType=cfg.checkType || 'checkbox';
			
			if (!checkValue){
				checkValue = Sigma.$chk(cfg.fieldIndex)?
						// checkValue/cfg.fieldIndex bug ?? 
				//'grid.getColumnValue("'+checkValue+'",record);'
				//'grid.getColumnValue("'+cfg.fieldIndex+'",record);' 
					'record["'+cfg.fieldIndex+'"];'	: 'grid.getUniqueField(record);';
			}
			if (typeof checkValue == 'string'){
				//
				checkValue = new Function( 'value' ,'record','col','grid','colNo','rowNo',
					[
						'return ', checkValue
					].join('')
					);
			}
			
			if (!checkValid){
				checkValid = function(cvalue ,value,record,colObj,_g,colNo,rowNo){
					//return record.isChecked;
					return _g.checkedRows[cvalue];
				};
			}
			
			cfg.header='';
			cfg.title= cfg.title || grid.getMsg('CHECK_ALL');
			cfg.width=30;
			cfg.resizable = false ;  
			cfg.printable = false ; 
			cfg.sortable = false ;
			var checkBoxName= 'gt_'+gridId+'_chk_'+id ;
			
			cfg.hdRenderer = function(h,c,_g){
						return '<input type="'+checkType+'" class="gt-f-totalcheck" name="'+checkBoxName+'" />';
					};
			cfg.renderer = function(value ,record,colObj,_g,colNo,rowNo){
						var cvalue= checkValue(value ,record,colObj,_g,colNo,rowNo);
						var checkFlag= checkValid(cvalue,value ,record,colObj,_g,colNo,rowNo)?'checked="checked"':'';

			/*change==>*/
						//return '<input type="'+checkType+'" class="gt-f-check" value="'+cvalue+'" '+checkFlag+' name="'+checkBoxName+'" />';
						return '<input type="'+checkType+'" class="gt-f-check" value="'+cvalue+'" '+checkFlag+' name="'+checkBoxName + rowNo +'" />';
			/*<==change*/
					};
			return cfg;
		}

/**
*	ツールバー NO DATA表示バグ修正
**/
Sigma.GridDefault.refreshToolBar = function(pageInfo,doCount){
		pageInfo && ( this.setPageInfo(pageInfo) );
		if (this.over_initToolbar){
			this.navigator.refreshState(pageInfo,doCount);
			this.navigator.refreshNavBar();
			var pageInput= this.navigator.pageInput;
			if (this.pageStateBar){
				pageInfo=this.getPageInfo();
				//this.pageStateBar.innerHTML="";
				Sigma.U.removeNode(this.pageStateBar.firstChild);
				
				/*change==>*/
				//if (pageInfo.endRowNum-pageInfo.startRowNum<1) {
				if ((pageInfo.endRowNum < 1) || (pageInfo.startRowNum < 1)) {
				/*<==change*/
				
					this.pageStateBar.innerHTML= '<div>'+this.getMsg('NO_DATA')+'</div>';
				}else{
					this.pageStateBar.innerHTML= '<div>'+Sigma.$msg( this.getMsg( pageInput?'PAGE_STATE':'PAGE_STATE_FULL') ,
						pageInfo.startRowNum,pageInfo.endRowNum,pageInfo.totalPageNum,pageInfo.totalRowNum , pageInfo.pageNum )+'</div>';
				}
			}
		}

	}
	
/**
*	EDITORのdateにjquery UI datepicker使用
**/
Sigma.Editor.EDITORS.date = function(editor){
			editor=new Sigma.Editor(editor);
			var input=Sigma.$e('input',{type:'text',value:editor.defaultValue||'',className:'gt-editor-text',style:{width:'78px',styleFloat :'left'}});
			var button=Sigma.$e('input',{type:'button',value:editor.defaultValue||'',className:'gt-editor-date',styleFloat :'left'});
			editor.dom.style.overflow='hidden';
			editor.dom.appendChild(input);
			editor.dom.appendChild(button);

			editor.setSize = function(w,h){
				this.width=w||this.width;
				this.height=h||this.height;
				if (this.width/1 && this.width>0) {
					this.dom.style.width= ( this.width-1)+'px';
				}
				if (this.height/1 && this.height>0) {
					this.dom.style.height= ( this.height-1)+'px';
				}
				this.dom.firstChild.style.width= ( this.width-20)+'px';
			};


			var fillDate=function(calObj){
				editor.onClose && editor.onClose();
				calObj.hide();
			};
			
			
		/*change==>*/
		try {
			$(function() {
				$.datepicker.setDefaults($.datepicker.regional["ja"]);
				$(input).datepicker({
					dateFormat:"yy-mm-dd"
					, changeMonth: true
					, changeYear: true
					, onChangeMonthYear:function(year, month, obj) {
						editor.onChangeMonthYear = true;
					}
				});
				$(".ui-datepicker").draggable();
			});
		} catch(e) {
		/*<==change*/
			
			var showCalendar=function(){
				var format= editor.format ||  "%Y-%m-%d";
				format=Sigma.U.replaceAll(format,"yyyy","%Y");
				format=Sigma.U.replaceAll(format,"MM","%m");
				format=Sigma.U.replaceAll(format,"dd","%d");
				format=Sigma.U.replaceAll(format,"HH","%H");
				format=Sigma.U.replaceAll(format,"mm","%M");
				format=Sigma.U.replaceAll(format,"ss","%S");
				Sigma.Calendar.trigger({
					inputField     :    input,			// id of the input field
					ifFormat       :    format,       // format of the input field
					showsTime      :    true,            // will display a time selector
					button         :    "date_button",   // trigger for the calendar (button ID)
					singleClick    :    true, 
					onClose	: fillDate,
					step           :    1                // show all years in drop-down boxes (instead of every other year as default)
				});

			};
			
		
		/*change==>*/
		}
		/*<==change*/
		
		
			
			
			Sigma.U.addEvent(button,'click',showCalendar);

			editor.valueDom=input;
			return editor;
		}

/**
*	jQuery UI datepickerで月替えが出来ない対応
**/
Sigma.GridDefault.endEdit = function(){
				
				/*change==>*/
				//IE
				var event = window.event;
				
				if ((event) && (event.srcElement.className.match(/ui-/))) {
					var target = event.srcElement.parentNode;
					var max = 10;
					do {
						try {
							if (target.className.match(/ui-datepicker/)) {
								return;
							}
							target = target.parentNode;
						} catch(e) {
						}
						max--;
					} while(max > 0);
				}
				
				//firefox
				if (this.activeEditor && this.activeEditor.onChangeMonthYear === true) {
					this.activeEditor.onChangeMonthYear = false;
					return;
				}
				/*<==change*/
				
				
				
		if (this.activeEditor && this.activeEditor.locked===true
			|| (this.activeDialog!=this.activeEditor)  && this.activeDialog && !this.activeDialog.hidden
		){
			return false;
		}
		if (this.activeCell && this.activeEditor && (this.activeColumn.editable || this.isInsertRow(this.activeRow ) ) ) {
			this.hideEditor();
			this.editing=false;
			this.syncTwinRowCell(null,this.activeCell);
		}

	};

/**
*	Ctrl+Cでクリップボードコピー
*	Ctrl+Aで全データ選択
**/
Sigma.GridDefault._onKeydown = function(event){
				var oldCell=this.activeCell;
				var newCell=null;
				var kcode=event.keyCode;
				var grid=this;

				function editCell(_cell){
					if (_cell){
						grid.endEdit();
						Sigma.U.stopEvent(event);
						Sigma.Grid.handleOverRowCore(event,grid,_cell.parentNode);
						grid.initActiveObj_startEdit(event,_cell);
					}
				}

				if (kcode ==  Sigma.Const.Key.ESC) {
					if (this.endEdit()===false){
						return;
					}else{
						Sigma.U.stopEvent(event);
					}

				}else if (kcode ==  Sigma.Const.Key.ENTER) {
					var et =Sigma.U.getEventTarget(event);
					if (this.editing && Sigma.U.getTagName(et)=='TEXTAREA') {
						return;
					}		
					Sigma.U.stopEvent(event);
					if (this.editing) {
						if ( !this.autoEditNext){
							this.endEdit();
							return;
						}
						newCell= this._nextEditableCell(oldCell);
						editCell(newCell);							
					}else{
						this.syncActiveObj(newCell);
						this.startEdit();
					}
				}else if (this.editing && kcode ==  Sigma.Const.Key.TAB && event.shiftKey) {
					newCell= this._prveEditableCell(oldCell);
					editCell(newCell);
				}else if (this.editing && kcode ==  Sigma.Const.Key.TAB) {
					newCell= this._nextEditableCell(oldCell);
					editCell(newCell);
				}else if (oldCell && !this.editing){
					switch (kcode){
						case Sigma.Const.Key.LEFT :
						case Sigma.Const.Key.TAB :
							
							/*change==>*/
							//mouseover
							if (typeof jQuery != "undefined") {
								if (Sigma.GridDefault.mousehover[grid.id] != true) {
									return;
								}
							}
 							/*<==change*/
							
							
							if (kcode==Sigma.Const.Key.LEFT || event.shiftKey){
								newCell= this._prveEditableCell(oldCell);
								while (this.isGroupRow(newCell)){
									newCell= this._prveEditableCell(newCell);
								}
								break;
							}
						case Sigma.Const.Key.RIGHT :
							newCell= this._nextEditableCell(oldCell);
							while (this.isGroupRow(newCell)){
								newCell= this._nextEditableCell(newCell);
							}
							break;
						case Sigma.Const.Key.DOWN :
							newCell= Sigma.U.nextElement(oldCell.parentNode);
							while (this.isGroupRow(null,newCell)){
								newCell= Sigma.U.nextElement(newCell);
							}
							if (newCell){
								newCell=newCell.cells[ Sigma.U.getCellIndex(oldCell) ];
							}
							break;
						case Sigma.Const.Key.UP :
							newCell= Sigma.U.prevElement(oldCell.parentNode);
							while (this.isGroupRow(null,newCell)){
								newCell= Sigma.U.prevElement(newCell);
							}
							if (newCell){
								newCell=newCell.cells[ Sigma.U.getCellIndex(oldCell)];
							}
							break;
						
						/*change==>*/
						//Ctrl+C => clipboad copy
						case 67:
							
							//mouseover
							if (typeof jQuery != "undefined") {
								if (Sigma.GridDefault.mousehover[grid.id] != true) {
									return;
								}
							}
							
							if (event.ctrlKey) {
								if (window.getSelection().rangeCount == 0) {
									var records =  grid.getSelectedRecords() || [];
                                    /*
									var str = '';
									
									var fields = grid.dataset.fields;
									var tmp = '';
									for (var i=0; i<fields.length; i++) {
										tmp += ',' + fields[i].name;
									}
									tmp += '\r';
									str += tmp.substr(1);
                                    
									for (var i=0; i<records.length; i++) {
										var tmp = '';
										for (var j=0; j<records[i].length; j++) {
											tmp += ',' + records[i][j];
										}
										tmp += '\r';
										str += tmp.substr(1);
									}
                                    
									clipboardData.setData("text", str);
                                    
                                    */
                                    
                                    if (event.shiftKey){
                                        var tmp = [];
                                        var str = '';
                                        
                                        for (var x in records) {
                                            for (var y in records[x]) {
                                                tmp.push(records[x][y]);
                                            }
                                            str += tmp.join(',') + '\n';
                                            tmp = [];
                                        }
                                    } else {
                                        str = grid.activeValue;
                                    }
                                    clipboardData.setData("text", str);
								}
							}
							break;
						//Ctrl+A => all select rows
						case 65:
							
							//mouseover
							if (typeof jQuery != "undefined") {
								if (Sigma.GridDefault.mousehover[grid.id] != true) {
									return;
								}
							}
							
							if (event.ctrlKey) {
								grid.forEachRow(function(row, record, counter, grid) {
									grid.selectRow(row, true);
								});
								event.preventDefault();
							}
							break;
 							/*<==change*/
					}
					
					if (newCell) {
						Sigma.U.stopEvent(event);
						var or=oldCell.parentNode,nr=newCell.parentNode;
						//if (or!= nr){
							//this.unselectRow(or);
							this._onRowSelect(nr,event);
							Sigma.Grid.handleOverRowCore(event,this,nr);
						//}
						
						this.initActiveObj(event,newCell);
					}

				}


	};

/**
*	gridのmouse hover取得
*
**/
Sigma.GridDefault.initMainEvent = function(){

		var grid=this;

		Sigma.initGlobalEvent();

		if (grid.monitorResize){
			Sigma.U.addEvent(window, 'resize' ,function(event){
				grid._onResize();
			});
			grid.hasResizeListener=true;
		}
		
		Sigma.U.addEvent(grid.gridDiv,'mousedown',	function(event){ grid.activeMe(); } ) ;
	
		grid.bindEvent(grid.bodyDiv,"scroll");
		grid.bindEvent(grid.bodyDiv,"click");
		grid.bindEvent(grid.bodyDiv,"dblclick");
		grid.bindEvent(grid.bodyDiv,"contextmenu");

		grid.bindEvent(grid.freezeBodyDiv,"click");
		grid.bindEvent(grid.freezeBodyDiv,"dblclick");
		

		Sigma.U.addEvent(grid.headDiv,'selectstart',function(event){ Sigma.U.stopEvent(event);return false;});

		grid.bindEvent(grid.bodyDiv,"mouseover");
		grid.bindEvent(grid.bodyDiv,"mouseout");
		grid.bindEvent(grid.bodyDiv,"mousemove");
		grid.bindEvent(grid.freezeBodyDiv,"mousemove");


		// todo : when mouseout ... ?
		function overHdCell(event){ 
			//Sigma.U.stopEvent(event);
			event=event||window.event;
			var cell=Sigma.U.getParentByTagName("td",null,event);
			if (cell){
				Sigma.U.addClass( cell ,'gt-hd-row-over');
			}
			if (grid.lastOverHdCell!=cell){
				Sigma.U.removeClass( grid.lastOverHdCell ,'gt-hd-row-over');
			}
			grid.lastOverHdCell=cell;
		}

		Sigma.U.addEvent(grid.headTable,'mousemove',overHdCell);
		Sigma.U.addEvent(grid.freezeHeadTable,'mousemove',overHdCell);



		/*change==>*/
		try {
			$("#" + grid.id + "_div").hover(
				function () {
					Sigma.GridDefault.mousehover[grid.id] = true;
				},
				function () {
					Sigma.GridDefault.mousehover[grid.id] = false;
				}
			);
		} catch (e) {
		}
		/*<==change*/


	};
	
/*change==>*/
Sigma.GridDefault.mousehover = [];
/*<==change*/



/**
*	Ctrl+Cでクリップボードコピー
*		マウス選択した文字(selection)をマウスクリックでリセットする
**/
Sigma.GridDefault._onBodyClick = function(event,dbl,bodyEl,ets){
			this.endEdit();
			this.activeMe();

			var cell = ets.cell , row ;

			if (!cell || cell==bodyEl ){
				return;
			}
			
			cell= this.getTwinCells(cell)[0];
			if (cell) {
				row = cell.parentNode;
			}else{
				row = this.getTwinRows(ets.row)[0];
			}

			var et = ets.eventTarget;
			var clickCheckColum = (Sigma.U.getTagName(et)=='INPUT' && et.className=='gt-f-check');
			if (  clickCheckColum  ){
				Sigma.checkOneBox(et,this);
			}
			
			this._onCellSelect(ets);
			if (!this.selectRowByCheck ){
				this._onRowSelect(row,event);
			}
			//this._onRowSelect(row);

			if (dbl) {
				this._onCellDblClick(event,cell,ets);
				this._onRowDblClick(event,row,ets);
			}else{
				
				
				/*change==>*/
				window.getSelection().removeAllRanges();
				/*<==change*/
				
				
				this._onCellClick(event,cell,ets);
				this._onRowClick(event,row,ets);
			}


			if (!Sigma.U.hasClass(cell,'gt-index-col')){
				this.initActiveObj_startEdit(event,cell,dbl);
			}else{

			}

			this.syncTwinRowCell( null,cell);


		};

/**
*	PAGEボタンポップアップが表示しない
*
**/
Sigma.Navigator.prototype.buildNavTools = function(){
		var grid=Sigma.$grid(this.gridId);

		this.firstPageButton=new Sigma.Button({
				container : grid.toolBar,cls:"gt-first-page", 
				onclick:this.gotoFirstPage,onclickArgs:[this]
				
				/*change==>*/
				, text:grid.getMsg('TOOL_PAGE_FIRST')
				/*<==change*/
				
			} );

		this.prevPageButton=new Sigma.Button({
					container : grid.toolBar,cls:"gt-prev-page", 
					onclick:this.gotoPrevPage,onclickArgs:[this]
				
				/*change==>*/
				, text:grid.getMsg('TOOL_PAGE_PREV')
				/*<==change*/
				
			} );

		this.nextPageButton=new Sigma.Button({
					container : grid.toolBar,cls:"gt-next-page", 
					onclick:this.gotoNextPage,onclickArgs:[this]
				
				/*change==>*/
				, text:grid.getMsg('TOOL_PAGE_NEXT')
				/*<==change*/
				
			} );

		this.lastPageButton=new Sigma.Button({
					container : grid.toolBar,cls:"gt-last-page", 
					onclick:this.gotoLastPage,onclickArgs:[this]
				
				/*change==>*/
				, text:grid.getMsg('TOOL_PAGE_LAST')
				/*<==change*/
				
			});
			
		this.inited=true;
		if (!grid.loading){
			this.refreshState();
		}
};

/**
*	toolbarpos=bottomでもgrid resize対応
*
**/
Sigma.GridDefault.initToolbar = function(){

		if (this.resizable && (this.toolbarPosition=='bottom'||this.toolbarPosition=='b')  && this.toolBarBox){
			this.resizeButton=Sigma.$e("div",{ id:this.id +"_resizeButton",className:"gt-tool-resize", innerHTML:'&#160;'
				});
			this.resizeButton.setAttribute('unselectable','on');
			this.toolBarBox.appendChild(this.resizeButton);
			var grid=this;
			Sigma.U.addEvent(this.resizeButton,"mousedown",function(event){ Sigma.Grid.startGridResize(event,grid); } ) ;
		
		/*change==>*/
		} else if (this.resizable && this.toolBarBox){
			this.resizeButton=Sigma.$e("div",{ id:this.id +"_resizeButton",className:"gt-tool-resize", innerHTML:'&#160;'
				});
			this.resizeButton.setAttribute('unselectable','on');
			
			var stateBar = this.toolBarBox.cloneNode(false);
			stateBar.style.height = "4px";
			stateBar.appendChild(this.resizeButton);
			this.gridDiv.appendChild(stateBar);
			var grid=this;
			Sigma.U.addEvent(this.resizeButton,"mousedown",function(event){ Sigma.Grid.startGridResize(event,grid); } ) ;
		/*<==change*/
		}
		
		this.createGridMenu();

		if (this.toolbarContent && this.toolbarPosition && this.toolbarPosition!='none'){

			this.toolbarContent = this.toolbarContent.toLowerCase();
			var barbutton= this.toolbarContent.split(' ');

				var lastt=null;
				for (var j=0;j<barbutton.length ;j++ ){
					var b=barbutton[j];
					if (b=='|'){
						var sp= Sigma.ToolFactroy.create(this,'separator',true);
						if (lastt){
							lastt.separator=sp;
						}
					}else if (b=='state' || b=="info" || b=='pagestate'){
						if (!this.pageStateBar){
							this.pageStateBar = Sigma.ToolFactroy.create(this,'pagestate',this.showPageState);
						}
						if (j!=barbutton.length-1){
							 this.pageStateBar.className+=' gt-page-state-left';
						}

						lastt=this.pageStateBar;
					}else if (b=="nav") {
						this.navigator.buildNavTools(this);
						lastt = this.navigator;
					}else{
						var ub=b.charAt(0).toUpperCase()+b.substring(1);
						lastt = this.tools[b+'Tool'] = Sigma.ToolFactroy.create(this,b,this['show'+ub+'Tool']);
					}
				}
		}

		this.expendMenu={};

		this.over_initToolbar=true;

		//this.refreshToolBar();

	}

/**
*	ソートを昇順・降順・戻すの３段階化
*		カラムをグループ化すると、グループ列のみ有効
*			他の列をソートすると上手く切り替えない
**/
Sigma.Grid.initColumnEvent = function(grid,colObj,headCell,sortIcon){

			headCell = headCell || colObj.headCell ;
			if(!headCell) { return ;}
			sortIcon = sortIcon || Sigma.Grid.getSortIcon(colObj,headCell);
			var menuButton = Sigma.U.nextElement(sortIcon);
			var separator = Sigma.U.nextElement(menuButton);

			colObj.hdTool = colObj.hdTool || Sigma.Grid.getHdTool(colObj,headCell);
			colObj.sortIcon = colObj.sortIcon || sortIcon;
			colObj.menuButton = colObj.menuButton || menuButton;
			colObj.separator=  colObj.separator || separator;

			if (colObj.separator && colObj.resizable===false) {
				colObj.separator.style.display="none";
			}

			Sigma.U.addEvent(headCell,"mousedown",function(event){
				grid.activeMe();
				if (grid.endEdit()===false){
					return;
				}
				grid.closeGridMenu();
				if (!grid.customHead ){
					Sigma.U.stopEvent(event);
					Sigma.Grid.startColumnMove(event,colObj);
				}

			} );

			//oncontextmenu

			Sigma.U.addEvent(headCell,'click',function(event){
				// Sigma.U.stopEvent(event);
				var et =Sigma.U.getEventTarget(event);
				if ( !grid.isColumnResizing ){
					Sigma.$invoke(grid,'onHeadClick',[event,headCell,colObj,grid]);

					if (  Sigma.U.getTagName(et)=='INPUT' && et.type=='checkbox' && Sigma.U.hasClass(et,'gt-f-totalcheck')  ){
						Sigma.checkTotalBox(et,grid,colObj);
					}else if (colObj.sortable && et.className!='gt-hd-button' )	{
						grid.lastAction='sort';
						grid.sorting=true;
						var sortOrder = colObj.sortOrder=='asc'?'desc': (colObj.sortOrder=='desc'&& colObj.enableDefaultSort ?'defaultsort':'asc');
						var si=grid.createSortInfo(colObj);si.sortOrder=sortOrder;
						grid.addSortInfo(si);
						//grid.showWaiting();
						//todo : 
						//Sigma.$thread(function(){
							
							
							
							/*change==>*/
							
							//grid.sortGrid( );
							grid.sorted = grid.sorted || 0;
							switch (grid.sorted) {
								case 2:
									grid.dataset.resetDataProxy();
									grid.sorting=false;
									grid.refreshGrid();
									grid.sorted = 0;
									
									var sicons = document.getElementsByClassName("gt-hd-desc") || [];
									for (var i=0; i<sicons.length; i++) {
										var ar = sicons[i].className.split(' ') || [];
										var index = ar.indexOf("gt-hd-desc");
										if(index >= 0){
											ar.splice(index, 1);
											sicons[i].className = ar.join(' ');
										}
									}
									break;
								case 1:
									grid.sortGrid( );
									grid.sorted = 2;
									break
								default:
									grid.sortGrid( );
									grid.sorted = 1;
									break
							}
							/*<==change*/
							
							
						//} );

					}
				}
				if ( Sigma.isOpera ){
					grid.isColumnResizing=false;
				}


			} );

			if (colObj.resizable){
					separator.colID=colObj.id;
					separator.style.cursor='col-resize';
					Sigma.U.addEvent(separator,"mousedown",function(event){
						grid.activeMe();
						Sigma.U.stopEvent(event);
						Sigma.Grid.startColumnResize(event,colObj);
					});
			}

			if (!colObj.sortable && !colObj.resizable && colObj.hdTool){
				colObj.hdTool.style.display="none";
			}

	}
	
/**
*	チェックボックスON/OFFでonRowCheckイベントが発生しない
*	チェックボックスON/OFFでupdate
*
**/
Sigma.checkOneBox=function(chkbox, grid,chk){
	grid=Sigma.$grid(grid);
	chkbox=Sigma.$(chkbox);
	if (chkbox.checked==chk){
		return chk;
	}
    
    /*change==>*/
    if (chk === undefined) {
        chk = chkbox.checked;
    }
    /*<==change*/
    
	
	var cell=Sigma.U.getParentByTagName('td',chkbox);
	var row=cell.parentNode;
	var mrow = grid.getTwinRows(row)[0];
	if (chk===true || chk===false){
		
        
        /*change==>*/
        
        // if(Sigma.$invoke(this,'onRowCheck',[mrow, chk, grid])===false){
        if(Sigma.$invoke(grid,'onRowCheck',[mrow, chk, grid])===false){
            
        /*<==change*/
            
		    return !!chkbox.checked;
	    }
		chkbox.checked=chk;
	}
	if (chkbox.checked){
		grid.checkedRows[chkbox.value]=true;
		if (grid.selectRowByCheck){
			grid.selectRow(mrow, true);
		}
	}else{
		delete grid.checkedRows[chkbox.value];
		if (grid.selectRowByCheck){
			grid.selectRow(mrow, false);
		}
	}
	
	/*change==>*/
	
	try {
		record = grid.getRecordByRow(mrow);
		fieldName = grid.checkColumn.fieldIndex;
		grid.update(record, fieldName, chk);
		
		grid.dirty(chkbox.parentNode.parentNode);
		grid.updateEditState();
    } catch (e) {
		//nop
	}
	
	/*<==change*/
	
	return !!chkbox.checked;
};    


/********************************************************************************
*	ダイアログのボタンイベントが伝搬する問題対策
*********************************************************************************/


Sigma.createColumnDialog = function(dType,cfg){

	var checkName= dType+'ColCheck';
	var gridId=cfg.gridId;
	var dialogId= gridId+'_'+dType+'ColDialog';
	var grid=Sigma.$grid(gridId);
    
    
    /*change==>*/
	// var okFn= function(){
	var okFn= function(e){
    /*<==change*/

		var colDiv=Sigma.$( dialogId+'_div');
		var tableObj= (Sigma.U.getTagName(colDiv)=='TABLE')?colDiv: colDiv.getElementsByTagName('table')[0];
		var tbodyObj=tableObj.tBodies[0];
		var inputs= tbodyObj.getElementsByTagName('input');

		var rs=Sigma.U.getCheckboxState(inputs,checkName);
		var gids=[],i;
		for (i=0;i<grid.columnList.length;i++ )	{
			gids.push(grid.columnList[i].id);
		}
		for (i=0;i<gids.length;i++ ){
			var col=grid.columnMap[gids[i]];
			if (rs[col.id]){
				col[cfg.checkFn]();
			}else{
				col[cfg.uncheckFn]();
			}
		}

		if (cfg.autoClose!==false){
			grid._onResize();
			Sigma.WidgetCache[dialogId].close();
		}
        
        /*change==>*/
        Sigma.U.stopEvent(e);
        /*<==change*/

	};

    /*change==>*/
	// var cancelFn= function(){ Sigma.WidgetCache[dialogId].close(); };
	var cancelFn= function(e){
        Sigma.WidgetCache[dialogId].close();
        Sigma.U.stopEvent(e);
    };
    /*<==change*/

	var dialog=new Sigma.Dialog({
		id:  dialogId,
		gridId : gridId ,
		title : cfg.title,
		width  :  260,
		height  :  220 ,
		buttonLayout : 'v',
		body : [
			'<div id="'+dialogId+'_div'+'" onclick="Sigma.clickHandler.onTotalCheck(event)" class="gt-column-dialog" >',
			'</div>'
		].join(''),
		buttons : [
				{ text : grid.getMsg('TEXT_OK') , onclick : okFn },
				{ text : grid.getMsg('TEXT_CLOSE') , onclick : 	cancelFn }
			],
		afterShow : function(){
			var grid=Sigma.$grid(this.gridId);
			var tt=Sigma.createColumnTable(this.gridId, {
					type : "checkbox",
					name : checkName,
					value :  function(r){ return r.id; } ,
					checked : cfg.checkValid,
					checkType : cfg.checkType,
					canCheck : cfg.canCheck
				});
			Sigma.$(this.id+'_div').innerHTML=tt;
		}

 		});

	return  dialog;
};


//////////////////////////////////

Sigma.createFilterDialog = function(cfg){

	var gridId=cfg.gridId;
	var grid=Sigma.$grid(gridId);
	var dialogId= gridId+'_filterDialog';

	// 
	grid.justShowFiltered= cfg.justShowFiltered===true?true :(cfg.justShowFiltered===false?false:grid.justShowFiltered) ;
	grid.afterFilter = cfg.afterFilter || grid.afterFilter  ;

    /*change==>*/
	// var addFn= function(){
	var addFn= function(e){
    /*change==>*/
		if (grid._noFilter){
			clearFn();
			grid._noFilter=false;
		}
		var colSelect=Sigma.$(dialogId+'_column_select');
		if (colSelect && colSelect.options.length>0){
			var cid= colSelect.value;
			var cname=colSelect.options[colSelect.selectedIndex].text;
			Sigma.$(dialogId+'_div').appendChild(Sigma.createFilterItem(grid,cid,cname));
		}
        
        
        /*change==>*/
        Sigma.U.stopEvent(e);
        /*<==change*/
        
	};

    /*change==>*/
	// var clearFn= function(){
	var clearFn= function(e){
    /*<==change*/
		Sigma.$(dialogId+'_div').innerHTML=  '';
        
        
        /*change==>*/
        Sigma.U.stopEvent(e);
        /*<==change*/
        
	};

    /*change==>*/
	// var okFn= function(){
	var okFn= function(e){
    /*<==change*/
		var colDiv=Sigma.$( dialogId+'_div');

		var filterInfo=[];

		var items= colDiv.childNodes;
		for (var i=0;i<items.length;i++ ){
			if (Sigma.U.getTagName(items[i])=="DIV" && items[i].className=='gt-filter-item' ){
				var colS=items[i].childNodes[1];
				var condS=items[i].childNodes[2];
				var f=items[i].childNodes[3].firstChild;
				var cid=Sigma.U.getValue(colS);
				var colObj = grid.columnMap[cid];
				if (colObj && colObj.fieldName){
					filterInfo.push( {
						columnId : cid ,
						fieldName : colObj.fieldName ,
						logic : Sigma.U.getValue(condS),
						value : Sigma.U.getValue(f)
					} );
				}
			}
		}
		if (filterInfo.length>0){
			var rowNos=grid.applyFilter(filterInfo);
		}else{
			grid.applyFilter([]);
		}

		if (cfg.autoClose!==false){
			grid._onResize();
			Sigma.WidgetCache[dialogId].close();
		}

        
        /*change==>*/
        Sigma.U.stopEvent(e);
        /*<==change*/
        
	};

    /*change==>*/
	// var cancelFn= function(){ Sigma.WidgetCache[dialogId].close(); };
	var cancelFn= function(e){
        Sigma.WidgetCache[dialogId].close();
        Sigma.U.stopEvent(e);
    };
    /*<==change*/

	var outW=430 , outH=220;
	var inW= outW-(Sigma.isBoxModel?16:18) , inH= outH-(Sigma.isBoxModel?93:95);
	var dialog=new Sigma.Dialog({
		id:  dialogId,
		gridId : gridId ,
		title : cfg.title,
		width  :  outW,
		height  :  outH ,
		buttonLayout : 'h',
		body : [
			'<div id="'+dialogId+'_div" class="gt-filter-dialog" style="width:'+inW+'px;height:'+inH+'px;" onclick="Sigma.clickHandler.onFilterItem(event)" >',
			'</div>'
		].join(''),
		buttons : [
				{ html : Sigma.createColumnSelect(grid,dialogId+'_column_select') },
				{ text : grid.getMsg('TEXT_ADD_FILTER') , onclick : addFn },
				{ text : grid.getMsg('TEXT_CLEAR_FILTER') , onclick : clearFn },
				{ breakline : true },
				{ text : grid.getMsg('TEXT_OK') , onclick : okFn },
				{ text : grid.getMsg('TEXT_CLOSE') , onclick : cancelFn }
			],
		afterShow : function(){
			var grid=Sigma.$grid(this.gridId);
			var filterInfo=grid.filterInfo||[];
			clearFn();
			for (var i=0;i<filterInfo.length;i++ ){
				var cid=filterInfo[i].columnId;
				var col=grid.getColumn(cid);
				var cname=(col.header||col.title);
				var tt= Sigma.createFilterItem(grid,cid,cname);
				var colS= tt.childNodes[1];
				var condS= tt.childNodes[2];
				var f= tt.childNodes[3].firstChild;
				Sigma.U.setValue(colS,cid);
				Sigma.U.setValue(condS,filterInfo[i].logic);
				Sigma.U.setValue(f,filterInfo[i].value);
				Sigma.$(this.id+'_div').appendChild(tt);
			}
			if (filterInfo.length<1){
				Sigma.$(this.id+'_div').innerHTML='<div style="color:#999999;margin:10px;">'+grid.getMsg('DIAG_NO_FILTER')+'</div>';
				grid._noFilter=true;
			}
		}

 		});

	return  dialog;
};


Sigma.clickHandler ={

	currentElement : null,

	onFilterItem : function(evt){
			evt=evt || window.event;
			var et= Sigma.U.getEventTarget(evt);
			var tableObj = Sigma.U.getParentByTagName('table',null,evt,10);

			if ( Sigma.U.getTagName(et)=='BUTTON' ){
				var className=' '+et.className;
				var item=et.parentNode;
				if (className.indexOf(' gt-filter-del')>=0 ){
					Sigma.U.removeNode(item);
				}else if (className.indexOf(' gt-filter-up')>=0 ){
					var p_item=item.previousSibling;
					if(p_item){
						item.parentNode.insertBefore(item,p_item); 
					}
				}else if (className.indexOf(' gt-filter-down')>=0 ){
					var n_item=item.nextSibling;
					if(n_item){
						item.parentNode.insertBefore(n_item,item); 
					}
				}
			}
        
        
            /*change==>*/
            //stopEventすると、チェックボックスやラジオボタンが選択できない
            Sigma.U.stopEvent(evt);
            /*<==change*/
        

		},

	onTotalCheck : function(evt){
			evt=evt || window.event;
			var et= Sigma.U.getEventTarget(evt);
			var tableObj = Sigma.U.getParentByTagName('table',null,evt,10);

			if (!et || ( et.type!='checkbox' &&  et.type!='radio' ) ){
				return;
			}

			if ( Sigma.U.hasClass(et,'gt-f-totalcheck') ){

				var tbodyObj=tableObj.tBodies[0];
				var inputs= tbodyObj.getElementsByTagName('input');

				for (var i=0;i<inputs.length ;i++ ){
					if (inputs[i].name==et.name && inputs[i].type==et.type){
						inputs[i].checked=et.checked;
					}
				}
			}else if ( Sigma.U.hasClass(et,'gt-f-check') ){
				var theadObj=tableObj.tHead;
				var tinput=theadObj.getElementsByTagName('input')[0];
				if (tinput){
					tinput.checked=false;
				}
			}
            
            
            /*change==>*/
            //stopEventすると、チェックボックスやラジオボタンが選択できない
            // Sigma.U.stopEvent(evt);
            /*<==change*/
        
		}

};


/********************************************************************************
*	OverLoad
*********************************************************************************/
/**
*	ツールチップにmessage文を表示
**/
Sigma.GridDefault.showCellToolTip = function(cell,width,message){
	if (!this.toolTipDiv) {
		this.toolTipDiv=Sigma.$e("div",{className : 'gt-cell-tooltip gt-breakline'});
		this.toolTipDiv.style.display="none";
	}
	
	/*change==>*/
	if (message != null) {
		this.toolTipDiv.innerHTML=message;
	} else {
		this.toolTipDiv.innerHTML=Sigma.$getText(cell);
	}
	/*<==change*/
	
	this.gridDiv.appendChild(this.toolTipDiv);
	this.toolTipDiv.style.left=cell.offsetLeft+ this.bodyDiv.offsetLeft- this.bodyDiv.scrollLeft + ((Sigma.isFF2 || Sigma.isFF1)?0:this.tableMarginLeft)  + 'px';
	this.toolTipDiv.style.top=cell.offsetTop+cell.offsetHeight + this.bodyDiv.offsetTop- this.bodyDiv.scrollTop+ this.toolBarTopHeight+(Sigma.isFF?1:0) +'px';
	width && (this.toolTipDiv.style.width=width +'px');
	
	/*change==>*/
	var w = window.innerWidth || document.documentElement.clientWidth;
	var h = window.innerHeight || document.documentElement.clientHeight;
	
	var tl = parseInt(this.toolTipDiv.style.left.substr(0, this.toolTipDiv.style.left.length -2));
	if (tl + width > w) {
		this.toolTipDiv.style.left = tl - width + "px";
	}
	
	var tt = parseInt(this.toolTipDiv.style.top.substr(0, this.toolTipDiv.style.top.length -2));
	if (tt + cell.offsetHeight > h) {
		this.toolTipDiv.style.top = tt - cell.offsetHeight + "px";
	}
	/*<==change*/
	
	this.toolTipDiv.style.display="block";
}

/********************************************************************************
*	Cookie
*********************************************************************************/
/**
*	@val Cookie保存期間
**/
Sigma.CONFIG_SAVE_EXPIRES = 1000*60*60*24*30*1;

/**
*	CONSTRUCT
*	
*	@param integer 期限
*	@param string パス
**/
Sigma.Cookie = function(expire, path) {
	this.expire = expire;
	this.path = path;
};

/**
*	Cookie登録
*	
*	@param string 名前
*	@param string データ
*	@return object this
**/
Sigma.Cookie.prototype.set = function(name, value) {
	var now = new Date();
	now.setTime(now.getTime() + this.expire);
	var exday = now.toGMTString();
	
	var compressed;
	try {
		compressed = lzbase62.compress(value);
	} catch (e) {
		compressed = value;
	}
	
	var path = (this.path)?	';path=' + this.path:';';
	return document.cookie = name + "=" + compressed + ";expires=" + exday + path;
};

/**
*	Cookie取得
*	
*	@param string 名前
*	@return string データ
**/
Sigma.Cookie.prototype.get = function(name) {
	var cookies = document.cookie.split(';');
	for (var i=0; i<cookies.length; i++) {
		if (cookies[i].substr(0, name.length+1) == (name+"=")) {
			var tmp = cookies[i].substr(name.length+1)
			try {
				return lzbase62.decompress(tmp);
			} catch (e) {
				return tmp[1];
			}
			break;
		}
	}
};

/**
*	Cookie削除
*	
*	@param string 名前
*	@return object this
**/
Sigma.Cookie.prototype.del = function(name) {
	var now = new Date();
	now.setTime(now.getTime() - 60);
	var exday = now.toGMTString();
	return document.cookie = name + "='';expires=" + exday;
};

/********************************************************************************
*	Web Storage
*********************************************************************************/
/**
*	CONSTRUCT
*	
*	@param integer 期限
*	@param string パス
**/
Sigma.Storage = function() {
};

/**
*	Storage登録
*	
*	@param string 名前
*	@param string データ
*	@return bool 
**/
Sigma.Storage.prototype.set = function(name, value) {
	var compressed;
	try {
		compressed = lzbase62.compress(value);
	} catch (e) {
		compressed = value;
	}
	
	try {
		localStorage.setItem(name, compressed);
		return true;
	} catch (e) {
		return false;
	}
};

/**
*	Storage取得
*	
*	@param string 名前
*	@return string データ
**/
Sigma.Storage.prototype.get = function(name) {
	var compressed = localStorage.getItem(name);
	
	if (compressed != null) {
		try {
			return lzbase62.decompress(compressed);
		} catch (e) {
			return compressed;
		}
	} else {
		return null;
	}
};

/**
*	Storage削除
*	
*	@param string 名前
*	@return object this
**/
Sigma.Storage.prototype.del = function(name) {
	try {
		localStorage.removeItem(name);
		return this;
	
	} catch (e) {
		return null;
	}
};

/********************************************************************************
*	Sigma.Unit
*********************************************************************************/
Sigma.Unit = {};

/**
*	ファイルダウンロード処理
*	
*	@param blob blobオブジェクト
**/
Sigma.Unit.download = function(filename, blob) {
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
}

/**
*	ファイルダウンロード(String)
*	
*	@param string ファイル名
*	@param string データ
**/
Sigma.Unit.downloadText = function(filename, text) {
	var blob = new Blob([text], {type: "application/octet-stream"});
	Sigma.Unit.download(filename, blob);
}

/**
*	ファイルダウンロード(Array)
*	
*	@param string ファイル名
*	@param array データ
**/
Sigma.Unit.downloadArray = function(filename, array) {
	var ar = new Uint8Array(array);
	var blob = new Blob([ar], {type: "application/octet-stream"});
	Sigma.Unit.download(filename, blob);
}

/**
*	文字コード変換
*	
*	@param string 文字列
*	@param string 変換後文字コード
*	@return array 変換結果
**/
Sigma.Unit.encodeToArray = function(text, toCode) {
	var ar = Encoding.stringToCode(text);
	return Encoding.convert(ar, toCode, "AUTO");
}

/**
*	ベースファイル名取得
*	
*	@return string ベースファイル名
**/
Sigma.Unit.getBaseFileName = function() {
	var tmp1 = document.URL.split("/");
	var tmp2 = tmp1[tmp1.length-1].split("?");
	var url = tmp2[0].split(".");
	return url[0];
}

/**
*	object空判定
*
*	@param object
*	@return bool
**/
Sigma.Unit.isEmptyObject = function(obj) {
	if (Sigma.$type(obj, 'object')) {
		for (x in obj) {
			return true;
		}
		return false;
	}
	return false;
}

/**
*	gridデータ加算
*
*	@param object gprd
*	@param integer colNo
*	@param bool true:選択行対象 false:全行対象
*	@return int 
**/
Sigma.Unit.sum = function(grid, colNo, selected) {
	var result = 0;
	if (selected) {
		var rec = grid.getSelectedRecords();
	} else {
		var rec = grid.dataset.data;
	}
	
	for (var i=0; i<rec.length; i++) {
		result += parseInt(rec[i][colNo]);
	}
	return result;
};

/**
*	gridデータ平均
*
*	@param object gprd
*	@param integer colNo
*	@param bool true:選択行対象 false:全行対象
*	@return int 
**/
Sigma.Unit.avg = function(grid, colNo, selected) {
	var result = 0;
	var cnt = 0;
	if (selected) {
		var rec = grid.getSelectedRecords();
	} else {
		var rec = grid.dataset.data;
	}
	
	for (var i=0; i<rec.length; i++) {
		var x = parseInt(rec[i][colNo]);
		if (isFinite(x)) {
			result += x;
			cnt++;
		}
	}
	return (cnt > 0)?	(result/cnt):NaN;
};

/**
*	gridデータ最大値
*
*	@param object gprd
*	@param integer colNo
*	@param bool true:選択行対象 false:全行対象
*	@return int 
**/
Sigma.Unit.max = function(grid, colNo, selected) {
	var result = 0;
	var cnt = 0;
	if (selected) {
		var rec = grid.getSelectedRecords();
	} else {
		var rec = grid.dataset.data;
	}
	
	for (var i=0; i<rec.length; i++) {
		var x = parseInt(rec[i][colNo]);
		if (isFinite(x)) {
			if (x > result) {
				result = x;
				cnt++;
			}
		}
	}
	return (cnt > 0)?	result:NaN;
};

/**
*	gridデータ最大値
*
*	@param object gprd
*	@param integer colNo
*	@param bool true:選択行対象 false:全行対象
*	@return int 
**/
Sigma.Unit.min = function(grid, colNo, selected) {
	var result = 0;
	var cnt = 0;
	var first = true;
	if (selected) {
		var rec = grid.getSelectedRecords();
	} else {
		var rec = grid.dataset.data;
	}
	
	for (var i=0; i<rec.length; i++) {
		var x = parseInt(rec[i][colNo]);
		if (isFinite(x)) {
			if (first) {
				first = false;
				result = x;
				cnt++;
			} else if (x < result) {
				result = x;
				cnt++;
			}
		}
	}
	return (cnt > 0)?	result:NaN;
};

/********************************************************************************
*	Sigma.Service
*********************************************************************************/
Sigma.Service = {};

/**
*	gridOption.columns保存情報取得
*	
*	@param array grid ID
*	@return array gridOption.columns
**/
Sigma.Service.readConfigColumns = function(gridOption) {
	
	if (localStorage) {
		var sigmaCookie = new Sigma.Storage();
	} else {
		var sigmaCookie = new Sigma.Cookie(Sigma.CONFIG_SAVE_EXPIRES);
	}
	
	var json = sigmaCookie.get(Sigma.Unit.getBaseFileName() + '_' + gridOption.id + '_conf');
	if (json != null) {
		var cookie = JSON.parse(json);
		var columns = [];
		
		for (var i=0; i<cookie.columnList.length; i++) {
			for (var j=0; j<gridOption.columns.length; j++) {
				if (gridOption.columns[j].id == cookie.columnList[i].id) {
					op = gridOption.columns[j];
					op.frozen	= cookie.columnList[i].frozen;
					op.hidden	= cookie.columnList[i].hidden;
					op.width	= cookie.columnList[i].width;
					columns.push(op);
				}
			}
		}
		return columns;
	}
}

/**
*	gridOption.toolbatcontentの指定位置にツールバーを追加
*	
*	@param object gridOption
*	@param integer 位置(0～)
*	@param string ツールバー
*	@return string ツールバー
**/
Sigma.Service.addToolbar = function(gridOption, position, toolbar) {
	var tool = gridOption.toolbarContent.split(" ");
	var result = "";
	
	for (var i=0; i<position; i++) {
		result += tool[i] + " ";
	}
	result += toolbar;
	for (var i=position; i<tool.length; i++) {
		result += tool[i] + " ";
	}
	result = result.substr(0, result.length-1);
	return result;
}

/**
*	Skinの初期値確認&登録
*	
**/
Sigma.Service.checkAndSetSkin = function(skin) {
	if (localStorage) {
		var cookie = new Sigma.Storage();
	} else {
		var cookie = new Sigma.Cookie(Sigma.CONFIG_SAVE_EXPIRES);
	}
	
	if (cookie.get('sigma_skin') == null) {
		if (localStorage) {
			var cookie = new Sigma.Storage();
		} else {
			var cookie = new Sigma.Cookie(Sigma.CONFIG_SAVE_EXPIRES, '/');
		}
		cookie.set('sigma_skin', skin);
	}
}

/********************************************************************************
*	追加method
*********************************************************************************/
/**
*	チェックrecord取得
*	
*	@param string カラムID
*	@return array record
**/
Sigma.GridDefault.getCheckedRecords = function(id) {
	var grid = this;
	var name = 'gt_' + grid.id + '_chk_' + id;
	
	var checkbox = document.getElementsByClassName('gt-f-check');
	var sortRowNo;
	var records = [];
	for (var i=0; i<checkbox.length; i++) {
		if (checkbox[i].name.indexOf(name) > -1) {
			if (checkbox[i].checked) {
				sortRowNo = checkbox[i].value;
				records.push(grid.dataset.data[sortRowNo]);
			}
		}
	}
	return records;
}

/**
*	セルに編集マークを付加
*	
*	@param integer row index
*	@param string column id
**/
Sigma.GridDefault.setEditMark = function(rowIndex, colId){
	var grid = this;
	var cell = grid.getCell(rowIndex, colId);
	
	if (cell != null) {
		Sigma.U.addClass(cell, 'gt-cell-updated');
	}
	
	grid.syncTwinRowCell(null,cell);
}

/********************************************************************************
*	CSV出力ボタン
*********************************************************************************/
Sigma.ToolFactroy.tools.csv.onclick = function(event, grid){
	var columnCount = 0;
	var csv = "";
	
	for (var i=0; i<grid.columnList.length; i++) {
		csv += (grid.columnList[i].header + ",");
		columnCount++;
	}
	csv += "\r\n";
	
	grid.forEachRow(function(row, record, i, grid) {
		for (var j=0; j<columnCount; j++) {
			csv += (grid.getCellValue(j, i) + ",");
		}
		csv = csv.substr(0, csv.length-1) + "\r\n";
	});
	
	try {
		var sjis = Sigma.Unit.encodeToArray(csv, "SJIS");
	} catch (e) {
		var sjis = csv;
	}
	
	try {
		Sigma.Unit.downloadArray('dataset.csv', sjis);
	} catch (e) {
		alert("File API unsupported.");
	}
	return;
}

/********************************************************************************
*	gridスキンSAVEボタン
*********************************************************************************/
/**
*	保存スキン読込設定
*	
*	@param object grid
*	@return string スキン
**/
Sigma.GridDefault.renderConfigSkin = function() {
	grid = this;
	try {
		if (localStorage) {
			var cookie = new Sigma.Storage();
		} else {
			var cookie = new Sigma.Cookie(Sigma.CONFIG_SAVE_EXPIRES);
		}
		
		if ((skin = cookie.get('sigma_skin')) != null) {
			
			for (var i=0; i<grid.skinList.length; i++) {
				if (grid.skinList[i].value == skin) {
					grid.setSkin(skin);
					break;
				}
			}
		}
	} catch (e) {
	}
}

Sigma.ToolFactroy.register(
	'skin',
	{
		cls:'sigmagrid-button-skin',  
		toolTip:'スキン保存',
		action:function(event,grid) {
			grid.showWaiting();
			
			if (localStorage) {
				var cookie = new Sigma.Storage();
			} else {
				var cookie = new Sigma.Cookie(Sigma.CONFIG_SAVE_EXPIRES, '/');
			}
			
			cookie.set('sigma_skin', grid.getSkin());
			grid.hideWaiting();
			alert("new grid skin:" + grid.getSkin());
		}
	}
);

/********************************************************************************
*	grid行COPY,PASTE処理ボタン
*		コピー元のデータを変更するとコピー先へ反映される
*********************************************************************************/
Sigma.GridDefault.stack = null;
Sigma.GridDefault.beforePaste = null;

Sigma.ToolFactroy.register(
	'copy',
	{
		cls:'sigmagrid-button-copy',  
		toolTip:'行コピー',
		action:function(event,grid) {
			grid.stack = grid.getSelectedRecords();
		}
	}
);

Sigma.ToolFactroy.register(
	'paste',
	{
		cls:'sigmagrid-button-paste',  
		toolTip:'行追加貼り付け',
		action:function(event,grid) {
			
			try {
				grid.beforePaste();
			} catch(e) {
			}
			
			if (grid.stack != null) {
				for (var i=0; i< grid.stack.length; i++) {
					grid.addRow(grid.stack[i]);
				}
				
			} else {
				alert("There is no copy data");
			}
		}
	}
);

/********************************************************************************
*	gridセルCOPY,PASTE処理ボタン
*********************************************************************************/
Sigma.GridDefault.selectedCellValue = {};

Sigma.ToolFactroy.register(
	'cellcopy',  
	{
		cls : 'sigmagrid-button-cellCopy',  
		toolTip : 'セルコピー',
		action : function(event, grid) {
			if ((grid.activeColumn != null) && (grid.activeColumn.editor != null)) {
				var columnId = grid.activeColumn.id;
				var rowNo = grid.activeRow.rowIndex;
				var value = grid.getCellValue(columnId, rowNo);
				var columnNo = grid.activeColumn.colIndex;
				var fieldNo = grid.dataset.indexOf(columnId);
				
				grid.selectedCellValue = (typeof value == 'string')?
					{columnId:columnId, columnNo:columnNo, fieldNo:fieldNo, value:value}:null;
			}
		}
	}
);

Sigma.ToolFactroy.register(
	'cellpaste',  
	{
		cls : 'sigmagrid-button-cellPaste',  
		toolTip : 'セル貼り付け',
		action : function(event, grid) {
			if (Sigma.Unit.isEmptyObject(grid.selectedCellValue, 'object')) {
				var columnId = grid.selectedCellValue.columnId;
				var columnNo = grid.selectedCellValue.columnNo;
				var fieldNo = grid.selectedCellValue.fieldNo;
				var value = grid.selectedCellValue.value;
				
				var records = grid.getSelectedRecords();
				for (var i=0; i<grid.selectedRows.length; i++) {
					var rowIndex = grid.selectedRows[i].rowIndex;
					var record = records[i];
					record[fieldNo] = value;
					grid.setCellValue(columnId, grid.selectedRows[i].rowIndex, value);
					grid.refreshRow(grid.selectedRows[i].rowIndex, record);
					var cell = grid.getCell(grid.selectedRows[i].rowIndex, columnId);
					
					if (cell != null) {
						Sigma.U.addClass(cell, 'gt-cell-updated');
					}
					
					grid.syncTwinRowCell(null,cell);
				}
			}
		}
	}
);

/********************************************************************************
*	gridカラム情報SAVE,RESET処理ボタン
*********************************************************************************/
/**
*	保存情報Filter実行
*	
*	@param array grid ID
*	@return array gridOption.columns
**/
Sigma.GridDefault.readConfigApply = function(grid) {
	if (localStorage) {
		var sigmaCookie = new Sigma.Storage();
	} else {
		var sigmaCookie = new Sigma.Cookie(Sigma.CONFIG_SAVE_EXPIRES);
	}

	var json = sigmaCookie.get(Sigma.Unit.getBaseFileName() + '_' + grid.gridId + '_conf');
	if (json != null) {
		try {
			var cookie = JSON.parse(json);
			grid.applyFilter(cookie.filter);
			grid.sortGrid(cookie.sort);
		} catch (e) {
		}
		return;
	}
}

/**
*	Column設定データ作成
*	
*	@param object grid
**/
Sigma.GridDefault.createConfig = function() {
	grid = this;
	var config = {};
	var list = [];
	
	for (var i=0; i<grid.columnList.length; i++) {
		var obj = {};
		
		obj.id			= grid.columnList[i].id;
		obj.frozen		= grid.columnList[i].frozen;
		obj.hidden		= grid.columnList[i].hidden;
		obj.width		= (parseInt(grid.columnList[i].width)).toString();
		
		list[list.length] = obj;
	}
	config.columnList = list;
	config.filter = grid.getFilterInfo();
	config.sort = grid.sortInfo;
	
	return JSON.stringify(config);
}

Sigma.ToolFactroy.register(
	'confsave',
	{
		cls:'sigmagrid-button-confSave',  
		toolTip:'設定保存',
		action:function(event, grid) {
			if (!window.confirm("save the setting?")) {
				return;
			}
			
			grid.showWaiting();
			var json = grid.createConfig();
			
			if (localStorage) {
				var cookie = new Sigma.Storage();
			} else {
				var cookie = new Sigma.Cookie(Sigma.CONFIG_SAVE_EXPIRES);
			}
			
			cookie.set(Sigma.Unit.getBaseFileName() + '_' + grid.id + '_conf', json);
			grid.hideWaiting();
		}
	}
);

Sigma.ToolFactroy.register(
	'confdel',
	{
		cls:'sigmagrid-button-confDel',  
		toolTip:'設定削除',
		action:function(event, grid) {
			if (!window.confirm("delete the setting?")) {
				return;
			}
			if (localStorage) {
				var cookie = new Sigma.Storage();
			} else {
				var cookie = new Sigma.Cookie();
			}
			
			cookie.del(Sigma.Unit.getBaseFileName() + '_' + grid.id + '_conf');
		}
	}
);

/********************************************************************************
*	gridカラム情報DOWNLOAD,UPLOAD処理ボタン
*********************************************************************************/
Sigma.ToolFactroy.register(
	'download',
	{
		cls:'sigmagrid-button-download',  
		toolTip:'設定ダウンロード',
		action:function(event, grid) {
			var json = grid.createConfig();
			
			var compressed;
			try {
				compressed = lzbase62.compress(json);
			} catch (e) {
				compressed = value;
			}
			Sigma.Unit.downloadText('config.bin', compressed);
		}
	}
);

Sigma.ToolFactroy.register(
	'upload',
	{
		cls:'sigmagrid-button-upload',  
		toolTip:'設定アップロード',
		action:function(event, grid) {
			grid.configUpload= grid.configUpload || Sigma.Unit.createConfigUploadDialog({title:'Upload File', gridId:grid.id});
			grid.configUpload.show();
		}
	}
);

Sigma.Unit.createConfigUploadDialog = function(cfg){
	var gridId = cfg.gridId;
	var grid = Sigma.$grid(gridId);
	var dialogId = gridId+'_configUpload';
	
    /*change==>*/
	// var okFn= function(){
	var okFn= function(e){
    /*<==change*/
		grid.showWaiting();
		var colDiv = Sigma.$(dialogId+'_div');
		
		var id = 'gt-config-upload' + dialogId.id;
		var fileList = document.getElementById(id).files;
		
		try {
			var reader = new FileReader();
		} catch(e) {
			alert("File API unsupported.");
			return;
		}
		
		reader.readAsText(fileList[0]);
		
		reader.onload = function(ev){
			var json;
			try {
				json = lzbase62.decompress(reader.result);
			} catch (e) {
				json = reader.result;
			}
			
			if (typeof(json) == 'string') {
				if (localStorage) {
					var cookie = new Sigma.Storage();
				} else {
					var cookie = new Sigma.Cookie(Sigma.CONFIG_SAVE_EXPIRES);
				}
				cookie.set(Sigma.Unit.getBaseFileName() + '_' + grid.id + '_conf', json);
			}
		}
		
		grid.hideWaiting();
		if (cfg.autoClose!==false){
			grid._onResize();
			Sigma.WidgetCache[dialogId].close();
		}
        
        /*change==>*/
        Sigma.U.stopEvent(e);
        /*<==change*/
        
	};
	
    /*change==>*/
	// var clearFn= function(){
	var clearFn= function(e){
    /*<==change*/
    
		Sigma.$(dialogId+'_div').innerHTML=  '';
        
        /*change==>*/
        Sigma.U.stopEvent(e);
        /*<==change*/
        
	};
	
    /*change==>*/
	// var cancelFn= function(){ Sigma.WidgetCache[dialogId].close(); };
	var cancelFn= function(e){
        Sigma.WidgetCache[dialogId].close();
        Sigma.U.stopEvent(e);
    };
    /*<==change*/

	var outW=300 , outH=150;
	var inW= outW-(Sigma.isBoxModel?16:18) , inH= outH-(Sigma.isBoxModel?93:95);
	var dialog=new Sigma.Dialog({
		id :  dialogId,
		gridId : gridId ,
		title : cfg.title,
		width : outW,
		height : outH ,
		buttonLayout : 'h',
		body : [
            
            /*change==>*/
			// '<div id="'+dialogId+'_div" class="gt-filter-dialog" style="width:'+inW+'px;height:'+inH+'px;" onclick="Sigma.clickHandler.onFilterItem(event)" >',
			'<div id="'+dialogId+'_div" class="gt-filter-dialog" style="width:'+inW+'px;height:'+inH+'px;">',
            /*<==change*/
            
			'</div>'
		].join(''),
		buttons : [
				{ text : grid.getMsg('TEXT_OK') , onclick : okFn },
				{ text : grid.getMsg('TEXT_CLOSE') , onclick : cancelFn }
			],
		afterShow : function(){
			var grid=Sigma.$grid(this.gridId);
			clearFn();
			
			var tt = '';
			tt = '<input type="file" id="gt-config-upload' + dialogId.id + '" size="20">';
			
			if (tt.length > 0) {
				var div = document.createElement("div");
				div.innerHTML = tt;
				Sigma.$(this.id+'_div').appendChild(div);
			}
		}
	});
	return  dialog;
};

/********************************************************************************
*	行並び替えボタン
*********************************************************************************/
Sigma.ToolFactroy.register(
	'sort',
	{
		cls:'sigmagrid-button-sort',  
		toolTip:'行手動ソート',
		action:function(event, grid) {
			grid.dataSort= grid.dataSort || Sigma.Unit.createDataSortDialog({title:'Data Sort by number input or drag&drop', gridId:grid.id});
			grid.dataSort.show();
		}
	}
);

Sigma.Unit.createDataSortDialog = function(cfg){
	var gridId = cfg.gridId;
	var grid = Sigma.$grid(gridId);
	var dialogId = gridId+'_configSort';
	
    /*change==>*/
	// var okFn= function(){
	var okFn= function(e){
    /*<==change*/
		grid.showWaiting();
		var tableElem = Sigma.$(dialogId+'_div');
		var trLists = tableElem.childNodes[0].childNodes[0].childNodes[1].childNodes;
		
		var target = [];
		var x;
		for (i=0; i<trLists.length; i++) {
			x = parseFloat(trLists[i].childNodes[0].childNodes[0].value);
			target.push([grid.dataset.dataProxy[i], x]);
		}
		
		var dimentionSort = function(array, colNo, order) {
			array.sort(function(a, b) {
				return (a[colNo] - b[colNo]) * order;
			});
			return array;
		};
		
		result = dimentionSort(target, 1, 1);
		
		grid.dataset.dataProxy = [];
		
		for (i=0; i<result.length; i++) {
			grid.dataset.dataProxy.push(result[i][0]);
		}
		
		grid.refresh();
		
		grid.hideWaiting();
		if (cfg.autoClose!==false){
			grid._onResize();
			Sigma.WidgetCache[dialogId].close();
		}
        
        
        /*change==>*/
        Sigma.U.stopEvent(e);
        /*<==change*/
        
	};
	
    /*change==>*/
	// var clearFn= function(){
	var clearFn= function(e){
    /*<==change*/
		Sigma.$(dialogId+'_div').innerHTML=  '';
        
        /*change==>*/
        Sigma.U.stopEvent(e);
        /*<==change*/
        
	};
	
    /*change==>*/
	// var cancelFn= function(){ Sigma.WidgetCache[dialogId].close(); };
	var cancelFn= function(e){
        Sigma.WidgetCache[dialogId].close();
        Sigma.U.stopEvent(e);
    };
    /*<==change*/

	var outW=600 , outH=400;
	outW = (outW > (grid.bodyDiv.offsetWidth*0.9))?		(grid.bodyDiv.offsetWidth*0.9):outW;
	outH = (outH > (grid.bodyDiv.offsetHeight*0.9))?	(grid.bodyDiv.offsetHeight*0.9):outH;
	
	var inW= outW-(Sigma.isBoxModel?16:18) , inH= outH-(Sigma.isBoxModel?93:95);
	var dialog=new Sigma.Dialog({
		id :  dialogId,
		gridId : gridId ,
		title : cfg.title,
		width : outW,
		height : outH ,
		buttonLayout : 'h',
		body : [
			'<div id="'+dialogId+'_div" class="gt-filter-dialog" style="width:'+inW+'px;height:'+inH+'px;" onclick="Sigma.clickHandler.onFilterItem(event)" >',
			'</div>'
		].join(''),
		buttons : [
				{ text : grid.getMsg('TEXT_OK') , onclick : okFn },
				{ text : grid.getMsg('TEXT_CLOSE') , onclick : cancelFn }
			],
		afterShow : function(){
			var grid=Sigma.$grid(this.gridId);
			clearFn();
			
			var tt = '';
			var td_tmp = '<td style="border:1px solid #000000;">';
			
			tt += '<table class="gt-sort-dialog" style="border-collapse:collapse;"><thead><tr>';
			
			tt += td_tmp;
			tt += 'ID';
			tt += '</td>';
			tt += td_tmp;
			tt += 'oID';
			tt += '</td>';
			
			var header = grid.columnList;
			var countMax = (header.length<15)?	header.length:15;
			
			for (var i=0; i<countMax; i++){
				tt += td_tmp;
				//tt += header[i].fieldName;
				tt += '</td>';
			}
			
			tt += '</tr></thead><tbody class="sortable">';
			
			grid.forEachRow(function(row, record, i, grid) {
				tt += '<tr>';
				tt += td_tmp;
				tt += '<input type="number" class="sort-id" size="3" value="' + i + '">';
				tt += '</td>';
				tt += td_tmp;
				tt +=  i;
				tt += '</td>';
				
				var countMax = (record.length<15)?	record.length:15;
				
                if (grid.dataset.recordType == 'object') {
                    var j=0;
                    for (prop in record) {
                        tt += td_tmp;
                        tt += record[prop];
                        tt += '</td>';
                        
                        j++;
                        if (j >= countMax) {
                            break;
                        }
                    }
                } else {
                    for (var j=0; j<countMax; j++) {
                        tt += td_tmp;
                        tt += record[j];
                        tt += '</td>';
                    }
                }
                
                
                
				tt += '</tr>';
			});
			
			tt += '</tbody></table>';
			
			if (tt.length > 0) {
				var div = document.createElement("div");
				div.innerHTML = tt;
				Sigma.$(this.id+'_div').appendChild(div);
				
				try {
					$(".gt-sort-dialog .sortable").sortable({
						update:function(event, ui) {
							$(".gt-sort-dialog .sort-id").prop("readonly", true);
							
							var target = $(event.target).children(); 
							
							$.each(target, function(no, val) {
								var row = null;
								
								$.each(target, function(no2, val2) {
									var id = parseInt($(val2).children("td:first").next().text());
									
									if (id == no) {
										row = no2;
										return false;
									}
								});
								
								$(val).children("td:first").children("input").val(row);
							});
						}
					});
				} catch (e) {
				}
			}
		}
	});
	return  dialog;
};

/********************************************************************************
*	行高さ切り替えボタン(セル折り返し変更)*		frozen未対応
*********************************************************************************/
Sigma.GridDefault.pastRowHeight = null;

Sigma.ToolFactroy.register(
	'rowheight',
	{
		cls:'sigmagrid-button-rowHeight',  
		toolTip:'行高さ変更',
		action:function(event, grid) {
			var elm = document.getElementsByClassName("gt-inner");
			var style = elm.currentStyle || document.defaultView.getComputedStyle(elm[0], '')
			
			if (Sigma.GridDefault.pastRowHeight == null) {
				Sigma.GridDefault.pastRowHeight = style.height;
			}
			
			if (style.whiteSpace.toLowerCase () == 'normal') {
				var s = 'nowrap';
				var h = Sigma.GridDefault.pastRowHeight;
                var o = 'normal';
			} else {
				var s = 'normal';
				var h = 'auto';
                var o = 'break-word';
			}
			
			for (var i=0; i<elm.length; i++) {
				elm[i].style.whiteSpace = s;
				elm[i].style.height = h;
				elm[i].style.overflowWrap = o;
			}
		}
	}
);

/********************************************************************************
*	checkbox選択行チェックボタン
*********************************************************************************/
Sigma.ToolFactroy.register (
	'check',
	{
		cls: 'sigmagrid-button-check',
		toolTip: 'チェックボックス切り替え',
		action:function(event,grid) {
			
			var check_col = [];
			var cls = '';
			for (var i=0; i<grid.columns.length; i++) {
				if (grid.columns[i].isCheckColumn) {
					cls = 'gt_' + grid.id + '_chk_' + grid.columns[i].id;
					check_col.push(cls);
				}
			}
			
			var elm, name, chk;
			for (var i=0; i<grid.selectedRows.length; i++) {
				for (var j=0; j<check_col.length; j++) {
					name = cls + grid.selectedRows[i].rowIndex;
					elm = document.getElementsByName(name);
					
					if ((elm != null) && (elm.length > 0)) {
						if (chk == null) {
							chk = !elm[elm.length-1].checked;
						}
						elm[elm.length-1].checked = chk;
					}
				}
			}
		}
	}
);

/********************************************************************************
*	フィルターブックマークボタン
*********************************************************************************/
Sigma.ToolFactroy.register(
	'filterbooks',
	{
		cls:'sigmagrid-button-filterbooks',
		toolTip:'フィルターブックマーク',
		action:function(event, grid) {
			grid.filterbooks= grid.filterbooks || Sigma.Unit.createFilterBooksDialog({title:'Filter Bookmark', gridId:grid.id});
			grid.filterbooks.show();
		}
	}
);

Sigma.Unit.createFilterBooksDialog = function(cfg){
	var gridId = cfg.gridId;
	var grid = Sigma.$grid(gridId);
	var dialogId = gridId+'_filterBookmark';
	
    /*change==>*/
	// var okFn= function(){
	var okFn= function(e){
    /*<==change*/
		var radio = document.getElementsByName('filter_item[]') || {};
		var checked;
		
		for (var i=0; i<radio.length; i++) {
			if (radio[i].checked) {
				checked = radio[i].value;
			}
		}
		
		if (localStorage) {
			var sigmaCookie = new Sigma.Storage();
		} else {
			var sigmaCookie = new Sigma.Cookie(Sigma.CONFIG_SAVE_EXPIRES);
		}
		
		var json = sigmaCookie.get(Sigma.Unit.getBaseFileName() + '_' + grid.gridId + '_bookmark');
		if (json != null) {
			try {
				var books = JSON.parse(json);
			} catch (e) {
			}
		}
		
		var filter = {};
		var apply;
		if (typeof books == 'object') {
			var items = document.getElementsByClassName('gt-filter-dialog')[0].children[0].children || {};
			for (var i=0; i<items.length; i++) {
				var name = items[i].children[1].value;
				if (name in books) {
					filter[name] = books[name];
					
					if (name == checked) {
						apply = books[name];
					}
				}
			}
		}
		
		var json = JSON.stringify(filter);
		sigmaCookie.set(Sigma.Unit.getBaseFileName() + '_' + grid.gridId + '_bookmark', json);
		
		if (apply) {
			grid.applyFilter(apply);
		}
		
		if (cfg.autoClose!==false){
			grid._onResize();
			Sigma.WidgetCache[dialogId].close();
		}
        
        /*change==>*/
        Sigma.U.stopEvent(e);
        /*<==change*/
        
	};
	
    /*change==>*/
	// var clearFn= function(){
	var clearFn= function(e){
    /*<==change*/
		Sigma.$(dialogId+'_div').innerHTML=  '';
        
        /*change==>*/
        Sigma.U.stopEvent(e);
        /*<==change*/
        
	};
	
    /*change==>*/
	// var cancelFn= function(){ Sigma.WidgetCache[dialogId].close(); };
	var cancelFn= function(e){
        Sigma.WidgetCache[dialogId].close();
        Sigma.U.stopEvent(e);
    };
    /*<==change*/
	
    /*change==>*/
	// var addFn= function(){
	var addFn= function(e){
    /*<==change*/
		var filter = grid.getFilterInfo();
		
		if ((filter == null) || (filter.length == 0)) {
				return;
		}
		
		var div = document.createElement("div");
		var key = new Date().getTime().toString();
		
		var tt = '';
		tt += '<div>';
		tt += '<button type="button" id="' + key + '_button" title="Reflected after the OK execution">Remove</button>\r';
		tt += '<input type="radio" name="filter_item[]" id="' + key + '_radio" value="' + key + '">';
		tt += '<input type="text" name="filter_name" id="' + key + '_text" value="' + key + '" pattern="^[a-zA-Z0-9]+$">';
		tt += '<button type="button" id="' + key + '_save">Save</button>\r';
		tt += '</div>';
		div.innerHTML = tt;
		Sigma.$(dialogId+'_div').appendChild(div);
		
		var btn = document.getElementById(key + '_button');
		Sigma.U.addEvent( btn ,"click",function(event) {
			Sigma.U.removeNode(event.currentTarget.parentNode);
		});
		
		var btn = document.getElementById(key + '_save');
		Sigma.U.addEvent( btn ,"click",function(event) {
			if (localStorage) {
				var sigmaCookie = new Sigma.Storage();
			} else {
				var sigmaCookie = new Sigma.Cookie(Sigma.CONFIG_SAVE_EXPIRES);
			}
			
			var json = sigmaCookie.get(Sigma.Unit.getBaseFileName() + '_' + grid.gridId + '_bookmark');
			if (json != null) {
				try {
					var books = JSON.parse(json);
				} catch (e) {
				}
			}
			
			var filter = grid.getFilterInfo();
			var nm = event.currentTarget.parentNode.children[2].value;
			var obj = books || {};
			obj[nm] = filter || {};
			
			var json = JSON.stringify(obj);
			sigmaCookie.set(Sigma.Unit.getBaseFileName() + '_' + grid.gridId + '_bookmark', json);
			
			Sigma.WidgetCache[dialogId].close();
		});
        
        /*change==>*/
        Sigma.U.stopEvent(e);
        /*<==change*/
        
	};
	
	var outW=400 , outH=300;
	var inW= outW-(Sigma.isBoxModel?16:18) , inH= outH-(Sigma.isBoxModel?93:95);
	var dialog=new Sigma.Dialog({
		id :  dialogId,
		gridId : gridId ,
		title : cfg.title,
		width : outW,
		height : outH ,
		buttonLayout : 'h',
		body : [
            /*change==>*/
			//'<div id="'+dialogId+'_div" class="gt-filter-dialog" style="width:'+inW+'px;height:'+inH+'px;" onclick="Sigma.clickHandler.onFilterItem(event)" >',
            /*<==change*/
			'<div id="'+dialogId+'_div" class="gt-filter-dialog" style="width:'+inW+'px;height:'+inH+'px;" >',
			'</div>'
		].join(''),
		buttons : [
				{ text : grid.getMsg('TEXT_OK') , onclick : okFn },
				{ text : grid.getMsg('TEXT_ADD_FILTER') , onclick : addFn },
				{ text : grid.getMsg('TEXT_CLOSE') , onclick : cancelFn }
			],
		afterShow : function(){
			var grid=Sigma.$grid(this.gridId);
			clearFn();
			
			if (localStorage) {
				var sigmaCookie = new Sigma.Storage();
			} else {
				var sigmaCookie = new Sigma.Cookie(Sigma.CONFIG_SAVE_EXPIRES);
			}
			
			var json = sigmaCookie.get(Sigma.Unit.getBaseFileName() + '_' + grid.gridId + '_bookmark');
			if (json != null) {
				try {
					var books = JSON.parse(json);
				} catch (e) {
				}
			}
			
			var tt = '';
			
			if (typeof books == 'object') {
				for (key in books) {
					tt += '<div>';
					tt += '<button type="button" id="' + key + '_button" title="Reflected after the OK execution">Remove</button>\r';
					tt += '<input type="radio" name="filter_item[]" id="' + key + '_radio" value="' + key + '">';
					tt += '<label for="' + key + '_radio">' + key + '</label>\r';
					tt += '</div>';
				}
			}
		 
			if (tt.length > 0) {
				var div = document.createElement("div");
				div.innerHTML = tt;
				Sigma.$(this.id+'_div').appendChild(div);
				
				for (key in books) {
					var btn = document.getElementById(key + '_button');
					Sigma.U.addEvent( btn ,"click",function(event) {
						Sigma.U.removeNode(event.currentTarget.parentNode);
					});
				}
			}
		}
	});
	return  dialog;
};

/********************************************************************************
*	集計表ボタン
*********************************************************************************/
Sigma.ToolFactroy.register(
	'agg',
	{
		cls:'sigmagrid-button-agg',
		toolTip:'集計表',
		action:function(event, grid) {
			grid.aggregateTable= grid.aggregateTable || Sigma.Unit.createAggrigateTableDialog({title:'集計表', gridId:grid.id});
			grid.aggregateTable.show();
		}
	}
);


Sigma.Unit.createAggrigateTableDialog = function(cfg){
	var gridId = cfg.gridId;
	var grid = Sigma.$grid(gridId);
	var dialogId = gridId+'_aggrigate';
	
    /*change==>*/
	// var clearFn= function(){
	var clearFn= function(e){
    /*<==change*/
		Sigma.$(dialogId+'_div').innerHTML=  '';
        
        /*change==>*/
        Sigma.U.stopEvent(e);
        /*<==change*/
        
	};
	
    /*change==>*/
	// var cancelFn= function(){ Sigma.WidgetCache[dialogId].close(); };
	var cancelFn= function(e){
        Sigma.WidgetCache[dialogId].close();
        Sigma.U.stopEvent(e);
    };
    /*<==change*/
	
    /*change==>*/
	// var okFn = function(){
	var okFn = function(e){
    /*<==change*/
	   grid.columnList.forEach(function(val, index, array) {
			var id = val.id;
			var colNo = grid.dataset.fieldsMap[id].index;
			
			var target = document.getElementById(dialogId + '_agg_select');
			var agg = Sigma.Util.getValue(target);
			
			try {  
				var result1 = Sigma.Unit[agg](grid, colNo, true);
				var result2 = Sigma.Unit[agg](grid, colNo, false);
				
				document.getElementById('gt-aggrigate-0-' + index).innerHTML = result1;
				document.getElementById('gt-aggrigate-1-' + index).innerHTML = result2;
			} catch (e) {
			}
		});
        
        /*change==>*/
        Sigma.U.stopEvent(e);
        /*<==change*/
        
	}
	
	var createSelect = function() {
		var tt = '<select id="' + dialogId + '_agg_select">';
		var ar = {'sum':'加算', 'avg':'平均', 'max':'最大値', 'min':'最小値'};
		
		Object.keys(ar).forEach(function(key) {
			tt += '<option value="' + key + '">' + ar[key] + '</option>';
		});
		
		tt += '</select>';
		return tt;
	}
	
	var outW=400 , outH=220;
	var inW= outW-(Sigma.isBoxModel?16:18) , inH= outH-(Sigma.isBoxModel?93:95);
	var dialog=new Sigma.Dialog({
		id :  dialogId,
		gridId : gridId ,
		title : cfg.title,
		width : outW,
		height : outH ,
		buttonLayout : 'h',
		body : [
			'<div id="'+dialogId+'_div" class="gt-filter-dialog" style="width:'+inW+'px;height:'+inH+'px;" onclick="Sigma.clickHandler.onFilterItem(event)" >',
			'</div>'
		].join(''),
		buttons : [
				{ html : createSelect() },
				{ text : grid.getMsg('TEXT_OK') , onclick : okFn },
				{ text : grid.getMsg('TEXT_CLOSE') , onclick : cancelFn }
			],
		afterShow : function(){
			var grid=Sigma.$grid(this.gridId);
			clearFn();
			
			var tt = '';
			
			tt += '<div><span>selected rows:</span>';
			tt += '<span>' + grid.selectedRows.length + '</div>';
			tt += '<div><span>totally rows:</span>';
			tt += '<span>' + grid.dataset.data.length + '</div>';
			tt += '<div>Ctrl+Aで行選択した場合,Ctrl+A実行前の行との合計となります</div>';
			
			var td_tmp = '<td style="border:1px solid #000000;">';
			
			tt += '<table class="gt-aggrigate-dialog" style="border-collapse:collapse; margin:4px;"><thead><tr>';
			tt += '<td style="border:1px solid #000000;"></td>';
			
			grid.columnList.forEach(function(val, index, array) {
				tt += td_tmp;
				tt += val.header;
				tt += '</td>';
			});
			
			tt += '</tr></thead><tbody>';
			
			title_tmp = ['selected rows', 'totally rows'];
			td_tmp = '<td style="border:1px solid #000000;" id="';
			
			for (var i=0; i<2; i++) {
				tt += '<tr><td style="border:1px solid #000000;">' + title_tmp[i] + '</td>';
				grid.columnList.forEach(function(val, index, array) {
					tt += td_tmp;
					tt += 'gt-aggrigate-' + i + '-' + index;
					tt += '"></td>';
				});
				tt += '</tr>';
			}
			tt += '</tbody><table>';
			
			var div = document.createElement("div");
			div.innerHTML = tt;
			Sigma.$(this.id+'_div').appendChild(div);
		}
	});
	return  dialog;
};

/********************************************************************************
*	helpボタン
*********************************************************************************/
Sigma.ToolFactroy.register(
	'help',
	{
		cls:'sigmagrid-button-help',  
		toolTip:'help',
		action:function(event,grid) {
			window.open("http://www.sigmawidgets.com/products/sigma_grid2/", "SigmaGrid");
		}
	}
);

/********************************************************************************
*	フィルボタン
*********************************************************************************/
Sigma.ToolFactroy.register(
	'fill',
	{
		cls:'sigmagrid-button-fill',
		toolTip:'一括入力',
		action:function(event, grid) {
			grid.fillTable= grid.fillTable || Sigma.Unit.createFillTableDialog({title:'一括入力', gridId:grid.id});
			grid.fillTable.show();
		}
	}
);


Sigma.Unit.createFillTableDialog = function(cfg){
	var gridId = cfg.gridId;
	var grid = Sigma.$grid(gridId);
	var dialogId = gridId+'_fill';
	
    /*change==>*/
	// var clearFn= function(){
	var clearFn= function(e){
    /*<==change*/
		Sigma.$(dialogId+'_div').innerHTML=  '';
        
        /*change==>*/
        Sigma.U.stopEvent(e);
        /*<==change*/
        
	};
	
    /*change==>*/
	// var cancelFn= function(){ Sigma.WidgetCache[dialogId].close(); };
	var cancelFn= function(e){
        Sigma.WidgetCache[dialogId].close();
        Sigma.U.stopEvent(e);
    };
    /*<==change*/
	
    /*change==>*/
	// var okFn = function(){
	var okFn = function(e){
    /*<==change*/
	   grid.columnList.forEach(function(val, index, array) {
			var id = val.id;
			var colNo = grid.dataset.fieldsMap[id].index;
		 
			var target = document.getElementById(dialogId + '_agg_select');
			var agg = Sigma.Util.getValue(target);
			
			try { 
				var result1 = Sigma.Unit[agg](grid, colNo, true);
				var result2 = Sigma.Unit[agg](grid, colNo, false);
				
				document.getElementById('gt-fill-0-' + index).innerHTML = result1;
				document.getElementById('gt-fill-1-' + index).innerHTML = result2;
			} catch (e) {
			}
		});
        
        /*change==>*/
        Sigma.U.stopEvent(e);
        /*<==change*/
        
	}
	
	var outW=200 , outH=200;
	var inW= outW-(Sigma.isBoxModel?16:18) , inH= outH-(Sigma.isBoxModel?93:95);
	var dialog=new Sigma.Dialog({
		id :  dialogId,
		gridId : gridId ,
		title : cfg.title,
		width : outW,
		height : outH ,
		buttonLayout : 'h',
		body : [
			'<div id="'+dialogId+'_div" class="gt-filter-dialog" style="width:'+inW+'px;height:'+inH+'px;" onclick="Sigma.clickHandler.onFilterItem(event)" >',
			'</div>'
		].join(''),
		buttons : [
				{ text : grid.getMsg('TEXT_OK') , onclick : okFn },
				{ text : grid.getMsg('TEXT_CLOSE') , onclick : cancelFn }
			],
		afterShow : function(){
			var grid=Sigma.$grid(this.gridId);
			clearFn();
			
			var editor;
			if ((grid.activeColumn != null) && (grid.activeColumn.editor != null)) {
				var editor = grid.activeColumn.editor;
				var tt = '';
				
				switch (editor.type) {
					case 'text':
						tt += '<input type="text" id="gt-fill-ed" name="gt-fill-ed">';
						break;
					case 'textarea':
						tt += '<textarea id="gt-fill-ed" name="gt-fill-ed"></textarea>';
						break;
					case 'select':
						tt += '<select id="gt-fill-ed" name="gt-fill-ed">';
						var options = editor.options || {};
						for (var o in options) {
							tt += '<option value="' + o + '">' + options[o] + '</option>';
						}
						tt += '</select>';
						break;
					case 'date':
						tt += '<input type="text" id="gt-fill-ed" name="gt-fill-ed">';
						break;
				}
				
				var div = document.createElement("div");
				div.innerHTML = tt;
				Sigma.$(this.id+'_div').appendChild(div);
				var closer = cancelFn;
				
				var validator = function(event) {
					try {
						var result = editor.validator(
							event.target.value,
							grid.activeRecord,
							grid.activeColumn,
							grid
						);
					} catch (e) {
					}
					
					if ((result == null) || (result)) {
						var columnNo = grid.activeColumn.colIndex;
						var columnId = grid.columnList[columnNo].id;
						var fieldNo = grid.columnList[columnNo].fieldIndex;
						
						var value = event.target.value;
						var records = grid.getSelectedRecords();
						for (var i=0; i<grid.selectedRows.length; i++) {
							var rowIndex = grid.selectedRows[i].rowIndex;
							var record = records[i];
							record[fieldNo] = value;
							grid.setCellValue(columnId, grid.selectedRows[i].rowIndex, value);
							grid.refreshRow(grid.selectedRows[i].rowIndex, record);
							var cell = grid.getCell(grid.selectedRows[i].rowIndex, columnId);
							
							if (cell != null) {
								Sigma.U.addClass(cell, 'gt-cell-updated');
							}
							
							grid.syncTwinRowCell(null,cell);
						}
						closer();
						Sigma.U.removeEvent(document.getElementById("gt-fill-ed"), 'change');
						
						grid.endEdit();
					
					}
				}
				Sigma.U.addEvent(document.getElementById("gt-fill-ed"), 'change', validator);
			}
		}
	});
	
	return  dialog;
};

/********************************************************************************
*	helpボタン(override)
*********************************************************************************/
Sigma.ToolFactroy.register(
	'help',
	{
		cls:'sigmagrid-button-help',  
		toolTip:'ヘルプ',
		action:function(event,grid) {
			window.open("http://itcv1800005m.toshiba.local:8080/help/入門.pdf", "SigmaGrid");
		}
	}
);

/********************************************************************************
*	処理の参考資料(下記関数は使用せず、直接命令を記述する)
*********************************************************************************/
/**
*	name位置取得
*	
*	@param string filedsのname
*	@return integer 位置番号
**/
Sigma.DataSetDefault.indexOf = function(name) {
	return this.fieldsMap[name].index
}

/**
*	DOMにclass追加
*	
*	@param string class name
**/
Sigma.ColumnDefault.addClass = function(name) {
	this.styleClass = this.styleClass + ' ' + name;
}


/********************************************************************************
*	処理の参考資料(マニュアル)
*********************************************************************************/
/*
---------------------------------------
ツールバーに文字列情報表示
---------------------------------------
1.CSS定義

.gt-my-info {
	float:left;
	width:50px;
	height:20px;
}

2.Toolbar.facoryに処理を登録

Sigma.ToolFactroy.register(
	'myinfo',
	function (grid) {
			var button= Sigma.$e("div",{ innerHTML:'&#160;', className:'gt-my-inf' });
			grid.toolBar.appendChild(button);
			return button;
    }
);

3.gridOption.toolbarContentに名前を追加する

var gridOption={
	
	toolbarContent:'| myinfo |'
	
}

4.gridOption.afterRefreshイベントに表示文字情報の書き込み処理を追加

var gridOption={
	
    , afterRefresh:function(grid) {
    	var cls = document.getElementsByClassName('gt-my-info');
    	cls[0].innerHTML = 'ADD MESSAGE';
	}
	
}




*/
