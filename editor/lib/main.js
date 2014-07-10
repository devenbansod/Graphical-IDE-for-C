var DIAGRAMO = {
    debug: false,
    debugSolutions: []
};
DIAGRAMO.switchDebug = function (c) {
    if (c == undefined) {
        DIAGRAMO.debug = !DIAGRAMO.debug
    } else {
        DIAGRAMO.debug = c
    }
    var d = document.getElementById("iconDebug");
    if (DIAGRAMO.debug) {
        d.src = "./assets/images/icon_debug_true.gif"
    } else {
        d.src = "./assets/images/icon_debug_false.gif"
    }
    draw()
};
DIAGRAMO.fileVersion = 3;
var doUndo = true;
var currentMoveUndo = null;
var CONNECTOR_MANAGER = new ConnectorManager();
var CONTAINER_MANAGER = new ContainerFigureManager();
var currentCloud = [];
var visualMagnet = false;
var GRIDWIDTH = 30;
var SNAP_DISTANCE = 5;
var fillColor = null;
var strokeColor = "#000000";
var currentText = null;
var Browser = new Browser();
var defaultEditorPadding = 6;
var defaultEditorBorderWidth = 1;
var FIGURE_ESCAPE_DISTANCE = 30;
var FIGURE_CLOUD_DISTANCE = 4;
var createFigureFunction = null;
var CNTRL_PRESSED = false;
var SHIFT_PRESSED = false;
var connector = null;
var connectorType = "";
var figureSets = [];
var INDENTATION = 0;

function toSVG() {
    return ""
}

function stopselection(b) {
    if (b.target.className == "text") {
        return true
    }
    return false
}
var STACK = new Stack();
var mousePressed = false;
var STATE_NONE = "none";
var STATE_FIGURE_CREATE = "figure_create";
var STATE_FIGURE_SELECTED = "figure_selected";
var STATE_CONNECTOR_PICK_FIRST = "connector_pick_first";
var STATE_CONNECTOR_PICK_SECOND = "connector_pick_second";
var STATE_CONNECTOR_SELECTED = "connector_selected";
var STATE_CONNECTOR_MOVE_POINT = "connector_move_point";
var STATE_SELECTING_MULTIPLE = "selecting_multiple";
var STATE_GROUP_SELECTED = "group_selected";
var STATE_CONTAINER_SELECTED = "container_selected";
var STATE_TEXT_EDITING = "text_editing";
var state = STATE_NONE;
var selectionArea = new Polygon();
selectionArea.points.push(new Point(0, 0));
selectionArea.points.push(new Point(0, 0));
selectionArea.points.push(new Point(0, 0));
selectionArea.points.push(new Point(0, 0));
selectionArea.style.strokeStyle = "grey";
selectionArea.style.lineWidth = "1";
var gridVisible = false;
var snapTo = false;
var lastClick = [];
var defaultLineWidth = 2;
var currentTextEditor = null;
var selectedFigureId = -1;
var selectedFigureThumb = null;
var selectedGroupId = -1;
var selectedConnectorId = -1;
var selectedContainerId = -1;
var selectedConnectionPointId = -1;
var dragging = false;
var insertedImageFileName = null;
var canvasProps = null;
var clipboardBuffer = [];

function getCanvas() {
    var b = document.getElementById("a");
    return b
}

function getContext() {
    var b = getCanvas();
    if (b.getContext) {
        return b.getContext("2d")
    } else {
        alert("You need a HTML5 web browser. Any Safari,Firefox, Chrome or Explorer supports this.")
    }
}
var currentSetId = "basic";

function setFigureSet(g) {
    Log.info("main.js id = " + g);
    var d = document.getElementById(g);
    if (d != null) {
        if (currentSetId != null) {
            Log.info("main.js currentSetId = " + currentSetId);
            var e = document.getElementById(currentSetId);
            e.style.display = "none"
        }
        d.style.display = "block";
        currentSetId = g
    }
}

function updateShape(r, i, B, D, A) {
    D = D || false;
    var w = STACK.figureGetById(r);
    if (!w) {
        w = CONNECTOR_MANAGER.connectorGetById(r)
    }
    if (!w) {
        w = STACK.containerGetById(r)
    }
    var C = w;
    var s = i.split(".");
    var t = w;
    for (var z = 0; z < s.length - 1; z++) {
        w = w[s[z]]
    }
    var v = s[s.length - 1];
    var u = "set" + Util.capitaliseFirstLetter(v);
    var E = "get" + Util.capitaliseFirstLetter(v);
    if (u in w) {
        if ((typeof (A) !== "undefined" && A != w[E]) || (typeof (A) === "undefined" && B != w[E]())) {
            var q = new ShapeChangePropertyCommand(r, i, B, A);
            q.execute();
            if (!D) {
                History.addUndo(q)
            }
        }
        w[u](B)
    } else {
        if ((typeof (A) !== "undefined" && w[v] != A) || (typeof (A) === "undefined" && w[v] != B)) {
            var q = new ShapeChangePropertyCommand(r, i, B, A);
            q.execute();
            if (!D) {
                History.addUndo(q)
            }
            w[v] = B
        }
    } if (C instanceof Connector && v == "str") {
        C.updateMiddleText()
    }
    draw()
}

function setUpEditPanel(d) {
    var c = document.getElementById("edit");
    c.innerHTML = "";
    if (d == null) {} else {
        switch (d.oType) {
        case "Group":
            break;
        case "Container":
            Builder.constructPropertiesPanel(c, d);
            break;
        case "CanvasProps":
            Builder.constructCanvasPropertiesPanel(c, d);
            break;
        default:
            Builder.constructPropertiesPanel(c, d)
        }
    }
}

function setUpTextEditorPopup(i, e) {
    var h = document.getElementById("text-editor");
    var g = document.getElementById("text-editor-tools");
    currentTextEditor = Builder.constructTextPropertiesPanel(h, g, i, e)
}

function createFigure(c, d) {
    createFigureFunction = c;
    selectedFigureThumb = d;
    selectedFigureId = -1;
    selectedConnectorId = -1;
    selectedConnectionPointId = -1;
    if (state == STATE_TEXT_EDITING) {
        currentTextEditor.destroy();
        currentTextEditor = null
    }
    state = STATE_FIGURE_CREATE;
    draw()
}

function resetToNoneState() {
    if (state == STATE_TEXT_EDITING) {
        currentTextEditor.destroy();
        currentTextEditor = null
    }
    selectedFigureId = -1;
    selectedConnectionPointId = -1;
    selectedConnectorId = -1;
    selectedContainerId = -1;
    if (state == STATE_GROUP_SELECTED) {
        var b = STACK.groupGetById(selectedGroupId);
        if (!b.permanent) {
            STACK.groupDestroy(selectedGroupId)
        }
        selectedGroupId = -1
    }
    state = STATE_NONE
}
var uploadImageErrorDivId = "upload-image-error";

function showInsertImageDialog() {
    resetToNoneState();
    draw();
    setUploadedImagesList();
    var c = document.getElementById("insert-image-dialog");
    $.modal(c, {
        minWidth: "380px",
        containerId: "upload-image-dialog",
        overlayClose: true
    });
    $.modal.setPosition();
    var d = document.getElementById(uploadImageErrorDivId);
    d.innerHTML = ""
}

function setUploadedImagesList() {
    $.post("./common/controller.php", {
        action: "getUploadedImageFileNames"
    }, function (j) {
        var k = document.getElementById("insert-image-reuse");
        var i = document.getElementById("insert-image-reuse-group");
        j = JSON.parse(j);
        if (j != null && j.length) {
            var h, l = j.length,
                m;
            for (h = 0; h < l; h++) {
                m = document.createElement("option");
                m.value = j[h];
                m.textContent = j[h];
                k.appendChild(m)
            }
            k.disabled = false;
            i.disabled = false
        } else {
            k.disabled = true;
            i.disabled = true
        }
    })
}

function insertImage(g, e) {
    if (e) {
        var d = document.getElementById(uploadImageErrorDivId);
        d.innerHTML = e;
        $.modal.setPosition()
    } else {
        $.modal.close();
        insertedImageFileName = g;
        action("insertImage")
    }
}

function snapToGrid() {
    Log.info("snapToGrid called;");
    snapTo = !snapTo;
    if (snapTo) {
        if (!gridVisible) {
            gridVisible = true;
            backgroundImage = null;
            document.getElementById("gridCheckbox").checked = true;
            draw()
        }
    }
}

function showGrid() {
    if (gridVisible) {
        if (snapTo) {
            snapTo = false;
            document.getElementById("snapCheckbox").checked = false
        }
    }
    gridVisible = !gridVisible;
    backgroundImage = null;
    draw()
}

function onClick(e) {
    var i = getCanvasXY(e);
    var g = i[0];
    var h = i[1]
}

function onDoubleClick(k) {
    var j = getCanvasXY(k);
    var g = getCanvas();
    var h = j[0];
    var i = j[1];
    lastClick = [h, i];
    alert("Double click triggered")
}

function onKeyPress(b) {
    if (b.target.className == "text") {
        return true
    }
    draw();
    return false
}

