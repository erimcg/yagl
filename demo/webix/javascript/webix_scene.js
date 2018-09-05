var nodeInfo = {
    id: "selectionInfo",
    view:"property",
    editable:false,
    nameWidth:150,
    elements:[
        { label:"Node Information", type:"label"},
        { label:"Index", type:"text", id:"index"},
        { label:"Adjacent Nodes", type:"text", id:"adjacency"},
        { label:"Data", type:"text", id:"data"},
        { label:"Degree", type:"text", id:"ndegree"},
        { label:"Degree Centrality", type:"text", id:"dcentr"},
        { label:"Closeness Centrality", type:"text", id:"ccentr"}
    ]
};
var edgeInfo = {
    id: "selectionInfo",
    view:"property",
    editable:false,
    elements:[
        { label:"Edge Information", type:"label"},
        { label:"Index", type:"text", id:"index"},
        { label:"Weight", type:"text", id:"weight"},
        { label:"Node 1", type:"text", id:"node1"},
        { label:"Node 2", type:"text", id:"node2"}
    ]
};
var graphStats = {
    id: "graphStats",
    view:"property",
    editable:false,
    elements:[
        { label:"Centrality", type:"label"},
        { label:"Degree", type:"text", id:"gdegree"},
        { label:"Closeness", type:"text", id:"gcloseness"},
        { label:"Density", type:"text", id:"gdensity"}
    ]
};
var graphInfo = [];
var graphLabel = -1;
var main_tabs = { gravity: 4, height: 723, id: "main_tabs", view: "tabview",
    cells: [
        {
            header: "<span class='webix_icon fa-television'>&#62060</span><span style='padding-left: 4px'>Display</span>",
            body: {
                css: "in_shadow",
                view: "template",
                id: "mainDisplay",
                content: "yagl_scene",
            }
        },
        {
            header: "<span class='webix_icon fa-list'></span><span style='padding-left: 4px'>Data Tables</span>",
            body: {cols: [
                    {
                        id: "dataTableA",
                        view:"datatable",
                        columns:[
                            { id:"ta_vid",    header:"VID",              width:50},
                            { id:"ta_data",   header:"Data",    width:100},
                            { id:"ta_closeness",   header:"Closeness Centrality",    width:160},
                            { id:"ta_adjacent",   header:"Adjacent Vertices",    width:800}
                        ],
                        data: []
                    },
                    {view:"resizer"},
                    {
                        id: "dataTableB",
                        view:"datatable",
                        columns:[
                            { id:"tb_eid",    header:"EID",              width:50},
                            { id:"tb_weight",   header:"Weight",    width:100},
                            { id:"tb_v1",   header:"Vertex 1",    width:100},
                            { id:"tb_v2",   header:"Vertex 2",    width:100}
                        ],
                        data: []
                    },
                ]}}
    ] };
