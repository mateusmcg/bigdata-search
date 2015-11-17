// author:   Samuel Mueller 
// version:  0.0.2 
// license:  MIT 
// homepage: http://github.com/ssmm/angular-tabs 
(function() {
  angular.module("angular-tabs", []);

  angular.module("angular-tabs").service("angularTabs", [
    function() {
      var activeTabs;

      activeTabs = {};
      return {
        getActiveTab: function(id) {
          return activeTabs[id];
        },
        setActiveTab: function(id, title) {
          return activeTabs[id] = title;
        }
      };
    }
  ]);

  angular.module("angular-tabs").directive("angularTabs", [
    "$compile", "angularTabs", function($compile, angularTabs) {
      var compileTabsBody, createControl, createTab;

      compileTabsBody = function(divs) {
        var div, title, titles, _i, _len;

        titles = [];
        for (_i = 0, _len = divs.length; _i < _len; _i++) {
          div = divs[_i];
          div = angular.element(div);
          title = div.attr("tab-title");
          titles.push(title);
          div.attr("ng-show", "isActive('" + title + "')");
        }
        return titles;
      };
      createControl = function(classes, titles) {
        var tabs, title, _i, _len;

        tabs = angular.element("<ul></ul>");
        if (!classes) {
          tabs.addClass("nav");
          tabs.addClass("nav-tabs");
        } else {
          tabs.addClass(classes);
        }
        for (_i = 0, _len = titles.length; _i < _len; _i++) {
          title = titles[_i];
          tabs.append(createTab(title));
        }
        return tabs;
      };
      createTab = function(title) {
        var a, li;

        li = angular.element("<li></li>");
        li.attr("ng-class", "{active: isActive('" + title + "')}");
        li.append(a = angular.element("<a>" + title + "</a>"));
        a.attr("href", "");
        a.attr("ng-click", "setActive('" + title + "')");
        return li;
      };
      return {
        restrict: "E",
        scope: true,
        compile: function(element, attributes, transclude) {
          var control, divs, id, tabControls, titles;

          id = attributes.id;
          divs = element.children("div");
          titles = compileTabsBody(divs);
          tabControls = angular.element("angular-tabs-control[for=" + id + "]");
          if (tabControls.length <= 0) {
            control = createControl(attributes["class"], titles);
            element.prepend(control);
          }
          return {
            post: function($scope, $element, $attributes) {
              var tabControl, _i, _len;

              if (tabControls.length > 0) {
                for (_i = 0, _len = tabControls.length; _i < _len; _i++) {
                  tabControl = tabControls[_i];
                  tabControl = angular.element(tabControl);
                  control = createControl(tabControl.attr("class"), titles);
                  $compile(control)($scope);
                  tabControl.append(control);
                }
              }
              $scope.setActive = function(title) {
                return angularTabs.setActiveTab(id, title);
              };
              $scope.isActive = function(title) {
                return angularTabs.getActiveTab(id) === title;
              };
              $scope.setActive($attributes.activeTab);
            }
          };
        }
      };
    }
  ]);

}).call(this);