function onKeyDown(m) {
    if (m.target.className == "text") {
        return true
    }
    m.KEY = m.keyCode;
    switch (m.KEY) {
    case KEY.ESCAPE:
        createFigureFunction = null;
        if (selectedFigureId != -1 || selectedConnectionPointId != -1 || selectedConnectorId != -1) {
            redraw = true
        }
        selectedFigureId = -1;
        selectedConnectionPointId = -1;
        selectedConnectorId = -1;
        if (state == STATE_TEXT_EDITING) {
            currentTextEditor.destroy();
            currentTextEditor = null
        }
        state = STATE_NONE;
        break;
    case KEY.DELETE:
        switch (state) {
        case STATE_FIGURE_SELECTED:
            if (selectedFigureId != -1) {
                var o = new FigureDeleteCommand(selectedFigureId);
                o.execute();
                History.addUndo(o)
            }
            break;
        case STATE_GROUP_SELECTED:
            if (selectedGroupId != -1) {
                var s = new GroupDeleteCommand(selectedGroupId);
                s.execute();
                History.addUndo(s)
            }
            break;
        case STATE_CONNECTOR_SELECTED:
            Log.group("Delete connector");
            if (selectedConnectorId != -1) {
                var q = new ConnectorDeleteCommand(selectedConnectorId);
                q.execute();
                History.addUndo(q)
            }
            Log.groupEnd();
            break;
        case STATE_CONTAINER_SELECTED:
            Log.group("Delete container");
            if (selectedContainerId != -1) {
                var n = new ContainerDeleteCommand(selectedContainerId);
                n.execute();
                History.addUndo(n)
            }
            Log.groupEnd();
            break
        }
        break;
    case KEY.SHIFT:
        SHIFT_PRESSED = true;
        break;
    case KEY.CTRL:
    case KEY.COMMAND_LEFT:
    case KEY.COMMAND_FIREFOX:
        CNTRL_PRESSED = true;
        break;
    case KEY.LEFT:
        action("left");
        return false;
        break;
    case KEY.UP:
        action("up");
        return false;
        break;
    case KEY.RIGHT:
        action("right");
        return false;
        break;
    case KEY.DOWN:
        action("down");
        return false;
        break;
    case KEY.Z:
        if (CNTRL_PRESSED) {
            action("undo")
        }
        break;
    case KEY.G:
        if (CNTRL_PRESSED) {
            action("group")
        }
        break;
    case KEY.U:
        if (CNTRL_PRESSED) {
            action("ungroup")
        }
        break;
    case KEY.D:
        if (CNTRL_PRESSED) {
            if (m.preventDefault) {
                m.preventDefault()
            } else {
                m.returnValue = false
            }
            action("duplicate")
        }
        break;
    case KEY.C:
        if (CNTRL_PRESSED) {
            if (selectedFigureId != -1) {
                clipboardBuffer[0] = "figure";
                clipboardBuffer[1] = selectedFigureId
            } else {
                if (selectedGroupId != -1) {
                    clipboardBuffer[0] = "group";
                    clipboardBuffer[1] = selectedGroupId
                } else {
                    clipboardBuffer[0] = "";
                    clipboardBuffer[1] = -1
                }
            }
        }
        break;
    case KEY.V:
        if (CNTRL_PRESSED) {
            if (clipboardBuffer[0]) {
                switch (state) {
                case STATE_NONE:
                    if (clipboardBuffer[0] == "figure") {
                        selectedFigureId = clipboardBuffer[1];
                        action("duplicate")
                    } else {
                        if (clipboardBuffer[0] == "group") {
                            selectedGroupId = clipboardBuffer[1];
                            if (STACK.groupGetById(selectedGroupId)) {
                                action("duplicate")
                            }
                        }
                    }
                    break;
                case STATE_FIGURE_SELECTED:
                    if (clipboardBuffer[0] == "figure") {
                        if (clipboardBuffer[1] == selectedFigureId) {
                            action("duplicate");
                            clipboardBuffer[1] = selectedFigureId
                        } else {
                            var i = STACK.figureGetById(clipboardBuffer[1]);
                            var p = STACK.figureGetById(selectedFigureId);
                            p.applyAnotherFigureStyle(i)
                        }
                    }
                    break;
                case STATE_GROUP_SELECTED:
                    if (clipboardBuffer[1] == selectedGroupId) {
                        action("duplicate");
                        clipboardBuffer[1] = selectedGroupId
                    } else {
                        if (clipboardBuffer[0] == "figure") {
                            var i = STACK.figureGetById(clipboardBuffer[1]);
                            var l = STACK.figureGetByGroupId(selectedGroupId);
                            for (var r = 0; r < l.length; r++) {
                                l[r].applyAnotherFigureStyle(i)
                            }
                        }
                    }
                    break
                }
            }
        }
        break;
    case KEY.S:
        if (CNTRL_PRESSED) {
            save();
            m.preventDefault()
        }
        break;
    case KEY.P:
        if (currentDiagramId !== null) {
            if (CNTRL_PRESSED) {
                Log.info("CTRL-P pressed  ");
                print_diagram();
                m.preventDefault()
            }
        }
        break
    }
    draw();
    return false
}

function onKeyUp(b) {
    switch (b.keyCode) {
    case KEY.SHIFT:
        SHIFT_PRESSED = false;
        break;
    case KEY.ALT:
        CNTRL_PRESSED = false;
        break;
    case KEY.CTRL:
        CNTRL_PRESSED = false;
        break
    }
    return false
}

