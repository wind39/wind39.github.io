function getTree() {

		execAjax('Tree.aspx/GetTreeInfo',
				null,
				function(p_return) {

					var context_menu = {
					'cm_database' : {
						elements : [
							{
								text : 'Render Graph',
								icon: 'images/graph.png',
								action : function(node) {

								},
								submenu: {
									elements : [
										{
											text : 'Simple Graph',
											icon: 'images/graph.png',
											action : function(node) {
												modalGraph('show',0);
											}
										},
										{
											text : 'Detailed Graph',
											icon: 'images/graph.png',
											action : function(node) {
												modalGraph('show',1);
											}
										},
										{
											text : 'Complete Graph',
											icon: 'images/graph.png',
											action : function(node) {
												modalGraph('show',2);
											}
										}
									]
								}
							},
							{
								text : 'Get Statistics',
								icon: 'images/bar_chart.png',
								action : function(node) {
									getStatistics();
								}
							},
							{
								text : 'Refresh Tree',
								icon: 'images/refresh.png',
								action : function(node) {
									getTree();
								}
							}
						]
					},
					'cm_tables' : {
						elements : [
							{
								text : 'Refresh',
								icon: 'images/refresh.png',
								action : function(node) {
									if (node.childNodes==0)
										refresh2(node);
									else {
										node.collapseNode();
										node.expandNode();
									}
								}
							},
							{
								text : 'New Table',
								icon: 'images/new_table.png',
								action : function(node) {
									v_firstModeTable = 'new';
									startAlterTable('new',null);
								}
							}
						]
					},
					'cm_refresh' : {
						elements : [
							{
								text : 'Refresh',
								icon: 'images/refresh.png',
								action : function(node) {
									if (node.childNodes==0)
										refresh2(node);
									else {
										node.collapseNode();
										node.expandNode();
									}
								}
							}
						]
					},
					'cm_table' : {
						elements : [
							{
								text : 'Data Actions',
								icon: 'images/list.png',
								submenu: {
								elements: [
									    {
											text : 'Query Data',
											icon: 'images/query.png',
											action : function(node) {
												//createTab();

												var v_table_name = '';
												if (node.parent.parent.parent.parent!=null)
													v_table_name = node.parent.parent.text + '.' + node.text;
												else
													v_table_name = node.text;

												tabControl.selectedTab.tag.editor.setValue('-- Querying Data\nselect t.*\nfrom ' + v_table_name + ' t');
												tabControl.selectedTab.tag.editor.clearSelection();
												tabControl.selectedTab.renameTab(node.text);

				                				query_sql();
											}
										},
										{
											text : 'Edit Data',
											icon: 'images/edit_data.png',
											action : function(node) {
												startEditData(node.text);
											}
										},
										{
											text : 'Count Records',
											icon: 'images/counter.png',
											action : function(node) {
												//createTab();

												var v_table_name = '';
												if (node.parent.parent.parent.parent!=null)
													v_table_name = node.parent.parent.text + '.' + node.text;
												else
													v_table_name = node.text;

												tabControl.selectedTab.tag.editor.setValue("-- Counting Records\nselect count(*) as count\nfrom " + v_table_name + " t");
												tabControl.selectedTab.tag.editor.clearSelection();
												tabControl.selectedTab.renameTab(node.text);
				                				query_sql();
											}
										},
										{
											text : 'Delete Records',
											icon: 'images/tab_close.png',
											action : function(node) {
												deleteData(node);
											}
										}
									]
								}
							},
							{
								text : 'Table Actions',
								icon: 'images/list.png',
								submenu: {
								elements: [
									    {
											text : 'Alter Table',
											icon: 'images/table_edit.png',
											action : function(node) {
												v_firstModeTable = 'alter';
												startAlterTable('alter',node.text);
											}
										},

										{
											text : 'Drop Table',
											icon: 'images/tab_close.png',
											action : function(node) {
												dropTable(node);
											}
										}
									]
								}
							},
							{
								text : 'Refresh',
								icon: 'images/refresh.png',
								action : function(node) {
									if (node.childNodes==0)
										refresh2(node);
									else {
										node.collapseNode();
										node.expandNode();
									}
								}
							}
						]
					}
				};

					tree = createTree('tree1','white',context_menu);

					tree.nodeAfterOpenEvent = function(node) {
						refresh2(node);
					}


					node1 = tree.createNode(p_return.v_data.v_database,true,'images/db.png',null,null,'cm_database');

					v_tree_object = new Object();

					if (p_return.v_data.v_has_schema) {
						var node2 = tree.createNode(p_return.v_data.v_schema,true,'images/schemas.png',node1,null,null);

						var node3 = tree.createNode('Tables',false,'images/table_multiple.png',node2,{ type:'table_list', num_tables : 0 },'cm_tables');
						node3.createChildNode('',true,'images/466.gif',null,null);

						v_tree_object.tables_node = node3;

					}
					else {
						var node2 = tree.createNode('Tables',false,'images/table_multiple.png',node1,{ type:'table_list'},'cm_tables');
						node2.createChildNode('',true,'images/466.gif',null,null);

						v_tree_object.tables_node = node2;

					}

					v_tree_object.refreshTables = function() {
						refresh2(v_tree_object.tables_node);
					}


					tree.drawTree('div_tree');
					v_tree_object;

				},
				null,
				'box');

	}

	function refresh2(node) {
		if (node.tag!=undefined)
			if (node.tag.type=='table_list') {
				getTables2(node);
			}
			else if (node.tag.type=='table') {
				getColumns2(node);
			}
			else if (node.tag.type=='primary_key') {
				getPK2(node);
			}
			else if (node.tag.type=='uniques') {
				getUniques2(node);
			}
			else if (node.tag.type=='foreign_keys') {
				getFKs2(node);
			}
			else if (node.tag.type=='sequence_list') {
				getSequences2(node);
			}
			else if (node.tag.type=='view_list') {
				getViews2(node);
			}
			else if (node.tag.type=='view') {
				getViewsColumns2(node);
			}
			else if (node.tag.type=='indexes') {
				getIndexes2(node);
			}

	}

	function customMenu(node) {

	    var items = {
	        renderGraph: {
	            label: "Render Graph",
                icon: "images/graph.png",
	            action: false,
				submenu: {
					renderGraphSchema: {
			            label: "Simple Graph",
	                    icon: "images/graph.png",
			            action: function () {
			                modalGraph('show',0);
			            }
			        },
					renderGraphAll: {
			            label: "Detailed Graph",
	                    icon: "images/graph.png",
			            action: function () {
			                modalGraph('show',1);
			            }
			        },
					renderGraphLarge: {
			            label: "Graph (Large Data)",
	                    icon: "images/graph.png",
			            action: function () {
			                modalGraph('show',2);
			            }
			        }

				}
	        },
	        getStatistics: {
	            label: "Get Statistics",
                icon: "images/bar_chart.png",
	            action: function () {
	                getStatistics();
	            }
	        },
			renderTree: {
	            label: "Refresh Tree",
                icon: "images/refresh.png",
	            action: function () {
	                getTree();
	            }
	        },
			refresh: {
	            label: "Refresh",
                icon: "images/refresh.png",
	            action: function () {
	                refresh(node);
	            }
	        },
			queryData: {
	            label: "Query Data",
                icon: "images/query.png",
	            action: function () {
	                editor.setValue('-- Querying Data --\nselect *\nfrom ' + node.text);
	                query_sql();
	            }
	        },
			dropTable: {
	            label: "Drop Table",
                icon: "images/delete.png",
	            action: function () {
	                $('#txt_sql').val('drop table ' + node.text);
	                query_sql(node);
	            }
	        }
	    };

	    if (node.data.jstree.can_ref==undefined || node.data.jstree.can_ref!=true) {
	        delete items.refresh;
	    }
	    if (node.data.jstree.node_type==undefined || node.data.jstree.node_type!='db') {
	        delete items.renderGraph;
	        delete items.getStatistics;
	        delete items.renderTree;
	    }
		if (node.data.jstree.node_type==undefined || (node.data.jstree.node_type!='table' && node.data.jstree.node_type!='view')) {
	        delete items.queryData;
	    }
		//if (node.data.jstree.node_type==undefined || (node.data.jstree.node_type!='table')) {
	        delete items.dropTable;
	    //}

	    return items;
	}

	function refresh(node) {

		if (node.data.jstree.node_type=='tables')
			getTables(node);
		else if (node.data.jstree.node_type=='table')
			getColumns(node);
		else if (node.data.jstree.node_type=='views')
			getViews(node);
		else if (node.data.jstree.node_type=='view')
			getViewColumns(node);
		else if (node.data.jstree.node_type=='sequences')
			getSequences(node);
		else if (node.data.jstree.node_type=='foreign_keys')
			getFKs(node);
		else if (node.data.jstree.node_type=='primary_key')
			getPK(node);
		else if (node.data.jstree.node_type=='uniques')
			getUniques(node);

	}

	function getTables2(node) {

		node.removeChildNodes();
		node.createChildNode('',false,'images/466.gif',null,null);


		execAjax('Tree.aspx/GetTables',
				null,
				function(p_return) {

					if (node.childNodes.length > 0)
						node.removeChildNodes();

					node.setText('Tables (' + p_return.v_data.length + ')');

					node.tag.num_tables = p_return.v_data.length;

					for (i=0; i<p_return.v_data.length; i++) {


			        	v_node = node.createChildNode(p_return.v_data[i],false,'images/table.png',{ type:'table'},'cm_table');
			        	v_node.createChildNode('',false,'images/466.gif',{ type:'table_field'},null);

			        }

				},
				null,
				'box',
				false);
	}

	function getTables(node) {
		execAjax('Tree.aspx/GetTables',
				null,
				function(p_return) {

					$root.jstree(true).set_text(node,'Tables (' + p_return.v_data.length + ')');

					$root.jstree(true).open_node(node);

					var nodes = $root.jstree(true).get_children_dom(node);

			        for (i=0; i<nodes.length; i++) {
			        	$root.jstree(true).delete_node(nodes[i]);
			        }

			        for (i=0; i<p_return.v_data.length; i++) {

			        	console.log('num table: ' + i);

			        	new_node = { text : p_return.v_data[i],
			        				 icon : 'images/table.png',
									 data : { 'jstree': { node_type: 'table',
														  can_ref: true
														}
									        }
							       };


			        	new_name = $root.jstree(true).create_node(node, new_node,'inside',false,false);

			        	new_node = $root.jstree(true).get_node(new_name);

				        new_child_node = {  text : '',
			        			  icon : 'images/table.png'
			        		   };

						$root.jstree(true).create_node(new_node, new_child_node,'inside',false,false);


			        }

				},
				null,
				'box');
	}

	function getSequences2(node) {
		node.removeChildNodes();
		node.createChildNode('',false,'images/466.gif',null,null);

		execAjax('Tree.aspx/GetSequences',
				null,
				function(p_return) {

					node.setText('Sequences (' + p_return.v_data.length + ')');

					if (node.childNodes.length > 0)
						node.removeChildNodes();

			        for (i=0; i<p_return.v_data.length; i++) {

			        	v_node = node.createChildNode(p_return.v_data[i],false,'images/sequence_list.png',{ type:'sequence'},null);


			        }

				},
				null,
				'box',
				false);
	}

	function getSequences(node) {
		execAjax('Tree.aspx/GetSequences',
				null,
				function(p_return) {

					$root.jstree(true).set_text(node,'Sequences (' + p_return.v_data.length + ')');

					$root.jstree(true).open_node(node);

					var nodes = $root.jstree(true).get_children_dom(node);

			        for (i=0; i<nodes.length; i++) {
			        	$root.jstree(true).delete_node(nodes[i]);
			        }

			        for (i=0; i<p_return.v_data.length; i++) {

			        	new_node = { text : p_return.v_data[i],
			        				 icon : 'images/sequence_list.png',
									 data : { 'jstree': { node_type: 'sequence'
														}
									        }
							       };

			        	new_name = $root.jstree(true).create_node(node, new_node);

			        }

				},
				null,
				'box');
	}

	function getViews2(node) {

		node.removeChildNodes();
		node.createChildNode('',false,'images/466.gif',null,null);

		execAjax('Tree.aspx/GetViews',
				null,
				function(p_return) {

					node.setText('Views (' + p_return.v_data.length + ')');

					if (node.childNodes.length > 0)
						node.removeChildNodes();

			        for (i=0; i<p_return.v_data.length; i++) {

			        	v_node = node.createChildNode(p_return.v_data[i],false,'images/table.png',{ type:'view'},null);
			        	//v_node.createChildNode('',false,'images/466.gif',{ type:'view_field'},null);


			        }


				},
				null,
				'box',
				false);
	}

	function getViews(node) {

		execAjax('Tree.aspx/GetViews',
				null,
				function(p_return) {

					$root.jstree(true).set_text(node,'Views (' + p_return.v_data.length + ')');

					$root.jstree(true).open_node(node);

					var nodes = $root.jstree(true).get_children_dom(node);

			        for (i=0; i<nodes.length; i++) {
			        	$root.jstree(true).delete_node(nodes[i]);
			        }

			        for (i=0; i<p_return.v_data.length; i++) {

			        	new_node = { text : p_return.v_data[i],
			        				 icon : 'images/table.png',
									 data : { 'jstree': { node_type: 'view',
														  can_ref: true
														}
									        }
							       };


			        	new_name = $root.jstree(true).create_node(node, new_node);

			        	new_node = $root.jstree(true).get_node(new_name);

				        new_child_node = {  text : '',
			        			  icon : 'images/table.png'
			        		   };

						$root.jstree(true).create_node(new_node, new_child_node);


			        }

				},
				null,
				'box');
	}

	function getColumns2(node) {

		node.removeChildNodes();
		node.createChildNode('',false,'images/466.gif',null,null);

		execAjax('Tree.aspx/GetColumns',
				JSON.stringify({"p_table": node.text}),
				function(p_return) {

					if (node.childNodes.length > 0)
						node.removeChildNodes();



					for (i=0; i<p_return.v_data.length; i++) {


			        	v_node = node.createChildNode(p_return.v_data[i][0],false,'images/add.png',{ type:'table_field'},null);
			        	v_node.createChildNode('Type: ' + p_return.v_data[i][1],false,'images/bullet_red.png',null,null);
			        	//v_node.createChildNode('Length: ' + p_return.v_data[i][2],false,'images/bullet_red.png',null,null);
			        	v_node.createChildNode('Nullable: ' + p_return.v_data[i][3],false,'images/bullet_red.png',null,null);

			        }

			        v_node = node.createChildNode('Primary Key',false,'images/key.png',{ type:'primary_key'},'cm_refresh');
			        v_node.createChildNode('',false,'images/466.gif',null,null);

			        v_node = node.createChildNode('Foreign Keys',false,'images/silver_key.png',{ type:'foreign_keys'},'cm_refresh');
			        v_node.createChildNode('',false,'images/466.gif',null,null);

			        v_node = node.createChildNode('Uniques',false,'images/blue_key.png',{ type:'uniques'},'cm_refresh');
			        v_node.createChildNode('',false,'images/466.gif',null,null);

			        v_node = node.createChildNode('Indexes',false,'images/index.png',{ type:'indexes'},'cm_refresh');
			        v_node.createChildNode('',false,'images/466.gif',null,null);


				},
				null,
				'box',
				false);
	}

	function getColumns(node) {

		execAjax('Tree.aspx/GetColumns',
				JSON.stringify({"p_table": node.text}),
				function(p_return) {

					console.log(p_return);

					$root.jstree(true).open_node(node);

					var nodes = $root.jstree(true).get_children_dom(node);

			        for (i=0; i<nodes.length; i++) {
			        	$root.jstree(true).delete_node(nodes[i]);
			        }

			        for (i=0; i<p_return.v_data.length; i++) {

			        	new_node = { text : p_return.v_data[i][0],
			        				 icon : 'images/add.png',
									 data : { 'jstree': { node_type: 'column'
														}
									        }
							       };


			        	new_name = $root.jstree(true).create_node(node, new_node);

			        	new_node = $root.jstree(true).get_node(new_name);

				        new_child_node = {  text : 'Type: ' + p_return.v_data[i][1],
			        			  icon : 'images/bullet_red.png'
			        		   };
						$root.jstree(true).create_node(new_node, new_child_node);
				        new_child_node = {  text : 'Length: ' + p_return.v_data[i][2],
			        			  icon : 'images/bullet_red.png'
			        		   };
						$root.jstree(true).create_node(new_node, new_child_node);
				        new_child_node = {  text : 'Nullable: ' + p_return.v_data[i][3],
			        			  icon : 'images/bullet_red.png'
			        		   };
						$root.jstree(true).create_node(new_node, new_child_node);

						//////////

			        }

			        new_node = { text : 'Primary Key',
		        				 icon : 'images/key.png',
								 data : { 'jstree': { node_type: 'primary_key',
												      can_ref: true,
												      parent: node.text
													}
								        }
						       };


		        	new_name = $root.jstree(true).create_node(node, new_node);

		        	new_node = $root.jstree(true).get_node(new_name);

			        new_child_node = {  text : '',
		        			  icon : 'images/key.png'
		        		   };
					$root.jstree(true).create_node(new_node, new_child_node);

					new_node = { text : 'Foreign Keys',
		        				 icon : 'images/silver_key.png',
								 data : { 'jstree': { node_type: 'foreign_keys',
												      can_ref: true,
												      parent: node.text
													}
								        }
						       };


		        	new_name = $root.jstree(true).create_node(node, new_node);

		        	new_node = $root.jstree(true).get_node(new_name);

			        new_child_node = {  text : '',
		        			  icon : 'images/silver_key.png'
		        		   };
					$root.jstree(true).create_node(new_node, new_child_node);

					new_node = { text : 'Uniques',
		        				 icon : 'images/blue_key.png',
								 data : { 'jstree': { node_type: 'uniques',
												      can_ref: true,
												      parent: node.text
													}
								        }
						       };


		        	new_name = $root.jstree(true).create_node(node, new_node);

		        	new_node = $root.jstree(true).get_node(new_name);

			        new_child_node = {  text : '',
		        			  icon : 'images/blue_key.png'
		        		   };
					$root.jstree(true).create_node(new_node, new_child_node);

				},
				null,
				'box');
	}

	function getPK2(node) {

		node.removeChildNodes();
		node.createChildNode('',false,'images/466.gif',null,null);

		execAjax('Tree.aspx/GetPK',
				JSON.stringify({"p_table": node.parent.text}),
				function(p_return) {


					if (node.childNodes.length > 0)
						node.removeChildNodes();


		        	if (p_return.v_data.length>0)
		        	v_node = node.createChildNode(p_return.v_data[0][0],false,'images/key.png',{ type:'pk'},null);

			        for (i=0; i<p_return.v_data.length; i++) {

			        	v_node.createChildNode(p_return.v_data[i][1],false,'images/bullet_red.png',null,null);


			        }

				},
				null,
				'box',
				false);
	}

	function getUniques2(node) {

		node.removeChildNodes();
		node.createChildNode('',false,'images/466.gif',null,null);

		execAjax('Tree.aspx/GetUniques',
				JSON.stringify({"p_table": node.parent.text}),
				function(p_return) {

					if (node.childNodes.length > 0)
						node.removeChildNodes();

					v_curr_fk = '';

		        	new_node = '';
		        	new_name = '';

		        	var v_node;


		        	if (p_return.v_data.length>0) {

		        		for (i=0; i<p_return.v_data.length; i++) {

			        		if (v_curr_fk=='' || (p_return.v_data[i][0]!=v_curr_fk && v_curr_fk!='')) {

			        			v_curr_fk=p_return.v_data[i][0];

			        			v_node = node.createChildNode(p_return.v_data[i][0],false,'images/blue_key.png',{ type:'unique'},null);

			        		}

			        		v_node.createChildNode(p_return.v_data[i][1],false,'images/bullet_red.png',null,null);

		        		}

		        	}

				},
				null,
				'box',
				false);
	}

	function getIndexes2(node) {

		node.removeChildNodes();
		node.createChildNode('',false,'images/466.gif',null,null);

		execAjax('Tree.aspx/GetIndexes',
				JSON.stringify({"p_table": node.parent.text}),
				function(p_return) {

					if (node.childNodes.length > 0)
						node.removeChildNodes();

					v_curr_fk = '';

		        	new_node = '';
		        	new_name = '';

		        	var v_node;


		        	if (p_return.v_data.length>0) {

		        		for (i=0; i<p_return.v_data.length; i++) {

			        		if (v_curr_fk=='' || (p_return.v_data[i][0]!=v_curr_fk && v_curr_fk!='')) {

			        			v_curr_fk=p_return.v_data[i][0];

			        			v_node = node.createChildNode(p_return.v_data[i][0] + ' (' + p_return.v_data[i][1] + ')',false,'images/index.png',{ type:'index'},null);

			        		}

			        		v_node.createChildNode(p_return.v_data[i][2],false,'images/add.png',null,null);

		        		}

		        	}

				},
				null,
				'box',
				false);
	}

	function getPK(node) {
		console.log(node);
		execAjax('Tree.aspx/GetPK',
				JSON.stringify({"p_table": node.data.jstree.parent}),
				function(p_return) {

					$root.jstree(true).open_node(node);

					var nodes = $root.jstree(true).get_children_dom(node);

			        for (i=0; i<nodes.length; i++) {
			        	$root.jstree(true).delete_node(nodes[i]);
			        }

			        v_curr_fk = '';

		        	new_node = '';
		        	new_name = '';

			        for (i=0; i<p_return.v_data.length; i++) {

			        	if (v_curr_fk=='' || (p_return.v_data[i][0]!=v_curr_fk && v_curr_fk!='')) {

			        		v_curr_fk=p_return.v_data[i][0];

			        		new_node = { text : p_return.v_data[i][0],
			        				 icon : 'images/key.png',
			        				 data : { 'jstree': { node_type: 'pk'
													}
								        }
							       };
			        		new_name = $root.jstree(true).create_node(node, new_node);

			        		new_node = $root.jstree(true).get_node(new_name);

			        	}

			        	new_child_node = {  text : p_return.v_data[i][1],
				        			  icon : 'images/add.png'
				        		   };
						$root.jstree(true).create_node(new_node, new_child_node);

			        }

				},
				null,
				'box');
	}

	function getUniques(node) {
		console.log(node);
		execAjax('Tree.aspx/GetUniques',
				JSON.stringify({"p_table": node.data.jstree.parent}),
				function(p_return) {

					$root.jstree(true).set_text(node,'Uniques (' + p_return.v_data.length + ')');

					$root.jstree(true).open_node(node);

					var nodes = $root.jstree(true).get_children_dom(node);

			        for (i=0; i<nodes.length; i++) {
			        	$root.jstree(true).delete_node(nodes[i]);
			        }

			        v_curr_fk = '';

		        	new_node = '';
		        	new_name = '';

			        for (i=0; i<p_return.v_data.length; i++) {

			        	if (v_curr_fk=='' || (p_return.v_data[i][0]!=v_curr_fk && v_curr_fk!='')) {

			        		v_curr_fk=p_return.v_data[i][0];

			        		new_node = { text : p_return.v_data[i][0],
			        				 icon : 'images/blue_key.png',
			        				 data : { 'jstree': { node_type: 'unique'
													}
								        }
							       };
			        		new_name = $root.jstree(true).create_node(node, new_node);

			        		new_node = $root.jstree(true).get_node(new_name);

			        	}

			        	new_child_node = {  text : p_return.v_data[i][1],
				        			  icon : 'images/add.png'
				        		   };
						$root.jstree(true).create_node(new_node, new_child_node);

			        }

				},
				null,
				'box');
	}

	function getFKs2(node) {

		node.removeChildNodes();
		node.createChildNode('',false,'images/466.gif',null,null);

		execAjax('Tree.aspx/GetFKs',
				JSON.stringify({"p_table": node.parent.text}),
				function(p_return) {

					if (node.childNodes.length > 0)
						node.removeChildNodes();


			        v_curr_fk = '';

		        	new_node = '';
		        	new_name = '';

		        	var v_node;

			        for (i=0; i<p_return.v_data.length; i++) {

			        	if (v_curr_fk=='' || (p_return.v_data[i][0]!=v_curr_fk && v_curr_fk!='')) {

			        		v_node = node.createChildNode(p_return.v_data[i][0],false,'images/silver_key.png',{ type:'foreign_key'},null);
			        		v_node.createChildNode('Referenced Table: ' + p_return.v_data[i][2],false,'images/table.png',null,null);
			        		v_node.createChildNode('Delete Rule: ' + p_return.v_data[i][4],false,'images/bullet_red.png',null,null);
			        		v_node.createChildNode('Update Rule: ' + p_return.v_data[i][5],false,'images/bullet_red.png',null,null);


			        		v_curr_fk=p_return.v_data[i][0];



			        	}


			        	v_node.createChildNode(p_return.v_data[i][1] + ' <img style="vertical-align: middle;" src="images/arrow_right.png"/> ' + p_return.v_data[i][3],false,'images/add.png',null,null);


			        }

				},
				null,
				'box',
			false);
	}

	function getFKs(node) {
		console.log(node);
		execAjax('Tree.aspx/GetFKs',
				JSON.stringify({"p_table": node.data.jstree.parent}),
				function(p_return) {

					$root.jstree(true).set_text(node,'Foreign Keys (' + p_return.v_data.length + ')');

					$root.jstree(true).open_node(node);

					var nodes = $root.jstree(true).get_children_dom(node);

			        for (i=0; i<nodes.length; i++) {
			        	$root.jstree(true).delete_node(nodes[i]);
			        }

			        v_curr_fk = '';

		        	new_node = '';
		        	new_name = '';

			        for (i=0; i<p_return.v_data.length; i++) {

			        	if (v_curr_fk=='' || (p_return.v_data[i][0]!=v_curr_fk && v_curr_fk!='')) {

			        		v_curr_fk=p_return.v_data[i][0];

			        		new_node = { text : p_return.v_data[i][0],
			        				 icon : 'images/silver_key.png',
									 data : { 'jstree': { node_type: 'foreign_key'
														}
									        }
							       };
			        		new_name = $root.jstree(true).create_node(node, new_node);

			        		new_node = $root.jstree(true).get_node(new_name);

					        new_child_node = {  text : 'Referenced Table: ' + p_return.v_data[i][2],
				        			  icon : 'images/table.png'
				        		   };
							$root.jstree(true).create_node(new_node, new_child_node);

							///

							new_child_node = {  text : 'Columns',
				        			  icon : 'images/add.png',
				        			  data : { 'jstree': { node_type: 'col',
												      can_ref: true,
												      parent: node.text
													}
								        }
				        		   };
							new_name = $root.jstree(true).create_node(new_node, new_child_node);
							new_node = $root.jstree(true).get_node(new_name);

			        	}

			        	new_child_node = {  text : p_return.v_data[i][1] + ' <img src="images/arrow_right.png"/> ' + p_return.v_data[i][3],
				        			  icon : 'images/add.png'
				        		   };
						$root.jstree(true).create_node(new_node, new_child_node);

			        }

				},
				null,
				'box');
	}

	function getViewsColumns2(node) {

		node.removeChildNodes();
		node.createChildNode('',false,'images/466.gif',null,null);

		execAjax('Tree.aspx/GetViewColumns',
				JSON.stringify({"p_table": node.text}),
				function(p_return) {

					if (node.childNodes.length > 0)
						node.removeChildNodes();

					for (i=0; i<p_return.v_data.length; i++) {


			        	v_node = node.createChildNode(p_return.v_data[i],false,'images/add.png',{ type:'column'},null);

			        }


				},
				null,
				'box');
	}

	function getViewColumns(node) {

		execAjax('Tree.aspx/GetViewColumns',
				JSON.stringify({"p_table": node.text}),
				function(p_return) {

					$root.jstree(true).open_node(node);

					var nodes = $root.jstree(true).get_children_dom(node);

			        for (i=0; i<nodes.length; i++) {
			        	$root.jstree(true).delete_node(nodes[i]);
			        }

			        for (i=0; i<p_return.v_data.length; i++) {

			        	new_node = { text : p_return.v_data[i],
			        				 icon : 'images/add.png',
									 data : { 'jstree': { node_type: 'column'
														}
									        }
							       };

			        	new_name = $root.jstree(true).create_node(node, new_node);

			        }



				},
				null,
				'box');
	}
