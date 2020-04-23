angular.module("umbraco").run(["eventsService", function(eventsService) {
    function findModelScope(scope) {
        if (!scope) {
            return null;
        }
        if (scope.model) {
            return scope;
        }
        return findModelScope(scope.$parent);
    }

    function isProtectedClass(className) {
        return className === "umb-row-inner" ||
            className === "umb-cell-inner" ||
            className.substr(0, 2) === "ng-" ||
            className.substr(0, 2) === "ui-";
    }

    function addClasses(element, gridItem) {
        function classNameFromConfig(e) {
            if (e === "class") {
                return gridItem.config[e];
            } else {
                return e + "-" + gridItem.config[e];
            }
        }

        var classes = (element.className || "").split(/\s+/);
        var newClasses = classes.filter(isProtectedClass);
        var nameClass = (gridItem.name || "").toLowerCase().replace(" ", "-");
        var configClasses = Object.keys(gridItem.config || {}).map(classNameFromConfig);
        newClasses.push(nameClass);
        newClasses = newClasses.concat(configClasses);
        element.className = newClasses.join(" ");
    }

    function addStyles(element, gridItem) {
        function styleFromKeyPair(e) {
            return e + ":" + gridItem.styles[e];
        }

        var stylesValues = Object.keys(gridItem.styles || {}).map(styleFromKeyPair);
        element.style = stylesValues.join(";");
    }

    eventsService.on("grid.initialized",
        function(evt, data) {
            var modelScope = findModelScope(data.scope);
            var model = modelScope.model;
            var jqEl = data.element;
            var el = data.element.get(0);
            jqEl.addClass("stylized-grid");

            function addAllStyling() {
                var areaElements = el.getElementsByClassName("umb-column");
                if (areaElements.length === 0) {
                    return;
                }
                model.value.sections.forEach(function (area, ai) {
                    var rowElements = areaElements[ai].getElementsByClassName("umb-row-inner");
                    area.rows.forEach(function (row, ri) {
                        var rowElement = rowElements[ri];
                        addClasses(rowElement, row);
                        addStyles(rowElement, row);

                        var cellElements = rowElement.getElementsByClassName("umb-cell-inner");
                        row.areas.forEach(function (cell, ci) {
                            addClasses(cellElements[ci], cell);
                            addStyles(cellElements[ci], cell);
                        });
                    });
                });
            }

            modelScope.$watch(function() { return el.getElementsByClassName("umb-column").length; }, addAllStyling);
            modelScope.$watch("model", addAllStyling, true);
        });

}]);