function onMouseDown(C) {
    var G = getCanvasXY(C);
    var Y = getCanvas();
    var O = G[0];
    var Q = G[1];
    lastClick = [O, Q];
    mousePressed = true;
    switch (state) {
    case STATE_TEXT_EDITING:
        if (currentTextEditor.mouseClickedInside(C)) {
            break
        } else {
            if (Browser.msie || Browser.mozilla) {
                currentTextEditor.blurTextArea()
            }
            currentTextEditor.destroy();
            currentTextEditor = null;
            state = STATE_NONE
        }
    case STATE_NONE:
        snapMonitor = [0, 0];
        var M = CONNECTOR_MANAGER.connectorGetByXY(O, Q);
        if (M != -1) {
            selectedConnectorId = M;
            state = STATE_CONNECTOR_SELECTED;
            var V = CONNECTOR_MANAGER.connectorGetById(selectedConnectorId);
            setUpEditPanel(V);
            Log.info("onMouseDown() + STATE_NONE  - change to STATE_CONNECTOR_SELECTED");
            redraw = true
        } else {
            var X = STACK.figureGetByXY(O, Q);
            if (X != -1) {
                if (STACK.figureGetById(X).groupId != -1) {
                    selectedGroupId = STACK.figureGetById(X).groupId;
                    var R = STACK.groupGetById(selectedGroupId);
                    state = STATE_GROUP_SELECTED;
                    Log.info("onMouseDown() + STATE_NONE + group selected  =>  change to STATE_GROUP_SELECTED")
                } else {
                    selectedFigureId = X;
                    var E = STACK.figureGetById(X);
                    setUpEditPanel(E);
                    state = STATE_FIGURE_SELECTED;
                    Log.info("onMouseDown() + STATE_NONE + lonely figure => change to STATE_FIGURE_SELECTED")
                }
                redraw = true
            } else {
                var D = STACK.containerGetByXY(O, Q);
                if (D !== -1) {
                    var L = STACK.containerGetById(D);
                    setUpEditPanel(L);
                    state = STATE_CONTAINER_SELECTED;
                    selectedContainerId = D;
                    Log.info("onMouseDown() + STATE_NONE  - change to STATE_CONTAINER_SELECTED")
                } else {}
            }
        }
        break;
    case STATE_FIGURE_CREATE:
        throw "canvas> onMouseDown> STATE_FIGURE_CREATE> : this should not happen";
        break;
    case STATE_FIGURE_SELECTED:
        snapMonitor = [0, 0];
        if (HandleManager.handleGet(O, Q) != null) {
            Log.info("onMouseDown() + STATE_FIGURE_SELECTED - handle selected");
            HandleManager.handleSelectXY(O, Q)
        } else {
            var M = CONNECTOR_MANAGER.connectorGetByXY(O, Q);
            if (M != -1) {
                state = STATE_CONNECTOR_SELECTED;
                selectedConnectorId = M;
                var V = CONNECTOR_MANAGER.connectorGetById(selectedConnectorId);
                HandleManager.shapeSet(V);
                setUpEditPanel(V);
                Log.info("onMouseDown() + STATE_FIGURE_SELECTED  - change to STATE_CONNECTOR_SELECTED");
                redraw = true
            } else {
                var X = STACK.figureGetByXY(O, Q);
                if (X == -1) {
                    if (!SHIFT_PRESSED) {
                        selectedFigureId = -1;
                        var D = STACK.containerGetByXY(O, Q);
                        if (D != -1) {
                            var L = STACK.containerGetById(D);
                            setUpEditPanel(L);
                            state = STATE_CONTAINER_SELECTED;
                            selectedContainerId = D;
                            Log.info("onMouseDown() + STATE_FIGURE_SELECTED  - change to STATE_CONTAINER_SELECTED")
                        } else {
                            state = STATE_NONE;
                            setUpEditPanel(canvasProps);
                            Log.info("onMouseDown() + STATE_FIGURE_SELECTED  - change to STATE_NONE")
                        }
                        redraw = true
                    }
                } else {
                    if (X == selectedFigureId) {} else {
                        if (SHIFT_PRESSED) {
                            var i = [];
                            if (selectedFigureId != -1) {
                                i.push(selectedFigureId)
                            }
                            var E = STACK.figureGetById(X);
                            if (E.groupId != -1) {
                                var N = STACK.figureGetByGroupId(E.groupId);
                                for (var F = 0; F < N.length; F++) {
                                    i.push(N[F].id)
                                }
                            } else {
                                i.push(X)
                            }
                            selectedGroupId = STACK.groupCreate(i);
                            state = STATE_GROUP_SELECTED;
                            setUpEditPanel(null);
                            redraw = true;
                            Log.info("onMouseDown() + STATE_FIGURE_SELECTED + SHIFT  + min. 2 figures => STATE_GROUP_SELECTED")
                        } else {
                            var E = STACK.figureGetById(X);
                            if (E.groupId != -1) {
                                selectedFigureId = -1;
                                selectedGroupId = E.groupId;
                                state = STATE_GROUP_SELECTED;
                                setUpEditPanel(null);
                                redraw = true;
                                Log.info("onMouseDown() + STATE_FIGURE_SELECTED + group figure => change to STATE_GROUP_SELECTED")
                            } else {
                                selectedFigureId = X;
                                HandleManager.clear();
                                var E = STACK.figureGetById(X);
                                setUpEditPanel(E);
                                redraw = true;
                                Log.info("onMouseDown() + STATE_FIGURE_SELECTED + single figure => change to STATE_FIGURE_SELECTED (different figure)")
                            }
                        }
                    }
                }
            }
        }
        break;
    case STATE_GROUP_SELECTED:
        var S = STACK.groupGetById(selectedGroupId);
        if (HandleManager.handleGet(O, Q) != null) {
            HandleManager.handleSelectXY(O, Q);
            redraw = true;
            Log.info("onMouseDown() + STATE_GROUP_SELECTED  + handle selected => STATE_GROUP_SELECTED")
        } else {
            if (CONNECTOR_MANAGER.connectorGetByXY(O, Q) != -1) {
                if (!S.permanent) {
                    STACK.groupDestroy(selectedGroupId)
                }
                selectedGroupId = -1;
                selectedConnectorId = CONNECTOR_MANAGER.connectorGetByXY(O, Q);
                state = STATE_CONNECTOR_SELECTED;
                redraw = true;
                Log.info("onMouseDown() + STATE_GROUP_SELECTED  + handle selected => STATE_CONNECTOR_SELECTED")
            } else {
                if (STACK.figureGetByXY(O, Q) != -1) {
                    var X = STACK.figureGetByXY(O, Q);
                    var K = STACK.figureGetById(X);
                    if (K.groupId == -1) {
                        if (SHIFT_PRESSED) {
                            var i = [];
                            var N = STACK.figureGetByGroupId(selectedGroupId);
                            for (var F = 0; F < N.length; F++) {
                                i.push(N[F].id)
                            }
                            i.push(X);
                            if (!S.permanent) {
                                STACK.groupDestroy(selectedGroupId)
                            }
                            selectedGroupId = STACK.groupCreate(i);
                            Log.info("onMouseDown() + STATE_GROUP_SELECTED + SHIFT  + add lonely figure to other")
                        } else {
                            if (!S.permanent) {
                                STACK.groupDestroy(selectedGroupId)
                            }
                            selectedGroupId = -1;
                            state = STATE_FIGURE_SELECTED;
                            selectedFigureId = X;
                            Log.info("onMouseDown() + STATE_GROUP_SELECTED  + lonely figure => STATE_FIGURE_SELECTED");
                            setUpEditPanel(K);
                            redraw = true
                        }
                    } else {
                        if (K.groupId != selectedGroupId) {
                            if (SHIFT_PRESSED) {
                                var i = [];
                                var N = STACK.figureGetByGroupId(selectedGroupId);
                                for (var F = 0; F < N.length; F++) {
                                    i.push(N[F].id)
                                }
                                N = STACK.figureGetByGroupId(K.groupId);
                                for (var F = 0; F < N.length; F++) {
                                    i.push(N[F].id)
                                }
                                if (!S.permanent) {
                                    STACK.groupDestroy(selectedGroupId)
                                }
                                selectedGroupId = STACK.groupCreate(i)
                            } else {
                                if (!S.permanent) {
                                    STACK.groupDestroy(selectedGroupId)
                                }
                                selectedGroupId = K.groupId
                            }
                            redraw = true;
                            Log.info("onMouseDown() + STATE_GROUP_SELECTED  + (different) group figure => STATE_GROUP_SELECTED")
                        } else {}
                    }
                } else {
                    if (!SHIFT_PRESSED) {
                        if (!S.permanent) {
                            STACK.groupDestroy(selectedGroupId)
                        }
                        selectedGroupId = -1;
                        state = STATE_NONE;
                        redraw = true;
                        Log.info("onMouseDown() + STATE_GROUP_SELECTED  + mouse on empty => STATE_NONE")
                    }
                }
            }
        }
        break;
    case STATE_CONNECTOR_PICK_FIRST:
        connectorPickFirst(O, Q, C);
        break;
    case STATE_CONNECTOR_PICK_SECOND:
        state = STATE_NONE;
        break;
    case STATE_CONNECTOR_SELECTED:
        var P = CONNECTOR_MANAGER.connectionPointGetAllByParent(selectedConnectorId);
        var T = P[0];
        var W = P[1];
        var J;
        var H;
        if (T.point.near(O, Q, 3)) {
            Log.info("Picked the start point");
            selectedConnectionPointId = T.id;
            state = STATE_CONNECTOR_MOVE_POINT;
            Y.style.cursor = "default";
            var U = new ConnectorAlterCommand(selectedConnectorId);
            History.addUndo(U);
            J = CONNECTOR_MANAGER.connectionPointGetByXYRadius(O, Q, FIGURE_CLOUD_DISTANCE, ConnectionPoint.TYPE_FIGURE, W);
            if (J !== -1) {
                H = CONNECTOR_MANAGER.connectionPointGetById(J);
                currentCloud = [selectedConnectionPointId, J]
            }
        } else {
            if (W.point.near(O, Q, 3)) {
                Log.info("Picked the end point");
                selectedConnectionPointId = W.id;
                state = STATE_CONNECTOR_MOVE_POINT;
                Y.style.cursor = "default";
                var U = new ConnectorAlterCommand(selectedConnectorId);
                History.addUndo(U);
                J = CONNECTOR_MANAGER.connectionPointGetByXYRadius(O, Q, FIGURE_CLOUD_DISTANCE, ConnectionPoint.TYPE_FIGURE, T);
                if (J !== -1) {
                    H = CONNECTOR_MANAGER.connectionPointGetById(J);
                    currentCloud = [selectedConnectionPointId, J]
                }
            } else {
                if (HandleManager.handleGet(O, Q) != null) {
                    Log.info("onMouseDown() + STATE_CONNECTOR_SELECTED - handle selected");
                    HandleManager.handleSelectXY(O, Q);
                    var U = new ConnectorAlterCommand(selectedConnectorId);
                    History.addUndo(U)
                } else {
                    var I = CONNECTOR_MANAGER.connectorGetByXY(O, Q);
                    switch (I) {
                    case -1:
                        selectedConnectorId = -1;
                        state = STATE_NONE;
                        setUpEditPanel(canvasProps);
                        redraw = true;
                        break;
                    case selectedConnectorId:
                        break;
                    default:
                        selectedConnectorId = I;
                        setUpEditPanel(CONNECTOR_MANAGER.connectorGetById(selectedConnectorId));
                        state = STATE_CONNECTOR_SELECTED;
                        redraw = true
                    }
                }
            }
        }
        break;
    case STATE_CONTAINER_SELECTED:
        if (HandleManager.handleGet(O, Q) != null) {
            Log.info("onMouseDown() + STATE_CONTAINER_SELECTED - handle selected");
            HandleManager.handleSelectXY(O, Q)
        } else {
            var M = CONNECTOR_MANAGER.connectorGetByXY(O, Q);
            if (M !== -1) {
                selectedConnectorId = M;
                state = STATE_CONNECTOR_SELECTED;
                var V = CONNECTOR_MANAGER.connectorGetById(selectedConnectorId);
                setUpEditPanel(V);
                Log.info("onMouseDown() + STATE_CONTAINER_SELECTED  - change to STATE_CONNECTOR_SELECTED");
                redraw = true
            } else {
                var X = STACK.figureGetByXY(O, Q);
                if (X != -1) {
                    if (STACK.figureGetById(X).groupId != -1) {
                        selectedGroupId = STACK.figureGetById(X).groupId;
                        var R = STACK.groupGetById(selectedGroupId);
                        state = STATE_GROUP_SELECTED;
                        Log.info("onMouseDown() + STATE_CONTAINER_SELECTED + group selected  =>  change to STATE_GROUP_SELECTED")
                    } else {
                        selectedFigureId = X;
                        var E = STACK.figureGetById(X);
                        setUpEditPanel(E);
                        state = STATE_FIGURE_SELECTED;
                        Log.info("onMouseDown() + STATE_CONTAINER_SELECTED + lonely figure => change to STATE_FIGURE_SELECTED")
                    }
                    redraw = true
                } else {
                    var D = STACK.containerGetByXY(O, Q);
                    if (D == -1) {
                        state = STATE_NONE;
                        setUpEditPanel(canvasProps);
                        selectedContainerId = -1;
                        HandleManager.clear();
                        Log.info("onMouseDown() + STATE_CONTAINER_SELECTED + click on nothing - change to STATE_NONE")
                    } else {
                        if (D != selectedContainerId) {
                            var L = STACK.containerGetById(D);
                            setUpEditPanel(L);
                            state = STATE_CONTAINER_SELECTED;
                            selectedContainerId = D;
                            Log.info("onMouseDown() + STATE_NONE  - change to STATE_CONTAINER_SELECTED")
                        } else {}
                    }
                }
            }
        }
        break;
    default:
    }
    draw();
    return false
}

function onMouseUp(z) {
    Log.info("main.js>onMouseUp()");
    var v = getCanvasXY(z);
    var u = v[0];
    var A = v[1];
    lastClick = [];
    mousePressed = true;
    switch (state) {
    case STATE_NONE:
        if (HandleManager.handleGetSelected()) {
            HandleManager.clear()
        }
        break;
    case STATE_FIGURE_SELECTED:
        mousePressed = false;
        HandleManager.handleSelectedIndex = -1;
        break;
    case STATE_CONTAINER_SELECTED:
        mousePressed = false;
        HandleManager.handleSelectedIndex = -1;
        break;
    case STATE_GROUP_SELECTED:
        Log.info("onMouseUp() + STATE_GROUP_SELECTED ...");
        mousePressed = false;
        HandleManager.handleSelectedIndex = -1;
        break;
    case STATE_SELECTING_MULTIPLE:
        Log.info("onMouseUp() + STATE_SELECTING_MULTIPLE => STATE_NONE");
        Log.info("onMouseUp() selection area: " + selectionArea);
        state = STATE_NONE;
        var F = [];
        if (SHIFT_PRESSED) {
            if (selectedFigureId != -1) {
                F.push(selectedFigureId)
            }
            if (selectedGroupId != -1) {
                var B = STACK.groupGetById(selectedGroupId);
                var t = STACK.figureGetByGroupId(selectedGroupId);
                for (var D = 0; D < t.length; D++) {
                    F.push(t[D].id)
                }
            }
        }
        for (var D = 0; D < STACK.figures.length; D++) {
            if (STACK.figures[D].groupId == -1) {
                var s = STACK.figures[D].getPoints();
                if (s.length == 0) {
                    s.push(new Point(STACK.figures[D].getBounds()[0], STACK.figures[D].getBounds()[1]));
                    s.push(new Point(STACK.figures[D].getBounds()[2], STACK.figures[D].getBounds()[3]));
                    s.push(new Point(STACK.figures[D].getBounds()[0], STACK.figures[D].getBounds()[3]));
                    s.push(new Point(STACK.figures[D].getBounds()[2], STACK.figures[D].getBounds()[1]))
                }
                var C = false;
                for (var w = 0; w < s.length; w++) {
                    if (Util.isPointInside(s[w], selectionArea.getPoints())) {
                        F.push(STACK.figures[D].id);
                        C = true;
                        break
                    }
                }
                if (!C) {
                    C = Util.polylineIntersectsRectangle(s, selectionArea.getBounds(), true)
                }
                if (C) {
                    F.push(STACK.figures[D].id)
                }
            }
        }
        if (selectedGroupId != -1) {
            var B = STACK.groupGetById(selectedGroupId);
            if (!B.permanent) {
                STACK.groupDestroy(selectedGroupId)
            }
        }
        if (F.length >= 2) {
            selectedGroupId = STACK.groupCreate(F);
            state = STATE_GROUP_SELECTED;
            setUpEditPanel(null);
            Log.info("onMouseUp() + STATE_SELECTING_MULTIPLE  + min. 2 figures => STATE_GROUP_SELECTED")
        } else {
            if (F.length == 1) {
                selectedFigureId = F[0];
                selectedGroupId = -1;
                state = STATE_FIGURE_SELECTED;
                Log.info("onMouseUp() + STATE_SELECTING_MULTIPLE  + 1 figure => STATE_FIGURE_SELECTED")
            }
        }
        break;
    case STATE_CONNECTOR_PICK_SECOND:
        var a = new ConnectorCreateCommand(selectedConnectorId);
        History.addUndo(a);
        CONNECTOR_MANAGER.connectionPointsResetColor();
        currentCloud = [];
        state = STATE_CONNECTOR_SELECTED;
        var G = CONNECTOR_MANAGER.connectorGetById(selectedConnectorId);
        setUpEditPanel(G);
        redraw = true;
        break;
    case STATE_CONNECTOR_MOVE_POINT:
        CONNECTOR_MANAGER.connectionPointsResetColor();
        currentCloud = [];
        state = STATE_CONNECTOR_SELECTED;
        selectedConnectionPointId = -1;
        redraw = true;
        break;
    case STATE_CONNECTOR_SELECTED:
        if (currentMoveUndo) {
            var i = CONNECTOR_MANAGER.connectorGetById(selectedConnectorId).turningPoints;
            var E = [i.length];
            for (var D = 0; D < i.length; D++) {
                E[D] = i[D].clone()
            }
            currentMoveUndo.currentValue = E;
            History.addUndo(currentMoveUndo);
            state = STATE_NONE;
            selectedConnectorId = -1;
            HandleManager.clear()
        }
        break
    }
    currentMoveUndo = null;
    mousePressed = false;
    draw()
}
var lastMove = null;
var snapMonitor = [0, 0];