webix.ui({ view:"button", id:"slow_build", value:"Slow Build: On", type:"form", inputWidth:160, width: 160, container: "toolBar", css: "toolBarLabel"});
webix.ui({ view:"button", id:"graph_properties", value:"Show Adjacency List", type:"form", inputWidth:160, width:160, container: "toolBar", css: "toolBarLabel"});
webix.ui({ view:"checkbox", id:"camera_rotate", label:"Rotate Camera", labelWidth: 120, value:1, container: "html_camera_rotate"});
webix.ui({
    id:"m_camera_rotate",
    view:"context",
    height: 54,
    width: 170,
    padding: 0,
    body:{ content:"html_camera_rotate" }
});
webix.ui({
    on: true,
    rows:[
        { type:"clean", cols:[ { view:"menu",
                id:"my_menu",
                data:[
                    { id:"m_file",value:"File", submenu:[
                            { value:"Build Graph", id:"new_graph" }
                        ]},
                    { id:"m_edit",value:"Edit", submenu:
                            { value:"Rebuild Graph", id:"rebuild_graph" }
                    },
                    { id:"m_view",value:"View", submenu:[
                            { value:"Camera", submenu:[ { value:"Free Camera", id:"camera_a"}, { value:"Rotate Camera", id:"camera_b" } ]}
                        ]},
                    { id:"m_analyze",value:"Analyze", submenu:[ { value:"Shortest Path", id:"sp" } ]}
                ],
                type:{
                    subsign:true,
                },
                css:"blue"}]}, {
            cols:[ main_tabs,
                {id:"sideBar", rows: [
                        {rows:[
                                {template:"Degree of Nodes (D)", height: 30},
                                {
                                    view: "chart",
                                    id:"graphInfo",
                                    css:"degree_chart",
                                    height:180,
                                    innerRadius: 30,
                                    type:"pie",
                                    value:"#quantity#",
                                    color:"#color#",
                                    label:"#degree#",
                                    pieInnerText:"<div class='pieLabel'>#quantity#</div>",
                                    shadow:0,
                                    data:graphInfo
                                }
                            ]},
                        {view: "tabview", id: "sideView",
                            cells: [
                                {
                                    header: "<span class='webix_icon fa-bar-chart'></span><span style='padding-left: 4px'>Graph Statistics</span>",
                                    body: {
                                        id: "statisticsPanel",
                                        rows: [
                                            graphStats,
                                            { view:"button", id:"centrality_compute", value:"Compute", type:"base", inputWidth:80 }
                                        ]
                                    }
                                },
                                {
                                    header: "<span class='webix_icon fa-mouse-pointer' style='font-size:90%'>&#62021</span><span style='padding-left: 0px'>Selection Info</span>",
                                    body: nodeInfo
                                }
                            ]
                        }
                    ]}]},
        { rows:[
                {
                    view:"tabbar", type:"bottom", multiview:true, options: [
                        { value: "<span class='webix_icon fa-cogs'></span><span style='padding-left: 4px'>Appearance</span>", id: 'layoutBar' }
                    ],height:30
                },
                {
                    cells:[
                        {
                            rows:[
                                {id:"color_param",
                                    view:"radio",
                                    label:"Node Color Parameter:",
                                    labelWidth:160,
                                    labelPosition:"top",
                                    value:1,
                                    options:[
                                        { id:1, value:"None" },
                                        { id:2, value:"Connected Subgraphs" },
                                        { id:3, value:"Degree Centrality" },
                                        { id:4, value:"Closeness Centrality" }
                                    ]},
                                { view:"button", id:"color_refresh", value:"Refresh Color", type:"base", inputWidth:100 }
                            ]
                        },
                        {
                            id:"analysisBar",
                            template:"Analysis and charts of the selected graph elements"
                        }
                    ],
                    animate: false
                }
            ], height: 500 }
    ]
});
webix.ui({
    view:"window",
    id:"style_win",
    head:false,
    width: 400,
    height: 600,
    body:{
        view:"accordion",
        id:"style",
        collapsed:true,
        multi:true,
        rows:[
            { header:"<span class='webix_icon fa-paint-brush'></span><span style='padding-left: 4px'>Style</span>", body: {
                    template: ""
                }
            }
        ]
    }
});
webix.ui({
    view:"window",
    id:"info_win",
    move:true,
    head:{
        view:"toolbar", cols:[
            {view:"label", label: "YAGL Information" },
            { view:"button", label: 'Close', width: 100, align: 'right', click:"$$('info_win').hide();"}
        ]
    },
    body:{
        template:"Version: 0.1.3"
    }
})
$$('style_win').setPosition(0, 707);
$$('style').attachEvent("onAfterCollapse",function(){
    $$('style_win').setPosition(0, 707);
});
$$('style').attachEvent("onAfterExpand",function(){
    $$('style_win').setPosition(0, 150);
});
webix.ui({
    view:"contextmenu",
    id:"display_context",
    data:["Info"],
    master:$$("yagl_scene").$view
});
$$('display_context').attachEvent("onItemClick", function (id) {
    if (id == "Delete") {
        if (selectedMesh.name[0] == 'v') {
            //removeEdges(selectedMesh.name.slice(1));
            graph.removeVertex(selectedMesh.name.slice(1));
            //selectedMesh.dispose();
        } else {
            graph.removeEdge(selectedMesh.name.slice(1));
            //selectedMesh.dispose();
        }
    }
    if (id == "Add Edge") {
        var edges = graph.getAllEdges();
        var maxeid = 0;
        for (e in edges) {
            if (edges[e].eid > maxeid)
                maxeid = edges[e].eid;
        }
        var weight = Number(prompt("Weight for this edge:"));
        graph.addEdge(maxeid + 1, Number(selectedMeshes[0].name.slice(1)), Number(selectedMeshes[1].name.slice(1)), weight);
    }
    if (id == "Edit") {
        var new_data = prompt("Enter data for vertex " + selectedMesh.name.slice(1) + ":");
        graph.getVertex(selectedMesh.name.slice(1)).setData(new_data);
        write_notes();
    }
    if (id == "Info") {
        $$('info_win').show();
    }
});
$$("color_param").attachEvent("onChange", function(newv, oldv){
    colorComponents(newv - 1);
});
$$("color_refresh").attachEvent("onItemClick", function(id, e){
    colorComponents($$("color_param").getValue() - 1);
});
$$('graphInfo').attachEvent("onMouseMoving", function() {
    degreeChart(1);
});
$$("centrality_compute").attachEvent("onItemClick", function(id, e){
    var degreeCentrality = parseFloat(graph.getDegreeCentrality()).toFixed(5);
    if (Number.isInteger(parseFloat(degreeCentrality)))
        degreeCentrality = parseInt(degreeCentrality);
    var closenessCentrality = parseFloat(graph.getClosenessCentrality()).toFixed(5);
    if (Number.isInteger(parseFloat(closenessCentrality)))
        closenessCentrality = parseInt(closenessCentrality);
    var density = parseFloat(graph.getDensity()).toFixed(5);
    if (Number.isInteger(parseFloat(density)))
        density = parseInt(density);
    $$('graphStats').setValues({
        gdegree: degreeCentrality,
        gcloseness: closenessCentrality,
        gdensity: density
    });
});
$$("my_menu").hideItem("camera_b");
$$("my_menu").attachEvent("onMenuItemClick", function(id, e, node){
    if (id == "sp") {
        findPath();
    }
    if (id == "new_graph") {
        buildGraph();
    }
    if (id == "rebuild_graph") {
        rebuildGraph();
    }
    if (id == "camera_a") {
        toggleCamera();
        $$("my_menu").hideItem("camera_a");
        $$("my_menu").showItem("camera_b");
    }
    if (id == "camera_b") {
        toggleCamera();
        $$("my_menu").hideItem("camera_b");
        $$("my_menu").showItem("camera_a");
    }
});
$$("camera_rotate").attachEvent("onChange", function(newv, oldv){
    toggleCamera();
});
$$("slow_build").attachEvent("onItemClick", function(id, e){
    console.log("test");
    toggleBuildSpeed();
    $$("slow_build").refresh();
    console.log(builder.getSlowBuild());
    if (builder.getSlowBuild()) {
        $$("slow_build").setValue("Slow Build: On");
    } else {
        $$("slow_build").setValue("Slow Build: Off");
    }
    $$("slow_build").refresh();
    console.log("test");
});
$$("graph_properties").attachEvent("onItemClick", function(id, e){
    console.log("test");
    graphProperties();
});
document.getElementById("yagl_scene").onmousemove = function() {
    degreeChart(-1);
}
var colors = ["#ee3639","#ee6a37","#ee9e36","#eecc36","#eeea36","#cbec36","#a9ee36","#6fe036","#36d3ee","#36a9ee","#367fee","#6c5eee","#9b36ee"];
document.body.onclick = function(){
    setTimeout(function(){
        degreeChart(0);
        if ($$('main_tabs').getValue() == 'mainDisplay') {
            //$$('style_win').show(0);
        } else {
            //$$('style_win').hide();
            $$('dataTableA').clearAll();
            $$('dataTableA').parse(taParseGraph());
            $$('dataTableB').clearAll();
            $$('dataTableB').parse(tbParseGraph());
        }}, 5);
}
function taParseGraph(){
    var tableData = [];
    var vertices = graph.getAllVertices();
    for (var i = 0; i < vertices.length; i++) {
        var str = "";
        for(eid in graph.adjacencyList[vertices[i].vid]) {
            edge = graph.edges[eid];
            vid2 = edge.getAdjacentVertex(vertices[i].vid);
            str += vid2 + ", ";
        }
        str = str.slice(0, str.length - 2);
        var closenessCentrality = parseFloat(vertices[i].getClosenessCentrality()).toFixed(5);
        if (Number.isInteger(parseFloat(closenessCentrality)))
            closenessCentrality = parseInt(closenessCentrality);
        tableData[i] = {id:i+1,ta_vid:vertices[i].vid,ta_data:vertices[i].data,ta_closeness:closenessCentrality,ta_adjacent:str};
    }
    return tableData;
}
function tbParseGraph(){
    var tableData = [];
    var edges = graph.getAllEdges();
    for (var i = 0; i < edges.length; i++) {
        tableData[i] = {id:i+1,tb_eid:edges[i].eid,tb_weight:edges[i].weight,tb_v1:edges[i].getFirst().vid,tb_v2:edges[i].getSecond().vid};
    }
    return tableData;
}
function degreeChart(show){
    var data = [];
    var vertices = graph.getAllVertices();
    var num;
    for (var i = 0; i < vertices.length; i++) {
        num = 0;
        for(eid in graph.adjacencyList[vertices[i].vid]) {
            num++;
        }
        var index = -1;
        for (var j = 0; j < data.length; j++) {
            if (data[j].degree == num) {
                index = j;
            }
        }
        if (index == -1) {
            data[data.length] = { quantity:1, degree:num };
        } else {
            data[index].quantity++;
        }
    }
    data.sort(function(a, b) {return a.degree - b.degree;});
    for (var i = 0; i < data.length; i++) {
        data[i].color = colors[12-(i%13)];
        data[i].degree = "D: " + data[i].degree;
    }
    $$('graphInfo').clearAll();
    $$('graphInfo').parse(data);
    if (show != 0) {
        graphLabel = show;
    }
    if (graphLabel == 1) {
        var labels = document.getElementsByClassName("pieLabel");
        for (var i = 0; i < labels.length; i++) {
            labels[i].style.display = "default";
        }
    } else if (graphLabel == -1){
        var labels = document.getElementsByClassName("pieLabel");
        labels[0].style.display = "none";
        for (var i = 0; i < labels.length; i++) {
            labels[i].style.display = "none";
        }
    }
}
setInterval(function(){
    degreeChart(0);
}, 1000);