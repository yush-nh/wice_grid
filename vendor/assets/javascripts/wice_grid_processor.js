(function() {
  var WiceGridProcessor;

  WiceGridProcessor = (function() {
    class WiceGridProcessor {
      constructor(name, baseRequestForFilter, baseLinkForShowAllRecords, linkForExport, parameterNameForQueryLoading, parameterNameForFocus, environment) {
        this.name = name;
        this.baseRequestForFilter = baseRequestForFilter;
        this.baseLinkForShowAllRecords = baseLinkForShowAllRecords;
        this.linkForExport = linkForExport;
        this.parameterNameForQueryLoading = parameterNameForQueryLoading;
        this.parameterNameForFocus = parameterNameForFocus;
        this.environment = environment;
        this.filterDeclarations = new Array();
        this.checkIfJsFrameworkIsLoaded();
      }

      checkIfJsFrameworkIsLoaded() {
        if (!jQuery) {
          return alert("jQuery not loaded, WiceGrid cannot proceed!");
        }
      }

      toString() {
        return "<WiceGridProcessor instance for grid '" + this.name + "'>";
      }

      process(domIdToFocus) {
        return this.visit(this.buildUrlWithParams(domIdToFocus));
      }

      visit(path, use_turbo = true) {
        if ((typeof Turbo !== "undefined" && Turbo !== null) && use_turbo) {
          return Turbo.visit(path);
        } else if ((typeof Turbolinks !== "undefined" && Turbolinks !== null) && use_turbo) {
          return Turbolinks.visit(path);
        } else {
          return window.location = path;
        }
      }

      setProcessTimer(domIdToFocus) {
        var processor;
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
        processor = this;
        return this.timer = setTimeout(function() {
          return processor.process(domIdToFocus);
        }, 1000);
      }

      reloadPageForGivenGridState(gridState) {
        var requestPath;
        requestPath = this.gridStateToRequest(gridState);
        return this.visit(this.appendToUrl(this.baseLinkForShowAllRecords, requestPath));
      }

      gridStateToRequest(gridState) {
        return jQuery.map(gridState, function(pair) {
          return encodeURIComponent(pair[0]) + '=' + encodeURIComponent(pair[1]);
        }).join('&');
      }

      appendToUrl(url, str) {
        var sep;
        sep = url.indexOf('?') !== -1 ? /[&\?]$/.exec(url) ? '' : '&' : '?';
        return url + sep + str;
      }

      buildUrlWithParams(domIdToFocus) {
        var allFilterParams, res, results;
        results = new Array();
        jQuery.each(this.filterDeclarations, (i, filterDeclaration) => {
          var param;
          param = this.readValuesAndFormQueryString(filterDeclaration.filterName, filterDeclaration.detached, filterDeclaration.templates, filterDeclaration.ids);
          if (param && param !== '') {
            return results.push(param);
          }
        });
        res = this.baseRequestForFilter;
        if (results.length !== 0) {
          allFilterParams = results.join('&');
          res = this.appendToUrl(res, allFilterParams);
        }
        if (domIdToFocus) {
          res = this.appendToUrl(res, this.parameterNameForFocus + domIdToFocus);
        }
        return res;
      }

      reset() {
        return this.visit(this.baseRequestForFilter);
      }

      exportToCsv() {
        return this.visit(this.linkForExport, false);
      }

      register(func) {
        return this.filterDeclarations.push(func);
      }

      readValuesAndFormQueryString(filterName, detached, templates, ids) {
        var el, i, j, k, l, message, ref, ref1, res, val;
        res = new Array();
        for (i = k = 0, ref = templates.length - 1; (0 <= ref ? k <= ref : k >= ref); i = 0 <= ref ? ++k : --k) {
          if ($(ids[i]) === null) {
            if (this.environment === "development") {
              message = 'WiceGrid: Error reading state of filter "' + filterName + '". No DOM element with id "' + ids[i] + '" found.';
              if (detached) {
                message += 'You have declared "' + filterName + '" as a detached filter but have not output it anywhere in the template. Read documentation about detached filters.';
              }
              alert(message);
            }
            return '';
          }
          el = $('#' + ids[i]);
          if (el[0] && el[0].type === 'checkbox') {
            if (el[0].checked) {
              val = 1;
            }
          } else {
            val = el.val();
          }
          if (val instanceof Array) {
            for (j = l = 0, ref1 = val.length - 1; (0 <= ref1 ? l <= ref1 : l >= ref1); j = 0 <= ref1 ? ++l : --l) {
              if (val[j] && val[j] !== "") {
                res.push(templates[i] + encodeURIComponent(val[j]));
              }
            }
          } else if (val && val !== '') {
            res.push(templates[i] + encodeURIComponent(val));
          }
        }
        return res.join('&');
      }

    };

    WiceGridProcessor;

    return WiceGridProcessor;

  }).call(this);

  WiceGridProcessor._version = '3.4';

  window['WiceGridProcessor'] = WiceGridProcessor;

}).call(this);