function onMouseMove(R) {
    var ac = false;
    var aa = getCanvasXY(R);
    if (aa == null) {
        Log.error("main.js onMouseMove() null coordinates");
        return
    }
    var ad = aa[0];
    var ag = aa[1];
    var am = getCanvas();
    Log.debug("onMouseMoveCanvas: test if over a figure: " + ad + "," + ag);
    switch (state) {
    case STATE_NONE:
        if (mousePressed) {
            state = STATE_SELECTING_MULTIPLE;
            selectionArea.points[0] = new Point(ad, ag);
            selectionArea.points[1] = new Point(ad, ag);
            selectionArea.points[2] = new Point(ad, ag);
            selectionArea.points[3] = new Point(ad, ag);
            Log.debug("onMouseMove() - STATE_NONE + mousePressed = STATE_SELECTING_MULTIPLE")
        } else {
            if (STACK.figureIsOver(ad, ag)) {
                am.style.cursor = "move";
                Log.debug("onMouseMove() - STATE_NONE - mouse cursor = move (over figure)")
            } else {
                if (CONNECTOR_MANAGER.connectorGetByXY(ad, ag) != -1) {
                    am.style.cursor = "move";
                    Log.debug("onMouseMove() - STATE_NONE - mouse cursor = move (over connector)")
                } else {
                    if (STACK.containerGetByXY(ad, ag) != -1) {
                        am.style.cursor = "move";
                        Log.debug("onMouseMove() - STATE_NONE - mouse cursor = move (over container)")
                    } else {
                        am.style.cursor = "default";
                        Log.debug("onMouseMove() - STATE_NONE - mouse cursor = default")
                    }
                }
            }
        }
        break;
    case STATE_SELECTING_MULTIPLE:
        selectionArea.points[1].x = ad;
        selectionArea.points[2].x = ad;
        selectionArea.points[2].y = ag;
        selectionArea.points[3].y = ag;
        ac = true;
        break;
    case STATE_FIGURE_CREATE:
        if (createFigureFunction) {
            am.style.cursor = "crosshair"
        }
        break;
    case STATE_FIGURE_SELECTED:
        if (mousePressed) {
            if (lastMove != null) {
                var O = HandleManager.handleGetSelected();
                if (O != null) {
                    am.style.cursor = O.getCursor();
                    O.action(lastMove, ad, ag);
                    ac = true;
                    Log.info("onMouseMove() - STATE_FIGURE_SELECTED + drag - mouse cursor = " + am.style.cursor)
                } else {
                    if (!SHIFT_PRESSED) {
                        am.style.cursor = "move";
                        var ab = generateMoveMatrix(STACK.figureGetById(selectedFigureId), ad, ag);
                        Log.info("onMouseMove() + STATE_FIGURE_SELECTED : translation matrix" + ab);
                        var X = new FigureTranslateCommand(selectedFigureId, ab);
                        History.addUndo(X);
                        X.execute();
                        var c = STACK.figureGetById(selectedFigureId);
                        var an = c.getBounds();
                        var T = CONTAINER_MANAGER.getContainerForFigure(selectedFigureId);
                        if (T !== -1) {
                            var Y = STACK.containerGetById(T);
                            var ao = Y.getBounds();
                            if (Util.areBoundsInBounds(an, ao)) {} else {
                                CONTAINER_MANAGER.removeFigure(T, selectedFigureId)
                            }
                        } else {
                            var Z = -1;
                            for (var P = 0; P < STACK.containers.length; P++) {
                                var ai = STACK.containers[P];
                                if (Util.areBoundsInBounds(an, ai.getBounds())) {
                                    Z = STACK.containers[P].id;
                                    break
                                }
                            }
                            if (Z !== -1) {
                                CONTAINER_MANAGER.addFigure(Z, selectedFigureId)
                            }
                        }
                        ac = true;
                        Log.info("onMouseMove() + STATE_FIGURE_SELECTED + drag - move selected figure")
                    } else {
                        state = STATE_SELECTING_MULTIPLE;
                        selectionArea.points[0] = new Point(ad, ag);
                        selectionArea.points[1] = new Point(ad, ag);
                        selectionArea.points[2] = new Point(ad, ag);
                        selectionArea.points[3] = new Point(ad, ag);
                        ac = true;
                        Log.info("onMouseMove() - STATE_GROUP_SELECTED + mousePressed + SHIFT => STATE_SELECTING_MULTIPLE")
                    }
                }
            }
        } else {
            var O = HandleManager.handleGet(ad, ag);
            if (O != null) {
                am.style.cursor = O.getCursor();
                Log.info("onMouseMove() - STATE_FIGURE_SELECTED + over a Handler = change cursor to: " + am.style.cursor)
            } else {
                var Q = STACK.figureGetByXY(ad, ag);
                if (Q != -1) {
                    am.style.cursor = "move";
                    Log.info("onMouseMove() + STATE_FIGURE_SELECTED + over a figure = change cursor")
                } else {
                    am.style.cursor = "default";
                    Log.info("onMouseMove() + STATE_FIGURE_SELECTED + over nothin = change cursor to default")
                }
            }
        }
        break;
    case STATE_TEXT_EDITING:
        if (!mousePressed) {
            var O = HandleManager.handleGet(ad, ag);
            if (O != null) {
                am.style.cursor = O.getCursor();
                Log.info("onMouseMove() - STATE_TEXT_EDITING + over a Handler = change cursor to: " + am.style.cursor)
            } else {
                var Q = STACK.figureGetByXY(ad, ag);
                if (Q != -1) {
                    am.style.cursor = "move";
                    Log.info("onMouseMove() + STATE_TEXT_EDITING + over a figure = change cursor")
                } else {
                    am.style.cursor = "default";
                    Log.info("onMouseMove() + STATE_TEXT_EDITING + over nothin = change cursor to default")
                }
            }
        } else {
            throw "main:onMouseMove() - this should never happen"
        }
        break;
    case STATE_CONTAINER_SELECTED:
        if (mousePressed) {
            if (lastMove != null) {
                var O = HandleManager.handleGetSelected();
                if (O != null) {
                    am.style.cursor = O.getCursor();
                    O.action(lastMove, ad, ag);
                    ac = true;
                    Log.info("onMouseMove() - STATE_CONTAINER_SELECTED + drag - mouse cursor = " + am.style.cursor)
                } else {
                    am.style.cursor = "move";
                    var ab = generateMoveMatrix(STACK.containerGetById(selectedContainerId), ad, ag);
                    Log.info("onMouseMove() + STATE_CONTAINER_SELECTED : translation matrix" + ab);
                    var aq = new ContainerTranslateCommand(selectedContainerId, ab);
                    History.addUndo(aq);
                    aq.execute();
                    ac = true;
                    Log.info("onMouseMove() + STATE_CONTAINER_SELECTED + drag - move selected container")
                }
            }
        } else {
            var O = HandleManager.handleGet(ad, ag);
            if (O != null) {
                am.style.cursor = O.getCursor();
                Log.info("onMouseMove() - STATE_CONTAINER_SELECTED + over a Handler = change cursor to: " + am.style.cursor)
            } else {
                if (STACK.containerGetByXY(ad, ag) !== -1) {
                    am.style.cursor = "move";
                    Log.info("onMouseMove() + STATE_CONTAINER_SELECTED + over a container's edge = change cursor")
                } else {
                    am.style.cursor = "default";
                    Log.debug("onMouseMove() + STATE_CONTAINER_SELECTED + over nothing = change cursor to default")
                }
            }
        }
        break;
    case STATE_GROUP_SELECTED:
        if (mousePressed) {
            if (lastMove != null) {
                var O = HandleManager.handleGetSelected();
                if (O != null) {
                    Log.info("onMouseMove() - STATE_GROUP_SELECTED + mouse pressed  + over a Handle");
                    am.style.cursor = O.getCursor();
                    O.action(lastMove, ad, ag);
                    ac = true
                } else {
                    if (!SHIFT_PRESSED) {
                        Log.info("onMouseMove() - STATE_GROUP_SELECTED + mouse pressed + NOT over a Handle");
                        am.style.cursor = "move";
                        var ak = generateMoveMatrix(STACK.groupGetById(selectedGroupId), ad, ag);
                        var W = new GroupTranslateCommand(selectedGroupId, ak);
                        W.execute();
                        History.addUndo(W);
                        ac = true
                    } else {
                        state = STATE_SELECTING_MULTIPLE;
                        selectionArea.points[0] = new Point(ad, ag);
                        selectionArea.points[1] = new Point(ad, ag);
                        selectionArea.points[2] = new Point(ad, ag);
                        selectionArea.points[3] = new Point(ad, ag);
                        ac = true;
                        Log.info("onMouseMove() - STATE_GROUP_SELECTED + mousePressed + SHIFT => STATE_SELECTING_MULTIPLE")
                    }
                }
            }
        } else {
            Log.debug("onMouseMove() - STATE_GROUP_SELECTED + mouse NOT pressed");
            if (HandleManager.handleGet(ad, ag) != null) {
                am.style.cursor = HandleManager.handleGet(ad, ag).getCursor()
            } else {
                if (CONNECTOR_MANAGER.connectorGetByXY(ad, ag) != -1) {} else {
                    if (STACK.figureIsOver(ad, ag)) {
                        am.style.cursor = "move"
                    } else {
                        am.style.cursor = "default"
                    }
                }
            }
        }
        break;
    case STATE_CONNECTOR_PICK_FIRST:
        var V = CONNECTOR_MANAGER.connectionPointGetByXY(ad, ag, ConnectionPoint.TYPE_FIGURE);
        if (V != -1) {
            var U = CONNECTOR_MANAGER.connectionPointGetById(V);
            U.color = ConnectionPoint.OVER_COLOR;
            selectedConnectionPointId = V
        } else {
            if (selectedConnectionPointId != -1) {
                var ah = CONNECTOR_MANAGER.connectionPointGetById(selectedConnectionPointId);
                ah.color = ConnectionPoint.NORMAL_COLOR;
                selectedConnectionPointId = -1
            }
        }
        ac = true;
        break;
    case STATE_CONNECTOR_PICK_SECOND:
        connectorPickSecond(ad, ag, R);
        ac = true;
        break;
    case STATE_CONNECTOR_SELECTED:
        var af = CONNECTOR_MANAGER.connectionPointGetAllByParent(selectedConnectorId);
        var aj = af[0];
        var al = af[1];
        if (aj.point.near(ad, ag, 3) || al.point.near(ad, ag, 3)) {
            am.style.cursor = "move"
        } else {
            if (HandleManager.handleGet(ad, ag) != null) {
                am.style.cursor = HandleManager.handleGet(ad, ag).getCursor()
            } else {
                am.style.cursor = "default"
            }
        } if (mousePressed == true && lastMove != null && HandleManager.handleGetSelected() != null) {
            Log.info("onMouseMove() + STATE_CONNECTOR_SELECTED - trigger a handler action");
            var O = HandleManager.handleGetSelected();
            var ap = CONNECTOR_MANAGER.connectorGetById(selectedConnectorId).turningPoints;
            var i = [ap.length];
            for (var ae = 0; ae < ap.length; ae++) {
                i[ae] = ap[ae].clone()
            }
            O.action(lastMove, ad, ag);
            ap = CONNECTOR_MANAGER.connectorGetById(selectedConnectorId).turningPoints;
            var S = [ap.length];
            for (var ae = 0; ae < ap.length; ae++) {
                S[ae] = ap[ae].clone()
            }
            var N = false;
            for (var k = 0; k < S.length; k++) {
                if (!S[k].equals(i[k])) {
                    N = true
                }
            }
            ac = true
        }
        break;
    case STATE_CONNECTOR_MOVE_POINT:
        Log.info("Easy easy easy....it's fragile");
        if (mousePressed) {
            connectorMovePoint(selectedConnectionPointId, ad, ag, R);
            ac = true
        }
        break
    }
    lastMove = [ad, ag];
    if (ac) {
        draw()
    }
    return false
}

function onDblClick(s) {
    var r = getCanvasXY(s);
    var p = r[0];
    var t = r[1];
    lastClick = [p, t];
    var v = null;
    var z = -1;
    var q = CONNECTOR_MANAGER.connectorGetByXY(p, t);
    var D = null;
    if (q != -1) {
        D = CONNECTOR_MANAGER.connectorGetById(q);
        v = D;
        z = 0
    } else {
        q = CONNECTOR_MANAGER.connectorGetByTextXY(p, t);
        if (q != -1) {
            D = CONNECTOR_MANAGER.connectorGetById(q);
            v = D;
            z = 0
        } else {
            var C = STACK.figureGetByXY(p, t);
            if (C != -1) {
                var u = STACK.figureGetById(C);
                var B = STACK.textGetByFigureXY(C, p, t);
                if (B !== -1) {
                    v = u;
                    z = B
                }
            } else {
                var A = STACK.containerGetByXY(p, t);
                if (A !== -1) {
                    var E = STACK.containerGetById(A);
                    var B = STACK.textGetByContainerXY(A, p, t);
                    if (B !== -1) {
                        v = E;
                        z = B
                    }
                }
            }
        }
    } if (z != -1) {
        if (state == STATE_GROUP_SELECTED) {
            var w = STACK.groupGetById(selectedGroupId);
            if (!w.permanent) {
                STACK.groupDestroy(selectedGroupId)
            }
            selectedGroupId = -1
        }
        selectedFigureId = -1;
        selectedContainerId = -1;
        selectedConnectorId = -1;
        state = STATE_TEXT_EDITING;
        setUpTextEditorPopup(v, z);
        redraw = true
    }
    draw();
    return false
}

function connectorPickFirst(l, n, m) {
    Log.group("connectorPickFirst");
    var p = CONNECTOR_MANAGER.connectorCreate(new Point(l, n), new Point(l + 10, n + 10), connectorType);
    selectedConnectorId = p;
    var s = CONNECTOR_MANAGER.connectorGetById(p);
    var o = CONNECTOR_MANAGER.connectionPointGetAllByParent(p);
    var r = CONNECTOR_MANAGER.connectionPointGetByXY(l, n, ConnectionPoint.TYPE_FIGURE);
    if (r != -1) {
        var g = CONNECTOR_MANAGER.connectionPointGetById(r);
        o[0].point.x = g.point.x;
        o[0].point.y = g.point.y;
        s.turningPoints[0].x = g.point.x;
        s.turningPoints[0].y = g.point.y;
        var q = CONNECTOR_MANAGER.glueCreate(g.id, o[0].id);
        Log.info("First glue created : " + q)
    }
    state = STATE_CONNECTOR_PICK_SECOND;
    Log.groupEnd()
}

function connectorPickSecond(G, H, v) {
    Log.group("main: connectorPickSecond");
    var L = CONNECTOR_MANAGER.connectorGetById(selectedConnectorId);
    var F = CONNECTOR_MANAGER.connectionPointGetAllByParent(L.id);
    var g = L.turningPoints[0].clone();
    var M = STACK.figureGetAsFirstFigureForConnector(L.id);
    if (M) {
        Log.info(":) WE HAVE A START FIGURE id = " + M.id)
    } else {
        Log.info(":( WE DO NOT HAVE A START FIGURE")
    }
    var I = new Point(G, H);
    var B = null;
    var J = CONNECTOR_MANAGER.connectionPointGetByXY(G, H, ConnectionPoint.TYPE_FIGURE);
    if (J != -1) {
        var E = CONNECTOR_MANAGER.connectionPointGetById(J);
        Log.info("End Figure's ConnectionPoint present id = " + J);
        I = E.point.clone();
        B = STACK.figureGetById(E.parentId);
        Log.info(":) WE HAVE AN END FIGURE id = " + B.id)
    } else {
        Log.info(":( WE DO NOT HAVE AN END FIGURE ")
    }
    var D = M ? M.getBounds() : null;
    var O = B ? B.getBounds() : null;
    DIAGRAMO.debugSolutions = CONNECTOR_MANAGER.connector2Points(L.type, g, I, D, O);
    var C = CONNECTOR_MANAGER.connectionPointGetByXY(G, H, ConnectionPoint.TYPE_FIGURE);
    if (C != -1) {
        var w = CONNECTOR_MANAGER.connectionPointGetById(C);
        w.color = ConnectionPoint.OVER_COLOR;
        F[1].color = ConnectionPoint.OVER_COLOR;
        selectedConnectionPointId = C
    } else {
        if (selectedConnectionPointId != -1) {
            var K = CONNECTOR_MANAGER.connectionPointGetById(selectedConnectionPointId);
            K.color = ConnectionPoint.NORMAL_COLOR;
            F[1].color = ConnectionPoint.NORMAL_COLOR;
            selectedConnectionPointId = -1
        }
    }
    var N = CONNECTOR_MANAGER.connectionPointGetFirstForConnector(selectedConnectorId);
    var A = CONNECTOR_MANAGER.connectionPointGetSecondForConnector(selectedConnectorId);
    Log.info("connectorPickSecond() -> Solution: " + DIAGRAMO.debugSolutions[0][2]);
    L.turningPoints = Point.cloneArray(DIAGRAMO.debugSolutions[0][2]);
    A.point = L.turningPoints[L.turningPoints.length - 1].clone();
    L.updateMiddleText();
    currentCloud = [];
    CONNECTOR_MANAGER.glueRemoveAllBySecondId(A.id);
    var C = CONNECTOR_MANAGER.connectionPointGetByXY(G, H, ConnectionPoint.TYPE_FIGURE);
    if (C != -1) {
        var w = CONNECTOR_MANAGER.connectionPointGetById(C);
        var z = CONNECTOR_MANAGER.glueCreate(w.id, CONNECTOR_MANAGER.connectionPointGetSecondForConnector(selectedConnectorId).id)
    } else {
        C = CONNECTOR_MANAGER.connectionPointGetByXYRadius(G, H, FIGURE_CLOUD_DISTANCE, ConnectionPoint.TYPE_FIGURE, N);
        if (C !== -1) {
            w = CONNECTOR_MANAGER.connectionPointGetById(C);
            currentCloud = [w.id, A.id]
        }
    }
    Log.groupEnd()
}

function connectorMovePoint(O, G, H, v) {
    Log.group("main: connectorMovePoint");
    var K = CONNECTOR_MANAGER.connectorGetById(selectedConnectorId);
    var F = CONNECTOR_MANAGER.connectionPointGetAllByParent(K.id);
    K.updateMiddleText();
    var B = CONNECTOR_MANAGER.connectionPointGetByXY(G, H, ConnectionPoint.TYPE_FIGURE);
    if (B != -1) {
        if (F[0].id == selectedConnectionPointId) {
            F[0].color = ConnectionPoint.OVER_COLOR
        } else {
            F[1].color = ConnectionPoint.OVER_COLOR
        }
    } else {
        if (F[0].id == selectedConnectionPointId) {
            F[0].color = ConnectionPoint.NORMAL_COLOR
        } else {
            F[1].color = ConnectionPoint.NORMAL_COLOR
        }
    }
    var g = K.turningPoints[0].clone();
    var L = null;
    var I = K.turningPoints[K.turningPoints.length - 1].clone();
    var A = null;
    currentCloud = [];
    if (F[0].id == O) {
        var D = CONNECTOR_MANAGER.connectionPointGetByXY(G, H, ConnectionPoint.TYPE_FIGURE);
        if (D != -1) {
            var E = CONNECTOR_MANAGER.connectionPointGetById(D);
            g = E.point.clone();
            L = STACK.figureGetById(E.parentId)
        } else {
            g = new Point(G, H)
        }
        A = STACK.figureGetAsSecondFigureForConnector(K.id);
        var C = L ? L.getBounds() : null;
        var N = A ? A.getBounds() : null;
        DIAGRAMO.debugSolutions = CONNECTOR_MANAGER.connector2Points(K.type, g, I, C, N);
        var M = CONNECTOR_MANAGER.connectionPointGetFirstForConnector(selectedConnectorId);
        var J = CONNECTOR_MANAGER.connectionPointGetSecondForConnector(selectedConnectorId);
        Log.info("connectorMovePoint() -> Solution: " + DIAGRAMO.debugSolutions[0][2]);
        K.turningPoints = Point.cloneArray(DIAGRAMO.debugSolutions[0][2]);
        M.point = K.turningPoints[0].clone();
        CONNECTOR_MANAGER.glueRemoveAllBySecondId(M.id);
        var B = CONNECTOR_MANAGER.connectionPointGetByXY(G, H, ConnectionPoint.TYPE_FIGURE);
        if (B != -1) {
            var w = CONNECTOR_MANAGER.connectionPointGetById(B);
            var z = CONNECTOR_MANAGER.glueCreate(w.id, M.id)
        } else {
            B = CONNECTOR_MANAGER.connectionPointGetByXYRadius(G, H, FIGURE_CLOUD_DISTANCE, ConnectionPoint.TYPE_FIGURE, J);
            if (B !== -1) {
                w = CONNECTOR_MANAGER.connectionPointGetById(B);
                currentCloud = [w.id, M.id]
            }
        }
    } else {
        if (F[1].id == O) {
            var D = CONNECTOR_MANAGER.connectionPointGetByXY(G, H, ConnectionPoint.TYPE_FIGURE);
            if (D != -1) {
                var E = CONNECTOR_MANAGER.connectionPointGetById(D);
                I = E.point.clone();
                A = STACK.figureGetById(E.parentId)
            } else {
                I = new Point(G, H)
            }
            L = STACK.figureGetAsFirstFigureForConnector(K.id);
            var C = L ? L.getBounds() : null;
            var N = A ? A.getBounds() : null;
            DIAGRAMO.debugSolutions = CONNECTOR_MANAGER.connector2Points(K.type, g, I, C, N);
            var M = CONNECTOR_MANAGER.connectionPointGetFirstForConnector(selectedConnectorId);
            var J = CONNECTOR_MANAGER.connectionPointGetSecondForConnector(selectedConnectorId);
            Log.info("connectorMovePoint() -> Solution: " + DIAGRAMO.debugSolutions[0][2]);
            K.turningPoints = Point.cloneArray(DIAGRAMO.debugSolutions[0][2]);
            J.point = K.turningPoints[K.turningPoints.length - 1].clone();
            CONNECTOR_MANAGER.glueRemoveAllBySecondId(J.id);
            var B = CONNECTOR_MANAGER.connectionPointGetByXY(G, H, ConnectionPoint.TYPE_FIGURE);
            if (B != -1) {
                var w = CONNECTOR_MANAGER.connectionPointGetById(B);
                var z = CONNECTOR_MANAGER.glueCreate(w.id, J.id)
            } else {
                B = CONNECTOR_MANAGER.connectionPointGetByXYRadius(G, H, FIGURE_CLOUD_DISTANCE, ConnectionPoint.TYPE_FIGURE, M);
                if (B !== -1) {
                    w = CONNECTOR_MANAGER.connectionPointGetById(B);
                    currentCloud = [w.id, J.id]
                }
            }
        } else {
            throw "main:connectorMovePoint() - this should never happen"
        }
    }
    Log.groupEnd()
}

function generateMoveMatrix(F, w, z) {
    if (typeof w === "undefined") {
        throw "Exception in generateMoveMatrix, x is undefined"
    }
    if (typeof z === "undefined") {
        throw "Exception in generateMoveMatrix,  is undefined"
    }
    Log.info("main.js --> generateMoveMatrix x:" + w + " y:" + z + " lastMove=[" + lastMove + "]");
    var r = w - lastMove[0];
    var t = z - lastMove[1];
    var C = null;
    if (snapTo) {
        C = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ];
        snapMonitor[0] += r;
        snapMonitor[1] += t;
        var q = GRIDWIDTH / 2;
        if (r != 0) {
            var v = (Math.floor((F.getBounds()[0] + snapMonitor[0]) / q) + 1) * q;
            var u = v - F.getBounds()[0];
            var D = (Math.floor((F.getBounds()[2] + snapMonitor[0]) / q) + 1) * q;
            var s = D - F.getBounds()[2];
            if (u < s) {
                if (F.getBounds()[0] + snapMonitor[0] >= v - SNAP_DISTANCE) {
                    C[0][2] = u;
                    snapMonitor[0] -= u
                } else {
                    if (F.getBounds()[2] + snapMonitor[0] >= D - SNAP_DISTANCE) {
                        C[0][2] = s;
                        snapMonitor[0] -= s
                    }
                }
            } else {
                if (F.getBounds()[2] + snapMonitor[0] >= D - SNAP_DISTANCE) {
                    C[0][2] = s;
                    snapMonitor[0] -= s
                } else {
                    if (F.getBounds()[0] + snapMonitor[0] >= v - SNAP_DISTANCE) {
                        C[0][2] = u;
                        snapMonitor[0] -= u
                    }
                }
            }
        }
        if (t != 0) {
            var B = (Math.floor((F.getBounds()[1] + snapMonitor[1]) / q) + 1) * q;
            var A = B - F.getBounds()[1];
            var G = (Math.floor((F.getBounds()[3] + snapMonitor[1]) / q) + 1) * q;
            var E = G - F.getBounds()[3];
            if (A < E) {
                if (F.getBounds()[1] + snapMonitor[1] >= B - SNAP_DISTANCE) {
                    C[1][2] = A;
                    snapMonitor[1] -= A
                } else {
                    if (F.getBounds()[3] + snapMonitor[1] >= G - SNAP_DISTANCE) {
                        C[1][2] = E;
                        snapMonitor[1] -= E
                    }
                }
            } else {
                if (F.getBounds()[3] + snapMonitor[1] >= G - SNAP_DISTANCE) {
                    C[1][2] = E;
                    snapMonitor[1] -= E
                } else {
                    if (F.getBounds()[1] + snapMonitor[1] >= B - SNAP_DISTANCE) {
                        C[1][2] = A;
                        snapMonitor[1] -= A
                    }
                }
            }
        }
    } else {
        C = [
            [1, 0, r],
            [0, 1, t],
            [0, 0, 1]
        ]
    }
    Log.groupEnd();
    return C
}

function getCanvasBounds() {
    var h = $("#a").offset().left;
    var e = h + $("#a").width();
    var i = $("#a").offset().top;
    var g = i + $("#a").height();
    return [h, i, e, g]
}

function getBodyXY(b) {
    return [b.pageX, b.pageY]
}

function getCanvasXY(j) {
    var h = null;
    var i = getCanvasBounds();
    Log.debug("Canvas bounds: [" + i + "]");
    var k = null;
    var g = null;
    if (j.touches) {
        if (j.touches.length > 0) {
            k = j.touches[0].pageX;
            g = j.touches[0].pageY
        }
    } else {
        k = j.pageX;
        g = j.pageY;
        Log.debug("ev.pageX:" + j.pageX + " ev.pageY:" + j.pageY)
    } if (i[0] <= k && k <= i[2] && i[1] <= g && g <= i[3]) {
        h = [k - $("#a").offset().left, g - $("#a").offset().top]
    }
    return h
}
var backgroundImage = null;

function addBackground(h) {
    Log.info("addBackground: called");
    var i = h.getContext("2d");
    if (!backgroundImage) {
        i.rect(0, 0, h.width, h.height);
        i.fillStyle = canvasProps.getFillColor();
        i.fill();
        if (gridVisible) {
            var k = Math.floor(h.width / GRIDWIDTH) + 1;
            var j = Math.floor(h.height / GRIDWIDTH) + 1;
            for (var l = 0; l < j; l++) {
                for (var m = 0; m < k; m++) {
                    i.beginPath();
                    i.strokeStyle = "#C0C0C0";
                    i.moveTo(m * GRIDWIDTH - 2, l * GRIDWIDTH);
                    i.lineTo(m * GRIDWIDTH + 2, l * GRIDWIDTH);
                    i.moveTo(m * GRIDWIDTH, l * GRIDWIDTH - 2);
                    i.lineTo(m * GRIDWIDTH, l * GRIDWIDTH + 2);
                    i.moveTo(m * GRIDWIDTH + GRIDWIDTH / 2 - 1, l * GRIDWIDTH + GRIDWIDTH / 2);
                    i.lineTo(m * GRIDWIDTH + GRIDWIDTH / 2 + 1, l * GRIDWIDTH + GRIDWIDTH / 2);
                    i.stroke()
                }
            }
        }
        backgroundImage = new Image();
        backgroundImage.src = h.toDataURL()
    } else {
        i.drawImage(backgroundImage, 0, 0)
    }
}

function reset(c) {
    var d = c.getContext("2d");
    d.clearRect(0, 0, c.width, c.height);
    d.fillStyle = "#FFFFFF";
    d.fillRect(0, 0, c.width, c.height)
}

function draw() {
    var b = getContext();
    reset(getCanvas());
    addBackground(getCanvas());
    STACK.paint(b);
    minimap.updateMinimap()
}

function renderedCanvas() {
    var d = getCanvas();
    var c = document.getElementById("tempCanvas");
    if (c === null) {
        c = document.createElement("canvas");
        c.setAttribute("id", "tempCanvas");
        c.style.display = "none"
    }
    c.setAttribute("width", d.width);
    c.setAttribute("height", d.height);
    reset(c);
    STACK.paint(c.getContext("2d"), true);
    return c.toDataURL()
}

function linkMap() {
    var i = "";
    var h = true;
    for (f in STACK.figures) {
        var g = STACK.figures[f];
        if (g.url != "") {
            var e = g.getBounds();
            if (h) {
                h = false
            } else {
                i += "\n"
            }
            i += e[0] + "," + e[1] + "," + e[2] + "," + e[3] + "," + g.url
        }
    }
    Log.info("editor.php->linkMap()->csv bounds: " + i);
    return i
}
var nk;
function run() {
    $.post("./common/controller.php", {
        action: "run",
        diagramId: currentDiagramId
    }, function (a) {
        alert("Run Called");
        nk = a;
        i = a.search('{"code":');

        response = JSON.parse(a.slice(i));
        $('#results').empty();
        $('#code').empty();
        $('#results').html("Errors\n"+a.slice(0,i)+"\n"+response["exec"]);
        $('#code').html(response["code"]);
        // alert(a);
    });
}

function save() {
    Log.info("Save pressed");
    if (state == STATE_TEXT_EDITING) {
        currentTextEditor.destroy();
        currentTextEditor = null;
        state = STATE_NONE
    }
    var k = null;
    try {
        k = renderedCanvas()
    } catch (m) {
        if (m.name === "SecurityError" && m.code === 18) {
            alert("A figure contains an image loaded from another host.                 \n\nHint:                 \nPlease make sure that the browser's URL (current location) is the same as the one saved in the DB.")
        }
    }
    if (k == null) {
        Log.info("save(). Could not save. dataURL is null");
        alert("Could not save.             \n\nHint:             \nCanvas's toDataURL() did not functioned properly ");
        return
    }
    var i = {
        c: canvasProps,
        s: STACK,
        m: CONNECTOR_MANAGER,
        p: CONTAINER_MANAGER,
        v: DIAGRAMO.fileVersion
    };
    var e = JSON.stringify(i, Util.operaReplacer);
    var l = toSVG();
    var j = linkMap();
    $.post("./common/controller.php", {
        action: "save",
        diagram: e,
        png: k,
        linkMap: j,
        svg: l,
        diagramId: currentDiagramId
    }, function (a) {
        if (a === "firstSave") {
            Log.info("firstSave!");
            window.location = "./saveDiagram.php"
        } else {
            if (a === "saved") {
                alert("saved!")
            } else {
                alert("Unknown: " + a)
            }
        }
    })
}

function print_diagram() {
    var j = "printFrame";
    var g = document.getElementById(j);
    if (g == null) {
        g = document.createElement("IFRAME");
        g.id = j;
        document.body.appendChild(g)
    }
    var h = g.contentDocument;
    var i = h.getElementsByTagName("img");
    var k;
    if (i.length > 0) {
        k = i[0];
        k.setAttribute("src", "data/diagrams/" + currentDiagramId + ".png")
    } else {
        k = h.createElement("img");
        k.setAttribute("src", "data/diagrams/" + currentDiagramId + ".png");
        if (h.body !== null) {
            h.body.appendChild(k)
        } else {
            h.src = "javascript:'<body></body>'";
            h.write(k.outerHTML);
            h.close()
        }
    }
    g.setAttribute("width", canvasProps.getWidth());
    g.setAttribute("height", canvasProps.getHeight());
    g.contentWindow.print()
}

function exportCanvas() {
    var e = '<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg" version="1.1">            <rect x="0" y="0" height="200" width="300" style="stroke:#000000; fill: #FFFFFF"/>                    <path d="M100,100 C200,200 100,50 300,100" style="stroke:#FFAAFF;fill:none;stroke-width:3;"  />                    <rect x="50" y="50" height="50" width="50"                      style="stroke:#ff0000; fill: #ccccdf" />            </svg>';
    var d = getCanvas();
    var g = '<svg width="' + d.width + '" height="' + d.height + '" xmlns="http://www.w3.org/2000/svg" version="1.1">';
    g += STACK.toSVG();
    g += CONNECTOR_MANAGER.toSVG();
    g += "</svg>";
    alert(g);
    $.post("../common/controller.php", {
        action: "saveSvg",
        svg: escape(g)
    }, function (a) {
        if (a == "svg_ok") {} else {
            if (a == "svg_failed") {
                Log.info("SVG was NOT save into session")
            }
        }
    });
    window.open("./svg.php", "SVG", "left=20,top=20,width=500,height=500,toolbar=1,resizable=0")
}

function load(diagramId) {
    $.post("./common/controller.php", {
        action: "load",
        diagramId: diagramId
    }, function (data) {
        var obj = eval("(" + data + ")");
        if (!("v" in obj) || obj.v != DIAGRAMO.fileVersion) {
            importFile(obj)
        }
        STACK = Stack.load(obj.s);
        canvasProps = CanvasProps.load(obj.c);
        canvasProps.sync();
        setUpEditPanel(canvasProps);
        CONNECTOR_MANAGER = ConnectorManager.load(obj.m);
        CONTAINER_MANAGER = ContainerFigureManager.load(obj.p);
        draw()
    })
}

function loadTempDiagram(tempDiagramName) {
    $.post("./common/controller.php", {
        action: "loadTemp",
        tempName: tempDiagramName
    }, function (data) {
        var obj = eval("(" + data + ")");
        if (!("v" in obj) || obj.v != DIAGRAMO.fileVersion) {
            importFile(obj)
        }
        STACK = Stack.load(obj.s);
        canvasProps = CanvasProps.load(obj.c);
        canvasProps.sync();
        setUpEditPanel(canvasProps);
        CONNECTOR_MANAGER = ConnectorManager.load(obj.m);
        CONTAINER_MANAGER = ContainerFigureManager.load(obj.p);
        draw()
    })
}

function saveAs() {
    var i = renderedCanvas();
    var g = {
        c: canvasProps,
        s: STACK,
        m: CONNECTOR_MANAGER,
        p: CONTAINER_MANAGER,
        v: DIAGRAMO.fileVersion
    };
    $serializedDiagram = JSON.stringify(g, Util.operaReplacer);
    var e = toSVG();
    var h = linkMap();
    $.post("./common/controller.php", {
        action: "saveAs",
        diagram: $serializedDiagram,
        png: i,
        linkMap: h,
        svg: e
    }, function (a) {
        if (a == "noaccount") {
            Log.info("You must have an account to use that feature")
        } else {
            if (a == "step1Ok") {
                Log.info("Save as...");
                window.location = "./saveDiagram.php"
            }
        }
    })
}

function addListeners() {
    var b = getCanvas();
    document.addEventListener("keypress", onKeyPress, false);
    document.addEventListener("keydown", onKeyDown, false);
    document.addEventListener("keyup", onKeyUp, false);
    document.addEventListener("selectstart", stopselection, false);
    b.addEventListener("mousemove", onMouseMove, false);
    b.addEventListener("mousedown", onMouseDown, false);
    b.addEventListener("mouseup", onMouseUp, false);
    b.addEventListener("dblclick", onDblClick, false);
    if (false) {
        ontouchstart = "touchStart(event);";
        ontouchmove = "touchMove(event);";
        ontouchend = "touchEnd(event);";
        ontouchcancel = "touchCancel(event);"
    }
}
var minimap;
$(document).mouseup(function () {
    minimap.selected = false
});
window.onresize = function () {
    minimap.initMinimap()
};
var currentDiagramId = null;

function init(d) {
    var c = getCanvas();
    minimap = new Minimap(c, document.getElementById("minimap"), 115);
    minimap.updateMinimap();
    if (canvasProps == null) {
        canvasProps = new CanvasProps(CanvasProps.DEFAULT_WIDTH, CanvasProps.DEFAULT_HEIGHT, CanvasProps.DEFAULT_FILL_COLOR)
    }
    canvasProps.setWidth(canvasProps.getWidth());
    canvasProps.setHeight(canvasProps.getHeight());
    if (isBrowserReady() == 0) {
        modal()
    }
    setUpEditPanel(canvasProps);
    if (isNumeric(d)) {
        currentDiagramId = d;
        load(d)
    } else {
        if (d.substring && d.substring(0, 3) === "tmp") {
            loadTempDiagram(d)
        }
    }
    addListeners();
    window.addEventListener("mousedown", documentOnMouseDown, false);
    window.addEventListener("mousemove", documentOnMouseMove, false);
    window.addEventListener("mouseup", documentOnMouseUp, false);
}

function action(J) {
    // alert(J);
    redraw = false;
    switch (J) {
    case "undo":
        Log.info("main.js->action()->Undo. Nr of actions in the STACK: " + History.COMMANDS.length);
        History.undo();
        redraw = true;
        break;
    case "group":
        if (selectedGroupId != -1) {
            var U = STACK.groupGetById(selectedGroupId);
            if (!U.permanent) {
                var Y = new GroupCreateCommand(selectedGroupId);
                Y.execute();
                History.addUndo(Y);
                Log.info("main.js->action()->Group. New group made permanent. Group id = " + selectedGroupId)
            } else {
                Log.info("main.js->action()->Group. Group ALREADY permanent.  Group id = " + selectedGroupId)
            }
        }
        redraw = true;
        break;
    case "container":
        Log.info("main.js->action()->container. Nr of actions in the STACK: " + History.COMMANDS.length);
        if (state == STATE_TEXT_EDITING) {
            currentTextEditor.destroy();
            currentTextEditor = null
        }
        var Z = new ContainerCreateCommand(300, 300);
        Z.execute();
        History.addUndo(Z);
        redraw = true;
        break;
    case "insertImage":
        Log.info("main.js->action()->insertImage. Nr of actions in the STACK: " + History.COMMANDS.length);
        if (state == STATE_TEXT_EDITING) {
            currentTextEditor.destroy();
            currentTextEditor = null
        }
        var E = new InsertedImageFigureCreateCommand(insertedImageFileName, 100, 100);
        E.execute();
        History.addUndo(E);
        redraw = true;
        break;
    case "ungroup":
        if (selectedGroupId != -1) {
            var U = STACK.groupGetById(selectedGroupId);
            if (U.permanent) {
                var X = new GroupDestroyCommand(selectedGroupId);
                X.execute();
                History.addUndo(X);
                Log.info("main.js->action()->Ungroup. New group made permanent. Group id = " + selectedGroupId)
            } else {
                Log.info("main.js->action()->Ungroup. Ignore. Group is not permanent.  Group id = " + selectedGroupId)
            }
            redraw = true
        }
        break;
    case "connector-jagged":
        if (state == STATE_TEXT_EDITING) {
            currentTextEditor.destroy();
            currentTextEditor = null
        }
        selectedFigureId = -1;
        state = STATE_CONNECTOR_PICK_FIRST;
        connectorType = Connector.TYPE_JAGGED;
        redraw = true;
        break;
    case "connector-straight":
        if (state == STATE_TEXT_EDITING) {
            currentTextEditor.destroy();
            currentTextEditor = null
        }
        selectedFigureId = -1;
        state = STATE_CONNECTOR_PICK_FIRST;
        connectorType = Connector.TYPE_STRAIGHT;
        redraw = true;
        break;
    case "connector-organic":
        if (state == STATE_TEXT_EDITING) {
            currentTextEditor.destroy();
            currentTextEditor = null
        }
        selectedFigureId = -1;
        state = STATE_CONNECTOR_PICK_FIRST;
        connectorType = Connector.TYPE_ORGANIC;
        redraw = true;
        break;
    case "rotate90":
    case "rotate90A":
        if (selectedFigureId) {
            var L = STACK.figureGetById(selectedFigureId);
            var V = L.getBounds();
            var Q = V[0] + (V[2] - V[0]) / 2;
            var S = V[1] + (V[3] - V[1]) / 2;
            var aa = [
                [1, 0, Q * -1],
                [0, 1, S * -1],
                [0, 0, 1]
            ];
            var F = [
                [1, 0, Q],
                [0, 1, S],
                [0, 0, 1]
            ];
            L.transform(aa);
            if (J == "rotate90") {
                L.transform(R90)
            } else {
                L.transform(R90A)
            }
            L.transform(F);
            redraw = true
        }
        break;
    case "up":
        switch (state) {
        case STATE_FIGURE_SELECTED:
            var K = new FigureTranslateCommand(selectedFigureId, Matrix.UP);
            History.addUndo(K);
            K.execute();
            redraw = true;
            break;
        case STATE_GROUP_SELECTED:
            var P = new GroupTranslateCommand(selectedGroupId, Matrix.UP);
            History.addUndo(P);
            P.execute();
            redraw = true;
            break
        }
        break;
    case "down":
        switch (state) {
        case STATE_FIGURE_SELECTED:
            var R = new FigureTranslateCommand(selectedFigureId, Matrix.DOWN);
            History.addUndo(R);
            R.execute();
            redraw = true;
            break;
        case STATE_GROUP_SELECTED:
            var O = new GroupTranslateCommand(selectedGroupId, Matrix.DOWN);
            History.addUndo(O);
            O.execute();
            redraw = true;
            break
        }
        break;
    case "right":
        switch (state) {
        case STATE_FIGURE_SELECTED:
            var M = new FigureTranslateCommand(selectedFigureId, Matrix.RIGHT);
            History.addUndo(M);
            M.execute();
            redraw = true;
            break;
        case STATE_GROUP_SELECTED:
            var I = new GroupTranslateCommand(selectedGroupId, Matrix.RIGHT);
            History.addUndo(I);
            I.execute();
            redraw = true;
            break
        }
        break;
    case "left":
        switch (state) {
        case STATE_FIGURE_SELECTED:
            var ab = new FigureTranslateCommand(selectedFigureId, Matrix.LEFT);
            History.addUndo(ab);
            ab.execute();
            redraw = true;
            break;
        case STATE_GROUP_SELECTED:
            var W = new GroupTranslateCommand(selectedGroupId, Matrix.LEFT);
            History.addUndo(W);
            W.execute();
            redraw = true;
            break
        }
        break;
    case "grow":
        if (selectedFigureId != -1) {
            var L = STACK.figureGetById(selectedFigureId);
            var V = L.getBounds();
            var Q = V[0] + (V[2] - V[0]) / 2;
            var S = V[1] + (V[3] - V[1]) / 2;
            var aa = [
                [1, 0, Q * -1],
                [0, 1, S * -1],
                [0, 0, 1]
            ];
            var F = [
                [1, 0, Q],
                [0, 1, S],
                [0, 0, 1]
            ];
            var N = [
                [1 + 0.2, 0, 0],
                [0, 1 + 0.2, 0],
                [0, 0, 1]
            ];
            L.transform(aa);
            L.transform(N);
            L.transform(F);
            redraw = true
        }
        break;
    case "shrink":
        if (selectedFigureId != -1) {
            var L = STACK.figureGetById(selectedFigureId);
            var V = L.getBounds();
            var Q = V[0] + (V[2] - V[0]) / 2;
            var S = V[1] + (V[3] - V[1]) / 2;
            var aa = [
                [1, 0, Q * -1],
                [0, 1, S * -1],
                [0, 0, 1]
            ];
            var F = [
                [1, 0, Q],
                [0, 1, S],
                [0, 0, 1]
            ];
            var ae = [
                [1 - 0.2, 0, 0],
                [0, 1 - 0.2, 0],
                [0, 0, 1]
            ];
            L.transform(aa);
            L.transform(ae);
            L.transform(F);
            redraw = true
        }
        break;
    case "duplicate":
        if (selectedFigureId != -1) {
            var G = new FigureCloneCommand(selectedFigureId);
            G.execute();
            History.addUndo(G)
        }
        if (selectedGroupId != -1) {
            var G = new GroupCloneCommand(selectedGroupId);
            G.execute();
            History.addUndo(G)
        }
        getCanvas().style.cursor = "default";
        redraw = true;
        break;
    case "back":
        if (selectedFigureId != -1) {
            var ad = new FigureZOrderCommand(selectedFigureId, 0);
            ad.execute();
            History.addUndo(ad);
            redraw = true
        }
        break;
    case "front":
        if (selectedFigureId != -1) {
            var ac = new FigureZOrderCommand(selectedFigureId, STACK.figures.length - 1);
            ac.execute();
            History.addUndo(ac);
            redraw = true
        }
        break;
    case "moveback":
        if (selectedFigureId != -1) {
            var H = new FigureZOrderCommand(selectedFigureId, STACK.idToIndex[selectedFigureId] - 1);
            H.execute();
            History.addUndo(H);
            redraw = true
        }
        break;
    case "moveforward":
        if (selectedFigureId != -1) {
            var T = new FigureZOrderCommand(selectedFigureId, STACK.idToIndex[selectedFigureId] + 1);
            T.execute();
            History.addUndo(T);
            redraw = true
        }
        break;
    case "run":
        // alert("run called");
        run();
        break;
    }
    if (redraw) {
        draw()
    }
}
var lastMousePosition = null;

function documentOnMouseDown(b) {}
var draggingFigure = null;

function documentOnMouseMove(b) {
    switch (state) {
    case STATE_FIGURE_CREATE:
        if (!draggingFigure) {
            draggingFigure = document.createElement("img");
            draggingFigure.setAttribute("id", "draggingThumb");
            draggingFigure.style.position = "absolute";
            draggingFigure.style.zIndex = 3;
            body.appendChild(draggingFigure)
        }
        draggingFigure.setAttribute("src", selectedFigureThumb);
        draggingFigure.style.width = "100px";
        draggingFigure.style.height = "100px";
        draggingFigure.style.left = (b.pageX - 50) + "px";
        draggingFigure.style.top = (b.pageY - 50) + "px";
        draggingFigure.style.display = "block";
        draggingFigure.addEventListener("mousedown", function (a) {}, false);
        draggingFigure.addEventListener("mouseup", function (g) {
            var e = getCanvasXY(g);
            if (e == null) {
                return
            }
            x = e[0];
            y = e[1];
            switch (state) {
            case STATE_FIGURE_CREATE:
                Log.info("draggingFigure>onMouseUp() + STATE_FIGURE_CREATE");
                snapMonitor = [0, 0];
                if (window.createFigureFunction) {
                    var a = new FigureCreateCommand(window.createFigureFunction, x, y);
                    a.execute();
                    History.addUndo(a);
                    selectedConnectorId = -1;
                    createFigureFunction = null;
                    mousePressed = false;
                    redraw = true;
                    draw();
                    document.getElementById("draggingThumb").style.display = "none"
                } else {
                    Log.info("draggingFigure>onMouseUp() + STATE_FIGURE_CREATE--> but no 'createFigureFunction'")
                }
                break
            }
            b.stopPropagation()
        }, false);
        break;
    case STATE_NONE:
        break
    }
}

function documentOnMouseUp(d) {
    Log.info("documentOnMouseUp");
    switch (state) {
    case STATE_FIGURE_CREATE:
        var c = document.elementFromPoint(d.clientX, d.clientY);
        if (c.id != "a") {
            if (draggingFigure) {
                draggingFigure.parentNode.removeChild(draggingFigure);
                state = STATE_NONE;
                draggingFigure = null
            }
        }
        break
    }
}

function linkMap() {
    var i = "";
    var h = true;
    for (f in STACK.figures) {
        var g = STACK.figures[f];
        if (g.url != "") {
            var e = g.getBounds();
            if (h) {
                h = false
            } else {
                i += "\n"
            }
            i += e[0] + "," + e[1] + "," + e[2] + "," + e[3] + "," + g.url
        }
    }
    Log.info("editor.php->linkMap()->csv bounds: " + i);
    return i
}

function touchStart(b) {
    b.preventDefault();
    onMouseDown(b)
}

function touchMove(b) {
    b.preventDefault();
    onMouseMove(b)
}

function touchEnd(b) {
    onMouseUp(b)
}

function touchCancel(b) {};