/*!
 * dist/inputmask.min
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2019 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.0.0-beta.301
 */
! function webpackUniversalModuleDefinition(root, factory) {
  if ("object" == typeof exports && "object" == typeof module) module.exports = factory();
  else if ("function" == typeof define && define.amd) define([], factory);
  else {
    var a = factory();
    for (var i in a)("object" == typeof exports ? exports : root)[i] = a[i]
  }
}(window, function () {
  return modules = [function (module) {
    module.exports = JSON.parse('{"BACKSPACE":8,"BACKSPACE_SAFARI":127,"DELETE":46,"DOWN":40,"END":35,"ENTER":13,"ESCAPE":27,"HOME":36,"INSERT":45,"LEFT":37,"PAGE_DOWN":34,"PAGE_UP":33,"RIGHT":39,"SPACE":32,"TAB":9,"UP":38,"X":88,"CONTROL":17}')
  }, function (module, exports, __webpack_require__) {
    "use strict";

    function _typeof(obj) {
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
        return typeof obj
      } : function _typeof(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
      }, _typeof(obj)
    }
    var $ = __webpack_require__(2),
      window = __webpack_require__(3),
      document = window.document,
      generateMaskSet = __webpack_require__(4).generateMaskSet,
      analyseMask = __webpack_require__(4).analyseMask,
      maskScope = __webpack_require__(7);

    function Inputmask(alias, options, internal) {
      if (!(this instanceof Inputmask)) return new Inputmask(alias, options, internal);
      this.el = void 0, this.events = {}, this.maskset = void 0, this.refreshValue = !1, !0 !== internal && ($.isPlainObject(alias) ? options = alias : (options = options || {}, alias && (options.alias = alias)), this.opts = $.extend(!0, {}, this.defaults, options), this.noMasksCache = options && void 0 !== options.definitions, this.userOptions = options || {}, resolveAlias(this.opts.alias, options, this.opts), this.isRTL = this.opts.numericInput)
    }

    function resolveAlias(aliasStr, options, opts) {
      var aliasDefinition = Inputmask.prototype.aliases[aliasStr];
      return aliasDefinition ? (aliasDefinition.alias && resolveAlias(aliasDefinition.alias, void 0, opts), $.extend(!0, opts, aliasDefinition), $.extend(!0, opts, options), !0) : (null === opts.mask && (opts.mask = aliasStr), !1)
    }

    function importAttributeOptions(npt, opts, userOptions, dataAttribute) {
      function importOption(option, optionData) {
        optionData = void 0 !== optionData ? optionData : npt.getAttribute(dataAttribute + "-" + option), null !== optionData && ("string" == typeof optionData && (0 === option.indexOf("on") ? optionData = window[optionData] : "false" === optionData ? optionData = !1 : "true" === optionData && (optionData = !0)), userOptions[option] = optionData)
      }
      if (!0 === opts.importDataAttributes) {
        var attrOptions = npt.getAttribute(dataAttribute),
          option, dataoptions, optionData, p;
        if (attrOptions && "" !== attrOptions && (attrOptions = attrOptions.replace(/'/g, '"'), dataoptions = JSON.parse("{" + attrOptions + "}")), dataoptions)
          for (p in optionData = void 0, dataoptions)
            if ("alias" === p.toLowerCase()) {
              optionData = dataoptions[p];
              break
            } for (option in importOption("alias", optionData), userOptions.alias && resolveAlias(userOptions.alias, userOptions, opts), opts) {
          if (dataoptions)
            for (p in optionData = void 0, dataoptions)
              if (p.toLowerCase() === option.toLowerCase()) {
                optionData = dataoptions[p];
                break
              } importOption(option, optionData)
        }
      }
      return $.extend(!0, opts, userOptions), "rtl" !== npt.dir && !opts.rightAlign || (npt.style.textAlign = "right"), "rtl" !== npt.dir && !opts.numericInput || (npt.dir = "ltr", npt.removeAttribute("dir"), opts.isRTL = !0), Object.keys(userOptions).length
    }
    Inputmask.prototype = {
      dataAttribute: "data-inputmask",
      defaults: {
        placeholder: "_",
        optionalmarker: ["[", "]"],
        quantifiermarker: ["{", "}"],
        groupmarker: ["(", ")"],
        alternatormarker: "|",
        escapeChar: "\\",
        mask: null,
        regex: null,
        oncomplete: $.noop,
        onincomplete: $.noop,
        oncleared: $.noop,
        repeat: 0,
        greedy: !1,
        autoUnmask: !1,
        removeMaskOnSubmit: !1,
        clearMaskOnLostFocus: !0,
        insertMode: !0,
        insertModeVisual: !0,
        clearIncomplete: !1,
        alias: null,
        onKeyDown: $.noop,
        onBeforeMask: null,
        onBeforePaste: function onBeforePaste(pastedValue, opts) {
          return $.isFunction(opts.onBeforeMask) ? opts.onBeforeMask.call(this, pastedValue, opts) : pastedValue
        },
        onBeforeWrite: null,
        onUnMask: null,
        showMaskOnFocus: !0,
        showMaskOnHover: !0,
        onKeyValidation: $.noop,
        skipOptionalPartCharacter: " ",
        numericInput: !1,
        rightAlign: !1,
        undoOnEscape: !0,
        radixPoint: "",
        _radixDance: !1,
        groupSeparator: "",
        keepStatic: null,
        positionCaretOnTab: !0,
        tabThrough: !1,
        supportsInputType: ["text", "tel", "url", "password", "search"],
        ignorables: [8, 9, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 0, 229],
        isComplete: null,
        preValidation: null,
        postValidation: null,
        staticDefinitionSymbol: void 0,
        jitMasking: !1,
        nullable: !0,
        inputEventOnly: !1,
        noValuePatching: !1,
        positionCaretOnClick: "lvp",
        casing: null,
        inputmode: "text",
        importDataAttributes: !0,
        shiftPositions: !0
      },
      definitions: {
        9: {
          validator: "[0-9\uff11-\uff19]",
          definitionSymbol: "*"
        },
        a: {
          validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
          definitionSymbol: "*"
        },
        "*": {
          validator: "[0-9\uff11-\uff19A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]"
        }
      },
      aliases: {},
      masksCache: {},
      mask: function mask(elems) {
        var that = this;
        return "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), elems = elems.nodeName ? [elems] : elems, $.each(elems, function (ndx, el) {
          var scopedOpts = $.extend(!0, {}, that.opts);
          if (importAttributeOptions(el, scopedOpts, $.extend(!0, {}, that.userOptions), that.dataAttribute)) {
            var maskset = generateMaskSet(scopedOpts, that.noMasksCache);
            void 0 !== maskset && (void 0 !== el.inputmask && (el.inputmask.opts.autoUnmask = !0, el.inputmask.remove()), el.inputmask = new Inputmask(void 0, void 0, !0), el.inputmask.opts = scopedOpts, el.inputmask.noMasksCache = that.noMasksCache, el.inputmask.userOptions = $.extend(!0, {}, that.userOptions), el.inputmask.isRTL = scopedOpts.isRTL || scopedOpts.numericInput, el.inputmask.el = el, el.inputmask.maskset = maskset, $.data(el, "_inputmask_opts", scopedOpts), maskScope.call(el.inputmask, {
              action: "mask"
            }))
          }
        }), elems && elems[0] && elems[0].inputmask || this
      },
      option: function option(options, noremask) {
        return "string" == typeof options ? this.opts[options] : "object" === _typeof(options) ? ($.extend(this.userOptions, options), this.el && !0 !== noremask && this.mask(this.el), this) : void 0
      },
      unmaskedvalue: function unmaskedvalue(value) {
        return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {
          action: "unmaskedvalue",
          value: value
        })
      },
      remove: function remove() {
        return maskScope.call(this, {
          action: "remove"
        })
      },
      getemptymask: function getemptymask() {
        return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {
          action: "getemptymask"
        })
      },
      hasMaskedValue: function hasMaskedValue() {
        return !this.opts.autoUnmask
      },
      isComplete: function isComplete() {
        return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {
          action: "isComplete"
        })
      },
      getmetadata: function getmetadata() {
        return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {
          action: "getmetadata"
        })
      },
      isValid: function isValid(value) {
        return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {
          action: "isValid",
          value: value
        })
      },
      format: function format(value, metadata) {
        return this.maskset = this.maskset || generateMaskSet(this.opts, this.noMasksCache), maskScope.call(this, {
          action: "format",
          value: value,
          metadata: metadata
        })
      },
      setValue: function setValue(value) {
        this.el && $(this.el).trigger("setvalue", [value])
      },
      analyseMask: analyseMask
    }, Inputmask.extendDefaults = function (options) {
      $.extend(!0, Inputmask.prototype.defaults, options)
    }, Inputmask.extendDefinitions = function (definition) {
      $.extend(!0, Inputmask.prototype.definitions, definition)
    }, Inputmask.extendAliases = function (alias) {
      $.extend(!0, Inputmask.prototype.aliases, alias)
    }, Inputmask.format = function (value, options, metadata) {
      return Inputmask(options).format(value, metadata)
    }, Inputmask.unmask = function (value, options) {
      return Inputmask(options).unmaskedvalue(value)
    }, Inputmask.isValid = function (value, options) {
      return Inputmask(options).isValid(value)
    }, Inputmask.remove = function (elems) {
      "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), elems = elems.nodeName ? [elems] : elems, $.each(elems, function (ndx, el) {
        el.inputmask && el.inputmask.remove()
      })
    }, Inputmask.setValue = function (elems, value) {
      "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), elems = elems.nodeName ? [elems] : elems, $.each(elems, function (ndx, el) {
        el.inputmask ? el.inputmask.setValue(value) : $(el).trigger("setvalue", [value])
      })
    };
    var escapeRegexRegex = new RegExp("(\\" + ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"].join("|\\") + ")", "gim");
    Inputmask.escapeRegex = function (str) {
      return str.replace(escapeRegexRegex, "\\$1")
    }, Inputmask.dependencyLib = $, window.Inputmask = Inputmask, module.exports = Inputmask
  }, function (module, exports, __webpack_require__) {
    "use strict";

    function _typeof(obj) {
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
        return typeof obj
      } : function _typeof(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
      }, _typeof(obj)
    }
    var window = __webpack_require__(3),
      document = window.document;

    function indexOf(list, elem) {
      for (var i = 0, len = list.length; i < len; i++)
        if (list[i] === elem) return i;
      return -1
    }

    function isWindow(obj) {
      return null != obj && obj === obj.window
    }

    function isArraylike(obj) {
      var length = "length" in obj && obj.length,
        ltype = _typeof(obj);
      return "function" !== ltype && !isWindow(obj) && (!(1 !== obj.nodeType || !length) || ("array" === ltype || 0 === length || "number" == typeof length && 0 < length && length - 1 in obj))
    }

    function isValidElement(elem) {
      return elem instanceof Element
    }

    function DependencyLib(elem) {
      return elem instanceof DependencyLib ? elem : this instanceof DependencyLib ? void(null != elem && elem !== window && (this[0] = elem.nodeName ? elem : void 0 !== elem[0] && elem[0].nodeName ? elem[0] : document.querySelector(elem), void 0 !== this[0] && null !== this[0] && (this[0].eventRegistry = this[0].eventRegistry || {}))) : new DependencyLib(elem)
    }
    DependencyLib.prototype = {
      on: function on(events, handler) {
        function addEvent(ev, namespace) {
          elem.addEventListener ? elem.addEventListener(ev, handler, !1) : elem.attachEvent && elem.attachEvent("on" + ev, handler), eventRegistry[ev] = eventRegistry[ev] || {}, eventRegistry[ev][namespace] = eventRegistry[ev][namespace] || [], eventRegistry[ev][namespace].push(handler)
        }
        if (isValidElement(this[0]))
          for (var eventRegistry = this[0].eventRegistry, elem = this[0], _events = events.split(" "), endx = 0; endx < _events.length; endx++) {
            var nsEvent = _events[endx].split("."),
              ev = nsEvent[0],
              namespace = nsEvent[1] || "global";
            addEvent(ev, namespace)
          }
        return this
      },
      off: function off(events, handler) {
        var eventRegistry, elem;

        function removeEvent(ev, namespace, handler) {
          if (ev in eventRegistry == !0)
            if (elem.removeEventListener ? elem.removeEventListener(ev, handler, !1) : elem.detachEvent && elem.detachEvent("on" + ev, handler), "global" === namespace)
              for (var nmsp in eventRegistry[ev]) eventRegistry[ev][nmsp].splice(eventRegistry[ev][nmsp].indexOf(handler), 1);
            else eventRegistry[ev][namespace].splice(eventRegistry[ev][namespace].indexOf(handler), 1)
        }

        function resolveNamespace(ev, namespace) {
          var evts = [],
            hndx, hndL;
          if (0 < ev.length)
            if (void 0 === handler)
              for (hndx = 0, hndL = eventRegistry[ev][namespace].length; hndx < hndL; hndx++) evts.push({
                ev: ev,
                namespace: namespace && 0 < namespace.length ? namespace : "global",
                handler: eventRegistry[ev][namespace][hndx]
              });
            else evts.push({
              ev: ev,
              namespace: namespace && 0 < namespace.length ? namespace : "global",
              handler: handler
            });
          else if (0 < namespace.length)
            for (var evNdx in eventRegistry)
              for (var nmsp in eventRegistry[evNdx])
                if (nmsp === namespace)
                  if (void 0 === handler)
                    for (hndx = 0, hndL = eventRegistry[evNdx][nmsp].length; hndx < hndL; hndx++) evts.push({
                      ev: evNdx,
                      namespace: nmsp,
                      handler: eventRegistry[evNdx][nmsp][hndx]
                    });
                  else evts.push({
                    ev: evNdx,
                    namespace: nmsp,
                    handler: handler
                  });
          return evts
        }
        if (isValidElement(this[0])) {
          eventRegistry = this[0].eventRegistry, elem = this[0];
          for (var _events = events.split(" "), endx = 0; endx < _events.length; endx++)
            for (var nsEvent = _events[endx].split("."), offEvents = resolveNamespace(nsEvent[0], nsEvent[1]), i = 0, offEventsL = offEvents.length; i < offEventsL; i++) removeEvent(offEvents[i].ev, offEvents[i].namespace, offEvents[i].handler)
        }
        return this
      },
      trigger: function trigger(events, argument_1) {
        if (isValidElement(this[0]))
          for (var eventRegistry = this[0].eventRegistry, elem = this[0], _events = "string" == typeof events ? events.split(" ") : [events.type], endx = 0; endx < _events.length; endx++) {
            var nsEvent = _events[endx].split("."),
              ev = nsEvent[0],
              namespace = nsEvent[1] || "global";
            if (void 0 !== document && "global" === namespace) {
              var evnt, i, params = {
                bubbles: !0,
                cancelable: !0,
                detail: argument_1
              };
              if (document.createEvent) {
                try {
                  evnt = new CustomEvent(ev, params)
                } catch (e) {
                  evnt = document.createEvent("CustomEvent"), evnt.initCustomEvent(ev, params.bubbles, params.cancelable, params.detail)
                }
                events.type && DependencyLib.extend(evnt, events), elem.dispatchEvent(evnt)
              } else evnt = document.createEventObject(), evnt.eventType = ev, evnt.detail = argument_1, events.type && DependencyLib.extend(evnt, events), elem.fireEvent("on" + evnt.eventType, evnt)
            } else if (void 0 !== eventRegistry[ev])
              if (events = events.type ? events : DependencyLib.Event(events), events.detail = arguments.slice(1), "global" === namespace)
                for (var nmsp in eventRegistry[ev])
                  for (i = 0; i < eventRegistry[ev][nmsp].length; i++) eventRegistry[ev][nmsp][i].apply(elem, arguments);
              else
                for (i = 0; i < eventRegistry[ev][namespace].length; i++) eventRegistry[ev][namespace][i].apply(elem, arguments)
          }
        return this
      }
    }, DependencyLib.isFunction = function (obj) {
      return "function" == typeof obj
    }, DependencyLib.noop = function () {}, DependencyLib.isArray = Array.isArray, DependencyLib.inArray = function (elem, arr, i) {
      return null == arr ? -1 : indexOf(arr, elem, i)
    }, DependencyLib.valHooks = void 0, DependencyLib.isPlainObject = function (obj) {
      return "object" === _typeof(obj) && !obj.nodeType && !isWindow(obj) && !(obj.constructor && !Object.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf"))
    }, DependencyLib.extend = function () {
      var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = !1;
      for ("boolean" == typeof target && (deep = target, target = arguments[i] || {}, i++), "object" === _typeof(target) || DependencyLib.isFunction(target) || (target = {}), i === length && (target = this, i--); i < length; i++)
        if (null != (options = arguments[i]))
          for (name in options) src = target[name], copy = options[name], target !== copy && (deep && copy && (DependencyLib.isPlainObject(copy) || (copyIsArray = DependencyLib.isArray(copy))) ? (clone = copyIsArray ? (copyIsArray = !1, src && DependencyLib.isArray(src) ? src : []) : src && DependencyLib.isPlainObject(src) ? src : {}, target[name] = DependencyLib.extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy));
      return target
    }, DependencyLib.each = function (obj, callback) {
      var value, i = 0;
      if (isArraylike(obj))
        for (var length = obj.length; i < length && (value = callback.call(obj[i], i, obj[i]), !1 !== value); i++);
      else
        for (i in obj)
          if (value = callback.call(obj[i], i, obj[i]), !1 === value) break;
      return obj
    }, DependencyLib.data = function (owner, key, value) {
      if (void 0 === value) return owner.__data ? owner.__data[key] : null;
      owner.__data = owner.__data || {}, owner.__data[key] = value
    }, "function" == typeof window.CustomEvent ? DependencyLib.Event = window.CustomEvent : (DependencyLib.Event = function (event, params) {
      params = params || {
        bubbles: !1,
        cancelable: !1,
        detail: void 0
      };
      var evt = document.createEvent("CustomEvent");
      return evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail), evt
    }, DependencyLib.Event.prototype = window.Event.prototype), module.exports = DependencyLib
  }, function (module, exports, __webpack_require__) {
    "use strict";
    var __WEBPACK_AMD_DEFINE_RESULT__;

    function _typeof(obj) {
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
        return typeof obj
      } : function _typeof(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
      }, _typeof(obj)
    }
    __WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return "undefined" != typeof window ? window : new(eval("require('jsdom').JSDOM"))("").window
    }.call(exports, __webpack_require__, exports, module), void 0 === __WEBPACK_AMD_DEFINE_RESULT__ || (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)
  }, function (module, exports, __webpack_require__) {
    "use strict";
    var $ = __webpack_require__(2);

    function generateMaskSet(opts, nocache) {
      var ms;

      function generateMask(mask, metadata, opts) {
        var regexMask = !1,
          masksetDefinition, maskdefKey;
        if (null !== mask && "" !== mask || (regexMask = null !== opts.regex, mask = regexMask ? (mask = opts.regex, mask.replace(/^(\^)(.*)(\$)$/, "$2")) : (regexMask = !0, ".*")), 1 === mask.length && !1 === opts.greedy && 0 !== opts.repeat && (opts.placeholder = ""), 0 < opts.repeat || "*" === opts.repeat || "+" === opts.repeat) {
          var repeatStart = "*" === opts.repeat ? 0 : "+" === opts.repeat ? 1 : opts.repeat;
          mask = opts.groupmarker[0] + mask + opts.groupmarker[1] + opts.quantifiermarker[0] + repeatStart + "," + opts.repeat + opts.quantifiermarker[1]
        }
        return maskdefKey = regexMask ? "regex_" + opts.regex : opts.numericInput ? mask.split("").reverse().join("") : mask, !1 !== opts.keepStatic && (maskdefKey = "ks_" + maskdefKey), void 0 === Inputmask.prototype.masksCache[maskdefKey] || !0 === nocache ? (masksetDefinition = {
          mask: mask,
          maskToken: Inputmask.prototype.analyseMask(mask, regexMask, opts),
          validPositions: {},
          _buffer: void 0,
          buffer: void 0,
          tests: {},
          excludes: {},
          metadata: metadata,
          maskLength: void 0,
          jitOffset: {}
        }, !0 !== nocache && (Inputmask.prototype.masksCache[maskdefKey] = masksetDefinition, masksetDefinition = $.extend(!0, {}, Inputmask.prototype.masksCache[maskdefKey]))) : masksetDefinition = $.extend(!0, {}, Inputmask.prototype.masksCache[maskdefKey]), masksetDefinition
      }
      if ($.isFunction(opts.mask) && (opts.mask = opts.mask(opts)), $.isArray(opts.mask)) {
        if (1 < opts.mask.length) {
          if (null === opts.keepStatic) {
            opts.keepStatic = "auto";
            for (var i = 0; i < opts.mask.length; i++)
              if (opts.mask[i].charAt(0) !== opts.mask[0].charAt(0)) {
                opts.keepStatic = !0;
                break
              }
          }
          var altMask = opts.groupmarker[0];
          return $.each(opts.isRTL ? opts.mask.reverse() : opts.mask, function (ndx, msk) {
            1 < altMask.length && (altMask += opts.groupmarker[1] + opts.alternatormarker + opts.groupmarker[0]), void 0 === msk.mask || $.isFunction(msk.mask) ? altMask += msk : altMask += msk.mask
          }), altMask += opts.groupmarker[1], generateMask(altMask, opts.mask, opts)
        }
        opts.mask = opts.mask.pop()
      }
      return null === opts.keepStatic && (opts.keepStatic = !1), ms = opts.mask && void 0 !== opts.mask.mask && !$.isFunction(opts.mask.mask) ? generateMask(opts.mask.mask, opts.mask, opts) : generateMask(opts.mask, opts.mask, opts), ms
    }

    function analyseMask(mask, regexMask, opts) {
      var tokenizer = /(?:[?*+]|\{[0-9+*]+(?:,[0-9+*]*)?(?:\|[0-9+*]*)?\})|[^.?*+^${[]()|\\]+|./g,
        regexTokenizer = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
        escaped = !1,
        currentToken = new MaskToken,
        match, m, openenings = [],
        maskTokens = [],
        openingToken, currentOpeningToken, alternator, lastMatch, closeRegexGroup = !1;

      function MaskToken(isGroup, isOptional, isQuantifier, isAlternator) {
        this.matches = [], this.openGroup = isGroup || !1, this.alternatorGroup = !1, this.isGroup = isGroup || !1, this.isOptional = isOptional || !1, this.isQuantifier = isQuantifier || !1, this.isAlternator = isAlternator || !1, this.quantifier = {
          min: 1,
          max: 1
        }
      }

      function insertTestDefinition(mtoken, element, position) {
        position = void 0 !== position ? position : mtoken.matches.length;
        var prevMatch = mtoken.matches[position - 1];
        if (regexMask) 0 === element.indexOf("[") || escaped && /\\d|\\s|\\w]/i.test(element) || "." === element ? mtoken.matches.splice(position++, 0, {
          fn: new RegExp(element, opts.casing ? "i" : ""),
          static: !1,
          optionality: !1,
          newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== element,
          casing: null,
          def: element,
          placeholder: void 0,
          nativeDef: element
        }) : (escaped && (element = element[element.length - 1]), $.each(element.split(""), function (ndx, lmnt) {
          prevMatch = mtoken.matches[position - 1], mtoken.matches.splice(position++, 0, {
            fn: /[a-z]/i.test(opts.staticDefinitionSymbol || lmnt) ? new RegExp("[" + (opts.staticDefinitionSymbol || lmnt) + "]", opts.casing ? "i" : "") : null,
            static: !0,
            optionality: !1,
            newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== lmnt && !0 !== prevMatch.static,
            casing: null,
            def: opts.staticDefinitionSymbol || lmnt,
            placeholder: void 0 !== opts.staticDefinitionSymbol ? lmnt : void 0,
            nativeDef: (escaped ? "'" : "") + lmnt
          })
        })), escaped = !1;
        else {
          var maskdef = (opts.definitions ? opts.definitions[element] : void 0) || Inputmask.prototype.definitions[element];
          maskdef && !escaped ? mtoken.matches.splice(position++, 0, {
            fn: maskdef.validator ? "string" == typeof maskdef.validator ? new RegExp(maskdef.validator, opts.casing ? "i" : "") : new function () {
              this.test = maskdef.validator
            } : new RegExp("."),
            static: !1,
            optionality: !1,
            newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== (maskdef.definitionSymbol || element),
            casing: maskdef.casing,
            def: maskdef.definitionSymbol || element,
            placeholder: maskdef.placeholder,
            nativeDef: element
          }) : (mtoken.matches.splice(position++, 0, {
            fn: /[a-z]/i.test(opts.staticDefinitionSymbol || element) ? new RegExp("[" + (opts.staticDefinitionSymbol || element) + "]", opts.casing ? "i" : "") : null,
            static: !0,
            optionality: !1,
            newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== element && !0 !== prevMatch.static,
            casing: null,
            def: opts.staticDefinitionSymbol || element,
            placeholder: void 0 !== opts.staticDefinitionSymbol ? element : void 0,
            nativeDef: (escaped ? "'" : "") + element
          }), escaped = !1)
        }
      }

      function verifyGroupMarker(maskToken) {
        maskToken && maskToken.matches && $.each(maskToken.matches, function (ndx, token) {
          var nextToken = maskToken.matches[ndx + 1];
          (void 0 === nextToken || void 0 === nextToken.matches || !1 === nextToken.isQuantifier) && token && token.isGroup && (token.isGroup = !1, regexMask || (insertTestDefinition(token, opts.groupmarker[0], 0), !0 !== token.openGroup && insertTestDefinition(token, opts.groupmarker[1]))), verifyGroupMarker(token)
        })
      }

      function defaultCase() {
        if (0 < openenings.length) {
          if (currentOpeningToken = openenings[openenings.length - 1], insertTestDefinition(currentOpeningToken, m), currentOpeningToken.isAlternator) {
            alternator = openenings.pop();
            for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup && (alternator.matches[mndx].isGroup = !1);
            0 < openenings.length ? (currentOpeningToken = openenings[openenings.length - 1], currentOpeningToken.matches.push(alternator)) : currentToken.matches.push(alternator)
          }
        } else insertTestDefinition(currentToken, m)
      }

      function reverseTokens(maskToken) {
        function reverseStatic(st) {
          return st === opts.optionalmarker[0] ? st = opts.optionalmarker[1] : st === opts.optionalmarker[1] ? st = opts.optionalmarker[0] : st === opts.groupmarker[0] ? st = opts.groupmarker[1] : st === opts.groupmarker[1] && (st = opts.groupmarker[0]), st
        }
        for (var match in maskToken.matches = maskToken.matches.reverse(), maskToken.matches)
          if (Object.prototype.hasOwnProperty.call(maskToken.matches, match)) {
            var intMatch = parseInt(match);
            if (maskToken.matches[match].isQuantifier && maskToken.matches[intMatch + 1] && maskToken.matches[intMatch + 1].isGroup) {
              var qt = maskToken.matches[match];
              maskToken.matches.splice(match, 1), maskToken.matches.splice(intMatch + 1, 0, qt)
            }
            void 0 !== maskToken.matches[match].matches ? maskToken.matches[match] = reverseTokens(maskToken.matches[match]) : maskToken.matches[match] = reverseStatic(maskToken.matches[match])
          } return maskToken
      }

      function groupify(matches) {
        var groupToken = new MaskToken(!0);
        return groupToken.openGroup = !1, groupToken.matches = matches, groupToken
      }

      function closeGroup() {
        if (openingToken = openenings.pop(), openingToken.openGroup = !1, void 0 !== openingToken)
          if (0 < openenings.length) {
            if (currentOpeningToken = openenings[openenings.length - 1], currentOpeningToken.matches.push(openingToken), currentOpeningToken.isAlternator) {
              alternator = openenings.pop();
              for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup = !1, alternator.matches[mndx].alternatorGroup = !1;
              0 < openenings.length ? (currentOpeningToken = openenings[openenings.length - 1], currentOpeningToken.matches.push(alternator)) : currentToken.matches.push(alternator)
            }
          } else currentToken.matches.push(openingToken);
        else defaultCase()
      }

      function groupQuantifier(matches) {
        var lastMatch = matches.pop();
        return lastMatch.isQuantifier && (lastMatch = groupify([matches.pop(), lastMatch])), lastMatch
      }
      for (regexMask && (opts.optionalmarker[0] = void 0, opts.optionalmarker[1] = void 0); match = regexMask ? regexTokenizer.exec(mask) : tokenizer.exec(mask);) {
        if (m = match[0], regexMask) switch (m.charAt(0)) {
          case "?":
            m = "{0,1}";
            break;
          case "+":
          case "*":
            m = "{" + m + "}";
            break;
          case "|":
            if (0 === openenings.length) {
              var altRegexGroup = groupify(currentToken.matches);
              altRegexGroup.openGroup = !0, openenings.push(altRegexGroup), currentToken.matches = [], closeRegexGroup = !0
            }
            break
        }
        if (escaped) defaultCase();
        else switch (m.charAt(0)) {
          case "(?=":
            break;
          case "(?!":
            break;
          case "(?<=":
            break;
          case "(?<!":
            break;
          case opts.escapeChar:
            escaped = !0, regexMask && defaultCase();
            break;
          case opts.optionalmarker[1]:
          case opts.groupmarker[1]:
            closeGroup();
            break;
          case opts.optionalmarker[0]:
            openenings.push(new MaskToken(!1, !0));
            break;
          case opts.groupmarker[0]:
            openenings.push(new MaskToken(!0));
            break;
          case opts.quantifiermarker[0]:
            var quantifier = new MaskToken(!1, !1, !0);
            m = m.replace(/[{}]/g, "");
            var mqj = m.split("|"),
              mq = mqj[0].split(","),
              mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]),
              mq1 = 1 === mq.length ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]);
            "*" !== mq0 && "+" !== mq0 || (mq0 = "*" === mq1 ? 0 : 1), quantifier.quantifier = {
              min: mq0,
              max: mq1,
              jit: mqj[1]
            };
            var matches = 0 < openenings.length ? openenings[openenings.length - 1].matches : currentToken.matches;
            if (match = matches.pop(), match.isAlternator) {
              matches.push(match), matches = match.matches;
              var groupToken = new MaskToken(!0),
                tmpMatch = matches.pop();
              matches.push(groupToken), matches = groupToken.matches, match = tmpMatch
            }
            match.isGroup || (match = groupify([match])), matches.push(match), matches.push(quantifier);
            break;
          case opts.alternatormarker:
            if (0 < openenings.length) {
              currentOpeningToken = openenings[openenings.length - 1];
              var subToken = currentOpeningToken.matches[currentOpeningToken.matches.length - 1];
              lastMatch = currentOpeningToken.openGroup && (void 0 === subToken.matches || !1 === subToken.isGroup && !1 === subToken.isAlternator) ? openenings.pop() : groupQuantifier(currentOpeningToken.matches)
            } else lastMatch = groupQuantifier(currentToken.matches);
            if (lastMatch.isAlternator) openenings.push(lastMatch);
            else if (lastMatch.alternatorGroup ? (alternator = openenings.pop(), lastMatch.alternatorGroup = !1) : alternator = new MaskToken(!1, !1, !1, !0), alternator.matches.push(lastMatch), openenings.push(alternator), lastMatch.openGroup) {
              lastMatch.openGroup = !1;
              var alternatorGroup = new MaskToken(!0);
              alternatorGroup.alternatorGroup = !0, openenings.push(alternatorGroup)
            }
            break;
          default:
            defaultCase()
        }
      }
      for (closeRegexGroup && closeGroup(); 0 < openenings.length;) openingToken = openenings.pop(), currentToken.matches.push(openingToken);
      return 0 < currentToken.matches.length && (verifyGroupMarker(currentToken), maskTokens.push(currentToken)), (opts.numericInput || opts.isRTL) && reverseTokens(maskTokens[0]), maskTokens
    }
    module.exports = {
      generateMaskSet: generateMaskSet,
      analyseMask: analyseMask
    }
  }, function (module, exports, __webpack_require__) {
    "use strict";
    __webpack_require__(6), __webpack_require__(8), __webpack_require__(9), module.exports = __webpack_require__(1)
  }, function (module, exports, __webpack_require__) {
    "use strict";
    var Inputmask = __webpack_require__(1);
    Inputmask.extendDefinitions({
      A: {
        validator: "[A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
        casing: "upper"
      },
      "&": {
        validator: "[0-9A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5]",
        casing: "upper"
      },
      "#": {
        validator: "[0-9A-Fa-f]",
        casing: "upper"
      }
    });
    var ipValidatorRegex = new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]");

    function ipValidator(chrs, maskset, pos, strict, opts) {
      return chrs = -1 < pos - 1 && "." !== maskset.buffer[pos - 1] ? (chrs = maskset.buffer[pos - 1] + chrs, -1 < pos - 2 && "." !== maskset.buffer[pos - 2] ? maskset.buffer[pos - 2] + chrs : "0" + chrs) : "00" + chrs, ipValidatorRegex.test(chrs)
    }
    Inputmask.extendAliases({
      cssunit: {
        regex: "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)"
      },
      url: {
        regex: "(https?|ftp)//.*",
        autoUnmask: !1
      },
      ip: {
        mask: "i[i[i]].j[j[j]].k[k[k]].l[l[l]]",
        definitions: {
          i: {
            validator: ipValidator
          },
          j: {
            validator: ipValidator
          },
          k: {
            validator: ipValidator
          },
          l: {
            validator: ipValidator
          }
        },
        onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
          return maskedValue
        },
        inputmode: "numeric"
      },
      email: {
        mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
        greedy: !1,
        casing: "lower",
        onBeforePaste: function onBeforePaste(pastedValue, opts) {
          return pastedValue = pastedValue.toLowerCase(), pastedValue.replace("mailto:", "")
        },
        definitions: {
          "*": {
            validator: "[0-9\uff11-\uff19A-Za-z\u0410-\u044f\u0401\u0451\xc0-\xff\xb5!#$%&'*+/=?^_`{|}~-]"
          },
          "-": {
            validator: "[0-9A-Za-z-]"
          }
        },
        onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
          return maskedValue
        },
        inputmode: "email"
      },
      mac: {
        mask: "##:##:##:##:##:##"
      },
      vin: {
        mask: "V{13}9{4}",
        definitions: {
          V: {
            validator: "[A-HJ-NPR-Za-hj-npr-z\\d]",
            casing: "upper"
          }
        },
        clearIncomplete: !0,
        autoUnmask: !0
      }
    }), module.exports = Inputmask
  }, function (module, exports, __webpack_require__) {
    "use strict";

    function _typeof(obj) {
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
        return typeof obj
      } : function _typeof(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
      }, _typeof(obj)
    }
    var $ = __webpack_require__(2),
      window = __webpack_require__(3),
      document = window.document,
      ua = window.navigator && window.navigator.userAgent || "",
      ie = 0 < ua.indexOf("MSIE ") || 0 < ua.indexOf("Trident/"),
      mobile = "ontouchstart" in window,
      iemobile = /iemobile/i.test(ua),
      iphone = /iphone/i.test(ua) && !iemobile,
      keyCode = __webpack_require__(0);
    module.exports = function maskScope(actionObj, maskset, opts) {
      maskset = maskset || this.maskset, opts = opts || this.opts;
      var inputmask = this,
        el = this.el,
        isRTL = this.isRTL || (this.isRTL = opts.numericInput),
        undoValue, $el, skipKeyPressEvent = !1,
        skipInputEvent = !1,
        validationEvent = !1,
        ignorable = !1,
        maxLength, mouseEnter = !1,
        originalPlaceholder = void 0;

      function getMaskTemplate(baseOnInput, minimalPos, includeMode, noJit, clearOptionalTail) {
        var greedy = opts.greedy;
        clearOptionalTail && (opts.greedy = !1), minimalPos = minimalPos || 0;
        var maskTemplate = [],
          ndxIntlzr, pos = 0,
          test, testPos;
        do {
          if (!0 === baseOnInput && maskset.validPositions[pos]) testPos = clearOptionalTail && !0 === maskset.validPositions[pos].match.optionality && void 0 === maskset.validPositions[pos + 1] && (!0 === maskset.validPositions[pos].generatedInput || maskset.validPositions[pos].input == opts.skipOptionalPartCharacter && 0 < pos) ? determineTestTemplate(pos, getTests(pos, ndxIntlzr, pos - 1)) : maskset.validPositions[pos], test = testPos.match, ndxIntlzr = testPos.locator.slice(), maskTemplate.push(!0 === includeMode ? testPos.input : !1 === includeMode ? test.nativeDef : getPlaceholder(pos, test));
          else {
            testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), test = testPos.match, ndxIntlzr = testPos.locator.slice();
            var jitMasking = !0 !== noJit && (!1 !== opts.jitMasking ? opts.jitMasking : test.jit);
            (!1 === jitMasking || void 0 === jitMasking || "number" == typeof jitMasking && isFinite(jitMasking) && pos < jitMasking) && maskTemplate.push(!1 === includeMode ? test.nativeDef : getPlaceholder(pos, test))
          }
          "auto" === opts.keepStatic && test.newBlockMarker && !0 !== test.static && (opts.keepStatic = pos - 1), pos++
        } while ((void 0 === maxLength || pos < maxLength) && (!0 !== test.static || "" !== test.def) || pos < minimalPos);
        return "" === maskTemplate[maskTemplate.length - 1] && maskTemplate.pop(), !1 === includeMode && void 0 !== maskset.maskLength || (maskset.maskLength = pos - 1), opts.greedy = greedy, maskTemplate
      }

      function resetMaskSet(soft) {
        maskset.buffer = void 0, !0 !== soft && (maskset.validPositions = {}, maskset.p = 0)
      }

      function getLastValidPosition(closestTo, strict, validPositions) {
        var before = -1,
          after = -1,
          valids = validPositions || maskset.validPositions;
        for (var posNdx in void 0 === closestTo && (closestTo = -1), valids) {
          var psNdx = parseInt(posNdx);
          valids[psNdx] && (strict || !0 !== valids[psNdx].generatedInput) && (psNdx <= closestTo && (before = psNdx), closestTo <= psNdx && (after = psNdx))
        }
        return -1 === before || before == closestTo ? after : -1 == after ? before : closestTo - before < after - closestTo ? before : after
      }

      function getDecisionTaker(tst) {
        var decisionTaker = tst.locator[tst.alternation];
        return "string" == typeof decisionTaker && 0 < decisionTaker.length && (decisionTaker = decisionTaker.split(",")[0]), void 0 !== decisionTaker ? decisionTaker.toString() : ""
      }

      function getLocator(tst, align) {
        var locator = (null != tst.alternation ? tst.mloc[getDecisionTaker(tst)] : tst.locator).join("");
        if ("" !== locator)
          for (; locator.length < align;) locator += "0";
        return locator
      }

      function determineTestTemplate(pos, tests) {
        pos = 0 < pos ? pos - 1 : 0;
        for (var altTest = getTest(pos), targetLocator = getLocator(altTest), tstLocator, closest, bestMatch, ndx = 0; ndx < tests.length; ndx++) {
          var tst = tests[ndx];
          tstLocator = getLocator(tst, targetLocator.length);
          var distance = Math.abs(tstLocator - targetLocator);
          (void 0 === closest || "" !== tstLocator && distance < closest || bestMatch && !opts.greedy && bestMatch.match.optionality && "master" === bestMatch.match.newBlockMarker && (!tst.match.optionality || !tst.match.newBlockMarker) || bestMatch && bestMatch.match.optionalQuantifier && !tst.match.optionalQuantifier) && (closest = distance, bestMatch = tst)
        }
        return bestMatch
      }

      function getTestTemplate(pos, ndxIntlzr, tstPs) {
        return maskset.validPositions[pos] || determineTestTemplate(pos, getTests(pos, ndxIntlzr ? ndxIntlzr.slice() : ndxIntlzr, tstPs))
      }

      function getTest(pos, tests) {
        return maskset.validPositions[pos] ? maskset.validPositions[pos] : (tests || getTests(pos))[0]
      }

      function positionCanMatchDefinition(pos, testDefinition, opts) {
        for (var valid = !1, tests = getTests(pos), defProp = opts.shiftPositions ? "def" : "nativeDef", tndx = 0; tndx < tests.length; tndx++)
          if (tests[tndx].match && tests[tndx].match[defProp] === testDefinition.match[defProp]) {
            valid = !0;
            break
          } return !1 === valid && void 0 !== maskset.jitOffset[pos] && (valid = positionCanMatchDefinition(pos + maskset.jitOffset[pos], testDefinition, opts)), valid
      }

      function getTests(pos, ndxIntlzr, tstPs) {
        var maskTokens = maskset.maskToken,
          testPos = ndxIntlzr ? tstPs : 0,
          ndxInitializer = ndxIntlzr ? ndxIntlzr.slice() : [0],
          matches = [],
          insertStop = !1,
          latestMatch, cacheDependency = ndxIntlzr ? ndxIntlzr.join("") : "";

        function resolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) {
          function handleMatch(match, loopNdx, quantifierRecurse) {
            function isFirstMatch(latestMatch, tokenGroup) {
              var firstMatch = 0 === $.inArray(latestMatch, tokenGroup.matches);
              return firstMatch || $.each(tokenGroup.matches, function (ndx, match) {
                if (!0 === match.isQuantifier ? firstMatch = isFirstMatch(latestMatch, tokenGroup.matches[ndx - 1]) : Object.prototype.hasOwnProperty.call(match, "matches") && (firstMatch = isFirstMatch(latestMatch, match)), firstMatch) return !1
              }), firstMatch
            }

            function resolveNdxInitializer(pos, alternateNdx, targetAlternation) {
              var bestMatch, indexPos;
              if ((maskset.tests[pos] || maskset.validPositions[pos]) && $.each(maskset.tests[pos] || [maskset.validPositions[pos]], function (ndx, lmnt) {
                  if (lmnt.mloc[alternateNdx]) return bestMatch = lmnt, !1;
                  var alternation = void 0 !== targetAlternation ? targetAlternation : lmnt.alternation,
                    ndxPos = void 0 !== lmnt.locator[alternation] ? lmnt.locator[alternation].toString().indexOf(alternateNdx) : -1;
                  (void 0 === indexPos || ndxPos < indexPos) && -1 !== ndxPos && (bestMatch = lmnt, indexPos = ndxPos)
                }), bestMatch) {
                var bestMatchAltIndex = bestMatch.locator[bestMatch.alternation],
                  locator = bestMatch.mloc[alternateNdx] || bestMatch.mloc[bestMatchAltIndex] || bestMatch.locator;
                return locator.slice((void 0 !== targetAlternation ? targetAlternation : bestMatch.alternation) + 1)
              }
              return void 0 !== targetAlternation ? resolveNdxInitializer(pos, alternateNdx) : void 0
            }

            function isSubsetOf(source, target) {
              function expand(pattern) {
                for (var expanded = [], start = -1, end, i = 0, l = pattern.length; i < l; i++)
                  if ("-" === pattern.charAt(i))
                    for (end = pattern.charCodeAt(i + 1); ++start < end;) expanded.push(String.fromCharCode(start));
                  else start = pattern.charCodeAt(i), expanded.push(pattern.charAt(i));
                return expanded.join("")
              }
              return source.match.def === target.match.nativeDef || !(!(opts.regex || source.match.fn instanceof RegExp && target.match.fn instanceof RegExp) || !0 === source.match.static || !0 === target.match.static) && -1 !== expand(target.match.fn.toString().replace(/[[\]/]/g, "")).indexOf(expand(source.match.fn.toString().replace(/[[\]/]/g, "")))
            }

            function staticCanMatchDefinition(source, target) {
              return !0 === source.match.static && !0 !== target.match.static && target.match.fn.test(source.match.def, maskset, pos, !1, opts, !1)
            }

            function setMergeLocators(targetMatch, altMatch) {
              if (void 0 === altMatch || targetMatch.alternation === altMatch.alternation && -1 === targetMatch.locator[targetMatch.alternation].toString().indexOf(altMatch.locator[altMatch.alternation])) {
                targetMatch.mloc = targetMatch.mloc || {};
                var locNdx = targetMatch.locator[targetMatch.alternation];
                if (void 0 !== locNdx) {
                  if ("string" == typeof locNdx && (locNdx = locNdx.split(",")[0]), void 0 === targetMatch.mloc[locNdx] && (targetMatch.mloc[locNdx] = targetMatch.locator.slice()), void 0 !== altMatch) {
                    for (var ndx in altMatch.mloc) "string" == typeof ndx && (ndx = ndx.split(",")[0]), void 0 === targetMatch.mloc[ndx] && (targetMatch.mloc[ndx] = altMatch.mloc[ndx]);
                    targetMatch.locator[targetMatch.alternation] = Object.keys(targetMatch.mloc).join(",")
                  }
                  return !0
                }
                targetMatch.alternation = void 0
              }
              return !1
            }
            if (500 < testPos && void 0 !== quantifierRecurse) throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + maskset.mask;
            if (testPos === pos && void 0 === match.matches) return matches.push({
              match: match,
              locator: loopNdx.reverse(),
              cd: cacheDependency,
              mloc: {}
            }), !0;
            if (void 0 !== match.matches) {
              if (match.isGroup && quantifierRecurse !== match) {
                if (match = handleMatch(maskToken.matches[$.inArray(match, maskToken.matches) + 1], loopNdx, quantifierRecurse), match) return !0
              } else if (match.isOptional) {
                var optionalToken = match,
                  mtchsNdx = matches.length;
                if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse), match) {
                  if ($.each(matches, function (ndx, mtch) {
                      mtchsNdx <= ndx && (mtch.match.optionality = !0)
                    }), latestMatch = matches[matches.length - 1].match, void 0 !== quantifierRecurse || !isFirstMatch(latestMatch, optionalToken)) return !0;
                  insertStop = !0, testPos = pos
                }
              } else if (match.isAlternator) {
                var alternateToken = match,
                  malternateMatches = [],
                  maltMatches, currentMatches = matches.slice(),
                  loopNdxCnt = loopNdx.length,
                  altIndex = 0 < ndxInitializer.length ? ndxInitializer.shift() : -1;
                if (-1 === altIndex || "string" == typeof altIndex) {
                  var currentPos = testPos,
                    ndxInitializerClone = ndxInitializer.slice(),
                    altIndexArr = [],
                    amndx;
                  if ("string" == typeof altIndex) altIndexArr = altIndex.split(",");
                  else
                    for (amndx = 0; amndx < alternateToken.matches.length; amndx++) altIndexArr.push(amndx.toString());
                  if (void 0 !== maskset.excludes[pos]) {
                    for (var altIndexArrClone = altIndexArr.slice(), i = 0, el = maskset.excludes[pos].length; i < el; i++) altIndexArr.splice(altIndexArr.indexOf(maskset.excludes[pos][i].toString()), 1);
                    0 === altIndexArr.length && (delete maskset.excludes[pos], altIndexArr = altIndexArrClone)
                  }(!0 === opts.keepStatic || isFinite(parseInt(opts.keepStatic)) && currentPos >= opts.keepStatic) && (altIndexArr = altIndexArr.slice(0, 1));
                  for (var unMatchedAlternation = !1, ndx = 0; ndx < altIndexArr.length; ndx++) {
                    amndx = parseInt(altIndexArr[ndx]), matches = [], ndxInitializer = "string" == typeof altIndex && resolveNdxInitializer(testPos, amndx, loopNdxCnt) || ndxInitializerClone.slice(), alternateToken.matches[amndx] && handleMatch(alternateToken.matches[amndx], [amndx].concat(loopNdx), quantifierRecurse) ? match = !0 : 0 === ndx && (unMatchedAlternation = !0), maltMatches = matches.slice(), testPos = currentPos, matches = [];
                    for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
                      var altMatch = maltMatches[ndx1],
                        dropMatch = !1;
                      altMatch.match.jit = altMatch.match.jit || unMatchedAlternation, altMatch.alternation = altMatch.alternation || loopNdxCnt, setMergeLocators(altMatch);
                      for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
                        var altMatch2 = malternateMatches[ndx2];
                        if ("string" != typeof altIndex || void 0 !== altMatch.alternation && -1 !== $.inArray(altMatch.locator[altMatch.alternation].toString(), altIndexArr)) {
                          if (altMatch.match.nativeDef === altMatch2.match.nativeDef) {
                            dropMatch = !0, setMergeLocators(altMatch2, altMatch);
                            break
                          }
                          if (isSubsetOf(altMatch, altMatch2)) {
                            setMergeLocators(altMatch, altMatch2) && (dropMatch = !0, malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch));
                            break
                          }
                          if (isSubsetOf(altMatch2, altMatch)) {
                            setMergeLocators(altMatch2, altMatch);
                            break
                          }
                          if (staticCanMatchDefinition(altMatch, altMatch2)) {
                            setMergeLocators(altMatch, altMatch2) && (dropMatch = !0, malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch));
                            break
                          }
                        }
                      }
                      dropMatch || malternateMatches.push(altMatch)
                    }
                  }
                  matches = currentMatches.concat(malternateMatches), testPos = pos, insertStop = 0 < matches.length, match = 0 < malternateMatches.length, ndxInitializer = ndxInitializerClone.slice()
                } else match = handleMatch(alternateToken.matches[altIndex] || maskToken.matches[altIndex], [altIndex].concat(loopNdx), quantifierRecurse);
                if (match) return !0
              } else if (match.isQuantifier && quantifierRecurse !== maskToken.matches[$.inArray(match, maskToken.matches) - 1])
                for (var qt = match, qndx = 0 < ndxInitializer.length ? ndxInitializer.shift() : 0; qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max) && testPos <= pos; qndx++) {
                  var tokenGroup = maskToken.matches[$.inArray(qt, maskToken.matches) - 1];
                  if (match = handleMatch(tokenGroup, [qndx].concat(loopNdx), tokenGroup), match) {
                    if (latestMatch = matches[matches.length - 1].match, latestMatch.optionalQuantifier = qndx >= qt.quantifier.min, latestMatch.jit = (qndx || 1) * tokenGroup.matches.indexOf(latestMatch) >= qt.quantifier.jit, latestMatch.optionalQuantifier && isFirstMatch(latestMatch, tokenGroup)) {
                      insertStop = !0, testPos = pos;
                      break
                    }
                    return latestMatch.jit && (maskset.jitOffset[pos] = tokenGroup.matches.length - tokenGroup.matches.indexOf(latestMatch)), !0
                  }
                } else if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse), match) return !0
            } else testPos++
          }
          for (var tndx = 0 < ndxInitializer.length ? ndxInitializer.shift() : 0; tndx < maskToken.matches.length; tndx++)
            if (!0 !== maskToken.matches[tndx].isQuantifier) {
              var match = handleMatch(maskToken.matches[tndx], [tndx].concat(loopNdx), quantifierRecurse);
              if (match && testPos === pos) return match;
              if (pos < testPos) break
            }
        }

        function mergeLocators(pos, tests) {
          var locator = [];
          return $.isArray(tests) || (tests = [tests]), 0 < tests.length && (void 0 === tests[0].alternation || !0 === opts.keepStatic ? (locator = determineTestTemplate(pos, tests.slice()).locator.slice(), 0 === locator.length && (locator = tests[0].locator.slice())) : $.each(tests, function (ndx, tst) {
            if ("" !== tst.def)
              if (0 === locator.length) locator = tst.locator.slice();
              else
                for (var i = 0; i < locator.length; i++) tst.locator[i] && -1 === locator[i].toString().indexOf(tst.locator[i]) && (locator[i] += "," + tst.locator[i])
          })), locator
        }
        if (-1 < pos && (void 0 === maxLength || pos < maxLength)) {
          if (void 0 === ndxIntlzr) {
            for (var previousPos = pos - 1, test; void 0 === (test = maskset.validPositions[previousPos] || maskset.tests[previousPos]) && -1 < previousPos;) previousPos--;
            void 0 !== test && -1 < previousPos && (ndxInitializer = mergeLocators(previousPos, test), cacheDependency = ndxInitializer.join(""), testPos = previousPos)
          }
          if (maskset.tests[pos] && maskset.tests[pos][0].cd === cacheDependency) return maskset.tests[pos];
          for (var mtndx = ndxInitializer.shift(); mtndx < maskTokens.length; mtndx++) {
            var match = resolveTestFromToken(maskTokens[mtndx], ndxInitializer, [mtndx]);
            if (match && testPos === pos || pos < testPos) break
          }
        }
        return 0 !== matches.length && !insertStop || matches.push({
          match: {
            fn: null,
            static: !0,
            optionality: !1,
            casing: null,
            def: "",
            placeholder: ""
          },
          locator: [],
          mloc: {},
          cd: cacheDependency
        }), void 0 !== ndxIntlzr && maskset.tests[pos] ? $.extend(!0, [], matches) : (maskset.tests[pos] = $.extend(!0, [], matches), maskset.tests[pos])
      }

      function getBufferTemplate() {
        return void 0 === maskset._buffer && (maskset._buffer = getMaskTemplate(!1, 1), void 0 === maskset.buffer && (maskset.buffer = maskset._buffer.slice())), maskset._buffer
      }

      function getBuffer(noCache) {
        return void 0 !== maskset.buffer && !0 !== noCache || (maskset.buffer = getMaskTemplate(!0, getLastValidPosition(), !0), void 0 === maskset._buffer && (maskset._buffer = maskset.buffer.slice())), maskset.buffer
      }

      function refreshFromBuffer(start, end, buffer) {
        var i, p, skipOptionalPartCharacter = opts.skipOptionalPartCharacter,
          bffr = isRTL ? buffer.slice().reverse() : buffer;
        if (opts.skipOptionalPartCharacter = "", !0 === start) resetMaskSet(), maskset.tests = {}, start = 0, end = buffer.length, p = determineNewCaretPosition({
          begin: 0,
          end: 0
        }, !1);
        else {
          for (i = start; i < end; i++) delete maskset.validPositions[i];
          p = start
        }
        var keypress = new $.Event("keypress");
        for (i = start; i < end; i++) {
          keypress.which = bffr[i].toString().charCodeAt(0), ignorable = !1;
          var valResult = EventHandlers.keypressEvent.call(el, keypress, !0, !1, !1, p);
          !1 !== valResult && (p = valResult.forwardPosition)
        }
        opts.skipOptionalPartCharacter = skipOptionalPartCharacter
      }

      function casing(elem, test, pos) {
        switch (opts.casing || test.casing) {
          case "upper":
            elem = elem.toUpperCase();
            break;
          case "lower":
            elem = elem.toLowerCase();
            break;
          case "title":
            var posBefore = maskset.validPositions[pos - 1];
            elem = 0 === pos || posBefore && posBefore.input === String.fromCharCode(keyCode.SPACE) ? elem.toUpperCase() : elem.toLowerCase();
            break;
          default:
            if ($.isFunction(opts.casing)) {
              var args = Array.prototype.slice.call(arguments);
              args.push(maskset.validPositions), elem = opts.casing.apply(this, args)
            }
        }
        return elem
      }

      function checkAlternationMatch(altArr1, altArr2, na) {
        for (var altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1), isMatch = !1, naArr = void 0 !== na ? na.split(",") : [], naNdx, i = 0; i < naArr.length; i++) - 1 !== (naNdx = altArr1.indexOf(naArr[i])) && altArr1.splice(naNdx, 1);
        for (var alndx = 0; alndx < altArr1.length; alndx++)
          if (-1 !== $.inArray(altArr1[alndx], altArrC)) {
            isMatch = !0;
            break
          } return isMatch
      }

      function alternate(maskPos, c, strict, fromIsValid, rAltPos, selection) {
        var validPsClone = $.extend(!0, {}, maskset.validPositions),
          tstClone = $.extend(!0, {}, maskset.tests),
          lastAlt, alternation, isValidRslt = !1,
          returnRslt = !1,
          altPos, prevAltPos, i, validPos, decisionPos, lAltPos = void 0 !== rAltPos ? rAltPos : getLastValidPosition(),
          nextPos, input, begin, end;
        if (selection && (begin = selection.begin, end = selection.end, selection.begin > selection.end && (begin = selection.end, end = selection.begin)), -1 === lAltPos && void 0 === rAltPos) lastAlt = 0, prevAltPos = getTest(lastAlt), alternation = prevAltPos.alternation;
        else
          for (; 0 <= lAltPos; lAltPos--)
            if (altPos = maskset.validPositions[lAltPos], altPos && void 0 !== altPos.alternation) {
              if (prevAltPos && prevAltPos.locator[altPos.alternation] !== altPos.locator[altPos.alternation]) break;
              lastAlt = lAltPos, alternation = maskset.validPositions[lastAlt].alternation, prevAltPos = altPos
            } if (void 0 !== alternation) {
          decisionPos = parseInt(lastAlt), maskset.excludes[decisionPos] = maskset.excludes[decisionPos] || [], !0 !== maskPos && maskset.excludes[decisionPos].push(getDecisionTaker(prevAltPos));
          var validInputs = [],
            resultPos = -1;
          for (i = decisionPos; i < getLastValidPosition(void 0, !0) + 1; i++) - 1 === resultPos && maskPos <= i && void 0 !== c && (validInputs.push(c), resultPos = validInputs.length - 1), validPos = maskset.validPositions[i], validPos && !0 !== validPos.generatedInput && (void 0 === selection || i < begin || end <= i) && validInputs.push(validPos.input), delete maskset.validPositions[i];
          for (-1 === resultPos && void 0 !== c && (validInputs.push(c), resultPos = validInputs.length - 1); void 0 !== maskset.excludes[decisionPos] && maskset.excludes[decisionPos].length < 10;) {
            for (maskset.tests = {}, resetMaskSet(!0), isValidRslt = !0, i = 0; i < validInputs.length && (nextPos = isValidRslt.caret || getLastValidPosition(void 0, !0) + 1, input = validInputs[i], isValidRslt = isValid(nextPos, input, !1, fromIsValid, !0)); i++) i === resultPos && (returnRslt = isValidRslt), 1 == maskPos && isValidRslt && (returnRslt = {
              caretPos: i
            });
            if (isValidRslt) break;
            if (resetMaskSet(), prevAltPos = getTest(decisionPos), maskset.validPositions = $.extend(!0, {}, validPsClone), maskset.tests = $.extend(!0, {}, tstClone), !maskset.excludes[decisionPos]) {
              returnRslt = alternate(maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
              break
            }
            var decisionTaker = getDecisionTaker(prevAltPos);
            if (-1 !== maskset.excludes[decisionPos].indexOf(decisionTaker)) {
              returnRslt = alternate(maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
              break
            }
            for (maskset.excludes[decisionPos].push(decisionTaker), i = decisionPos; i < getLastValidPosition(void 0, !0) + 1; i++) delete maskset.validPositions[i]
          }
        }
        return returnRslt && !1 === opts.keepStatic || delete maskset.excludes[decisionPos], returnRslt
      }

      function isValid(pos, c, strict, fromIsValid, fromAlternate, validateOnly) {
        function isSelection(posObj) {
          return isRTL ? 1 < posObj.begin - posObj.end || posObj.begin - posObj.end == 1 : 1 < posObj.end - posObj.begin || posObj.end - posObj.begin == 1
        }
        strict = !0 === strict;
        var maskPos = pos;

        function processCommandObject(commandObj) {
          if (void 0 !== commandObj) {
            if (void 0 !== commandObj.remove && ($.isArray(commandObj.remove) || (commandObj.remove = [commandObj.remove]), $.each(commandObj.remove.sort(function (a, b) {
                return b.pos - a.pos
              }), function (ndx, lmnt) {
                revalidateMask({
                  begin: lmnt,
                  end: lmnt + 1
                })
              }), commandObj.remove = void 0), void 0 !== commandObj.insert && ($.isArray(commandObj.insert) || (commandObj.insert = [commandObj.insert]), $.each(commandObj.insert.sort(function (a, b) {
                return a.pos - b.pos
              }), function (ndx, lmnt) {
                "" !== lmnt.c && isValid(lmnt.pos, lmnt.c, void 0 === lmnt.strict || lmnt.strict, void 0 !== lmnt.fromIsValid ? lmnt.fromIsValid : fromIsValid)
              }), commandObj.insert = void 0), commandObj.refreshFromBuffer && commandObj.buffer) {
              var refresh = commandObj.refreshFromBuffer;
              refreshFromBuffer(!0 === refresh ? refresh : refresh.start, refresh.end, commandObj.buffer), commandObj.refreshFromBuffer = void 0
            }
            void 0 !== commandObj.rewritePosition && (maskPos = commandObj.rewritePosition, commandObj = !0)
          }
          return commandObj
        }

        function _isValid(position, c, strict) {
          var rslt = !1;
          return $.each(getTests(position), function (ndx, tst) {
            var test = tst.match;
            if (getBuffer(!0), rslt = null != test.fn ? test.fn.test(c, maskset, position, strict, opts, isSelection(pos)) : (c === test.def || c === opts.skipOptionalPartCharacter) && "" !== test.def && {
                c: getPlaceholder(position, test, !0) || test.def,
                pos: position
              }, !1 !== rslt) {
              var elem = void 0 !== rslt.c ? rslt.c : c,
                validatedPos = position;
              return elem = elem === opts.skipOptionalPartCharacter && !0 === test.static ? getPlaceholder(position, test, !0) || test.def : elem, rslt = processCommandObject(rslt), !0 !== rslt && void 0 !== rslt.pos && rslt.pos !== position && (validatedPos = rslt.pos), !0 !== rslt && void 0 === rslt.pos && void 0 === rslt.c ? !1 : (!1 === revalidateMask(pos, $.extend({}, tst, {
                input: casing(elem, test, validatedPos)
              }), fromIsValid, validatedPos) && (rslt = !1), !1)
            }
          }), rslt
        }
        void 0 !== pos.begin && (maskPos = isRTL ? pos.end : pos.begin);
        var result = !0,
          positionsClone = $.extend(!0, {}, maskset.validPositions);
        if (!1 === opts.keepStatic && void 0 !== maskset.excludes[maskPos] && !0 !== fromAlternate && !0 !== fromIsValid)
          for (var i = maskPos; i < (isRTL ? pos.begin : pos.end); i++) void 0 !== maskset.excludes[i] && (maskset.excludes[i] = void 0, delete maskset.tests[i]);
        if ($.isFunction(opts.preValidation) && !0 !== fromIsValid && !0 !== validateOnly && (result = opts.preValidation(getBuffer(), maskPos, c, isSelection(pos), opts, maskset, pos, strict || fromAlternate), result = processCommandObject(result)), !0 === result) {
          if (void 0 === maxLength || maskPos < maxLength) {
            if (result = _isValid(maskPos, c, strict), (!strict || !0 === fromIsValid) && !1 === result && !0 !== validateOnly) {
              var currentPosValid = maskset.validPositions[maskPos];
              if (!currentPosValid || !0 !== currentPosValid.match.static || currentPosValid.match.def !== c && c !== opts.skipOptionalPartCharacter) {
                if (opts.insertMode || void 0 === maskset.validPositions[seekNext(maskPos)] || pos.end > maskPos) {
                  var skip = !1;
                  if (maskset.jitOffset[maskPos] && void 0 === maskset.validPositions[seekNext(maskPos)] && (result = isValid(maskPos + maskset.jitOffset[maskPos], c, !0), !1 !== result && (!0 !== fromAlternate && (result.caret = maskPos), skip = !0)), pos.end > maskPos && (maskset.validPositions[maskPos] = void 0), !skip && !isMask(maskPos, !0))
                    for (var nPos = maskPos + 1, snPos = seekNext(maskPos); nPos <= snPos; nPos++)
                      if (result = _isValid(nPos, c, strict), !1 !== result) {
                        result = trackbackPositions(maskPos, void 0 !== result.pos ? result.pos : nPos) || result, maskPos = nPos;
                        break
                      }
                }
              } else result = {
                caret: seekNext(maskPos)
              }
            }
          } else result = !1;
          !1 !== result || !1 !== opts.keepStatic && !isComplete(getBuffer()) && 0 !== maskPos || strict || !0 === fromAlternate ? isSelection(pos) && maskset.tests[maskPos] && 1 < maskset.tests[maskPos].length && !0 === opts.keepStatic && !strict && !0 !== fromAlternate && (result = alternate(!0)) : result = alternate(maskPos, c, strict, fromIsValid, void 0, pos), !0 === result && (result = {
            pos: maskPos
          })
        }
        if ($.isFunction(opts.postValidation) && !1 !== result && !0 !== fromIsValid && !0 !== validateOnly) {
          var postResult = opts.postValidation(getBuffer(!0), void 0 !== pos.begin ? isRTL ? pos.end : pos.begin : pos, result, opts, maskset, strict);
          void 0 !== postResult && (result = !0 === postResult ? result : postResult)
        }
        result && void 0 === result.pos && (result.pos = maskPos), !1 === result || !0 === validateOnly ? (resetMaskSet(!0), maskset.validPositions = $.extend(!0, {}, positionsClone)) : trackbackPositions(void 0, maskPos, !0);
        var endResult = processCommandObject(result);
        return endResult
      }

      function trackbackPositions(originalPos, newPos, fillOnly) {
        if (void 0 === originalPos)
          for (originalPos = newPos - 1; 0 < originalPos && !maskset.validPositions[originalPos]; originalPos--);
        for (var ps = originalPos; ps < newPos; ps++)
          if (void 0 === maskset.validPositions[ps] && !isMask(ps, !0)) {
            var vp = 0 == ps ? getTest(ps) : maskset.validPositions[ps - 1];
            if (vp) {
              var tests = getTests(ps).slice();
              "" === tests[tests.length - 1].match.def && tests.pop();
              var bestMatch = determineTestTemplate(ps, tests),
                np;
              if (bestMatch && (!0 !== bestMatch.match.jit || "master" === bestMatch.match.newBlockMarker && (np = maskset.validPositions[ps + 1]) && !0 === np.match.optionalQuantifier) && (bestMatch = $.extend({}, bestMatch, {
                  input: getPlaceholder(ps, bestMatch.match, !0) || bestMatch.match.def
                }), bestMatch.generatedInput = !0, revalidateMask(ps, bestMatch, !0), !0 !== fillOnly)) {
                var cvpInput = maskset.validPositions[newPos].input;
                return maskset.validPositions[newPos] = void 0, isValid(newPos, cvpInput, !0, !0)
              }
            }
          }
      }

      function revalidateMask(pos, validTest, fromIsValid, validatedPos) {
        function IsEnclosedStatic(pos, valids, selection) {
          var posMatch = valids[pos];
          if (void 0 === posMatch || !0 !== posMatch.match.static || !0 === posMatch.match.optionality || void 0 !== valids[0] && void 0 !== valids[0].alternation) return !1;
          var prevMatch = selection.begin <= pos - 1 ? valids[pos - 1] && !0 === valids[pos - 1].match.static && valids[pos - 1] : valids[pos - 1],
            nextMatch = selection.end > pos + 1 ? valids[pos + 1] && !0 === valids[pos + 1].match.static && valids[pos + 1] : valids[pos + 1];
          return prevMatch && nextMatch
        }
        var offset = 0,
          begin = void 0 !== pos.begin ? pos.begin : pos,
          end = void 0 !== pos.end ? pos.end : pos;
        if (pos.begin > pos.end && (begin = pos.end, end = pos.begin), void 0 === validTest && !1 === opts.insertMode && opts.insertModeVisual && end < maskset.maskLength && (0 === begin && 0 === end || (begin += 1, end += 1)), validatedPos = void 0 !== validatedPos ? validatedPos : begin, begin !== end || opts.insertMode && void 0 !== maskset.validPositions[validatedPos] && void 0 === fromIsValid || void 0 === validTest) {
          var positionsClone = $.extend(!0, {}, maskset.validPositions),
            lvp = void 0 === validTest && !1 === opts.insertMode && opts.insertModeVisual ? 1 < end ? end - 1 : end : getLastValidPosition(void 0, !0),
            i;
          for (maskset.p = begin, i = lvp; begin <= i; i--) delete maskset.validPositions[i], void 0 === validTest && delete maskset.tests[i + 1];
          var valid = !0,
            j = validatedPos,
            posMatch = j,
            t;
          if (i = j, validTest && (maskset.validPositions[validatedPos] = $.extend(!0, {}, validTest), posMatch++, j++, begin < end && i++), validTest || opts.insertMode)
            for (; i <= lvp; i++) {
              if (void 0 !== (t = positionsClone[i]) && !0 !== t.generatedInput && (end <= i || begin <= i && IsEnclosedStatic(i, positionsClone, {
                  begin: begin,
                  end: end
                }))) {
                for (;
                  "" !== getTest(posMatch).match.def;) {
                  if (positionCanMatchDefinition(posMatch, t, opts) || "+" === t.match.def) {
                    "+" === t.match.def && getBuffer(!0);
                    var result = isValid(posMatch, t.input, "+" !== t.match.def, "+" !== t.match.def);
                    if (valid = !1 !== result, j = (result.pos || posMatch) + 1, !valid) break
                  } else valid = !1;
                  if (valid) {
                    void 0 === validTest && t.match.static && i === pos.begin && offset++;
                    break
                  }
                  if (!valid && posMatch > maskset.maskLength) break;
                  posMatch++
                }
                "" == getTest(posMatch).match.def && (valid = !1), posMatch = j
              }
              if (!valid) break
            }
          if (!valid) return maskset.validPositions = $.extend(!0, {}, positionsClone), resetMaskSet(!0), !1
        } else validTest && (maskset.validPositions[validatedPos] = $.extend(!0, {}, validTest));
        return resetMaskSet(!0), offset
      }

      function isMask(pos, strict, fuzzy) {
        var test = getTestTemplate(pos).match;
        if ("" === test.def && (test = getTest(pos).match), !0 !== test.static) return test.fn;
        if (!0 === fuzzy && void 0 !== maskset.validPositions[pos] && !0 !== maskset.validPositions[pos].generatedInput) return !0;
        if (!0 !== strict && -1 < pos) {
          var tests = getTests(pos);
          return tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0)
        }
        return !1
      }

      function seekNext(pos, newBlock, fuzzy) {
        void 0 === fuzzy && (fuzzy = !0);
        for (var position = pos + 1;
          "" !== getTest(position).match.def && (!0 === newBlock && (!0 !== getTest(position).match.newBlockMarker || !isMask(position, void 0, !0)) || !0 !== newBlock && !isMask(position, void 0, fuzzy));) position++;
        return position
      }

      function seekPrevious(pos, newBlock) {
        var position = pos,
          tests;
        if (position <= 0) return 0;
        for (; 0 < --position && (!0 === newBlock && !0 !== getTest(position).match.newBlockMarker || !0 !== newBlock && !isMask(position, void 0, !0) && (tests = getTests(position), tests.length < 2 || 2 === tests.length && "" === tests[1].match.def)););
        return position
      }

      function writeBuffer(input, buffer, caretPos, event, triggerEvents) {
        if (event && $.isFunction(opts.onBeforeWrite)) {
          var result = opts.onBeforeWrite.call(inputmask, event, buffer, caretPos, opts);
          if (result) {
            if (result.refreshFromBuffer) {
              var refresh = result.refreshFromBuffer;
              refreshFromBuffer(!0 === refresh ? refresh : refresh.start, refresh.end, result.buffer || buffer), buffer = getBuffer(!0)
            }
            void 0 !== caretPos && (caretPos = void 0 !== result.caret ? result.caret : caretPos)
          }
        }
        if (void 0 !== input && (input.inputmask._valueSet(buffer.join("")), void 0 === caretPos || void 0 !== event && "blur" === event.type || caret(input, caretPos), !0 === triggerEvents)) {
          var $input = $(input),
            nptVal = input.inputmask._valueGet();
          skipInputEvent = !0, $input.trigger("input"), setTimeout(function () {
            nptVal === getBufferTemplate().join("") ? $input.trigger("cleared") : !0 === isComplete(buffer) && $input.trigger("complete")
          }, 0)
        }
      }

      function getPlaceholder(pos, test, returnPL) {
        if (test = test || getTest(pos).match, void 0 !== test.placeholder || !0 === returnPL) return $.isFunction(test.placeholder) ? test.placeholder(opts) : test.placeholder;
        if (!0 !== test.static) return opts.placeholder.charAt(pos % opts.placeholder.length);
        if (-1 < pos && void 0 === maskset.validPositions[pos]) {
          var tests = getTests(pos),
            staticAlternations = [],
            prevTest;
          if (tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0))
            for (var i = 0; i < tests.length; i++)
              if (!0 !== tests[i].match.optionality && !0 !== tests[i].match.optionalQuantifier && (!0 === tests[i].match.static || void 0 === prevTest || !1 !== tests[i].match.fn.test(prevTest.match.def, maskset, pos, !0, opts)) && (staticAlternations.push(tests[i]), !0 === tests[i].match.static && (prevTest = tests[i]), 1 < staticAlternations.length && /[0-9a-bA-Z]/.test(staticAlternations[0].match.def))) return opts.placeholder.charAt(pos % opts.placeholder.length)
        }
        return test.def
      }

      function HandleNativePlaceholder(npt, value) {
        if (ie) {
          if (npt.inputmask._valueGet() !== value && (npt.placeholder !== value || "" === npt.placeholder)) {
            var buffer = getBuffer().slice(),
              nptValue = npt.inputmask._valueGet();
            if (nptValue !== value) {
              var lvp = getLastValidPosition(); - 1 === lvp && nptValue === getBufferTemplate().join("") ? buffer = [] : -1 !== lvp && clearOptionalTail(buffer), writeBuffer(npt, buffer)
            }
          }
        } else npt.placeholder !== value && (npt.placeholder = value, "" === npt.placeholder && npt.removeAttribute("placeholder"))
      }

      function determineNewCaretPosition(selectedCaret, tabbed) {
        function doRadixFocus(clickPos) {
          if ("" !== opts.radixPoint && 0 !== opts.digits) {
            var vps = maskset.validPositions;
            if (void 0 === vps[clickPos] || vps[clickPos].input === getPlaceholder(clickPos)) {
              if (clickPos < seekNext(-1)) return !0;
              var radixPos = $.inArray(opts.radixPoint, getBuffer());
              if (-1 !== radixPos) {
                for (var vp in vps)
                  if (vps[vp] && radixPos < vp && vps[vp].input !== getPlaceholder(vp)) return !1;
                return !0
              }
            }
          }
          return !1
        }
        if (tabbed && (isRTL ? selectedCaret.end = selectedCaret.begin : selectedCaret.begin = selectedCaret.end), selectedCaret.begin === selectedCaret.end) switch (opts.positionCaretOnClick) {
          case "none":
            break;
          case "select":
            return {
              begin: 0, end: getBuffer().length
            };
          case "ignore":
            return seekNext(getLastValidPosition());
          case "radixFocus":
            if (doRadixFocus(selectedCaret.begin)) {
              var radixPos = getBuffer().join("").indexOf(opts.radixPoint);
              return opts.numericInput ? seekNext(radixPos) : radixPos
            }
            default:
              var clickPosition = selectedCaret.begin,
                lvclickPosition = getLastValidPosition(clickPosition, !0),
                lastPosition = seekNext(-1 !== lvclickPosition || isMask(0) ? lvclickPosition : 0);
              if (clickPosition < lastPosition) return isMask(clickPosition, !0) || isMask(clickPosition - 1, !0) ? clickPosition : seekNext(clickPosition);
              var lvp = maskset.validPositions[lvclickPosition],
                tt = getTestTemplate(lastPosition, lvp ? lvp.match.locator : void 0, lvp),
                placeholder = getPlaceholder(lastPosition, tt.match);
              if ("" !== placeholder && getBuffer()[lastPosition] !== placeholder && !0 !== tt.match.optionalQuantifier && !0 !== tt.match.newBlockMarker || !isMask(lastPosition, opts.keepStatic) && tt.match.def === placeholder) {
                var newPos = seekNext(lastPosition);
                (newPos <= clickPosition || clickPosition === lastPosition) && (lastPosition = newPos)
              }
              return lastPosition
        }
      }
      var EventRuler = {
          on: function on(input, eventName, eventHandler) {
            var ev = function ev(e) {
              e.originalEvent && (e = e.originalEvent || e, arguments[0] = e);
              var that = this,
                args;
              if (void 0 === that.inputmask && "FORM" !== this.nodeName) {
                var imOpts = $.data(that, "_inputmask_opts");
                imOpts ? new Inputmask(imOpts).mask(that) : EventRuler.off(that)
              } else {
                if ("setvalue" === e.type || "FORM" === this.nodeName || !(that.disabled || that.readOnly && !("keydown" === e.type && e.ctrlKey && 67 === e.keyCode || !1 === opts.tabThrough && e.keyCode === keyCode.TAB))) {
                  switch (e.type) {
                    case "input":
                      if (!0 === skipInputEvent || e.inputType && "insertCompositionText" === e.inputType) return skipInputEvent = !1, e.preventDefault();
                      if (mobile) return args = arguments, setTimeout(function () {
                        eventHandler.apply(that, args), caret(that, that.inputmask.caretPos, void 0, !0)
                      }, 0), !1;
                      break;
                    case "keydown":
                      skipKeyPressEvent = !1, skipInputEvent = !1;
                      break;
                    case "keypress":
                      if (!0 === skipKeyPressEvent) return e.preventDefault();
                      skipKeyPressEvent = !0;
                      break;
                    case "click":
                    case "focus":
                      return validationEvent ? (validationEvent = !1, input.blur(), HandleNativePlaceholder(input, (isRTL ? getBufferTemplate().slice().reverse() : getBufferTemplate()).join("")), setTimeout(function () {
                        input.focus()
                      }, 3e3)) : (args = arguments, setTimeout(function () {
                        eventHandler.apply(that, args)
                      }, 0)), !1
                  }
                  var returnVal = eventHandler.apply(that, arguments);
                  return !1 === returnVal && (e.preventDefault(), e.stopPropagation()), returnVal
                }
                e.preventDefault()
              }
            };
            input.inputmask.events[eventName] = input.inputmask.events[eventName] || [], input.inputmask.events[eventName].push(ev), -1 !== $.inArray(eventName, ["submit", "reset"]) ? null !== input.form && $(input.form).on(eventName, ev) : $(input).on(eventName, ev)
          },
          off: function off(input, event) {
            var events;
            input.inputmask && input.inputmask.events && (event ? (events = [], events[event] = input.inputmask.events[event]) : events = input.inputmask.events, $.each(events, function (eventName, evArr) {
              for (; 0 < evArr.length;) {
                var ev = evArr.pop(); - 1 !== $.inArray(eventName, ["submit", "reset"]) ? null !== input.form && $(input.form).off(eventName, ev) : $(input).off(eventName, ev)
              }
              delete input.inputmask.events[eventName]
            }))
          }
        },
        EventHandlers = {
          keydownEvent: function keydownEvent(e) {
            var input = this,
              $input = $(input),
              k = e.keyCode,
              pos = caret(input),
              kdResult = opts.onKeyDown.call(this, e, getBuffer(), pos, opts);
            if (void 0 !== kdResult) return kdResult;
            if (k === keyCode.BACKSPACE || k === keyCode.DELETE || iphone && k === keyCode.BACKSPACE_SAFARI || e.ctrlKey && k === keyCode.X && !("oncut" in input)) e.preventDefault(), handleRemove(input, k, pos), writeBuffer(input, getBuffer(!0), maskset.p, e, input.inputmask._valueGet() !== getBuffer().join(""));
            else if (k === keyCode.END || k === keyCode.PAGE_DOWN) {
              e.preventDefault();
              var caretPos = seekNext(getLastValidPosition());
              caret(input, e.shiftKey ? pos.begin : caretPos, caretPos, !0)
            } else k === keyCode.HOME && !e.shiftKey || k === keyCode.PAGE_UP ? (e.preventDefault(), caret(input, 0, e.shiftKey ? pos.begin : 0, !0)) : (opts.undoOnEscape && k === keyCode.ESCAPE || 90 === k && e.ctrlKey) && !0 !== e.altKey ? (checkVal(input, !0, !1, undoValue.split("")), $input.trigger("click")) : !0 === opts.tabThrough && k === keyCode.TAB ? (!0 === e.shiftKey ? (!0 === getTest(pos.begin).match.static && (pos.begin = seekNext(pos.begin)), pos.end = seekPrevious(pos.begin, !0), pos.begin = seekPrevious(pos.end, !0)) : (pos.begin = seekNext(pos.begin, !0), pos.end = seekNext(pos.begin, !0), pos.end < maskset.maskLength && pos.end--), pos.begin < maskset.maskLength && (e.preventDefault(), caret(input, pos.begin, pos.end))) : e.shiftKey || opts.insertModeVisual && !1 === opts.insertMode && (k === keyCode.RIGHT ? setTimeout(function () {
              var caretPos = caret(input);
              caret(input, caretPos.begin)
            }, 0) : k === keyCode.LEFT && setTimeout(function () {
              var caretPos_begin = translatePosition(input.inputmask.caretPos.begin),
                caretPos_end = translatePosition(input.inputmask.caretPos.end);
              caret(input, isRTL ? caretPos_begin + (caretPos_begin === maskset.maskLength ? 0 : 1) : caretPos_begin - (0 === caretPos_begin ? 0 : 1))
            }, 0));
            ignorable = -1 !== $.inArray(k, opts.ignorables)
          },
          keypressEvent: function keypressEvent(e, checkval, writeOut, strict, ndx) {
            var input = this,
              $input = $(input),
              k = e.which || e.charCode || e.keyCode;
            if (!(!0 === checkval || e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || ignorable)) return k === keyCode.ENTER && undoValue !== getBuffer().join("") && (undoValue = getBuffer().join(""), setTimeout(function () {
              $input.trigger("change")
            }, 0)), skipInputEvent = !0, !0;
            if (k) {
              44 !== k && 46 !== k || 3 !== e.location || "" === opts.radixPoint || (k = opts.radixPoint.charCodeAt(0));
              var pos = checkval ? {
                  begin: ndx,
                  end: ndx
                } : caret(input),
                forwardPosition, c = String.fromCharCode(k);
              maskset.writeOutBuffer = !0;
              var valResult = isValid(pos, c, strict);
              if (!1 !== valResult && (resetMaskSet(!0), forwardPosition = void 0 !== valResult.caret ? valResult.caret : seekNext(valResult.pos.begin ? valResult.pos.begin : valResult.pos), maskset.p = forwardPosition), forwardPosition = opts.numericInput && void 0 === valResult.caret ? seekPrevious(forwardPosition) : forwardPosition, !1 !== writeOut && (setTimeout(function () {
                  opts.onKeyValidation.call(input, k, valResult, opts)
                }, 0), maskset.writeOutBuffer && !1 !== valResult)) {
                var buffer = getBuffer();
                writeBuffer(input, buffer, forwardPosition, e, !0 !== checkval)
              }
              if (e.preventDefault(), checkval) return !1 !== valResult && (valResult.forwardPosition = forwardPosition), valResult
            }
          },
          pasteEvent: function pasteEvent(e) {
            var input = this,
              inputValue = this.inputmask._valueGet(!0),
              caretPos = caret(this),
              tempValue;
            isRTL && (tempValue = caretPos.end, caretPos.end = caretPos.begin, caretPos.begin = tempValue);
            var valueBeforeCaret = inputValue.substr(0, caretPos.begin),
              valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);
            if (valueBeforeCaret == (isRTL ? getBufferTemplate().slice().reverse() : getBufferTemplate()).slice(0, caretPos.begin).join("") && (valueBeforeCaret = ""), valueAfterCaret == (isRTL ? getBufferTemplate().slice().reverse() : getBufferTemplate()).slice(caretPos.end).join("") && (valueAfterCaret = ""), window.clipboardData && window.clipboardData.getData) inputValue = valueBeforeCaret + window.clipboardData.getData("Text") + valueAfterCaret;
            else {
              if (!e.clipboardData || !e.clipboardData.getData) return !0;
              inputValue = valueBeforeCaret + e.clipboardData.getData("text/plain") + valueAfterCaret
            }
            var pasteValue = inputValue;
            if ($.isFunction(opts.onBeforePaste)) {
              if (pasteValue = opts.onBeforePaste.call(inputmask, inputValue, opts), !1 === pasteValue) return e.preventDefault();
              pasteValue = pasteValue || inputValue
            }
            return checkVal(this, !1, !1, pasteValue.toString().split("")), writeBuffer(this, getBuffer(), seekNext(getLastValidPosition()), e, undoValue !== getBuffer().join("")), e.preventDefault()
          },
          inputFallBackEvent: function inputFallBackEvent(e) {
            function ieMobileHandler(input, inputValue, caretPos) {
              if (iemobile) {
                var inputChar = inputValue.replace(getBuffer().join(""), "");
                if (1 === inputChar.length) {
                  var iv = inputValue.split("");
                  iv.splice(caretPos.begin, 0, inputChar), inputValue = iv.join("")
                }
              }
              return inputValue
            }

            function analyseChanges(inputValue, buffer, caretPos) {
              for (var frontPart = inputValue.substr(0, caretPos.begin).split(""), backPart = inputValue.substr(caretPos.begin).split(""), frontBufferPart = buffer.substr(0, caretPos.begin).split(""), backBufferPart = buffer.substr(caretPos.begin).split(""), fpl = frontPart.length >= frontBufferPart.length ? frontPart.length : frontBufferPart.length, bpl = backPart.length >= backBufferPart.length ? backPart.length : backBufferPart.length, bl, i, action = "", data = [], marker = "~", placeholder; frontPart.length < fpl;) frontPart.push("~");
              for (; frontBufferPart.length < fpl;) frontBufferPart.push("~");
              for (; backPart.length < bpl;) backPart.unshift("~");
              for (; backBufferPart.length < bpl;) backBufferPart.unshift("~");
              var newBuffer = frontPart.concat(backPart),
                oldBuffer = frontBufferPart.concat(backBufferPart);
              for (i = 0, bl = newBuffer.length; i < bl; i++) switch (placeholder = getPlaceholder(translatePosition(i)), action) {
                case "insertText":
                  oldBuffer[i - 1] === newBuffer[i] && void 0 === maskset.validPositions[0] && data.push(newBuffer[i]), i = bl;
                  break;
                case "insertReplacementText":
                  "~" === newBuffer[i] ? caretPos.end++ : i = bl;
                  break;
                case "deleteContentBackward":
                  "~" === newBuffer[i] ? caretPos.end++ : i = bl;
                  break;
                default:
                  newBuffer[i] !== oldBuffer[i] && ("~" !== newBuffer[i + 1] && newBuffer[i + 1] !== placeholder && void 0 !== newBuffer[i + 1] || (oldBuffer[i] !== placeholder || "~" !== oldBuffer[i + 1]) && "~" !== oldBuffer[i] ? "~" === oldBuffer[i + 1] && oldBuffer[i] === newBuffer[i + 1] ? (action = "insertText", data.push(newBuffer[i]), caretPos.begin--, caretPos.end--) : newBuffer[i] !== placeholder && "~" !== newBuffer[i] && ("~" === newBuffer[i + 1] || oldBuffer[i] !== newBuffer[i] && oldBuffer[i + 1] === newBuffer[i + 1]) ? (action = "insertReplacementText", data.push(newBuffer[i]), caretPos.begin--) : "~" === newBuffer[i] ? (action = "deleteContentBackward", isMask(translatePosition(i), !0) && caretPos.end++) : i = bl : (action = "insertText", data.push(newBuffer[i]), caretPos.begin--, caretPos.end--));
                  break
              }
              return {
                action: action,
                data: data,
                caret: caretPos
              }
            }
            var input = this,
              inputValue = input.inputmask._valueGet(!0),
              buffer = (isRTL ? getBuffer().slice().reverse() : getBuffer()).join(""),
              caretPos = caret(input, void 0, void 0, !0);
            if (buffer !== inputValue) {
              inputValue = ieMobileHandler(input, inputValue, caretPos);
              var changes = analyseChanges(inputValue, buffer, caretPos);
              switch (document.activeElement !== input && input.focus(), writeBuffer(input, getBuffer()), caret(input, caretPos.begin, caretPos.end, !0), changes.action) {
                case "insertText":
                case "insertReplacementText":
                  $.each(changes.data, function (ndx, entry) {
                    var keypress = new $.Event("keypress");
                    keypress.which = entry.charCodeAt(0), ignorable = !1, EventHandlers.keypressEvent.call(input, keypress)
                  }), setTimeout(function () {
                    $el.trigger("keyup")
                  }, 0);
                  break;
                case "deleteContentBackward":
                  var keydown = new $.Event("keydown");
                  keydown.keyCode = keyCode.BACKSPACE, EventHandlers.keydownEvent.call(input, keydown);
                  break;
                default:
                  applyInputValue(input, inputValue);
                  break
              }
              e.preventDefault()
            }
          },
          compositionendEvent: function compositionendEvent(e) {
            $el.trigger("input")
          },
          setValueEvent: function setValueEvent(e, argument_1, argument_2) {
            var input = this,
              value = e && e.detail ? e.detail[0] : argument_1;
            void 0 === value && (value = this.inputmask._valueGet(!0)), applyInputValue(this, value), (e.detail && void 0 !== e.detail[1] || void 0 !== argument_2) && caret(this, e.detail ? e.detail[1] : argument_2)
          },
          focusEvent: function focusEvent(e) {
            var input = this,
              nptValue = this.inputmask._valueGet();
            opts.showMaskOnFocus && nptValue !== getBuffer().join("") && writeBuffer(this, getBuffer(), seekNext(getLastValidPosition())), !0 !== opts.positionCaretOnTab || !1 !== mouseEnter || isComplete(getBuffer()) && -1 !== getLastValidPosition() || EventHandlers.clickEvent.apply(this, [e, !0]), undoValue = getBuffer().join("")
          },
          invalidEvent: function invalidEvent(e) {
            validationEvent = !0
          },
          mouseleaveEvent: function mouseleaveEvent() {
            var input = this;
            mouseEnter = !1, opts.clearMaskOnLostFocus && document.activeElement !== this && HandleNativePlaceholder(this, originalPlaceholder)
          },
          clickEvent: function clickEvent(e, tabbed) {
            var input = this;
            if (document.activeElement === this) {
              var newCaretPosition = determineNewCaretPosition(caret(this), tabbed);
              void 0 !== newCaretPosition && caret(this, newCaretPosition)
            }
          },
          cutEvent: function cutEvent(e) {
            var input = this,
              pos = caret(this),
              clipboardData = window.clipboardData || e.clipboardData,
              clipData = isRTL ? getBuffer().slice(pos.end, pos.begin) : getBuffer().slice(pos.begin, pos.end);
            clipboardData.setData("text", isRTL ? clipData.reverse().join("") : clipData.join("")), document.execCommand && document.execCommand("copy"), handleRemove(this, keyCode.DELETE, pos), writeBuffer(this, getBuffer(), maskset.p, e, undoValue !== getBuffer().join(""))
          },
          blurEvent: function blurEvent(e) {
            var $input = $(this),
              input = this;
            if (this.inputmask) {
              HandleNativePlaceholder(this, originalPlaceholder);
              var nptValue = this.inputmask._valueGet(),
                buffer = getBuffer().slice();
              "" !== nptValue && (opts.clearMaskOnLostFocus && (-1 === getLastValidPosition() && nptValue === getBufferTemplate().join("") ? buffer = [] : clearOptionalTail(buffer)), !1 === isComplete(buffer) && (setTimeout(function () {
                $input.trigger("incomplete")
              }, 0), opts.clearIncomplete && (resetMaskSet(), buffer = opts.clearMaskOnLostFocus ? [] : getBufferTemplate().slice())), writeBuffer(this, buffer, void 0, e)), undoValue !== getBuffer().join("") && (undoValue = getBuffer().join(""), $input.trigger("change"))
            }
          },
          mouseenterEvent: function mouseenterEvent() {
            var input = this;
            mouseEnter = !0, document.activeElement !== this && (null == originalPlaceholder && this.placeholder !== originalPlaceholder && (originalPlaceholder = this.placeholder), opts.showMaskOnHover && HandleNativePlaceholder(this, (isRTL ? getBufferTemplate().slice().reverse() : getBufferTemplate()).join("")))
          },
          submitEvent: function submitEvent() {
            undoValue !== getBuffer().join("") && $el.trigger("change"), opts.clearMaskOnLostFocus && -1 === getLastValidPosition() && el.inputmask._valueGet && el.inputmask._valueGet() === getBufferTemplate().join("") && el.inputmask._valueSet(""), opts.clearIncomplete && !1 === isComplete(getBuffer()) && el.inputmask._valueSet(""), opts.removeMaskOnSubmit && (el.inputmask._valueSet(el.inputmask.unmaskedvalue(), !0), setTimeout(function () {
              writeBuffer(el, getBuffer())
            }, 0))
          },
          resetEvent: function resetEvent() {
            el.inputmask.refreshValue = !0, setTimeout(function () {
              applyInputValue(el, el.inputmask._valueGet(!0))
            }, 0)
          }
        },
        valueBuffer;

      function checkVal(input, writeOut, strict, nptvl, initiatingEvent) {
        var inputmask = this || input.inputmask,
          inputValue = nptvl.slice(),
          charCodes = "",
          initialNdx = -1,
          result = void 0;

        function isTemplateMatch(ndx, charCodes) {
          for (var targetTemplate = getMaskTemplate(!0, 0).slice(ndx, seekNext(ndx)).join("").replace(/'/g, ""), charCodeNdx = targetTemplate.indexOf(charCodes); 0 < charCodeNdx && " " === targetTemplate[charCodeNdx - 1];) charCodeNdx--;
          var match = 0 === charCodeNdx && !isMask(ndx) && (getTest(ndx).match.nativeDef === charCodes.charAt(0) || !0 === getTest(ndx).match.static && getTest(ndx).match.nativeDef === "'" + charCodes.charAt(0) || " " === getTest(ndx).match.nativeDef && (getTest(ndx + 1).match.nativeDef === charCodes.charAt(0) || !0 === getTest(ndx + 1).match.static && getTest(ndx + 1).match.nativeDef === "'" + charCodes.charAt(0)));
          return !match && 0 < charCodeNdx && (inputmask.caretPos = {
            begin: seekNext(charCodeNdx)
          }), match
        }
        resetMaskSet(), maskset.tests = {}, initialNdx = opts.radixPoint ? determineNewCaretPosition(0) : 0, maskset.p = initialNdx, inputmask.caretPos = {
          begin: initialNdx
        };
        var staticMatches = [],
          prevCaretPos = inputmask.caretPos;
        if ($.each(inputValue, function (ndx, charCode) {
            if (void 0 !== charCode)
              if (void 0 === maskset.validPositions[ndx] && inputValue[ndx] === getPlaceholder(ndx) && isMask(ndx, !0) && !1 === isValid(ndx, inputValue[ndx], !0, void 0, void 0, !0)) maskset.p++;
              else {
                var keypress = new $.Event("_checkval");
                keypress.which = charCode.toString().charCodeAt(0), charCodes += charCode;
                var lvp = getLastValidPosition(void 0, !0);
                isTemplateMatch(initialNdx, charCodes) ? result = EventHandlers.keypressEvent.call(input, keypress, !0, !1, strict, lvp + 1) : (result = EventHandlers.keypressEvent.call(input, keypress, !0, !1, strict, inputmask.caretPos.begin), result && (initialNdx = inputmask.caretPos.begin + 1, charCodes = "")), result ? (void 0 !== result.pos && maskset.validPositions[result.pos] && !0 === maskset.validPositions[result.pos].match.static && void 0 === maskset.validPositions[result.pos].alternation && (staticMatches.push(result.pos), isRTL || (result.forwardPosition = result.pos + 1)), writeBuffer(void 0, getBuffer(), result.forwardPosition, keypress, !1), inputmask.caretPos = {
                  begin: result.forwardPosition,
                  end: result.forwardPosition
                }, prevCaretPos = inputmask.caretPos) : inputmask.caretPos = prevCaretPos
              }
          }), 0 < staticMatches.length) {
          var sndx, validPos, nextValid = seekNext(-1, void 0, !1);
          if (!isComplete(getBuffer()) && staticMatches.length <= nextValid || isComplete(getBuffer()) && 0 < staticMatches.length && staticMatches.length !== nextValid && 0 === staticMatches[0])
            for (var nextSndx = nextValid; void 0 !== (sndx = staticMatches.shift());) {
              var keypress = new $.Event("_checkval");
              if (validPos = maskset.validPositions[sndx], validPos.generatedInput = !0, keypress.which = validPos.input.charCodeAt(0), result = EventHandlers.keypressEvent.call(input, keypress, !0, !1, strict, nextSndx), result && void 0 !== result.pos && result.pos !== sndx && maskset.validPositions[result.pos] && !0 === maskset.validPositions[result.pos].match.static) staticMatches.push(result.pos);
              else if (!result) break;
              nextSndx++
            } else
              for (; sndx = staticMatches.pop();) validPos = maskset.validPositions[sndx], validPos && (validPos.generatedInput = !0)
        }
        writeOut && writeBuffer(input, getBuffer(), result ? result.forwardPosition : void 0, initiatingEvent || new $.Event("checkval"), initiatingEvent && "input" === initiatingEvent.type)
      }

      function unmaskedvalue(input) {
        if (input) {
          if (void 0 === input.inputmask) return input.value;
          input.inputmask && input.inputmask.refreshValue && applyInputValue(input, input.inputmask._valueGet(!0))
        }
        var umValue = [],
          vps = maskset.validPositions;
        for (var pndx in vps) vps[pndx] && vps[pndx].match && 1 != vps[pndx].match.static && umValue.push(vps[pndx].input);
        var unmaskedValue = 0 === umValue.length ? "" : (isRTL ? umValue.reverse() : umValue).join("");
        if ($.isFunction(opts.onUnMask)) {
          var bufferValue = (isRTL ? getBuffer().slice().reverse() : getBuffer()).join("");
          unmaskedValue = opts.onUnMask.call(inputmask, bufferValue, unmaskedValue, opts)
        }
        return unmaskedValue
      }

      function translatePosition(pos) {
        return !isRTL || "number" != typeof pos || opts.greedy && "" === opts.placeholder || !el || (pos = el.inputmask._valueGet().length - pos), pos
      }

      function caret(input, begin, end, notranslate) {
        var range;
        if (void 0 === begin) return "selectionStart" in input && "selectionEnd" in input ? (begin = input.selectionStart, end = input.selectionEnd) : window.getSelection ? (range = window.getSelection().getRangeAt(0), range.commonAncestorContainer.parentNode !== input && range.commonAncestorContainer !== input || (begin = range.startOffset, end = range.endOffset)) : document.selection && document.selection.createRange && (range = document.selection.createRange(), begin = 0 - range.duplicate().moveStart("character", -input.inputmask._valueGet().length), end = begin + range.text.length), opts.insertModeVisual && !1 === opts.insertMode && begin === end - 1 && end--, {
          begin: notranslate ? begin : translatePosition(begin),
          end: notranslate ? end : translatePosition(end)
        };
        if ($.isArray(begin) && (end = isRTL ? begin[0] : begin[1], begin = isRTL ? begin[1] : begin[0]), void 0 !== begin.begin && (end = isRTL ? begin.begin : begin.end, begin = isRTL ? begin.end : begin.begin), "number" == typeof begin) {
          begin = notranslate ? begin : translatePosition(begin), end = notranslate ? end : translatePosition(end), end = "number" == typeof end ? end : begin;
          var scrollCalc = parseInt(((input.ownerDocument.defaultView || window).getComputedStyle ? (input.ownerDocument.defaultView || window).getComputedStyle(input, null) : input.currentStyle).fontSize) * end;
          if (input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0, input.inputmask.caretPos = {
              begin: begin,
              end: end
            }, opts.insertModeVisual && !1 === opts.insertMode && begin === end && end++, input === document.activeElement)
            if ("setSelectionRange" in input) input.setSelectionRange(begin, end);
            else if (window.getSelection) {
            if (range = document.createRange(), void 0 === input.firstChild || null === input.firstChild) {
              var textNode = document.createTextNode("");
              input.appendChild(textNode)
            }
            range.setStart(input.firstChild, begin < input.inputmask._valueGet().length ? begin : input.inputmask._valueGet().length), range.setEnd(input.firstChild, end < input.inputmask._valueGet().length ? end : input.inputmask._valueGet().length), range.collapse(!0);
            var sel = window.getSelection();
            sel.removeAllRanges(), sel.addRange(range)
          } else input.createTextRange && (range = input.createTextRange(), range.collapse(!0), range.moveEnd("character", end), range.moveStart("character", begin), range.select())
        }
      }

      function determineLastRequiredPosition(returnDefinition) {
        var buffer = getMaskTemplate(!0, getLastValidPosition(), !0, !0),
          bl = buffer.length,
          pos, lvp = getLastValidPosition(),
          positions = {},
          lvTest = maskset.validPositions[lvp],
          ndxIntlzr = void 0 !== lvTest ? lvTest.locator.slice() : void 0,
          testPos;
        for (pos = lvp + 1; pos < buffer.length; pos++) testPos = getTestTemplate(pos, ndxIntlzr, pos - 1), ndxIntlzr = testPos.locator.slice(), positions[pos] = $.extend(!0, {}, testPos);
        var lvTestAlt = lvTest && void 0 !== lvTest.alternation ? lvTest.locator[lvTest.alternation] : void 0;
        for (pos = bl - 1; lvp < pos && (testPos = positions[pos], (testPos.match.optionality || testPos.match.optionalQuantifier && testPos.match.newBlockMarker || lvTestAlt && (lvTestAlt !== positions[pos].locator[lvTest.alternation] && 1 != testPos.match.static || !0 === testPos.match.static && testPos.locator[lvTest.alternation] && checkAlternationMatch(testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) && "" !== getTests(pos)[0].def)) && buffer[pos] === getPlaceholder(pos, testPos.match)); pos--) bl--;
        return returnDefinition ? {
          l: bl,
          def: positions[bl] ? positions[bl].match : void 0
        } : bl
      }

      function clearOptionalTail(buffer) {
        buffer.length = 0;
        for (var template = getMaskTemplate(!0, 0, !0, void 0, !0), lmnt; void 0 !== (lmnt = template.shift());) buffer.push(lmnt);
        return buffer
      }

      function isComplete(buffer) {
        if ($.isFunction(opts.isComplete)) return opts.isComplete(buffer, opts);
        if ("*" !== opts.repeat) {
          var complete = !1,
            lrp = determineLastRequiredPosition(!0),
            aml = seekPrevious(lrp.l);
          if (void 0 === lrp.def || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
            complete = !0;
            for (var i = 0; i <= aml; i++) {
              var test = getTestTemplate(i).match;
              if (!0 !== test.static && void 0 === maskset.validPositions[i] && !0 !== test.optionality && !0 !== test.optionalQuantifier || !0 === test.static && buffer[i] !== getPlaceholder(i, test)) {
                complete = !1;
                break
              }
            }
          }
          return complete
        }
      }

      function handleRemove(input, k, pos, strict, fromIsValid) {
        if ((opts.numericInput || isRTL) && (k === keyCode.BACKSPACE ? k = keyCode.DELETE : k === keyCode.DELETE && (k = keyCode.BACKSPACE), isRTL)) {
          var pend = pos.end;
          pos.end = pos.begin, pos.begin = pend
        }
        var offset;
        if (k === keyCode.BACKSPACE || k === keyCode.DELETE && !1 === opts.insertMode && opts.insertModeVisual ? pos.end - pos.begin < 1 && (pos.begin = seekPrevious(pos.begin), void 0 !== maskset.validPositions[pos.begin] && maskset.validPositions[pos.begin].input === opts.groupSeparator && pos.begin--) : k === keyCode.DELETE && pos.begin === pos.end && (pos.end = isMask(pos.end, !0, !0) ? pos.end + 1 : seekNext(pos.end) + 1, void 0 !== maskset.validPositions[pos.begin] && maskset.validPositions[pos.begin].input === opts.groupSeparator && pos.end++), !1 !== (offset = revalidateMask(pos))) {
          if (!0 !== strict && !1 !== opts.keepStatic || null !== opts.regex && -1 !== getTest(pos.begin).match.def.indexOf("|")) {
            var result = alternate(!0);
            if (result) {
              var newPos = void 0 !== result.caret ? result.caret : result.pos ? seekNext(result.pos.begin ? result.pos.begin : result.pos) : getLastValidPosition(-1, !0);
              (k !== keyCode.DELETE || pos.begin > newPos) && pos.begin
            }
          }
          var lvp = getLastValidPosition(pos.end, !0);
          lvp < pos.begin ? maskset.p = !1 === opts.insertMode && opts.insertModeVisual ? seekPrevious(lvp + 1) : seekNext(lvp) : !0 !== strict && (maskset.p = k === keyCode.DELETE ? pos.begin + offset : pos.begin, !1 === opts.insertMode && opts.insertModeVisual && k === keyCode.DELETE && (maskset.p = pos.end + 1, void 0 === maskset.validPositions[maskset.p] && getLastValidPosition(maskset.maskLength, !0) < maskset.p && (maskset.p = seekPrevious(lvp + 1))))
        }
      }

      function applyInputValue(input, value) {
        input.inputmask.refreshValue = !1, $.isFunction(opts.onBeforeMask) && (value = opts.onBeforeMask.call(inputmask, value, opts) || value), value = value.toString().split(""), checkVal(input, !0, !1, value), undoValue = getBuffer().join(""), (opts.clearMaskOnLostFocus || opts.clearIncomplete) && input.inputmask._valueGet() === getBufferTemplate().join("") && -1 === getLastValidPosition() && input.inputmask._valueSet("")
      }

      function mask(elem) {
        function isElementTypeSupported(input, opts) {
          function patchValueProperty(npt) {
            var valueGet, valueSet;

            function patchValhook(type) {
              if ($.valHooks && (void 0 === $.valHooks[type] || !0 !== $.valHooks[type].inputmaskpatch)) {
                var valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function (elem) {
                    return elem.value
                  },
                  valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function (elem, value) {
                    return elem.value = value, elem
                  };
                $.valHooks[type] = {
                  get: function get(elem) {
                    if (elem.inputmask) {
                      if (elem.inputmask.opts.autoUnmask) return elem.inputmask.unmaskedvalue();
                      var result = valhookGet(elem);
                      return -1 !== getLastValidPosition(void 0, void 0, elem.inputmask.maskset.validPositions) || !0 !== opts.nullable ? result : ""
                    }
                    return valhookGet(elem)
                  },
                  set: function set(elem, value) {
                    var result = valhookSet(elem, value);
                    return elem.inputmask && applyInputValue(elem, value), result
                  },
                  inputmaskpatch: !0
                }
              }
            }

            function getter() {
              return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : -1 !== getLastValidPosition() || !0 !== opts.nullable ? document.activeElement === this && opts.clearMaskOnLostFocus ? (isRTL ? clearOptionalTail(getBuffer().slice()).reverse() : clearOptionalTail(getBuffer().slice())).join("") : valueGet.call(this) : "" : valueGet.call(this)
            }

            function setter(value) {
              valueSet.call(this, value), this.inputmask && applyInputValue(this, value)
            }

            function installNativeValueSetFallback(npt) {
              EventRuler.on(npt, "mouseenter", function () {
                var input = this,
                  value = this.inputmask._valueGet(!0);
                value !== (isRTL ? getBuffer().reverse() : getBuffer()).join("") && applyInputValue(this, value)
              })
            }
            if (!npt.inputmask.__valueGet) {
              if (!0 !== opts.noValuePatching) {
                if (Object.getOwnPropertyDescriptor) {
                  "function" != typeof Object.getPrototypeOf && (Object.getPrototypeOf = "object" === _typeof("test".__proto__) ? function (object) {
                    return object.__proto__
                  } : function (object) {
                    return object.constructor.prototype
                  });
                  var valueProperty = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(npt), "value") : void 0;
                  valueProperty && valueProperty.get && valueProperty.set ? (valueGet = valueProperty.get, valueSet = valueProperty.set, Object.defineProperty(npt, "value", {
                    get: getter,
                    set: setter,
                    configurable: !0
                  })) : "input" !== npt.tagName.toLowerCase() && (valueGet = function valueGet() {
                    return this.textContent
                  }, valueSet = function valueSet(value) {
                    this.textContent = value
                  }, Object.defineProperty(npt, "value", {
                    get: getter,
                    set: setter,
                    configurable: !0
                  }))
                } else document.__lookupGetter__ && npt.__lookupGetter__("value") && (valueGet = npt.__lookupGetter__("value"), valueSet = npt.__lookupSetter__("value"), npt.__defineGetter__("value", getter), npt.__defineSetter__("value", setter));
                npt.inputmask.__valueGet = valueGet, npt.inputmask.__valueSet = valueSet
              }
              npt.inputmask._valueGet = function (overruleRTL) {
                return isRTL && !0 !== overruleRTL ? valueGet.call(this.el).split("").reverse().join("") : valueGet.call(this.el)
              }, npt.inputmask._valueSet = function (value, overruleRTL) {
                valueSet.call(this.el, null == value ? "" : !0 !== overruleRTL && isRTL ? value.split("").reverse().join("") : value)
              }, void 0 === valueGet && (valueGet = function valueGet() {
                return this.value
              }, valueSet = function valueSet(value) {
                this.value = value
              }, patchValhook(npt.type), installNativeValueSetFallback(npt))
            }
          }
          "textarea" !== input.tagName.toLowerCase() && opts.ignorables.push(keyCode.ENTER);
          var elementType = input.getAttribute("type"),
            isSupported = "input" === input.tagName.toLowerCase() && -1 !== $.inArray(elementType, opts.supportsInputType) || input.isContentEditable || "textarea" === input.tagName.toLowerCase();
          if (!isSupported)
            if ("input" === input.tagName.toLowerCase()) {
              var el = document.createElement("input");
              el.setAttribute("type", elementType), isSupported = "text" === el.type, el = null
            } else isSupported = "partial";
          return !1 !== isSupported ? patchValueProperty(input) : input.inputmask = void 0, isSupported
        }
        EventRuler.off(elem);
        var isSupported = isElementTypeSupported(elem, opts);
        if (!1 !== isSupported && (el = elem, $el = $(el), originalPlaceholder = el.placeholder, maxLength = void 0 !== el ? el.maxLength : void 0, -1 === maxLength && (maxLength = void 0), "inputMode" in el && null === el.getAttribute("inputmode") && (el.inputMode = opts.inputmode, el.setAttribute("inputmode", opts.inputmode)), !0 === isSupported && (opts.showMaskOnFocus = opts.showMaskOnFocus && -1 === ["cc-number", "cc-exp"].indexOf(el.autocomplete), EventRuler.on(el, "submit", EventHandlers.submitEvent), EventRuler.on(el, "reset", EventHandlers.resetEvent), EventRuler.on(el, "blur", EventHandlers.blurEvent), EventRuler.on(el, "focus", EventHandlers.focusEvent), EventRuler.on(el, "invalid", EventHandlers.invalidEvent), EventRuler.on(el, "click", EventHandlers.clickEvent), EventRuler.on(el, "mouseleave", EventHandlers.mouseleaveEvent), EventRuler.on(el, "mouseenter", EventHandlers.mouseenterEvent), EventRuler.on(el, "paste", EventHandlers.pasteEvent), EventRuler.on(el, "cut", EventHandlers.cutEvent), EventRuler.on(el, "complete", opts.oncomplete), EventRuler.on(el, "incomplete", opts.onincomplete), EventRuler.on(el, "cleared", opts.oncleared), mobile || !0 === opts.inputEventOnly ? el.removeAttribute("maxLength") : (EventRuler.on(el, "keydown", EventHandlers.keydownEvent), EventRuler.on(el, "keypress", EventHandlers.keypressEvent)), EventRuler.on(el, "input", EventHandlers.inputFallBackEvent), EventRuler.on(el, "compositionend", EventHandlers.compositionendEvent)), EventRuler.on(el, "setvalue", EventHandlers.setValueEvent), undoValue = getBufferTemplate().join(""), "" !== el.inputmask._valueGet(!0) || !1 === opts.clearMaskOnLostFocus || document.activeElement === el)) {
          applyInputValue(el, el.inputmask._valueGet(!0), opts);
          var buffer = getBuffer().slice();
          !1 === isComplete(buffer) && opts.clearIncomplete && resetMaskSet(), opts.clearMaskOnLostFocus && document.activeElement !== el && (-1 === getLastValidPosition() ? buffer = [] : clearOptionalTail(buffer)), (!1 === opts.clearMaskOnLostFocus || opts.showMaskOnFocus && document.activeElement === el || "" !== el.inputmask._valueGet(!0)) && writeBuffer(el, buffer), document.activeElement === el && caret(el, seekNext(getLastValidPosition()))
        }
      }
      if (void 0 !== actionObj) switch (actionObj.action) {
        case "isComplete":
          return el = actionObj.el, isComplete(getBuffer());
        case "unmaskedvalue":
          return void 0 !== el && void 0 === actionObj.value || (valueBuffer = actionObj.value, valueBuffer = ($.isFunction(opts.onBeforeMask) && opts.onBeforeMask.call(inputmask, valueBuffer, opts) || valueBuffer).split(""), checkVal.call(this, void 0, !1, !1, valueBuffer), $.isFunction(opts.onBeforeWrite) && opts.onBeforeWrite.call(inputmask, void 0, getBuffer(), 0, opts)), unmaskedvalue(el);
        case "mask":
          mask(el);
          break;
        case "format":
          return valueBuffer = ($.isFunction(opts.onBeforeMask) && opts.onBeforeMask.call(inputmask, actionObj.value, opts) || actionObj.value).split(""), checkVal.call(this, void 0, !0, !1, valueBuffer), actionObj.metadata ? {
            value: isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join(""),
            metadata: maskScope.call(this, {
              action: "getmetadata"
            }, maskset, opts)
          } : isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join("");
        case "isValid":
          actionObj.value ? (valueBuffer = ($.isFunction(opts.onBeforeMask) && opts.onBeforeMask.call(inputmask, actionObj.value, opts) || actionObj.value).split(""), checkVal.call(this, void 0, !0, !1, valueBuffer)) : actionObj.value = isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join("");
          for (var buffer = getBuffer(), rl = determineLastRequiredPosition(), lmib = buffer.length - 1; rl < lmib && !isMask(lmib); lmib--);
          return buffer.splice(rl, lmib + 1 - rl), isComplete(buffer) && actionObj.value === (isRTL ? getBuffer().slice().reverse().join("") : getBuffer().join(""));
        case "getemptymask":
          return getBufferTemplate().join("");
        case "remove":
          if (el && el.inputmask) {
            $.data(el, "_inputmask_opts", null), $el = $(el);
            var cv = opts.autoUnmask ? unmaskedvalue(el) : el.inputmask._valueGet(opts.autoUnmask),
              valueProperty;
            cv !== getBufferTemplate().join("") ? el.inputmask._valueSet(cv, opts.autoUnmask) : el.inputmask._valueSet(""), EventRuler.off(el), Object.getOwnPropertyDescriptor && Object.getPrototypeOf ? (valueProperty = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), "value"), valueProperty && el.inputmask.__valueGet && Object.defineProperty(el, "value", {
              get: el.inputmask.__valueGet,
              set: el.inputmask.__valueSet,
              configurable: !0
            })) : document.__lookupGetter__ && el.__lookupGetter__("value") && el.inputmask.__valueGet && (el.__defineGetter__("value", el.inputmask.__valueGet), el.__defineSetter__("value", el.inputmask.__valueSet)), el.inputmask = void 0
          }
          return el;
        case "getmetadata":
          if ($.isArray(maskset.metadata)) {
            var maskTarget = getMaskTemplate(!0, 0, !1).join("");
            return $.each(maskset.metadata, function (ndx, mtdt) {
              if (mtdt.mask === maskTarget) return maskTarget = mtdt, !1
            }), maskTarget
          }
          return maskset.metadata
      }
    }
  }, function (module, exports, __webpack_require__) {
    "use strict";

    function _typeof(obj) {
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function _typeof(obj) {
        return typeof obj
      } : function _typeof(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
      }, _typeof(obj)
    }
    var Inputmask = __webpack_require__(1),
      $ = Inputmask.dependencyLib,
      keyCode = __webpack_require__(0),
      formatCode = {
        d: ["[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", Date.prototype.getDate],
        dd: ["0[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", function () {
          return pad(Date.prototype.getDate.call(this), 2)
        }],
        ddd: [""],
        dddd: [""],
        m: ["[1-9]|1[012]", Date.prototype.setMonth, "month", function () {
          return Date.prototype.getMonth.call(this) + 1
        }],
        mm: ["0[1-9]|1[012]", Date.prototype.setMonth, "month", function () {
          return pad(Date.prototype.getMonth.call(this) + 1, 2)
        }],
        mmm: [""],
        mmmm: [""],
        yy: ["[0-9]{2}", Date.prototype.setFullYear, "year", function () {
          return pad(Date.prototype.getFullYear.call(this), 2)
        }],
        yyyy: ["[0-9]{4}", Date.prototype.setFullYear, "year", function () {
          return pad(Date.prototype.getFullYear.call(this), 4)
        }],
        h: ["[1-9]|1[0-2]", Date.prototype.setHours, "hours", Date.prototype.getHours],
        hh: ["0[1-9]|1[0-2]", Date.prototype.setHours, "hours", function () {
          return pad(Date.prototype.getHours.call(this), 2)
        }],
        hx: [function (x) {
          return "[0-9]{".concat(x, "}")
        }, Date.prototype.setHours, "hours", function (x) {
          return Date.prototype.getHours
        }],
        H: ["1?[0-9]|2[0-3]", Date.prototype.setHours, "hours", Date.prototype.getHours],
        HH: ["0[0-9]|1[0-9]|2[0-3]", Date.prototype.setHours, "hours", function () {
          return pad(Date.prototype.getHours.call(this), 2)
        }],
        Hx: [function (x) {
          return "[0-9]{".concat(x, "}")
        }, Date.prototype.setHours, "hours", function (x) {
          return function () {
            return pad(Date.prototype.getHours.call(this), x)
          }
        }],
        M: ["[1-5]?[0-9]", Date.prototype.setMinutes, "minutes", Date.prototype.getMinutes],
        MM: ["0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setMinutes, "minutes", function () {
          return pad(Date.prototype.getMinutes.call(this), 2)
        }],
        s: ["[1-5]?[0-9]", Date.prototype.setSeconds, "seconds", Date.prototype.getSeconds],
        ss: ["0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setSeconds, "seconds", function () {
          return pad(Date.prototype.getSeconds.call(this), 2)
        }],
        l: ["[0-9]{3}", Date.prototype.setMilliseconds, "milliseconds", function () {
          return pad(Date.prototype.getMilliseconds.call(this), 3)
        }],
        L: ["[0-9]{2}", Date.prototype.setMilliseconds, "milliseconds", function () {
          return pad(Date.prototype.getMilliseconds.call(this), 2)
        }],
        t: ["[ap]"],
        tt: ["[ap]m"],
        T: ["[AP]"],
        TT: ["[AP]M"],
        Z: [""],
        o: [""],
        S: [""]
      },
      formatAlias = {
        isoDate: "yyyy-mm-dd",
        isoTime: "HH:MM:ss",
        isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
        isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
      };

    function formatcode(match) {
      var dynMatches = new RegExp("\\d+$").exec(match[0]);
      if (dynMatches && void 0 !== dynMatches[0]) {
        var fcode = formatCode[match[0][0] + "x"].slice("");
        return fcode[0] = fcode[0](dynMatches[0]), fcode[3] = fcode[3](dynMatches[0]), fcode
      }
      if (formatCode[match[0]]) return formatCode[match[0]]
    }

    function getTokenizer(opts) {
      if (!opts.tokenizer) {
        var tokens = [],
          dyntokens = [];
        for (var ndx in formatCode)
          if (ndx.endsWith("x")) {
            var dynToken = ndx[0] + "\\d+"; - 1 === dyntokens.indexOf(dynToken) && dyntokens.push(dynToken)
          } else -1 === tokens.indexOf(ndx[0]) && tokens.push(ndx[0]);
        opts.tokenizer = "(" + (0 < dyntokens.length ? dyntokens.join("|") + "|" : "") + tokens.join("+|") + ")+?|.", opts.tokenizer = new RegExp(opts.tokenizer, "g")
      }
      return opts.tokenizer
    }

    function isValidDate(dateParts, currentResult) {
      return (!isFinite(dateParts.rawday) || "29" == dateParts.day && !isFinite(dateParts.rawyear) || new Date(dateParts.date.getFullYear(), isFinite(dateParts.rawmonth) ? dateParts.month : dateParts.date.getMonth() + 1, 0).getDate() >= dateParts.day) && currentResult
    }

    function isDateInRange(dateParts, opts) {
      var result = !0;
      if (opts.min) {
        if (dateParts.rawyear) {
          var rawYear = dateParts.rawyear.replace(/[^0-9]/g, ""),
            minYear = opts.min.year.substr(0, rawYear.length);
          result = minYear <= rawYear
        }
        dateParts.year === dateParts.rawyear && opts.min.date.getTime() == opts.min.date.getTime() && (result = opts.min.date.getTime() <= dateParts.date.getTime())
      }
      return result && opts.max && opts.max.date.getTime() == opts.max.date.getTime() && (result = opts.max.date.getTime() >= dateParts.date.getTime()), result
    }

    function parse(format, dateObjValue, opts, raw) {
      var mask = "",
        match, fcode;
      for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(format);)
        if (void 0 === dateObjValue)
          if (fcode = formatcode(match)) mask += "(" + fcode[0] + ")";
          else switch (match[0]) {
            case "[":
              mask += "(";
              break;
            case "]":
              mask += ")?";
              break;
            default:
              mask += Inputmask.escapeRegex(match[0])
          } else if (fcode = formatcode(match))
            if (!0 !== raw && fcode[3]) {
              var getFn = fcode[3];
              mask += getFn.call(dateObjValue.date)
            } else fcode[2] ? mask += dateObjValue["raw" + fcode[2]] : mask += match[0];
      else mask += match[0];
      return mask
    }

    function pad(val, len) {
      for (val = String(val), len = len || 2; val.length < len;) val = "0" + val;
      return val
    }

    function analyseMask(maskString, format, opts) {
      var dateObj = {
          date: new Date(1, 0, 1)
        },
        targetProp, mask = maskString,
        match, dateOperation;

      function extendProperty(value) {
        var correctedValue = value.replace(/[^0-9]/g, "0");
        return correctedValue
      }

      function setValue(dateObj, value, opts) {
        dateObj[targetProp] = extendProperty(value), dateObj["raw" + targetProp] = value, void 0 !== dateOperation && dateOperation.call(dateObj.date, "month" == targetProp ? parseInt(dateObj[targetProp]) - 1 : dateObj[targetProp])
      }
      if ("string" == typeof mask) {
        for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(format);) {
          var value = mask.slice(0, match[0].length);
          formatCode.hasOwnProperty(match[0]) && (targetProp = formatCode[match[0]][2], dateOperation = formatCode[match[0]][1], setValue(dateObj, value, opts)), mask = mask.slice(value.length)
        }
        return dateObj
      }
      if (mask && "object" === _typeof(mask) && mask.hasOwnProperty("date")) return mask
    }
    Inputmask.extendAliases({
      datetime: {
        mask: function mask(opts) {
          return formatCode.S = opts.i18n.ordinalSuffix.join("|"), opts.inputFormat = formatAlias[opts.inputFormat] || opts.inputFormat, opts.displayFormat = formatAlias[opts.displayFormat] || opts.displayFormat || opts.inputFormat, opts.outputFormat = formatAlias[opts.outputFormat] || opts.outputFormat || opts.inputFormat, opts.placeholder = "" !== opts.placeholder ? opts.placeholder : opts.inputFormat.replace(/[[\]]/, ""), opts.regex = parse(opts.inputFormat, void 0, opts), null
        },
        placeholder: "",
        inputFormat: "isoDateTime",
        displayFormat: void 0,
        outputFormat: void 0,
        min: null,
        max: null,
        skipOptionalPartCharacter: "",
        i18n: {
          dayNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
          ordinalSuffix: ["st", "nd", "rd", "th"]
        },
        preValidation: function preValidation(buffer, pos, c, isSelection, opts, maskset, caretPos, strict) {
          if (strict) return !0;
          var calcPos = 0,
            targetMatch, match;
          if (isNaN(c) && buffer[pos] !== c) {
            for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(opts.inputFormat);)
              if (calcPos += match[0].length, pos <= calcPos) {
                targetMatch = match, match = getTokenizer(opts).exec(opts.inputFormat);
                break
              } if (match && match[0] === c && 1 < targetMatch[0].length) return buffer[pos] = buffer[pos - 1], buffer[pos - 1] = "0", {
              fuzzy: !0,
              buffer: buffer,
              refreshFromBuffer: {
                start: pos - 1,
                end: pos + 1
              },
              pos: pos + 1
            }
          }
          return !0
        },
        postValidation: function postValidation(buffer, pos, currentResult, opts, maskset, strict) {
          if (strict) return !0;
          opts.min = analyseMask(opts.min, opts.inputFormat, opts), opts.max = analyseMask(opts.max, opts.inputFormat, opts), currentResult.fuzzy && (buffer = currentResult.buffer, pos = currentResult.pos);
          var calcPos = 0,
            match;
          for (getTokenizer(opts).lastIndex = 0;
            (match = getTokenizer(opts).exec(opts.inputFormat)) && (calcPos += match[0].length, !(pos < calcPos)););
          if (match && match[0] && void 0 !== formatCode[match[0]]) {
            var validator = formatCode[match[0]][0],
              part = buffer.slice(match.index, match.index + match[0].length);
            !1 === new RegExp(validator).test(part.join("")) && 2 === match[0].length && maskset.validPositions[match.index] && maskset.validPositions[match.index + 1] && (maskset.validPositions[match.index + 1].input = "0")
          }
          var result = currentResult,
            dateParts = analyseMask(buffer.join(""), opts.inputFormat, opts);
          return result && dateParts.date.getTime() == dateParts.date.getTime() && (result = isValidDate(dateParts, result), result = result && isDateInRange(dateParts, opts)), pos && result && currentResult.pos !== pos ? {
            buffer: parse(opts.inputFormat, dateParts, opts).split(""),
            refreshFromBuffer: {
              start: pos,
              end: currentResult.pos
            }
          } : result
        },
        onKeyDown: function onKeyDown(e, buffer, caretPos, opts) {
          var input = this;
          if (e.ctrlKey && e.keyCode === keyCode.RIGHT) {
            var today = new Date,
              match, date = "";
            for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(opts.inputFormat);) "d" === match[0].charAt(0) ? date += pad(today.getDate(), match[0].length) : "m" === match[0].charAt(0) ? date += pad(today.getMonth() + 1, match[0].length) : "yyyy" === match[0] ? date += today.getFullYear().toString() : "y" === match[0].charAt(0) && (date += pad(today.getYear(), match[0].length));
            this.inputmask._valueSet(date), $(this).trigger("setvalue")
          }
        },
        onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
          return unmaskedValue ? parse(opts.outputFormat, analyseMask(maskedValue, opts.inputFormat, opts), opts, !0) : unmaskedValue
        },
        casing: function casing(elem, test, pos, validPositions) {
          return 0 == test.nativeDef.indexOf("[ap]") ? elem.toLowerCase() : 0 == test.nativeDef.indexOf("[AP]") ? elem.toUpperCase() : elem
        },
        insertMode: !1,
        shiftPositions: !1,
        keepStatic: !1,
        inputmode: "numeric"
      }
    }), module.exports = Inputmask
  }, function (module, exports, __webpack_require__) {
    "use strict";
    var Inputmask = __webpack_require__(1),
      $ = Inputmask.dependencyLib,
      keyCode = __webpack_require__(0);

    function autoEscape(txt, opts) {
      for (var escapedTxt = "", i = 0; i < txt.length; i++) Inputmask.prototype.definitions[txt.charAt(i)] || opts.definitions[txt.charAt(i)] || opts.optionalmarker.start === txt.charAt(i) || opts.optionalmarker.end === txt.charAt(i) || opts.quantifiermarker.start === txt.charAt(i) || opts.quantifiermarker.end === txt.charAt(i) || opts.groupmarker.start === txt.charAt(i) || opts.groupmarker.end === txt.charAt(i) || opts.alternatormarker === txt.charAt(i) ? escapedTxt += "\\" + txt.charAt(i) : escapedTxt += txt.charAt(i);
      return escapedTxt
    }

    function alignDigits(buffer, digits, opts, force) {
      if (0 < digits && (!opts.digitsOptional || force)) {
        var radixPosition = $.inArray(opts.radixPoint, buffer); - 1 === radixPosition && (buffer.push(opts.radixPoint), radixPosition = buffer.length - 1);
        for (var i = 1; i <= digits; i++) buffer[radixPosition + i] = buffer[radixPosition + i] || "0"
      }
      return buffer
    }

    function findValidator(symbol, maskset) {
      var posNdx = 0;
      if ("+" === symbol) {
        for (posNdx in maskset.validPositions);
        posNdx = parseInt(posNdx)
      }
      for (var tstNdx in maskset.tests)
        if (tstNdx = parseInt(tstNdx), posNdx <= tstNdx)
          for (var ndx = 0, ndxl = maskset.tests[tstNdx].length; ndx < ndxl; ndx++)
            if ((void 0 === maskset.validPositions[tstNdx] || "-" === symbol) && maskset.tests[tstNdx][ndx].match.def === symbol) return tstNdx + (void 0 !== maskset.validPositions[tstNdx] && "-" !== symbol ? 1 : 0);
      return posNdx
    }

    function findValid(symbol, maskset) {
      var ret = -1;
      return $.each(maskset.validPositions, function (ndx, tst) {
        if (tst && tst.match.def === symbol) return ret = parseInt(ndx), !1
      }), ret
    }

    function parseMinMaxOptions(opts) {
      void 0 === opts.parseMinMaxOptions && (null !== opts.min && (opts.min = opts.min.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), "," === opts.radixPoint && (opts.min = opts.min.replace(opts.radixPoint, ".")), opts.min = isFinite(opts.min) ? parseFloat(opts.min) : NaN, isNaN(opts.min) && (opts.min = Number.MIN_VALUE)), null !== opts.max && (opts.max = opts.max.toString().replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), "," === opts.radixPoint && (opts.max = opts.max.replace(opts.radixPoint, ".")), opts.max = isFinite(opts.max) ? parseFloat(opts.max) : NaN, isNaN(opts.max) && (opts.max = Number.MAX_VALUE)), opts.parseMinMaxOptions = "done")
    }

    function genMask(opts) {
      opts.repeat = 0, opts.groupSeparator === opts.radixPoint && opts.digits && "0" !== opts.digits && ("." === opts.radixPoint ? opts.groupSeparator = "," : "," === opts.radixPoint ? opts.groupSeparator = "." : opts.groupSeparator = ""), " " === opts.groupSeparator && (opts.skipOptionalPartCharacter = void 0), 1 < opts.placeholder.length && (opts.placeholder = opts.placeholder.charAt(0)), "radixFocus" === opts.positionCaretOnClick && "" === opts.placeholder && (opts.positionCaretOnClick = "lvp");
      var decimalDef = "0";
      !0 === opts.numericInput && void 0 === opts.__financeInput ? (decimalDef = "1", opts.positionCaretOnClick = "radixFocus" === opts.positionCaretOnClick ? "lvp" : opts.positionCaretOnClick, opts.digitsOptional = !1, isNaN(opts.digits) && (opts.digits = 2), opts._radixDance = !1) : (opts.__financeInput = !1, opts.numericInput = !0);
      var mask = "[+]",
        altMask;
      if (mask += autoEscape(opts.prefix, opts), "" !== opts.groupSeparator ? mask += opts._mask(opts) : mask += "9{+}", void 0 !== opts.digits && 0 !== opts.digits) {
        var dq = opts.digits.toString().split(",");
        isFinite(dq[0]) && dq[1] && isFinite(dq[1]) ? mask += opts.radixPoint + decimalDef + "{" + opts.digits + "}" : (isNaN(opts.digits) || 0 < parseInt(opts.digits)) && (opts.digitsOptional ? (altMask = mask + opts.radixPoint + decimalDef + "{0," + opts.digits + "}", opts.keepStatic = !0) : mask += opts.radixPoint + decimalDef + "{" + opts.digits + "}")
      }
      return mask += autoEscape(opts.suffix, opts), mask += "[-]", altMask && (mask = [altMask + autoEscape(opts.suffix, opts) + "[-]", mask]), opts.greedy = !1, parseMinMaxOptions(opts), mask
    }

    function hanndleRadixDance(pos, c, radixPos, maskset, opts) {
      return opts._radixDance && opts.numericInput && c !== opts.negationSymbol.back && pos <= radixPos && (0 < radixPos || c == opts.radixPoint) && (void 0 === maskset.validPositions[pos - 1] || maskset.validPositions[pos - 1].input !== opts.negationSymbol.back) && (pos -= 1), pos
    }

    function decimalValidator(chrs, maskset, pos, strict, opts) {
      var radixPos = maskset.buffer ? maskset.buffer.indexOf(opts.radixPoint) : -1,
        result = -1 !== radixPos && new RegExp("[0-9\uff11-\uff19]").test(chrs);
      return opts._radixDance && result && null == maskset.validPositions[radixPos] ? {
        insert: {
          pos: radixPos === pos ? radixPos + 1 : radixPos,
          c: opts.radixPoint
        },
        pos: pos
      } : result
    }

    function checkForLeadingZeroes(buffer, opts) {
      try {
        var numberMatches = new RegExp("(^" + ("" !== opts.negationSymbol.front ? Inputmask.escapeRegex(opts.negationSymbol.front) + "?" : "") + Inputmask.escapeRegex(opts.prefix) + ")(.*)(" + Inputmask.escapeRegex(opts.suffix) + ("" != opts.negationSymbol.back ? Inputmask.escapeRegex(opts.negationSymbol.back) + "?" : "") + "$)").exec(buffer.slice().reverse().join("")),
          number = numberMatches ? numberMatches[2] : "",
          leadingzeroes = !1;
        return number && (number = number.split(opts.radixPoint.charAt(0))[0], leadingzeroes = new RegExp("^[0" + opts.groupSeparator + "]*").exec(number)), !(!leadingzeroes || !(1 < leadingzeroes[0].length || 0 < leadingzeroes[0].length && leadingzeroes[0].length < number.length)) && leadingzeroes
      } catch (e) {
        console.log(buffer.slice().reverse().join(""))
      }
    }
    Inputmask.extendAliases({
      numeric: {
        mask: genMask,
        _mask: function _mask(opts) {
          return "(" + opts.groupSeparator + "999){+|1}"
        },
        digits: "*",
        digitsOptional: !0,
        enforceDigitsOnBlur: !1,
        radixPoint: ".",
        positionCaretOnClick: "radixFocus",
        _radixDance: !0,
        groupSeparator: "",
        allowMinus: !0,
        negationSymbol: {
          front: "-",
          back: ""
        },
        prefix: "",
        suffix: "",
        min: null,
        max: null,
        step: 1,
        unmaskAsNumber: !1,
        roundingFN: Math.round,
        inputmode: "numeric",
        shortcuts: {
          k: "000",
          m: "000000"
        },
        placeholder: "0",
        greedy: !1,
        rightAlign: !0,
        insertMode: !0,
        autoUnmask: !1,
        skipOptionalPartCharacter: "",
        definitions: {
          0: {
            validator: decimalValidator
          },
          1: {
            validator: decimalValidator,
            definitionSymbol: "*"
          },
          "+": {
            validator: function validator(chrs, maskset, pos, strict, opts) {
              return opts.allowMinus && ("-" === chrs || chrs === opts.negationSymbol.front)
            }
          },
          "-": {
            validator: function validator(chrs, maskset, pos, strict, opts) {
              return opts.allowMinus && chrs === opts.negationSymbol.back
            }
          }
        },
        preValidation: function preValidation(buffer, pos, c, isSelection, opts, maskset, caretPos, strict) {
          if (!1 !== opts.__financeInput && c === opts.radixPoint) return !1;
          var pattern;
          if (pattern = opts.shortcuts && opts.shortcuts[c]) {
            if (1 < pattern.length)
              for (var inserts = [], i = 0; i < pattern.length; i++) inserts.push({
                pos: pos + i,
                c: pattern[i],
                strict: !1
              });
            return {
              insert: inserts
            }
          }
          var radixPos = $.inArray(opts.radixPoint, buffer),
            initPos = pos;
          if (pos = hanndleRadixDance(pos, c, radixPos, maskset, opts), "-" !== c && c !== opts.negationSymbol.front) return !!strict || (-1 !== radixPos && !0 === opts._radixDance && !1 === isSelection && c === opts.radixPoint && void 0 !== opts.digits && (isNaN(opts.digits) || 0 < parseInt(opts.digits)) && radixPos !== pos ? {
            caret: opts._radixDance && pos === radixPos - 1 ? radixPos + 1 : radixPos
          } : isSelection && opts.digitsOptional ? {
            rewritePosition: caretPos.end
          } : isSelection && !opts.digitsOptional && caretPos.begin > radixPos && caretPos.end <= radixPos ? c === opts.radixPoint ? {
            insert: {
              pos: radixPos + 1,
              c: "0",
              fromIsValid: !0
            },
            rewritePosition: radixPos
          } : {
            rewritePosition: radixPos + 1
          } : isSelection && !opts.digitsOptional && caretPos.begin < radixPos ? {
            rewritePosition: caretPos.begin - 1
          } : {
            rewritePosition: pos
          });
          if (!0 !== opts.allowMinus) return !1;
          var isNegative = !1,
            front = findValid("+", maskset),
            back = findValid("-", maskset);
          return -1 !== front && (isNegative = [front, back]), !1 !== isNegative ? {
            remove: isNegative,
            caret: initPos
          } : {
            insert: [{
              pos: findValidator("+", maskset),
              c: opts.negationSymbol.front,
              fromIsValid: !0
            }, {
              pos: findValidator("-", maskset),
              c: opts.negationSymbol.back,
              fromIsValid: void 0
            }],
            caret: initPos + opts.negationSymbol.back.length
          }
        },
        postValidation: function postValidation(buffer, pos, currentResult, opts, maskset, strict) {
          if (strict) return !0;
          if (null !== opts.min || null !== opts.max) {
            var unmasked = opts.onUnMask(buffer.slice().reverse().join(""), void 0, $.extend({}, opts, {
              unmaskAsNumber: !0
            }));
            if (null !== opts.min && unmasked < opts.min && (unmasked.toString().length >= opts.min.toString().length || unmasked < 0)) return {
              refreshFromBuffer: !0,
              buffer: alignDigits(opts.min.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
            };
            if (null !== opts.max && unmasked > opts.max) return {
              refreshFromBuffer: !0,
              buffer: alignDigits(opts.max.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
            }
          }
          return currentResult
        },
        onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
          if ("" === unmaskedValue && !0 === opts.nullable) return unmaskedValue;
          var processValue = maskedValue.replace(opts.prefix, "");
          return processValue = processValue.replace(opts.suffix, ""), processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator), "g"), ""), "" !== opts.placeholder.charAt(0) && (processValue = processValue.replace(new RegExp(opts.placeholder.charAt(0), "g"), "0")), opts.unmaskAsNumber ? ("" !== opts.radixPoint && -1 !== processValue.indexOf(opts.radixPoint) && (processValue = processValue.replace(Inputmask.escapeRegex.call(this, opts.radixPoint), ".")), processValue = processValue.replace(new RegExp("^" + Inputmask.escapeRegex(opts.negationSymbol.front)), "-"), processValue = processValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), ""), Number(processValue)) : processValue
        },
        isComplete: function isComplete(buffer, opts) {
          var maskedValue = (opts.numericInput ? buffer.slice().reverse() : buffer).join("");
          return maskedValue = maskedValue.replace(new RegExp("^" + Inputmask.escapeRegex(opts.negationSymbol.front)), "-"), maskedValue = maskedValue.replace(new RegExp(Inputmask.escapeRegex(opts.negationSymbol.back) + "$"), ""), maskedValue = maskedValue.replace(opts.prefix, ""), maskedValue = maskedValue.replace(opts.suffix, ""), maskedValue = maskedValue.replace(new RegExp(Inputmask.escapeRegex(opts.groupSeparator) + "([0-9]{3})", "g"), "$1"), "," === opts.radixPoint && (maskedValue = maskedValue.replace(Inputmask.escapeRegex(opts.radixPoint), ".")), isFinite(maskedValue)
        },
        onBeforeMask: function onBeforeMask(initialValue, opts) {
          var radixPoint = opts.radixPoint || ",";
          "number" != typeof initialValue && "number" !== opts.inputType || "" === radixPoint || (initialValue = initialValue.toString().replace(".", radixPoint));
          var valueParts = initialValue.split(radixPoint),
            integerPart = valueParts[0].replace(/[^\-0-9]/g, ""),
            decimalPart = 1 < valueParts.length ? valueParts[1].replace(/[^0-9]/g, "") : "",
            forceDigits = 1 < valueParts.length;
          initialValue = integerPart + ("" !== decimalPart ? radixPoint + decimalPart : decimalPart);
          var digits = 0;
          if ("" !== radixPoint && (digits = decimalPart.length, "" !== decimalPart)) {
            var digitsFactor = Math.pow(10, digits || 1);
            isFinite(opts.digits) && (digits = parseInt(opts.digits), digitsFactor = Math.pow(10, digits)), initialValue = initialValue.replace(Inputmask.escapeRegex(radixPoint), "."), isFinite(initialValue) && (initialValue = (opts.roundingFN(parseFloat(initialValue) * digitsFactor) / digitsFactor).toFixed(digits)), initialValue = initialValue.toString().replace(".", radixPoint)
          }
          if (0 === opts.digits && -1 !== initialValue.indexOf(Inputmask.escapeRegex(radixPoint)) && (initialValue = initialValue.substring(0, initialValue.indexOf(Inputmask.escapeRegex(radixPoint)))), null !== opts.min || null !== opts.max) {
            var numberValue = initialValue.toString().replace(radixPoint, ".");
            null !== opts.min && numberValue < opts.min ? initialValue = opts.min.toString().replace(".", radixPoint) : null !== opts.max && numberValue > opts.max && (initialValue = opts.max.toString().replace(".", radixPoint))
          }
          return alignDigits(initialValue.toString().split(""), digits, opts, forceDigits).join("")
        },
        onBeforeWrite: function onBeforeWrite(e, buffer, caretPos, opts) {
          function stripBuffer(buffer, stripRadix) {
            if (!1 !== opts.__financeInput || stripRadix) {
              var position = $.inArray(opts.radixPoint, buffer); - 1 !== position && buffer.splice(position, 1)
            }
            if ("" !== opts.groupSeparator)
              for (; - 1 !== (position = buffer.indexOf(opts.groupSeparator));) buffer.splice(position, 1);
            return buffer
          }
          var result, leadingzeroes = checkForLeadingZeroes(buffer, opts);
          if (leadingzeroes) {
            var buf = buffer.slice().reverse(),
              caretNdx = buf.join("").indexOf(leadingzeroes[0]);
            buf.splice(caretNdx, leadingzeroes[0].length);
            var newCaretPos = buf.length - caretNdx;
            stripBuffer(buf), result = {
              refreshFromBuffer: !0,
              buffer: buf.reverse(),
              caret: caretPos < newCaretPos ? caretPos : newCaretPos
            }
          }
          if (e) switch (e.type) {
            case "blur":
            case "checkval":
              if (null !== opts.min) {
                var unmasked = opts.onUnMask(buffer.slice().reverse().join(""), void 0, $.extend({}, opts, {
                  unmaskAsNumber: !0
                }));
                if (null !== opts.min && unmasked < opts.min) return {
                  refreshFromBuffer: !0,
                  buffer: alignDigits(opts.min.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
                }
              }
              if (buffer[buffer.length - 1] === opts.negationSymbol.front) {
                var nmbrMtchs = new RegExp("(^" + ("" != opts.negationSymbol.front ? Inputmask.escapeRegex(opts.negationSymbol.front) + "?" : "") + Inputmask.escapeRegex(opts.prefix) + ")(.*)(" + Inputmask.escapeRegex(opts.suffix) + ("" != opts.negationSymbol.back ? Inputmask.escapeRegex(opts.negationSymbol.back) + "?" : "") + "$)").exec(stripBuffer(buffer.slice(), !0).reverse().join("")),
                  number = nmbrMtchs ? nmbrMtchs[2] : "";
                0 == number && (result = {
                  refreshFromBuffer: !0,
                  buffer: [0]
                })
              } else "" !== opts.radixPoint && buffer[0] === opts.radixPoint && (result && result.buffer ? result.buffer.shift() : (buffer.shift(), result = {
                refreshFromBuffer: !0,
                buffer: stripBuffer(buffer)
              }));
              if (opts.enforceDigitsOnBlur) {
                result = result || {};
                var bffr = result && result.buffer || buffer.slice().reverse();
                result.refreshFromBuffer = !0, result.buffer = alignDigits(bffr, opts.digits, opts, !0).reverse()
              }
          }
          return result
        },
        onKeyDown: function onKeyDown(e, buffer, caretPos, opts) {
          var $input = $(this),
            bffr;
          if (e.ctrlKey) switch (e.keyCode) {
            case keyCode.UP:
              return this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) + parseInt(opts.step)), $input.trigger("setvalue"), !1;
            case keyCode.DOWN:
              return this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) - parseInt(opts.step)), $input.trigger("setvalue"), !1
          }
          if (!e.shiftKey && (e.keyCode === keyCode.DELETE || e.keyCode === keyCode.BACKSPACE || e.keyCode === keyCode.BACKSPACE_SAFARI)) {
            if (buffer[e.keyCode === keyCode.DELETE ? caretPos.begin - 1 : caretPos.end] === opts.negationSymbol.front) return bffr = buffer.slice().reverse(), "" !== opts.negationSymbol.front && bffr.shift(), "" !== opts.negationSymbol.back && bffr.pop(), $input.trigger("setvalue", [bffr.join(""), caretPos.begin]), !1;
            if (!0 === opts._radixDance) {
              var radixPos = $.inArray(opts.radixPoint, buffer);
              if (opts.digitsOptional) {
                if (0 === radixPos) return bffr = buffer.slice().reverse(), bffr.pop(), $input.trigger("setvalue", [bffr.join(""), caretPos.begin >= bffr.length ? bffr.length : caretPos.begin]), !1
              } else if (-1 !== radixPos && (caretPos.begin < radixPos || caretPos.end < radixPos || e.keyCode === keyCode.DELETE && caretPos.begin === radixPos)) return caretPos.begin !== caretPos.end || e.keyCode !== keyCode.BACKSPACE && e.keyCode !== keyCode.BACKSPACE_SAFARI || caretPos.begin++, bffr = buffer.slice().reverse(), bffr.splice(bffr.length - caretPos.begin, caretPos.begin - caretPos.end + 1), bffr = alignDigits(bffr, opts.digits, opts).join(""), $input.trigger("setvalue", [bffr, caretPos.begin >= bffr.length ? radixPos + 1 : caretPos.begin]), !1
            }
          }
        }
      },
      currency: {
        prefix: "",
        groupSeparator: ",",
        alias: "numeric",
        digits: 2,
        digitsOptional: !1
      },
      decimal: {
        alias: "numeric"
      },
      integer: {
        alias: "numeric",
        digits: 0
      },
      percentage: {
        alias: "numeric",
        min: 0,
        max: 100,
        suffix: " %",
        digits: 0,
        allowMinus: !1
      },
      indianns: {
        alias: "numeric",
        _mask: function _mask(opts) {
          return "(" + opts.groupSeparator + "99){*|1}(" + opts.groupSeparator + "999){1|1}"
        },
        groupSeparator: ",",
        radixPoint: ".",
        placeholder: "0",
        digits: 2,
        digitsOptional: !1
      }
    }), module.exports = Inputmask
  }], installedModules = {}, __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.d = function (exports, name, getter) {
    __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
      enumerable: !0,
      get: getter
    })
  }, __webpack_require__.r = function (exports) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(exports, "__esModule", {
      value: !0
    })
  }, __webpack_require__.t = function (value, mode) {
    if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
    if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
    var ns = Object.create(null);
    if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
        enumerable: !0,
        value: value
      }), 2 & mode && "string" != typeof value)
      for (var key in value) __webpack_require__.d(ns, key, function (key) {
        return value[key]
      }.bind(null, key));
    return ns
  }, __webpack_require__.n = function (module) {
    var getter = module && module.__esModule ? function getDefault() {
      return module.default
    } : function getModuleExports() {
      return module
    };
    return __webpack_require__.d(getter, "a", getter), getter
  }, __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property)
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 5);

  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) return installedModules[moduleId].exports;
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: !1,
      exports: {}
    };
    return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), module.l = !0, module.exports
  }
  var modules, installedModules
});

/**
 * Swiper 3.4.2
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * 
 * http://www.idangero.us/swiper/
 * 
 * Copyright 2017, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: March 10, 2017
 */
(function () {
    'use strict';
    var $;

    /*===========================
    Swiper
    ===========================*/
    var Swiper = function (container, params) {
        if (!(this instanceof Swiper)) return new Swiper(container, params);
    

        var defaults = {
            direction: 'horizontal',
            touchEventsTarget: 'container',
            initialSlide: 0,
            speed: 300,
            // autoplay
            autoplay: false,
            autoplayDisableOnInteraction: true,
            autoplayStopOnLast: false,
            // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
            iOSEdgeSwipeDetection: false,
            iOSEdgeSwipeThreshold: 20,
            // Free mode
            freeMode: false,
            freeModeMomentum: true,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: true,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: false,
            freeModeMinimumVelocity: 0.02,
            // Autoheight
            autoHeight: false,
            // Set wrapper width
            setWrapperSize: false,
            // Virtual Translate
            virtualTranslate: false,
            // Effects
            effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
            coverflow: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows : true
            },
            flip: {
                slideShadows : true,
                limitRotation: true
            },
            cube: {
                slideShadows: true,
                shadow: true,
                shadowOffset: 20,
                shadowScale: 0.94
            },
            fade: {
                crossFade: false
            },
            // Parallax
            parallax: false,
            // Zoom
            zoom: false,
            zoomMax: 3,
            zoomMin: 1,
            zoomToggle: true,
            // Scrollbar
            scrollbar: null,
            scrollbarHide: true,
            scrollbarDraggable: false,
            scrollbarSnapOnRelease: false,
            // Keyboard Mousewheel
            keyboardControl: false,
            mousewheelControl: false,
            mousewheelReleaseOnEdges: false,
            mousewheelInvert: false,
            mousewheelForceToAxis: false,
            mousewheelSensitivity: 1,
            mousewheelEventsTarged: 'container',
            // Hash Navigation
            hashnav: false,
            hashnavWatchState: false,
            // History
            history: false,
            // Commong Nav State
            replaceState: false,
            // Breakpoints
            breakpoints: undefined,
            // Slides grid
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: 'column',
            slidesPerGroup: 1,
            centeredSlides: false,
            slidesOffsetBefore: 0, // in px
            slidesOffsetAfter: 0, // in px
            // Round length
            roundLengths: false,
            // Touches
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: true,
            shortSwipes: true,
            longSwipes: true,
            longSwipesRatio: 0.5,
            longSwipesMs: 300,
            followFinger: true,
            onlyExternal: false,
            threshold: 0,
            touchMoveStopPropagation: true,
            touchReleaseOnEdges: false,
            // Unique Navigation Elements
            uniqueNavElements: true,
            // Pagination
            pagination: null,
            paginationElement: 'span',
            paginationClickable: false,
            paginationHide: false,
            paginationBulletRender: null,
            paginationProgressRender: null,
            paginationFractionRender: null,
            paginationCustomRender: null,
            paginationType: 'bullets', // 'bullets' or 'progress' or 'fraction' or 'custom'
            // Resistance
            resistance: true,
            resistanceRatio: 0.85,
            // Next/prev buttons
            nextButton: null,
            prevButton: null,
            // Progress
            watchSlidesProgress: false,
            watchSlidesVisibility: false,
            // Cursor
            grabCursor: false,
            // Clicks
            preventClicks: true,
            preventClicksPropagation: true,
            slideToClickedSlide: false,
            // Lazy Loading
            lazyLoading: false,
            lazyLoadingInPrevNext: false,
            lazyLoadingInPrevNextAmount: 1,
            lazyLoadingOnTransitionStart: false,
            // Images
            preloadImages: true,
            updateOnImagesReady: true,
            // loop
            loop: false,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            // Control
            control: undefined,
            controlInverse: false,
            controlBy: 'slide', //or 'container'
            normalizeSlideIndex: true,
            // Swiping/no swiping
            allowSwipeToPrev: true,
            allowSwipeToNext: true,
            swipeHandler: null, //'.swipe-handler',
            noSwiping: true,
            noSwipingClass: 'swiper-no-swiping',
            // Passive Listeners
            passiveListeners: true,
            // NS
            containerModifierClass: 'swiper-container-', // NEW
            slideClass: 'swiper-slide',
            slideActiveClass: 'swiper-slide-active',
            slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
            slideVisibleClass: 'swiper-slide-visible',
            slideDuplicateClass: 'swiper-slide-duplicate',
            slideNextClass: 'swiper-slide-next',
            slideDuplicateNextClass: 'swiper-slide-duplicate-next',
            slidePrevClass: 'swiper-slide-prev',
            slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
            wrapperClass: 'swiper-wrapper',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            buttonDisabledClass: 'swiper-button-disabled',
            paginationCurrentClass: 'swiper-pagination-current',
            paginationTotalClass: 'swiper-pagination-total',
            paginationHiddenClass: 'swiper-pagination-hidden',
            paginationProgressbarClass: 'swiper-pagination-progressbar',
            paginationClickableClass: 'swiper-pagination-clickable', // NEW
            paginationModifierClass: 'swiper-pagination-', // NEW
            lazyLoadingClass: 'swiper-lazy',
            lazyStatusLoadingClass: 'swiper-lazy-loading',
            lazyStatusLoadedClass: 'swiper-lazy-loaded',
            lazyPreloaderClass: 'swiper-lazy-preloader',
            notificationClass: 'swiper-notification',
            preloaderClass: 'preloader',
            zoomContainerClass: 'swiper-zoom-container',
        
            // Observer
            observer: false,
            observeParents: false,
            // Accessibility
            a11y: false,
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
            firstSlideMessage: 'This is the first slide',
            lastSlideMessage: 'This is the last slide',
            paginationBulletMessage: 'Go to slide {{index}}',
            // Callbacks
            runCallbacksOnInit: true
            /*
            Callbacks:
            onInit: function (swiper)
            onDestroy: function (swiper)
            onBeforeResize: function (swiper)
            onAfterResize: function (swiper)
            onClick: function (swiper, e)
            onTap: function (swiper, e)
            onDoubleTap: function (swiper, e)
            onSliderMove: function (swiper, e)
            onSlideChangeStart: function (swiper)
            onSlideChangeEnd: function (swiper)
            onTransitionStart: function (swiper)
            onTransitionEnd: function (swiper)
            onImagesReady: function (swiper)
            onProgress: function (swiper, progress)
            onTouchStart: function (swiper, e)
            onTouchMove: function (swiper, e)
            onTouchMoveOpposite: function (swiper, e)
            onTouchEnd: function (swiper, e)
            onReachBeginning: function (swiper)
            onReachEnd: function (swiper)
            onSetTransition: function (swiper, duration)
            onSetTranslate: function (swiper, translate)
            onAutoplayStart: function (swiper)
            onAutoplayStop: function (swiper),
            onLazyImageLoad: function (swiper, slide, image)
            onLazyImageReady: function (swiper, slide, image)
            onKeyPress: function (swiper, keyCode)
            */
        
        };
        var initialVirtualTranslate = params && params.virtualTranslate;
        
        params = params || {};
        var originalParams = {};
        for (var param in params) {
            if (typeof params[param] === 'object' && params[param] !== null && !(params[param].nodeType || params[param] === window || params[param] === document || (typeof Dom7 !== 'undefined' && params[param] instanceof Dom7) || (typeof jQuery !== 'undefined' && params[param] instanceof jQuery))) {
                originalParams[param] = {};
                for (var deepParam in params[param]) {
                    originalParams[param][deepParam] = params[param][deepParam];
                }
            }
            else {
                originalParams[param] = params[param];
            }
        }
        for (var def in defaults) {
            if (typeof params[def] === 'undefined') {
                params[def] = defaults[def];
            }
            else if (typeof params[def] === 'object') {
                for (var deepDef in defaults[def]) {
                    if (typeof params[def][deepDef] === 'undefined') {
                        params[def][deepDef] = defaults[def][deepDef];
                    }
                }
            }
        }
        
        // Swiper
        var s = this;
        
        // Params
        s.params = params;
        s.originalParams = originalParams;
        
        // Classname
        s.classNames = [];
        /*=========================
          Dom Library and plugins
          ===========================*/
        if (typeof $ !== 'undefined' && typeof Dom7 !== 'undefined'){
            $ = Dom7;
        }
        if (typeof $ === 'undefined') {
            if (typeof Dom7 === 'undefined') {
                $ = window.Dom7 || window.Zepto || window.jQuery;
            }
            else {
                $ = Dom7;
            }
            if (!$) return;
        }
        // Export it to Swiper instance
        s.$ = $;
        
        /*=========================
          Breakpoints
          ===========================*/
        s.currentBreakpoint = undefined;
        s.getActiveBreakpoint = function () {
            //Get breakpoint for window width
            if (!s.params.breakpoints) return false;
            var breakpoint = false;
            var points = [], point;
            for ( point in s.params.breakpoints ) {
                if (s.params.breakpoints.hasOwnProperty(point)) {
                    points.push(point);
                }
            }
            points.sort(function (a, b) {
                return parseInt(a, 10) > parseInt(b, 10);
            });
            for (var i = 0; i < points.length; i++) {
                point = points[i];
                if (point >= window.innerWidth && !breakpoint) {
                    breakpoint = point;
                }
            }
            return breakpoint || 'max';
        };
        s.setBreakpoint = function () {
            //Set breakpoint for window width and update parameters
            var breakpoint = s.getActiveBreakpoint();
            if (breakpoint && s.currentBreakpoint !== breakpoint) {
                var breakPointsParams = breakpoint in s.params.breakpoints ? s.params.breakpoints[breakpoint] : s.originalParams;
                var needsReLoop = s.params.loop && (breakPointsParams.slidesPerView !== s.params.slidesPerView);
                for ( var param in breakPointsParams ) {
                    s.params[param] = breakPointsParams[param];
                }
                s.currentBreakpoint = breakpoint;
                if(needsReLoop && s.destroyLoop) {
                    s.reLoop(true);
                }
            }
        };
        // Set breakpoint on load
        if (s.params.breakpoints) {
            s.setBreakpoint();
        }
        
        /*=========================
          Preparation - Define Container, Wrapper and Pagination
          ===========================*/
        s.container = $(container);
        if (s.container.length === 0) return;
        if (s.container.length > 1) {
            var swipers = [];
            s.container.each(function () {
                var container = this;
                swipers.push(new Swiper(this, params));
            });
            return swipers;
        }
        
        // Save instance in container HTML Element and in data
        s.container[0].swiper = s;
        s.container.data('swiper', s);
        
        s.classNames.push(s.params.containerModifierClass + s.params.direction);
        
        if (s.params.freeMode) {
            s.classNames.push(s.params.containerModifierClass + 'free-mode');
        }
        if (!s.support.flexbox) {
            s.classNames.push(s.params.containerModifierClass + 'no-flexbox');
            s.params.slidesPerColumn = 1;
        }
        if (s.params.autoHeight) {
            s.classNames.push(s.params.containerModifierClass + 'autoheight');
        }
        // Enable slides progress when required
        if (s.params.parallax || s.params.watchSlidesVisibility) {
            s.params.watchSlidesProgress = true;
        }
        // Max resistance when touchReleaseOnEdges
        if (s.params.touchReleaseOnEdges) {
            s.params.resistanceRatio = 0;
        }
        // Coverflow / 3D
        if (['cube', 'coverflow', 'flip'].indexOf(s.params.effect) >= 0) {
            if (s.support.transforms3d) {
                s.params.watchSlidesProgress = true;
                s.classNames.push(s.params.containerModifierClass + '3d');
            }
            else {
                s.params.effect = 'slide';
            }
        }
        if (s.params.effect !== 'slide') {
            s.classNames.push(s.params.containerModifierClass + s.params.effect);
        }
        if (s.params.effect === 'cube') {
            s.params.resistanceRatio = 0;
            s.params.slidesPerView = 1;
            s.params.slidesPerColumn = 1;
            s.params.slidesPerGroup = 1;
            s.params.centeredSlides = false;
            s.params.spaceBetween = 0;
            s.params.virtualTranslate = true;
        }
        if (s.params.effect === 'fade' || s.params.effect === 'flip') {
            s.params.slidesPerView = 1;
            s.params.slidesPerColumn = 1;
            s.params.slidesPerGroup = 1;
            s.params.watchSlidesProgress = true;
            s.params.spaceBetween = 0;
            if (typeof initialVirtualTranslate === 'undefined') {
                s.params.virtualTranslate = true;
            }
        }
        
        // Grab Cursor
        if (s.params.grabCursor && s.support.touch) {
            s.params.grabCursor = false;
        }
        
        // Wrapper
        s.wrapper = s.container.children('.' + s.params.wrapperClass);
        
        // Pagination
        if (s.params.pagination) {
            s.paginationContainer = $(s.params.pagination);
            if (s.params.uniqueNavElements && typeof s.params.pagination === 'string' && s.paginationContainer.length > 1 && s.container.find(s.params.pagination).length === 1) {
                s.paginationContainer = s.container.find(s.params.pagination);
            }
        
            if (s.params.paginationType === 'bullets' && s.params.paginationClickable) {
                s.paginationContainer.addClass(s.params.paginationModifierClass + 'clickable');
            }
            else {
                s.params.paginationClickable = false;
            }
            s.paginationContainer.addClass(s.params.paginationModifierClass + s.params.paginationType);
        }
        // Next/Prev Buttons
        if (s.params.nextButton || s.params.prevButton) {
            if (s.params.nextButton) {
                s.nextButton = $(s.params.nextButton);
                if (s.params.uniqueNavElements && typeof s.params.nextButton === 'string' && s.nextButton.length > 1 && s.container.find(s.params.nextButton).length === 1) {
                    s.nextButton = s.container.find(s.params.nextButton);
                }
            }
            if (s.params.prevButton) {
                s.prevButton = $(s.params.prevButton);
                if (s.params.uniqueNavElements && typeof s.params.prevButton === 'string' && s.prevButton.length > 1 && s.container.find(s.params.prevButton).length === 1) {
                    s.prevButton = s.container.find(s.params.prevButton);
                }
            }
        }
        
        // Is Horizontal
        s.isHorizontal = function () {
            return s.params.direction === 'horizontal';
        };
        // s.isH = isH;
        
        // RTL
        s.rtl = s.isHorizontal() && (s.container[0].dir.toLowerCase() === 'rtl' || s.container.css('direction') === 'rtl');
        if (s.rtl) {
            s.classNames.push(s.params.containerModifierClass + 'rtl');
        }
        
        // Wrong RTL support
        if (s.rtl) {
            s.wrongRTL = s.wrapper.css('display') === '-webkit-box';
        }
        
        // Columns
        if (s.params.slidesPerColumn > 1) {
            s.classNames.push(s.params.containerModifierClass + 'multirow');
        }
        
        // Check for Android
        if (s.device.android) {
            s.classNames.push(s.params.containerModifierClass + 'android');
        }
        
        // Add classes
        s.container.addClass(s.classNames.join(' '));
        
        // Translate
        s.translate = 0;
        
        // Progress
        s.progress = 0;
        
        // Velocity
        s.velocity = 0;
        
        /*=========================
          Locks, unlocks
          ===========================*/
        s.lockSwipeToNext = function () {
            s.params.allowSwipeToNext = false;
            if (s.params.allowSwipeToPrev === false && s.params.grabCursor) {
                s.unsetGrabCursor();
            }
        };
        s.lockSwipeToPrev = function () {
            s.params.allowSwipeToPrev = false;
            if (s.params.allowSwipeToNext === false && s.params.grabCursor) {
                s.unsetGrabCursor();
            }
        };
        s.lockSwipes = function () {
            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = false;
            if (s.params.grabCursor) s.unsetGrabCursor();
        };
        s.unlockSwipeToNext = function () {
            s.params.allowSwipeToNext = true;
            if (s.params.allowSwipeToPrev === true && s.params.grabCursor) {
                s.setGrabCursor();
            }
        };
        s.unlockSwipeToPrev = function () {
            s.params.allowSwipeToPrev = true;
            if (s.params.allowSwipeToNext === true && s.params.grabCursor) {
                s.setGrabCursor();
            }
        };
        s.unlockSwipes = function () {
            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = true;
            if (s.params.grabCursor) s.setGrabCursor();
        };
        
        /*=========================
          Round helper
          ===========================*/
        function round(a) {
            return Math.floor(a);
        }
        /*=========================
          Set grab cursor
          ===========================*/
        s.setGrabCursor = function(moving) {
            s.container[0].style.cursor = 'move';
            s.container[0].style.cursor = moving ? '-webkit-grabbing' : '-webkit-grab';
            s.container[0].style.cursor = moving ? '-moz-grabbin' : '-moz-grab';
            s.container[0].style.cursor = moving ? 'grabbing': 'grab';
        };
        s.unsetGrabCursor = function () {
            s.container[0].style.cursor = '';
        };
        if (s.params.grabCursor) {
            s.setGrabCursor();
        }
        /*=========================
          Update on Images Ready
          ===========================*/
        s.imagesToLoad = [];
        s.imagesLoaded = 0;
        
        s.loadImage = function (imgElement, src, srcset, sizes, checkForComplete, callback) {
            var image;
            function onReady () {
                if (callback) callback();
            }
            if (!imgElement.complete || !checkForComplete) {
                if (src) {
                    image = new window.Image();
                    image.onload = onReady;
                    image.onerror = onReady;
                    if (sizes) {
                        image.sizes = sizes;
                    }
                    if (srcset) {
                        image.srcset = srcset;
                    }
                    if (src) {
                        image.src = src;
                    }
                } else {
                    onReady();
                }
        
            } else {//image already loaded...
                onReady();
            }
        };
        s.preloadImages = function () {
            s.imagesToLoad = s.container.find('img');
            function _onReady() {
                if (typeof s === 'undefined' || s === null || !s) return;
                if (s.imagesLoaded !== undefined) s.imagesLoaded++;
                if (s.imagesLoaded === s.imagesToLoad.length) {
                    if (s.params.updateOnImagesReady) s.update();
                    s.emit('onImagesReady', s);
                }
            }
            for (var i = 0; i < s.imagesToLoad.length; i++) {
                s.loadImage(s.imagesToLoad[i], (s.imagesToLoad[i].currentSrc || s.imagesToLoad[i].getAttribute('src')), (s.imagesToLoad[i].srcset || s.imagesToLoad[i].getAttribute('srcset')), s.imagesToLoad[i].sizes || s.imagesToLoad[i].getAttribute('sizes'), true, _onReady);
            }
        };
        
        /*=========================
          Autoplay
          ===========================*/
        s.autoplayTimeoutId = undefined;
        s.autoplaying = false;
        s.autoplayPaused = false;
        function autoplay() {
            var autoplayDelay = s.params.autoplay;
            var activeSlide = s.slides.eq(s.activeIndex);
            if (activeSlide.attr('data-swiper-autoplay')) {
                autoplayDelay = activeSlide.attr('data-swiper-autoplay') || s.params.autoplay;
            }
            s.autoplayTimeoutId = setTimeout(function () {
                if (s.params.loop) {
                    s.fixLoop();
                    s._slideNext();
                    s.emit('onAutoplay', s);
                }
                else {
                    if (!s.isEnd) {
                        s._slideNext();
                        s.emit('onAutoplay', s);
                    }
                    else {
                        if (!params.autoplayStopOnLast) {
                            s._slideTo(0);
                            s.emit('onAutoplay', s);
                        }
                        else {
                            s.stopAutoplay();
                        }
                    }
                }
            }, autoplayDelay);
        }
        s.startAutoplay = function () {
            if (typeof s.autoplayTimeoutId !== 'undefined') return false;
            if (!s.params.autoplay) return false;
            if (s.autoplaying) return false;
            s.autoplaying = true;
            s.emit('onAutoplayStart', s);
            autoplay();
        };
        s.stopAutoplay = function (internal) {
            if (!s.autoplayTimeoutId) return;
            if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
            s.autoplaying = false;
            s.autoplayTimeoutId = undefined;
            s.emit('onAutoplayStop', s);
        };
        s.pauseAutoplay = function (speed) {
            if (s.autoplayPaused) return;
            if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
            s.autoplayPaused = true;
            if (speed === 0) {
                s.autoplayPaused = false;
                autoplay();
            }
            else {
                s.wrapper.transitionEnd(function () {
                    if (!s) return;
                    s.autoplayPaused = false;
                    if (!s.autoplaying) {
                        s.stopAutoplay();
                    }
                    else {
                        autoplay();
                    }
                });
            }
        };
        /*=========================
          Min/Max Translate
          ===========================*/
        s.minTranslate = function () {
            return (-s.snapGrid[0]);
        };
        s.maxTranslate = function () {
            return (-s.snapGrid[s.snapGrid.length - 1]);
        };
        /*=========================
          Slider/slides sizes
          ===========================*/
        s.updateAutoHeight = function () {
            var activeSlides = [];
            var newHeight = 0;
            var i;
        
            // Find slides currently in view
            if(s.params.slidesPerView !== 'auto' && s.params.slidesPerView > 1) {
                for (i = 0; i < Math.ceil(s.params.slidesPerView); i++) {
                    var index = s.activeIndex + i;
                    if(index > s.slides.length) break;
                    activeSlides.push(s.slides.eq(index)[0]);
                }
            } else {
                activeSlides.push(s.slides.eq(s.activeIndex)[0]);
            }
        
            // Find new height from heighest slide in view
            for (i = 0; i < activeSlides.length; i++) {
                if (typeof activeSlides[i] !== 'undefined') {
                    var height = activeSlides[i].offsetHeight;
                    newHeight = height > newHeight ? height : newHeight;
                }
            }
        
            // Update Height
            if (newHeight) s.wrapper.css('height', newHeight + 'px');
        };
        s.updateContainerSize = function () {
            var width, height;
            if (typeof s.params.width !== 'undefined') {
                width = s.params.width;
            }
            else {
                width = s.container[0].clientWidth;
            }
            if (typeof s.params.height !== 'undefined') {
                height = s.params.height;
            }
            else {
                height = s.container[0].clientHeight;
            }
            if (width === 0 && s.isHorizontal() || height === 0 && !s.isHorizontal()) {
                return;
            }
        
            //Subtract paddings
            width = width - parseInt(s.container.css('padding-left'), 10) - parseInt(s.container.css('padding-right'), 10);
            height = height - parseInt(s.container.css('padding-top'), 10) - parseInt(s.container.css('padding-bottom'), 10);
        
            // Store values
            s.width = width;
            s.height = height;
            s.size = s.isHorizontal() ? s.width : s.height;
        };
        
        s.updateSlidesSize = function () {
            s.slides = s.wrapper.children('.' + s.params.slideClass);
            s.snapGrid = [];
            s.slidesGrid = [];
            s.slidesSizesGrid = [];
        
            var spaceBetween = s.params.spaceBetween,
                slidePosition = -s.params.slidesOffsetBefore,
                i,
                prevSlideSize = 0,
                index = 0;
            if (typeof s.size === 'undefined') return;
            if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
                spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * s.size;
            }
        
            s.virtualSize = -spaceBetween;
            // reset margins
            if (s.rtl) s.slides.css({marginLeft: '', marginTop: ''});
            else s.slides.css({marginRight: '', marginBottom: ''});
        
            var slidesNumberEvenToRows;
            if (s.params.slidesPerColumn > 1) {
                if (Math.floor(s.slides.length / s.params.slidesPerColumn) === s.slides.length / s.params.slidesPerColumn) {
                    slidesNumberEvenToRows = s.slides.length;
                }
                else {
                    slidesNumberEvenToRows = Math.ceil(s.slides.length / s.params.slidesPerColumn) * s.params.slidesPerColumn;
                }
                if (s.params.slidesPerView !== 'auto' && s.params.slidesPerColumnFill === 'row') {
                    slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, s.params.slidesPerView * s.params.slidesPerColumn);
                }
            }
        
            // Calc slides
            var slideSize;
            var slidesPerColumn = s.params.slidesPerColumn;
            var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
            var numFullColumns = slidesPerRow - (s.params.slidesPerColumn * slidesPerRow - s.slides.length);
            for (i = 0; i < s.slides.length; i++) {
                slideSize = 0;
                var slide = s.slides.eq(i);
                if (s.params.slidesPerColumn > 1) {
                    // Set slides order
                    var newSlideOrderIndex;
                    var column, row;
                    if (s.params.slidesPerColumnFill === 'column') {
                        column = Math.floor(i / slidesPerColumn);
                        row = i - column * slidesPerColumn;
                        if (column > numFullColumns || (column === numFullColumns && row === slidesPerColumn-1)) {
                            if (++row >= slidesPerColumn) {
                                row = 0;
                                column++;
                            }
                        }
                        newSlideOrderIndex = column + row * slidesNumberEvenToRows / slidesPerColumn;
                        slide
                            .css({
                                '-webkit-box-ordinal-group': newSlideOrderIndex,
                                '-moz-box-ordinal-group': newSlideOrderIndex,
                                '-ms-flex-order': newSlideOrderIndex,
                                '-webkit-order': newSlideOrderIndex,
                                'order': newSlideOrderIndex
                            });
                    }
                    else {
                        row = Math.floor(i / slidesPerRow);
                        column = i - row * slidesPerRow;
                    }
                    slide
                        .css(
                            'margin-' + (s.isHorizontal() ? 'top' : 'left'),
                            (row !== 0 && s.params.spaceBetween) && (s.params.spaceBetween + 'px')
                        )
                        .attr('data-swiper-column', column)
                        .attr('data-swiper-row', row);
        
                }
                if (slide.css('display') === 'none') continue;
                if (s.params.slidesPerView === 'auto') {
                    slideSize = s.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
                    if (s.params.roundLengths) slideSize = round(slideSize);
                }
                else {
                    slideSize = (s.size - (s.params.slidesPerView - 1) * spaceBetween) / s.params.slidesPerView;
                    if (s.params.roundLengths) slideSize = round(slideSize);
        
                    if (s.isHorizontal()) {
                        s.slides[i].style.width = slideSize + 'px';
                    }
                    else {
                        s.slides[i].style.height = slideSize + 'px';
                    }
                }
                s.slides[i].swiperSlideSize = slideSize;
                s.slidesSizesGrid.push(slideSize);
        
        
                if (s.params.centeredSlides) {
                    slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                    if(prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
                    if (i === 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
                    if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
                    if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
                    s.slidesGrid.push(slidePosition);
                }
                else {
                    if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
                    s.slidesGrid.push(slidePosition);
                    slidePosition = slidePosition + slideSize + spaceBetween;
                }
        
                s.virtualSize += slideSize + spaceBetween;
        
                prevSlideSize = slideSize;
        
                index ++;
            }
            s.virtualSize = Math.max(s.virtualSize, s.size) + s.params.slidesOffsetAfter;
            var newSlidesGrid;
        
            if (
                s.rtl && s.wrongRTL && (s.params.effect === 'slide' || s.params.effect === 'coverflow')) {
                s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
            }
            if (!s.support.flexbox || s.params.setWrapperSize) {
                if (s.isHorizontal()) s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
                else s.wrapper.css({height: s.virtualSize + s.params.spaceBetween + 'px'});
            }
        
            if (s.params.slidesPerColumn > 1) {
                s.virtualSize = (slideSize + s.params.spaceBetween) * slidesNumberEvenToRows;
                s.virtualSize = Math.ceil(s.virtualSize / s.params.slidesPerColumn) - s.params.spaceBetween;
                if (s.isHorizontal()) s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
                else s.wrapper.css({height: s.virtualSize + s.params.spaceBetween + 'px'});
                if (s.params.centeredSlides) {
                    newSlidesGrid = [];
                    for (i = 0; i < s.snapGrid.length; i++) {
                        if (s.snapGrid[i] < s.virtualSize + s.snapGrid[0]) newSlidesGrid.push(s.snapGrid[i]);
                    }
                    s.snapGrid = newSlidesGrid;
                }
            }
        
            // Remove last grid elements depending on width
            if (!s.params.centeredSlides) {
                newSlidesGrid = [];
                for (i = 0; i < s.snapGrid.length; i++) {
                    if (s.snapGrid[i] <= s.virtualSize - s.size) {
                        newSlidesGrid.push(s.snapGrid[i]);
                    }
                }
                s.snapGrid = newSlidesGrid;
                if (Math.floor(s.virtualSize - s.size) - Math.floor(s.snapGrid[s.snapGrid.length - 1]) > 1) {
                    s.snapGrid.push(s.virtualSize - s.size);
                }
            }
            if (s.snapGrid.length === 0) s.snapGrid = [0];
        
            if (s.params.spaceBetween !== 0) {
                if (s.isHorizontal()) {
                    if (s.rtl) s.slides.css({marginLeft: spaceBetween + 'px'});
                    else s.slides.css({marginRight: spaceBetween + 'px'});
                }
                else s.slides.css({marginBottom: spaceBetween + 'px'});
            }
            if (s.params.watchSlidesProgress) {
                s.updateSlidesOffset();
            }
        };
        s.updateSlidesOffset = function () {
            for (var i = 0; i < s.slides.length; i++) {
                s.slides[i].swiperSlideOffset = s.isHorizontal() ? s.slides[i].offsetLeft : s.slides[i].offsetTop;
            }
        };
        
        /*=========================
          Dynamic Slides Per View
          ===========================*/
        s.currentSlidesPerView = function () {
            var spv = 1, i, j;
            if (s.params.centeredSlides) {
                var size = s.slides[s.activeIndex].swiperSlideSize;
                var breakLoop;
                for (i = s.activeIndex + 1; i < s.slides.length; i++) {
                    if (s.slides[i] && !breakLoop) {
                        size += s.slides[i].swiperSlideSize;
                        spv ++;
                        if (size > s.size) breakLoop = true;
                    }
                }
                for (j = s.activeIndex - 1; j >= 0; j--) {
                    if (s.slides[j] && !breakLoop) {
                        size += s.slides[j].swiperSlideSize;
                        spv ++;
                        if (size > s.size) breakLoop = true;
                    }
                }
            }
            else {
                for (i = s.activeIndex + 1; i < s.slides.length; i++) {
                    if (s.slidesGrid[i] - s.slidesGrid[s.activeIndex] < s.size) {
                        spv++;
                    }
                }
            }
            return spv;
        };
        /*=========================
          Slider/slides progress
          ===========================*/
        s.updateSlidesProgress = function (translate) {
            if (typeof translate === 'undefined') {
                translate = s.translate || 0;
            }
            if (s.slides.length === 0) return;
            if (typeof s.slides[0].swiperSlideOffset === 'undefined') s.updateSlidesOffset();
        
            var offsetCenter = -translate;
            if (s.rtl) offsetCenter = translate;
        
            // Visible Slides
            s.slides.removeClass(s.params.slideVisibleClass);
            for (var i = 0; i < s.slides.length; i++) {
                var slide = s.slides[i];
                var slideProgress = (offsetCenter + (s.params.centeredSlides ? s.minTranslate() : 0) - slide.swiperSlideOffset) / (slide.swiperSlideSize + s.params.spaceBetween);
                if (s.params.watchSlidesVisibility) {
                    var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
                    var slideAfter = slideBefore + s.slidesSizesGrid[i];
                    var isVisible =
                        (slideBefore >= 0 && slideBefore < s.size) ||
                        (slideAfter > 0 && slideAfter <= s.size) ||
                        (slideBefore <= 0 && slideAfter >= s.size);
                    if (isVisible) {
                        s.slides.eq(i).addClass(s.params.slideVisibleClass);
                    }
                }
                slide.progress = s.rtl ? -slideProgress : slideProgress;
            }
        };
        s.updateProgress = function (translate) {
            if (typeof translate === 'undefined') {
                translate = s.translate || 0;
            }
            var translatesDiff = s.maxTranslate() - s.minTranslate();
            var wasBeginning = s.isBeginning;
            var wasEnd = s.isEnd;
            if (translatesDiff === 0) {
                s.progress = 0;
                s.isBeginning = s.isEnd = true;
            }
            else {
                s.progress = (translate - s.minTranslate()) / (translatesDiff);
                s.isBeginning = s.progress <= 0;
                s.isEnd = s.progress >= 1;
            }
            if (s.isBeginning && !wasBeginning) s.emit('onReachBeginning', s);
            if (s.isEnd && !wasEnd) s.emit('onReachEnd', s);
        
            if (s.params.watchSlidesProgress) s.updateSlidesProgress(translate);
            s.emit('onProgress', s, s.progress);
        };
        s.updateActiveIndex = function () {
            var translate = s.rtl ? s.translate : -s.translate;
            var newActiveIndex, i, snapIndex;
            for (i = 0; i < s.slidesGrid.length; i ++) {
                if (typeof s.slidesGrid[i + 1] !== 'undefined') {
                    if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1] - (s.slidesGrid[i + 1] - s.slidesGrid[i]) / 2) {
                        newActiveIndex = i;
                    }
                    else if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1]) {
                        newActiveIndex = i + 1;
                    }
                }
                else {
                    if (translate >= s.slidesGrid[i]) {
                        newActiveIndex = i;
                    }
                }
            }
            // Normalize slideIndex
            if(s.params.normalizeSlideIndex){
                if (newActiveIndex < 0 || typeof newActiveIndex === 'undefined') newActiveIndex = 0;
            }
            // for (i = 0; i < s.slidesGrid.length; i++) {
                // if (- translate >= s.slidesGrid[i]) {
                    // newActiveIndex = i;
                // }
            // }
            snapIndex = Math.floor(newActiveIndex / s.params.slidesPerGroup);
            if (snapIndex >= s.snapGrid.length) snapIndex = s.snapGrid.length - 1;
        
            if (newActiveIndex === s.activeIndex) {
                return;
            }
            s.snapIndex = snapIndex;
            s.previousIndex = s.activeIndex;
            s.activeIndex = newActiveIndex;
            s.updateClasses();
            s.updateRealIndex();
        };
        s.updateRealIndex = function(){
            s.realIndex = parseInt(s.slides.eq(s.activeIndex).attr('data-swiper-slide-index') || s.activeIndex, 10);
        };
        
        /*=========================
          Classes
          ===========================*/
        s.updateClasses = function () {
            s.slides.removeClass(s.params.slideActiveClass + ' ' + s.params.slideNextClass + ' ' + s.params.slidePrevClass + ' ' + s.params.slideDuplicateActiveClass + ' ' + s.params.slideDuplicateNextClass + ' ' + s.params.slideDuplicatePrevClass);
            var activeSlide = s.slides.eq(s.activeIndex);
            // Active classes
            activeSlide.addClass(s.params.slideActiveClass);
            if (params.loop) {
                // Duplicate to all looped slides
                if (activeSlide.hasClass(s.params.slideDuplicateClass)) {
                    s.wrapper.children('.' + s.params.slideClass + ':not(.' + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + s.realIndex + '"]').addClass(s.params.slideDuplicateActiveClass);
                }
                else {
                    s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + s.realIndex + '"]').addClass(s.params.slideDuplicateActiveClass);
                }
            }
            // Next Slide
            var nextSlide = activeSlide.next('.' + s.params.slideClass).addClass(s.params.slideNextClass);
            if (s.params.loop && nextSlide.length === 0) {
                nextSlide = s.slides.eq(0);
                nextSlide.addClass(s.params.slideNextClass);
            }
            // Prev Slide
            var prevSlide = activeSlide.prev('.' + s.params.slideClass).addClass(s.params.slidePrevClass);
            if (s.params.loop && prevSlide.length === 0) {
                prevSlide = s.slides.eq(-1);
                prevSlide.addClass(s.params.slidePrevClass);
            }
            if (params.loop) {
                // Duplicate to all looped slides
                if (nextSlide.hasClass(s.params.slideDuplicateClass)) {
                    s.wrapper.children('.' + s.params.slideClass + ':not(.' + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + nextSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicateNextClass);
                }
                else {
                    s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + nextSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicateNextClass);
                }
                if (prevSlide.hasClass(s.params.slideDuplicateClass)) {
                    s.wrapper.children('.' + s.params.slideClass + ':not(.' + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + prevSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicatePrevClass);
                }
                else {
                    s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + prevSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicatePrevClass);
                }
            }
        
            // Pagination
            if (s.paginationContainer && s.paginationContainer.length > 0) {
                // Current/Total
                var current,
                    total = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
                if (s.params.loop) {
                    current = Math.ceil((s.activeIndex - s.loopedSlides)/s.params.slidesPerGroup);
                    if (current > s.slides.length - 1 - s.loopedSlides * 2) {
                        current = current - (s.slides.length - s.loopedSlides * 2);
                    }
                    if (current > total - 1) current = current - total;
                    if (current < 0 && s.params.paginationType !== 'bullets') current = total + current;
                }
                else {
                    if (typeof s.snapIndex !== 'undefined') {
                        current = s.snapIndex;
                    }
                    else {
                        current = s.activeIndex || 0;
                    }
                }
                // Types
                if (s.params.paginationType === 'bullets' && s.bullets && s.bullets.length > 0) {
                    s.bullets.removeClass(s.params.bulletActiveClass);
                    if (s.paginationContainer.length > 1) {
                        s.bullets.each(function () {
                            if ($(this).index() === current) $(this).addClass(s.params.bulletActiveClass);
                        });
                    }
                    else {
                        s.bullets.eq(current).addClass(s.params.bulletActiveClass);
                    }
                }
                if (s.params.paginationType === 'fraction') {
                    s.paginationContainer.find('.' + s.params.paginationCurrentClass).text(current + 1);
                    s.paginationContainer.find('.' + s.params.paginationTotalClass).text(total);
                }
                if (s.params.paginationType === 'progress') {
                    var scale = (current + 1) / total,
                        scaleX = scale,
                        scaleY = 1;
                    if (!s.isHorizontal()) {
                        scaleY = scale;
                        scaleX = 1;
                    }
                    s.paginationContainer.find('.' + s.params.paginationProgressbarClass).transform('translate3d(0,0,0) scaleX(' + scaleX + ') scaleY(' + scaleY + ')').transition(s.params.speed);
                }
                if (s.params.paginationType === 'custom' && s.params.paginationCustomRender) {
                    s.paginationContainer.html(s.params.paginationCustomRender(s, current + 1, total));
                    s.emit('onPaginationRendered', s, s.paginationContainer[0]);
                }
            }
        
            // Next/active buttons
            if (!s.params.loop) {
                if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                    if (s.isBeginning) {
                        s.prevButton.addClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.disable(s.prevButton);
                    }
                    else {
                        s.prevButton.removeClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.enable(s.prevButton);
                    }
                }
                if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                    if (s.isEnd) {
                        s.nextButton.addClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.disable(s.nextButton);
                    }
                    else {
                        s.nextButton.removeClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.enable(s.nextButton);
                    }
                }
            }
        };
        
        /*=========================
          Pagination
          ===========================*/
        s.updatePagination = function () {
            if (!s.params.pagination) return;
            if (s.paginationContainer && s.paginationContainer.length > 0) {
                var paginationHTML = '';
                if (s.params.paginationType === 'bullets') {
                    var numberOfBullets = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
                    for (var i = 0; i < numberOfBullets; i++) {
                        if (s.params.paginationBulletRender) {
                            paginationHTML += s.params.paginationBulletRender(s, i, s.params.bulletClass);
                        }
                        else {
                            paginationHTML += '<' + s.params.paginationElement+' class="' + s.params.bulletClass + '"></' + s.params.paginationElement + '>';
                        }
                    }
                    s.paginationContainer.html(paginationHTML);
                    s.bullets = s.paginationContainer.find('.' + s.params.bulletClass);
                    if (s.params.paginationClickable && s.params.a11y && s.a11y) {
                        s.a11y.initPagination();
                    }
                }
                if (s.params.paginationType === 'fraction') {
                    if (s.params.paginationFractionRender) {
                        paginationHTML = s.params.paginationFractionRender(s, s.params.paginationCurrentClass, s.params.paginationTotalClass);
                    }
                    else {
                        paginationHTML =
                            '<span class="' + s.params.paginationCurrentClass + '"></span>' +
                            ' / ' +
                            '<span class="' + s.params.paginationTotalClass+'"></span>';
                    }
                    s.paginationContainer.html(paginationHTML);
                }
                if (s.params.paginationType === 'progress') {
                    if (s.params.paginationProgressRender) {
                        paginationHTML = s.params.paginationProgressRender(s, s.params.paginationProgressbarClass);
                    }
                    else {
                        paginationHTML = '<span class="' + s.params.paginationProgressbarClass + '"></span>';
                    }
                    s.paginationContainer.html(paginationHTML);
                }
                if (s.params.paginationType !== 'custom') {
                    s.emit('onPaginationRendered', s, s.paginationContainer[0]);
                }
            }
        };
        /*=========================
          Common update method
          ===========================*/
        s.update = function (updateTranslate) {
            if (!s) return;
            s.updateContainerSize();
            s.updateSlidesSize();
            s.updateProgress();
            s.updatePagination();
            s.updateClasses();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
            }
            var newTranslate;
            function forceSetTranslate() {
                var translate = s.rtl ? -s.translate : s.translate;
                newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                s.setWrapperTranslate(newTranslate);
                s.updateActiveIndex();
                s.updateClasses();
            }
            if (updateTranslate) {
                var translated;
                if (s.controller && s.controller.spline) {
                    s.controller.spline = undefined;
                }
                if (s.params.freeMode) {
                    forceSetTranslate();
                    if (s.params.autoHeight) {
                        s.updateAutoHeight();
                    }
                }
                else {
                    if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
                        translated = s.slideTo(s.slides.length - 1, 0, false, true);
                    }
                    else {
                        translated = s.slideTo(s.activeIndex, 0, false, true);
                    }
                    if (!translated) {
                        forceSetTranslate();
                    }
                }
            }
            else if (s.params.autoHeight) {
                s.updateAutoHeight();
            }
        };
        
        /*=========================
          Resize Handler
          ===========================*/
        s.onResize = function (forceUpdatePagination) {
            if (s.params.onBeforeResize) s.params.onBeforeResize(s);
            //Breakpoints
            if (s.params.breakpoints) {
                s.setBreakpoint();
            }
        
            // Disable locks on resize
            var allowSwipeToPrev = s.params.allowSwipeToPrev;
            var allowSwipeToNext = s.params.allowSwipeToNext;
            s.params.allowSwipeToPrev = s.params.allowSwipeToNext = true;
        
            s.updateContainerSize();
            s.updateSlidesSize();
            if (s.params.slidesPerView === 'auto' || s.params.freeMode || forceUpdatePagination) s.updatePagination();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
            }
            if (s.controller && s.controller.spline) {
                s.controller.spline = undefined;
            }
            var slideChangedBySlideTo = false;
            if (s.params.freeMode) {
                var newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                s.setWrapperTranslate(newTranslate);
                s.updateActiveIndex();
                s.updateClasses();
        
                if (s.params.autoHeight) {
                    s.updateAutoHeight();
                }
            }
            else {
                s.updateClasses();
                if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
                    slideChangedBySlideTo = s.slideTo(s.slides.length - 1, 0, false, true);
                }
                else {
                    slideChangedBySlideTo = s.slideTo(s.activeIndex, 0, false, true);
                }
            }
            if (s.params.lazyLoading && !slideChangedBySlideTo && s.lazy) {
                s.lazy.load();
            }
            // Return locks after resize
            s.params.allowSwipeToPrev = allowSwipeToPrev;
            s.params.allowSwipeToNext = allowSwipeToNext;
            if (s.params.onAfterResize) s.params.onAfterResize(s);
        };
        
        /*=========================
          Events
          ===========================*/
        
        //Define Touch Events
        s.touchEventsDesktop = {start: 'mousedown', move: 'mousemove', end: 'mouseup'};
        if (window.navigator.pointerEnabled) s.touchEventsDesktop = {start: 'pointerdown', move: 'pointermove', end: 'pointerup'};
        else if (window.navigator.msPointerEnabled) s.touchEventsDesktop = {start: 'MSPointerDown', move: 'MSPointerMove', end: 'MSPointerUp'};
        s.touchEvents = {
            start : s.support.touch || !s.params.simulateTouch  ? 'touchstart' : s.touchEventsDesktop.start,
            move : s.support.touch || !s.params.simulateTouch ? 'touchmove' : s.touchEventsDesktop.move,
            end : s.support.touch || !s.params.simulateTouch ? 'touchend' : s.touchEventsDesktop.end
        };
        
        
        // WP8 Touch Events Fix
        if (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) {
            (s.params.touchEventsTarget === 'container' ? s.container : s.wrapper).addClass('swiper-wp8-' + s.params.direction);
        }
        
        // Attach/detach events
        s.initEvents = function (detach) {
            var actionDom = detach ? 'off' : 'on';
            var action = detach ? 'removeEventListener' : 'addEventListener';
            var touchEventsTarget = s.params.touchEventsTarget === 'container' ? s.container[0] : s.wrapper[0];
            var target = s.support.touch ? touchEventsTarget : document;
        
            var moveCapture = s.params.nested ? true : false;
        
            //Touch Events
            if (s.browser.ie) {
                touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
                target[action](s.touchEvents.move, s.onTouchMove, moveCapture);
                target[action](s.touchEvents.end, s.onTouchEnd, false);
            }
            else {
                if (s.support.touch) {
                    var passiveListener = s.touchEvents.start === 'touchstart' && s.support.passiveListener && s.params.passiveListeners ? {passive: true, capture: false} : false;
                    touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, passiveListener);
                    touchEventsTarget[action](s.touchEvents.move, s.onTouchMove, moveCapture);
                    touchEventsTarget[action](s.touchEvents.end, s.onTouchEnd, passiveListener);
                }
                if ((params.simulateTouch && !s.device.ios && !s.device.android) || (params.simulateTouch && !s.support.touch && s.device.ios)) {
                    touchEventsTarget[action]('mousedown', s.onTouchStart, false);
                    document[action]('mousemove', s.onTouchMove, moveCapture);
                    document[action]('mouseup', s.onTouchEnd, false);
                }
            }
            window[action]('resize', s.onResize);
        
            // Next, Prev, Index
            if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                s.nextButton[actionDom]('click', s.onClickNext);
                if (s.params.a11y && s.a11y) s.nextButton[actionDom]('keydown', s.a11y.onEnterKey);
            }
            if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                s.prevButton[actionDom]('click', s.onClickPrev);
                if (s.params.a11y && s.a11y) s.prevButton[actionDom]('keydown', s.a11y.onEnterKey);
            }
            if (s.params.pagination && s.params.paginationClickable) {
                s.paginationContainer[actionDom]('click', '.' + s.params.bulletClass, s.onClickIndex);
                if (s.params.a11y && s.a11y) s.paginationContainer[actionDom]('keydown', '.' + s.params.bulletClass, s.a11y.onEnterKey);
            }
        
            // Prevent Links Clicks
            if (s.params.preventClicks || s.params.preventClicksPropagation) touchEventsTarget[action]('click', s.preventClicks, true);
        };
        s.attachEvents = function () {
            s.initEvents();
        };
        s.detachEvents = function () {
            s.initEvents(true);
        };
        
        /*=========================
          Handle Clicks
          ===========================*/
        // Prevent Clicks
        s.allowClick = true;
        s.preventClicks = function (e) {
            if (!s.allowClick) {
                if (s.params.preventClicks) e.preventDefault();
                if (s.params.preventClicksPropagation && s.animating) {
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                }
            }
        };
        // Clicks
        s.onClickNext = function (e) {
            e.preventDefault();
            if (s.isEnd && !s.params.loop) return;
            s.slideNext();
        };
        s.onClickPrev = function (e) {
            e.preventDefault();
            if (s.isBeginning && !s.params.loop) return;
            s.slidePrev();
        };
        s.onClickIndex = function (e) {
            e.preventDefault();
            var index = $(this).index() * s.params.slidesPerGroup;
            if (s.params.loop) index = index + s.loopedSlides;
            s.slideTo(index);
        };
        
        /*=========================
          Handle Touches
          ===========================*/
        function findElementInEvent(e, selector) {
            var el = $(e.target);
            if (!el.is(selector)) {
                if (typeof selector === 'string') {
                    el = el.parents(selector);
                }
                else if (selector.nodeType) {
                    var found;
                    el.parents().each(function (index, _el) {
                        if (_el === selector) found = selector;
                    });
                    if (!found) return undefined;
                    else return selector;
                }
            }
            if (el.length === 0) {
                return undefined;
            }
            return el[0];
        }
        s.updateClickedSlide = function (e) {
            var slide = findElementInEvent(e, '.' + s.params.slideClass);
            var slideFound = false;
            if (slide) {
                for (var i = 0; i < s.slides.length; i++) {
                    if (s.slides[i] === slide) slideFound = true;
                }
            }
        
            if (slide && slideFound) {
                s.clickedSlide = slide;
                s.clickedIndex = $(slide).index();
            }
            else {
                s.clickedSlide = undefined;
                s.clickedIndex = undefined;
                return;
            }
            if (s.params.slideToClickedSlide && s.clickedIndex !== undefined && s.clickedIndex !== s.activeIndex) {
                var slideToIndex = s.clickedIndex,
                    realIndex,
                    duplicatedSlides,
                    slidesPerView = s.params.slidesPerView === 'auto' ? s.currentSlidesPerView() : s.params.slidesPerView;
                if (s.params.loop) {
                    if (s.animating) return;
                    realIndex = parseInt($(s.clickedSlide).attr('data-swiper-slide-index'), 10);
                    if (s.params.centeredSlides) {
                        if ((slideToIndex < s.loopedSlides - slidesPerView/2) || (slideToIndex > s.slides.length - s.loopedSlides + slidesPerView/2)) {
                            s.fixLoop();
                            slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.' + s.params.slideDuplicateClass + ')').eq(0).index();
                            setTimeout(function () {
                                s.slideTo(slideToIndex);
                            }, 0);
                        }
                        else {
                            s.slideTo(slideToIndex);
                        }
                    }
                    else {
                        if (slideToIndex > s.slides.length - slidesPerView) {
                            s.fixLoop();
                            slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.' + s.params.slideDuplicateClass + ')').eq(0).index();
                            setTimeout(function () {
                                s.slideTo(slideToIndex);
                            }, 0);
                        }
                        else {
                            s.slideTo(slideToIndex);
                        }
                    }
                }
                else {
                    s.slideTo(slideToIndex);
                }
            }
        };
        
        var isTouched,
            isMoved,
            allowTouchCallbacks,
            touchStartTime,
            isScrolling,
            currentTranslate,
            startTranslate,
            allowThresholdMove,
            // Form elements to match
            formElements = 'input, select, textarea, button, video',
            // Last click time
            lastClickTime = Date.now(), clickTimeout,
            //Velocities
            velocities = [],
            allowMomentumBounce;
        
        // Animating Flag
        s.animating = false;
        
        // Touches information
        s.touches = {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            diff: 0
        };
        
        // Touch handlers
        var isTouchEvent, startMoving;
        s.onTouchStart = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            isTouchEvent = e.type === 'touchstart';
            if (!isTouchEvent && 'which' in e && e.which === 3) return;
            if (s.params.noSwiping && findElementInEvent(e, '.' + s.params.noSwipingClass)) {
                s.allowClick = true;
                return;
            }
            if (s.params.swipeHandler) {
                if (!findElementInEvent(e, s.params.swipeHandler)) return;
            }
        
            var startX = s.touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
            var startY = s.touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        
            // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore
            if(s.device.ios && s.params.iOSEdgeSwipeDetection && startX <= s.params.iOSEdgeSwipeThreshold) {
                return;
            }
        
            isTouched = true;
            isMoved = false;
            allowTouchCallbacks = true;
            isScrolling = undefined;
            startMoving = undefined;
            s.touches.startX = startX;
            s.touches.startY = startY;
            touchStartTime = Date.now();
            s.allowClick = true;
            s.updateContainerSize();
            s.swipeDirection = undefined;
            if (s.params.threshold > 0) allowThresholdMove = false;
            if (e.type !== 'touchstart') {
                var preventDefault = true;
                if ($(e.target).is(formElements)) preventDefault = false;
                if (document.activeElement && $(document.activeElement).is(formElements)) {
                    document.activeElement.blur();
                }
                if (preventDefault) {
                    e.preventDefault();
                }
            }
            s.emit('onTouchStart', s, e);
        };
        
        s.onTouchMove = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            if (isTouchEvent && e.type === 'mousemove') return;
            if (e.preventedByNestedSwiper) {
                s.touches.startX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                s.touches.startY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                return;
            }
            if (s.params.onlyExternal) {
                // isMoved = true;
                s.allowClick = false;
                if (isTouched) {
                    s.touches.startX = s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                    s.touches.startY = s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                    touchStartTime = Date.now();
                }
                return;
            }
            if (isTouchEvent && s.params.touchReleaseOnEdges && !s.params.loop) {
                if (!s.isHorizontal()) {
                    // Vertical
                    if (
                        (s.touches.currentY < s.touches.startY && s.translate <= s.maxTranslate()) ||
                        (s.touches.currentY > s.touches.startY && s.translate >= s.minTranslate())
                        ) {
                        return;
                    }
                }
                else {
                    if (
                        (s.touches.currentX < s.touches.startX && s.translate <= s.maxTranslate()) ||
                        (s.touches.currentX > s.touches.startX && s.translate >= s.minTranslate())
                        ) {
                        return;
                    }
                }
            }
            if (isTouchEvent && document.activeElement) {
                if (e.target === document.activeElement && $(e.target).is(formElements)) {
                    isMoved = true;
                    s.allowClick = false;
                    return;
                }
            }
            if (allowTouchCallbacks) {
                s.emit('onTouchMove', s, e);
            }
            if (e.targetTouches && e.targetTouches.length > 1) return;
        
            s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
            s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        
            if (typeof isScrolling === 'undefined') {
                var touchAngle;
                if (s.isHorizontal() && s.touches.currentY === s.touches.startY || !s.isHorizontal() && s.touches.currentX === s.touches.startX) {
                    isScrolling = false;
                }
                else {
                    touchAngle = Math.atan2(Math.abs(s.touches.currentY - s.touches.startY), Math.abs(s.touches.currentX - s.touches.startX)) * 180 / Math.PI;
                    isScrolling = s.isHorizontal() ? touchAngle > s.params.touchAngle : (90 - touchAngle > s.params.touchAngle);
                }
            }
            if (isScrolling) {
                s.emit('onTouchMoveOpposite', s, e);
            }
            if (typeof startMoving === 'undefined') {
                if (s.touches.currentX !== s.touches.startX || s.touches.currentY !== s.touches.startY) {
                    startMoving = true;
                }
            }
            if (!isTouched) return;
            if (isScrolling)  {
                isTouched = false;
                return;
            }
            if (!startMoving) {
                return;
            }
            s.allowClick = false;
            s.emit('onSliderMove', s, e);
            e.preventDefault();
            if (s.params.touchMoveStopPropagation && !s.params.nested) {
                e.stopPropagation();
            }
        
            if (!isMoved) {
                if (params.loop) {
                    s.fixLoop();
                }
                startTranslate = s.getWrapperTranslate();
                s.setWrapperTransition(0);
                if (s.animating) {
                    s.wrapper.trigger('webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd');
                }
                if (s.params.autoplay && s.autoplaying) {
                    if (s.params.autoplayDisableOnInteraction) {
                        s.stopAutoplay();
                    }
                    else {
                        s.pauseAutoplay();
                    }
                }
                allowMomentumBounce = false;
                //Grab Cursor
                if (s.params.grabCursor && (s.params.allowSwipeToNext === true || s.params.allowSwipeToPrev === true)) {
                    s.setGrabCursor(true);
                }
            }
            isMoved = true;
        
            var diff = s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
        
            diff = diff * s.params.touchRatio;
            if (s.rtl) diff = -diff;
        
            s.swipeDirection = diff > 0 ? 'prev' : 'next';
            currentTranslate = diff + startTranslate;
        
            var disableParentSwiper = true;
            if ((diff > 0 && currentTranslate > s.minTranslate())) {
                disableParentSwiper = false;
                if (s.params.resistance) currentTranslate = s.minTranslate() - 1 + Math.pow(-s.minTranslate() + startTranslate + diff, s.params.resistanceRatio);
            }
            else if (diff < 0 && currentTranslate < s.maxTranslate()) {
                disableParentSwiper = false;
                if (s.params.resistance) currentTranslate = s.maxTranslate() + 1 - Math.pow(s.maxTranslate() - startTranslate - diff, s.params.resistanceRatio);
            }
        
            if (disableParentSwiper) {
                e.preventedByNestedSwiper = true;
            }
        
            // Directions locks
            if (!s.params.allowSwipeToNext && s.swipeDirection === 'next' && currentTranslate < startTranslate) {
                currentTranslate = startTranslate;
            }
            if (!s.params.allowSwipeToPrev && s.swipeDirection === 'prev' && currentTranslate > startTranslate) {
                currentTranslate = startTranslate;
            }
        
        
            // Threshold
            if (s.params.threshold > 0) {
                if (Math.abs(diff) > s.params.threshold || allowThresholdMove) {
                    if (!allowThresholdMove) {
                        allowThresholdMove = true;
                        s.touches.startX = s.touches.currentX;
                        s.touches.startY = s.touches.currentY;
                        currentTranslate = startTranslate;
                        s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
                        return;
                    }
                }
                else {
                    currentTranslate = startTranslate;
                    return;
                }
            }
        
            if (!s.params.followFinger) return;
        
            // Update active index in free mode
            if (s.params.freeMode || s.params.watchSlidesProgress) {
                s.updateActiveIndex();
            }
            if (s.params.freeMode) {
                //Velocity
                if (velocities.length === 0) {
                    velocities.push({
                        position: s.touches[s.isHorizontal() ? 'startX' : 'startY'],
                        time: touchStartTime
                    });
                }
                velocities.push({
                    position: s.touches[s.isHorizontal() ? 'currentX' : 'currentY'],
                    time: (new window.Date()).getTime()
                });
            }
            // Update progress
            s.updateProgress(currentTranslate);
            // Update translate
            s.setWrapperTranslate(currentTranslate);
        };
        s.onTouchEnd = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            if (allowTouchCallbacks) {
                s.emit('onTouchEnd', s, e);
            }
            allowTouchCallbacks = false;
            if (!isTouched) return;
            //Return Grab Cursor
            if (s.params.grabCursor && isMoved && isTouched  && (s.params.allowSwipeToNext === true || s.params.allowSwipeToPrev === true)) {
                s.setGrabCursor(false);
            }
        
            // Time diff
            var touchEndTime = Date.now();
            var timeDiff = touchEndTime - touchStartTime;
        
            // Tap, doubleTap, Click
            if (s.allowClick) {
                s.updateClickedSlide(e);
                s.emit('onTap', s, e);
                if (timeDiff < 300 && (touchEndTime - lastClickTime) > 300) {
                    if (clickTimeout) clearTimeout(clickTimeout);
                    clickTimeout = setTimeout(function () {
                        if (!s) return;
                        if (s.params.paginationHide && s.paginationContainer.length > 0 && !$(e.target).hasClass(s.params.bulletClass)) {
                            s.paginationContainer.toggleClass(s.params.paginationHiddenClass);
                        }
                        s.emit('onClick', s, e);
                    }, 300);
        
                }
                if (timeDiff < 300 && (touchEndTime - lastClickTime) < 300) {
                    if (clickTimeout) clearTimeout(clickTimeout);
                    s.emit('onDoubleTap', s, e);
                }
            }
        
            lastClickTime = Date.now();
            setTimeout(function () {
                if (s) s.allowClick = true;
            }, 0);
        
            if (!isTouched || !isMoved || !s.swipeDirection || s.touches.diff === 0 || currentTranslate === startTranslate) {
                isTouched = isMoved = false;
                return;
            }
            isTouched = isMoved = false;
        
            var currentPos;
            if (s.params.followFinger) {
                currentPos = s.rtl ? s.translate : -s.translate;
            }
            else {
                currentPos = -currentTranslate;
            }
            if (s.params.freeMode) {
                if (currentPos < -s.minTranslate()) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                else if (currentPos > -s.maxTranslate()) {
                    if (s.slides.length < s.snapGrid.length) {
                        s.slideTo(s.snapGrid.length - 1);
                    }
                    else {
                        s.slideTo(s.slides.length - 1);
                    }
                    return;
                }
        
                if (s.params.freeModeMomentum) {
                    if (velocities.length > 1) {
                        var lastMoveEvent = velocities.pop(), velocityEvent = velocities.pop();
        
                        var distance = lastMoveEvent.position - velocityEvent.position;
                        var time = lastMoveEvent.time - velocityEvent.time;
                        s.velocity = distance / time;
                        s.velocity = s.velocity / 2;
                        if (Math.abs(s.velocity) < s.params.freeModeMinimumVelocity) {
                            s.velocity = 0;
                        }
                        // this implies that the user stopped moving a finger then released.
                        // There would be no events with distance zero, so the last event is stale.
                        if (time > 150 || (new window.Date().getTime() - lastMoveEvent.time) > 300) {
                            s.velocity = 0;
                        }
                    } else {
                        s.velocity = 0;
                    }
                    s.velocity = s.velocity * s.params.freeModeMomentumVelocityRatio;
        
                    velocities.length = 0;
                    var momentumDuration = 1000 * s.params.freeModeMomentumRatio;
                    var momentumDistance = s.velocity * momentumDuration;
        
                    var newPosition = s.translate + momentumDistance;
                    if (s.rtl) newPosition = - newPosition;
                    var doBounce = false;
                    var afterBouncePosition;
                    var bounceAmount = Math.abs(s.velocity) * 20 * s.params.freeModeMomentumBounceRatio;
                    if (newPosition < s.maxTranslate()) {
                        if (s.params.freeModeMomentumBounce) {
                            if (newPosition + s.maxTranslate() < -bounceAmount) {
                                newPosition = s.maxTranslate() - bounceAmount;
                            }
                            afterBouncePosition = s.maxTranslate();
                            doBounce = true;
                            allowMomentumBounce = true;
                        }
                        else {
                            newPosition = s.maxTranslate();
                        }
                    }
                    else if (newPosition > s.minTranslate()) {
                        if (s.params.freeModeMomentumBounce) {
                            if (newPosition - s.minTranslate() > bounceAmount) {
                                newPosition = s.minTranslate() + bounceAmount;
                            }
                            afterBouncePosition = s.minTranslate();
                            doBounce = true;
                            allowMomentumBounce = true;
                        }
                        else {
                            newPosition = s.minTranslate();
                        }
                    }
                    else if (s.params.freeModeSticky) {
                        var j = 0,
                            nextSlide;
                        for (j = 0; j < s.snapGrid.length; j += 1) {
                            if (s.snapGrid[j] > -newPosition) {
                                nextSlide = j;
                                break;
                            }
        
                        }
                        if (Math.abs(s.snapGrid[nextSlide] - newPosition) < Math.abs(s.snapGrid[nextSlide - 1] - newPosition) || s.swipeDirection === 'next') {
                            newPosition = s.snapGrid[nextSlide];
                        } else {
                            newPosition = s.snapGrid[nextSlide - 1];
                        }
                        if (!s.rtl) newPosition = - newPosition;
                    }
                    //Fix duration
                    if (s.velocity !== 0) {
                        if (s.rtl) {
                            momentumDuration = Math.abs((-newPosition - s.translate) / s.velocity);
                        }
                        else {
                            momentumDuration = Math.abs((newPosition - s.translate) / s.velocity);
                        }
                    }
                    else if (s.params.freeModeSticky) {
                        s.slideReset();
                        return;
                    }
        
                    if (s.params.freeModeMomentumBounce && doBounce) {
                        s.updateProgress(afterBouncePosition);
                        s.setWrapperTransition(momentumDuration);
                        s.setWrapperTranslate(newPosition);
                        s.onTransitionStart();
                        s.animating = true;
                        s.wrapper.transitionEnd(function () {
                            if (!s || !allowMomentumBounce) return;
                            s.emit('onMomentumBounce', s);
        
                            s.setWrapperTransition(s.params.speed);
                            s.setWrapperTranslate(afterBouncePosition);
                            s.wrapper.transitionEnd(function () {
                                if (!s) return;
                                s.onTransitionEnd();
                            });
                        });
                    } else if (s.velocity) {
                        s.updateProgress(newPosition);
                        s.setWrapperTransition(momentumDuration);
                        s.setWrapperTranslate(newPosition);
                        s.onTransitionStart();
                        if (!s.animating) {
                            s.animating = true;
                            s.wrapper.transitionEnd(function () {
                                if (!s) return;
                                s.onTransitionEnd();
                            });
                        }
        
                    } else {
                        s.updateProgress(newPosition);
                    }
        
                    s.updateActiveIndex();
                }
                if (!s.params.freeModeMomentum || timeDiff >= s.params.longSwipesMs) {
                    s.updateProgress();
                    s.updateActiveIndex();
                }
                return;
            }
        
            // Find current slide
            var i, stopIndex = 0, groupSize = s.slidesSizesGrid[0];
            for (i = 0; i < s.slidesGrid.length; i += s.params.slidesPerGroup) {
                if (typeof s.slidesGrid[i + s.params.slidesPerGroup] !== 'undefined') {
                    if (currentPos >= s.slidesGrid[i] && currentPos < s.slidesGrid[i + s.params.slidesPerGroup]) {
                        stopIndex = i;
                        groupSize = s.slidesGrid[i + s.params.slidesPerGroup] - s.slidesGrid[i];
                    }
                }
                else {
                    if (currentPos >= s.slidesGrid[i]) {
                        stopIndex = i;
                        groupSize = s.slidesGrid[s.slidesGrid.length - 1] - s.slidesGrid[s.slidesGrid.length - 2];
                    }
                }
            }
        
            // Find current slide size
            var ratio = (currentPos - s.slidesGrid[stopIndex]) / groupSize;
        
            if (timeDiff > s.params.longSwipesMs) {
                // Long touches
                if (!s.params.longSwipes) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                if (s.swipeDirection === 'next') {
                    if (ratio >= s.params.longSwipesRatio) s.slideTo(stopIndex + s.params.slidesPerGroup);
                    else s.slideTo(stopIndex);
        
                }
                if (s.swipeDirection === 'prev') {
                    if (ratio > (1 - s.params.longSwipesRatio)) s.slideTo(stopIndex + s.params.slidesPerGroup);
                    else s.slideTo(stopIndex);
                }
            }
            else {
                // Short swipes
                if (!s.params.shortSwipes) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                if (s.swipeDirection === 'next') {
                    s.slideTo(stopIndex + s.params.slidesPerGroup);
        
                }
                if (s.swipeDirection === 'prev') {
                    s.slideTo(stopIndex);
                }
            }
        };
        /*=========================
          Transitions
          ===========================*/
        s._slideTo = function (slideIndex, speed) {
            return s.slideTo(slideIndex, speed, true, true);
        };
        s.slideTo = function (slideIndex, speed, runCallbacks, internal) {
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (typeof slideIndex === 'undefined') slideIndex = 0;
            if (slideIndex < 0) slideIndex = 0;
            s.snapIndex = Math.floor(slideIndex / s.params.slidesPerGroup);
            if (s.snapIndex >= s.snapGrid.length) s.snapIndex = s.snapGrid.length - 1;
        
            var translate = - s.snapGrid[s.snapIndex];
            // Stop autoplay
            if (s.params.autoplay && s.autoplaying) {
                if (internal || !s.params.autoplayDisableOnInteraction) {
                    s.pauseAutoplay(speed);
                }
                else {
                    s.stopAutoplay();
                }
            }
            // Update progress
            s.updateProgress(translate);
        
            // Normalize slideIndex
            if(s.params.normalizeSlideIndex){
                for (var i = 0; i < s.slidesGrid.length; i++) {
                    if (- Math.floor(translate * 100) >= Math.floor(s.slidesGrid[i] * 100)) {
                        slideIndex = i;
                    }
                }
            }
        
            // Directions locks
            if (!s.params.allowSwipeToNext && translate < s.translate && translate < s.minTranslate()) {
                return false;
            }
            if (!s.params.allowSwipeToPrev && translate > s.translate && translate > s.maxTranslate()) {
                if ((s.activeIndex || 0) !== slideIndex ) return false;
            }
        
            // Update Index
            if (typeof speed === 'undefined') speed = s.params.speed;
            s.previousIndex = s.activeIndex || 0;
            s.activeIndex = slideIndex;
            s.updateRealIndex();
            if ((s.rtl && -translate === s.translate) || (!s.rtl && translate === s.translate)) {
                // Update Height
                if (s.params.autoHeight) {
                    s.updateAutoHeight();
                }
                s.updateClasses();
                if (s.params.effect !== 'slide') {
                    s.setWrapperTranslate(translate);
                }
                return false;
            }
            s.updateClasses();
            s.onTransitionStart(runCallbacks);
        
            if (speed === 0 || s.browser.lteIE9) {
                s.setWrapperTranslate(translate);
                s.setWrapperTransition(0);
                s.onTransitionEnd(runCallbacks);
            }
            else {
                s.setWrapperTranslate(translate);
                s.setWrapperTransition(speed);
                if (!s.animating) {
                    s.animating = true;
                    s.wrapper.transitionEnd(function () {
                        if (!s) return;
                        s.onTransitionEnd(runCallbacks);
                    });
                }
        
            }
        
            return true;
        };
        
        s.onTransitionStart = function (runCallbacks) {
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (s.params.autoHeight) {
                s.updateAutoHeight();
            }
            if (s.lazy) s.lazy.onTransitionStart();
            if (runCallbacks) {
                s.emit('onTransitionStart', s);
                if (s.activeIndex !== s.previousIndex) {
                    s.emit('onSlideChangeStart', s);
                    if (s.activeIndex > s.previousIndex) {
                        s.emit('onSlideNextStart', s);
                    }
                    else {
                        s.emit('onSlidePrevStart', s);
                    }
                }
        
            }
        };
        s.onTransitionEnd = function (runCallbacks) {
            s.animating = false;
            s.setWrapperTransition(0);
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (s.lazy) s.lazy.onTransitionEnd();
            if (runCallbacks) {
                s.emit('onTransitionEnd', s);
                if (s.activeIndex !== s.previousIndex) {
                    s.emit('onSlideChangeEnd', s);
                    if (s.activeIndex > s.previousIndex) {
                        s.emit('onSlideNextEnd', s);
                    }
                    else {
                        s.emit('onSlidePrevEnd', s);
                    }
                }
            }
            if (s.params.history && s.history) {
                s.history.setHistory(s.params.history, s.activeIndex);
            }
            if (s.params.hashnav && s.hashnav) {
                s.hashnav.setHash();
            }
        
        };
        s.slideNext = function (runCallbacks, speed, internal) {
            if (s.params.loop) {
                if (s.animating) return false;
                s.fixLoop();
                var clientLeft = s.container[0].clientLeft;
                return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
            }
            else return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
        };
        s._slideNext = function (speed) {
            return s.slideNext(true, speed, true);
        };
        s.slidePrev = function (runCallbacks, speed, internal) {
            if (s.params.loop) {
                if (s.animating) return false;
                s.fixLoop();
                var clientLeft = s.container[0].clientLeft;
                return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
            }
            else return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
        };
        s._slidePrev = function (speed) {
            return s.slidePrev(true, speed, true);
        };
        s.slideReset = function (runCallbacks, speed, internal) {
            return s.slideTo(s.activeIndex, speed, runCallbacks);
        };
        
        s.disableTouchControl = function () {
            s.params.onlyExternal = true;
            return true;
        };
        s.enableTouchControl = function () {
            s.params.onlyExternal = false;
            return true;
        };
        
        /*=========================
          Translate/transition helpers
          ===========================*/
        s.setWrapperTransition = function (duration, byController) {
            s.wrapper.transition(duration);
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                s.effects[s.params.effect].setTransition(duration);
            }
            if (s.params.parallax && s.parallax) {
                s.parallax.setTransition(duration);
            }
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.setTransition(duration);
            }
            if (s.params.control && s.controller) {
                s.controller.setTransition(duration, byController);
            }
            s.emit('onSetTransition', s, duration);
        };
        s.setWrapperTranslate = function (translate, updateActiveIndex, byController) {
            var x = 0, y = 0, z = 0;
            if (s.isHorizontal()) {
                x = s.rtl ? -translate : translate;
            }
            else {
                y = translate;
            }
        
            if (s.params.roundLengths) {
                x = round(x);
                y = round(y);
            }
        
            if (!s.params.virtualTranslate) {
                if (s.support.transforms3d) s.wrapper.transform('translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)');
                else s.wrapper.transform('translate(' + x + 'px, ' + y + 'px)');
            }
        
            s.translate = s.isHorizontal() ? x : y;
        
            // Check if we need to update progress
            var progress;
            var translatesDiff = s.maxTranslate() - s.minTranslate();
            if (translatesDiff === 0) {
                progress = 0;
            }
            else {
                progress = (translate - s.minTranslate()) / (translatesDiff);
            }
            if (progress !== s.progress) {
                s.updateProgress(translate);
            }
        
            if (updateActiveIndex) s.updateActiveIndex();
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                s.effects[s.params.effect].setTranslate(s.translate);
            }
            if (s.params.parallax && s.parallax) {
                s.parallax.setTranslate(s.translate);
            }
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.setTranslate(s.translate);
            }
            if (s.params.control && s.controller) {
                s.controller.setTranslate(s.translate, byController);
            }
            s.emit('onSetTranslate', s, s.translate);
        };
        
        s.getTranslate = function (el, axis) {
            var matrix, curTransform, curStyle, transformMatrix;
        
            // automatic axis detection
            if (typeof axis === 'undefined') {
                axis = 'x';
            }
        
            if (s.params.virtualTranslate) {
                return s.rtl ? -s.translate : s.translate;
            }
        
            curStyle = window.getComputedStyle(el, null);
            if (window.WebKitCSSMatrix) {
                curTransform = curStyle.transform || curStyle.webkitTransform;
                if (curTransform.split(',').length > 6) {
                    curTransform = curTransform.split(', ').map(function(a){
                        return a.replace(',','.');
                    }).join(', ');
                }
                // Some old versions of Webkit choke when 'none' is passed; pass
                // empty string instead in this case
                transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
            }
            else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
                matrix = transformMatrix.toString().split(',');
            }
        
            if (axis === 'x') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m41;
                //Crazy IE10 Matrix
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[12]);
                //Normal Browsers
                else
                    curTransform = parseFloat(matrix[4]);
            }
            if (axis === 'y') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m42;
                //Crazy IE10 Matrix
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[13]);
                //Normal Browsers
                else
                    curTransform = parseFloat(matrix[5]);
            }
            if (s.rtl && curTransform) curTransform = -curTransform;
            return curTransform || 0;
        };
        s.getWrapperTranslate = function (axis) {
            if (typeof axis === 'undefined') {
                axis = s.isHorizontal() ? 'x' : 'y';
            }
            return s.getTranslate(s.wrapper[0], axis);
        };
        
        /*=========================
          Observer
          ===========================*/
        s.observers = [];
        function initObserver(target, options) {
            options = options || {};
            // create an observer instance
            var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
            var observer = new ObserverFunc(function (mutations) {
                mutations.forEach(function (mutation) {
                    s.onResize(true);
                    s.emit('onObserverUpdate', s, mutation);
                });
            });
        
            observer.observe(target, {
                attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
                childList: typeof options.childList === 'undefined' ? true : options.childList,
                characterData: typeof options.characterData === 'undefined' ? true : options.characterData
            });
        
            s.observers.push(observer);
        }
        s.initObservers = function () {
            if (s.params.observeParents) {
                var containerParents = s.container.parents();
                for (var i = 0; i < containerParents.length; i++) {
                    initObserver(containerParents[i]);
                }
            }
        
            // Observe container
            initObserver(s.container[0], {childList: false});
        
            // Observe wrapper
            initObserver(s.wrapper[0], {attributes: false});
        };
        s.disconnectObservers = function () {
            for (var i = 0; i < s.observers.length; i++) {
                s.observers[i].disconnect();
            }
            s.observers = [];
        };
        /*=========================
          Loop
          ===========================*/
        // Create looped slides
        s.createLoop = function () {
            // Remove duplicated slides
            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
        
            var slides = s.wrapper.children('.' + s.params.slideClass);
        
            if(s.params.slidesPerView === 'auto' && !s.params.loopedSlides) s.params.loopedSlides = slides.length;
        
            s.loopedSlides = parseInt(s.params.loopedSlides || s.params.slidesPerView, 10);
            s.loopedSlides = s.loopedSlides + s.params.loopAdditionalSlides;
            if (s.loopedSlides > slides.length) {
                s.loopedSlides = slides.length;
            }
        
            var prependSlides = [], appendSlides = [], i;
            slides.each(function (index, el) {
                var slide = $(this);
                if (index < s.loopedSlides) appendSlides.push(el);
                if (index < slides.length && index >= slides.length - s.loopedSlides) prependSlides.push(el);
                slide.attr('data-swiper-slide-index', index);
            });
            for (i = 0; i < appendSlides.length; i++) {
                s.wrapper.append($(appendSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
            }
            for (i = prependSlides.length - 1; i >= 0; i--) {
                s.wrapper.prepend($(prependSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
            }
        };
        s.destroyLoop = function () {
            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
            s.slides.removeAttr('data-swiper-slide-index');
        };
        s.reLoop = function (updatePosition) {
            var oldIndex = s.activeIndex - s.loopedSlides;
            s.destroyLoop();
            s.createLoop();
            s.updateSlidesSize();
            if (updatePosition) {
                s.slideTo(oldIndex + s.loopedSlides, 0, false);
            }
        
        };
        s.fixLoop = function () {
            var newIndex;
            //Fix For Negative Oversliding
            if (s.activeIndex < s.loopedSlides) {
                newIndex = s.slides.length - s.loopedSlides * 3 + s.activeIndex;
                newIndex = newIndex + s.loopedSlides;
                s.slideTo(newIndex, 0, false, true);
            }
            //Fix For Positive Oversliding
            else if ((s.params.slidesPerView === 'auto' && s.activeIndex >= s.loopedSlides * 2) || (s.activeIndex > s.slides.length - s.params.slidesPerView * 2)) {
                newIndex = -s.slides.length + s.activeIndex + s.loopedSlides;
                newIndex = newIndex + s.loopedSlides;
                s.slideTo(newIndex, 0, false, true);
            }
        };
        /*=========================
          Append/Prepend/Remove Slides
          ===========================*/
        s.appendSlide = function (slides) {
            if (s.params.loop) {
                s.destroyLoop();
            }
            if (typeof slides === 'object' && slides.length) {
                for (var i = 0; i < slides.length; i++) {
                    if (slides[i]) s.wrapper.append(slides[i]);
                }
            }
            else {
                s.wrapper.append(slides);
            }
            if (s.params.loop) {
                s.createLoop();
            }
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
        };
        s.prependSlide = function (slides) {
            if (s.params.loop) {
                s.destroyLoop();
            }
            var newActiveIndex = s.activeIndex + 1;
            if (typeof slides === 'object' && slides.length) {
                for (var i = 0; i < slides.length; i++) {
                    if (slides[i]) s.wrapper.prepend(slides[i]);
                }
                newActiveIndex = s.activeIndex + slides.length;
            }
            else {
                s.wrapper.prepend(slides);
            }
            if (s.params.loop) {
                s.createLoop();
            }
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
            s.slideTo(newActiveIndex, 0, false);
        };
        s.removeSlide = function (slidesIndexes) {
            if (s.params.loop) {
                s.destroyLoop();
                s.slides = s.wrapper.children('.' + s.params.slideClass);
            }
            var newActiveIndex = s.activeIndex,
                indexToRemove;
            if (typeof slidesIndexes === 'object' && slidesIndexes.length) {
                for (var i = 0; i < slidesIndexes.length; i++) {
                    indexToRemove = slidesIndexes[i];
                    if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
                    if (indexToRemove < newActiveIndex) newActiveIndex--;
                }
                newActiveIndex = Math.max(newActiveIndex, 0);
            }
            else {
                indexToRemove = slidesIndexes;
                if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
                if (indexToRemove < newActiveIndex) newActiveIndex--;
                newActiveIndex = Math.max(newActiveIndex, 0);
            }
        
            if (s.params.loop) {
                s.createLoop();
            }
        
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
            if (s.params.loop) {
                s.slideTo(newActiveIndex + s.loopedSlides, 0, false);
            }
            else {
                s.slideTo(newActiveIndex, 0, false);
            }
        
        };
        s.removeAllSlides = function () {
            var slidesIndexes = [];
            for (var i = 0; i < s.slides.length; i++) {
                slidesIndexes.push(i);
            }
            s.removeSlide(slidesIndexes);
        };
        

        /*=========================
          Effects
          ===========================*/
        s.effects = {
            fade: {
                setTranslate: function () {
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var offset = slide[0].swiperSlideOffset;
                        var tx = -offset;
                        if (!s.params.virtualTranslate) tx = tx - s.translate;
                        var ty = 0;
                        if (!s.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                        }
                        var slideOpacity = s.params.fade.crossFade ?
                                Math.max(1 - Math.abs(slide[0].progress), 0) :
                                1 + Math.min(Math.max(slide[0].progress, -1), 0);
                        slide
                            .css({
                                opacity: slideOpacity
                            })
                            .transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px)');
        
                    }
        
                },
                setTransition: function (duration) {
                    s.slides.transition(duration);
                    if (s.params.virtualTranslate && duration !== 0) {
                        var eventTriggered = false;
                        s.slides.transitionEnd(function () {
                            if (eventTriggered) return;
                            if (!s) return;
                            eventTriggered = true;
                            s.animating = false;
                            var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
                            for (var i = 0; i < triggerEvents.length; i++) {
                                s.wrapper.trigger(triggerEvents[i]);
                            }
                        });
                    }
                }
            },
            flip: {
                setTranslate: function () {
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var progress = slide[0].progress;
                        if (s.params.flip.limitRotation) {
                            progress = Math.max(Math.min(slide[0].progress, 1), -1);
                        }
                        var offset = slide[0].swiperSlideOffset;
                        var rotate = -180 * progress,
                            rotateY = rotate,
                            rotateX = 0,
                            tx = -offset,
                            ty = 0;
                        if (!s.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                            rotateX = -rotateY;
                            rotateY = 0;
                        }
                        else if (s.rtl) {
                            rotateY = -rotateY;
                        }
        
                        slide[0].style.zIndex = -Math.abs(Math.round(progress)) + s.slides.length;
        
                        if (s.params.flip.slideShadows) {
                            //Set shadows
                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
                            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
                        }
        
                        slide
                            .transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');
                    }
                },
                setTransition: function (duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                    if (s.params.virtualTranslate && duration !== 0) {
                        var eventTriggered = false;
                        s.slides.eq(s.activeIndex).transitionEnd(function () {
                            if (eventTriggered) return;
                            if (!s) return;
                            if (!$(this).hasClass(s.params.slideActiveClass)) return;
                            eventTriggered = true;
                            s.animating = false;
                            var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
                            for (var i = 0; i < triggerEvents.length; i++) {
                                s.wrapper.trigger(triggerEvents[i]);
                            }
                        });
                    }
                }
            },
            cube: {
                setTranslate: function () {
                    var wrapperRotate = 0, cubeShadow;
                    if (s.params.cube.shadow) {
                        if (s.isHorizontal()) {
                            cubeShadow = s.wrapper.find('.swiper-cube-shadow');
                            if (cubeShadow.length === 0) {
                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                                s.wrapper.append(cubeShadow);
                            }
                            cubeShadow.css({height: s.width + 'px'});
                        }
                        else {
                            cubeShadow = s.container.find('.swiper-cube-shadow');
                            if (cubeShadow.length === 0) {
                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                                s.container.append(cubeShadow);
                            }
                        }
                    }
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var slideAngle = i * 90;
                        var round = Math.floor(slideAngle / 360);
                        if (s.rtl) {
                            slideAngle = -slideAngle;
                            round = Math.floor(-slideAngle / 360);
                        }
                        var progress = Math.max(Math.min(slide[0].progress, 1), -1);
                        var tx = 0, ty = 0, tz = 0;
                        if (i % 4 === 0) {
                            tx = - round * 4 * s.size;
                            tz = 0;
                        }
                        else if ((i - 1) % 4 === 0) {
                            tx = 0;
                            tz = - round * 4 * s.size;
                        }
                        else if ((i - 2) % 4 === 0) {
                            tx = s.size + round * 4 * s.size;
                            tz = s.size;
                        }
                        else if ((i - 3) % 4 === 0) {
                            tx = - s.size;
                            tz = 3 * s.size + s.size * 4 * round;
                        }
                        if (s.rtl) {
                            tx = -tx;
                        }
        
                        if (!s.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                        }
        
                        var transform = 'rotateX(' + (s.isHorizontal() ? 0 : -slideAngle) + 'deg) rotateY(' + (s.isHorizontal() ? slideAngle : 0) + 'deg) translate3d(' + tx + 'px, ' + ty + 'px, ' + tz + 'px)';
                        if (progress <= 1 && progress > -1) {
                            wrapperRotate = i * 90 + progress * 90;
                            if (s.rtl) wrapperRotate = -i * 90 - progress * 90;
                        }
                        slide.transform(transform);
                        if (s.params.cube.slideShadows) {
                            //Set shadows
                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
                            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
                        }
                    }
                    s.wrapper.css({
                        '-webkit-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                        '-moz-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                        '-ms-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                        'transform-origin': '50% 50% -' + (s.size / 2) + 'px'
                    });
        
                    if (s.params.cube.shadow) {
                        if (s.isHorizontal()) {
                            cubeShadow.transform('translate3d(0px, ' + (s.width / 2 + s.params.cube.shadowOffset) + 'px, ' + (-s.width / 2) + 'px) rotateX(90deg) rotateZ(0deg) scale(' + (s.params.cube.shadowScale) + ')');
                        }
                        else {
                            var shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
                            var multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
                            var scale1 = s.params.cube.shadowScale,
                                scale2 = s.params.cube.shadowScale / multiplier,
                                offset = s.params.cube.shadowOffset;
                            cubeShadow.transform('scale3d(' + scale1 + ', 1, ' + scale2 + ') translate3d(0px, ' + (s.height / 2 + offset) + 'px, ' + (-s.height / 2 / scale2) + 'px) rotateX(-90deg)');
                        }
                    }
                    var zFactor = (s.isSafari || s.isUiWebView) ? (-s.size / 2) : 0;
                    s.wrapper.transform('translate3d(0px,0,' + zFactor + 'px) rotateX(' + (s.isHorizontal() ? 0 : wrapperRotate) + 'deg) rotateY(' + (s.isHorizontal() ? -wrapperRotate : 0) + 'deg)');
                },
                setTransition: function (duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                    if (s.params.cube.shadow && !s.isHorizontal()) {
                        s.container.find('.swiper-cube-shadow').transition(duration);
                    }
                }
            },
            coverflow: {
                setTranslate: function () {
                    var transform = s.translate;
                    var center = s.isHorizontal() ? -transform + s.width / 2 : -transform + s.height / 2;
                    var rotate = s.isHorizontal() ? s.params.coverflow.rotate: -s.params.coverflow.rotate;
                    var translate = s.params.coverflow.depth;
                    //Each slide offset from center
                    for (var i = 0, length = s.slides.length; i < length; i++) {
                        var slide = s.slides.eq(i);
                        var slideSize = s.slidesSizesGrid[i];
                        var slideOffset = slide[0].swiperSlideOffset;
                        var offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * s.params.coverflow.modifier;
        
                        var rotateY = s.isHorizontal() ? rotate * offsetMultiplier : 0;
                        var rotateX = s.isHorizontal() ? 0 : rotate * offsetMultiplier;
                        // var rotateZ = 0
                        var translateZ = -translate * Math.abs(offsetMultiplier);
        
                        var translateY = s.isHorizontal() ? 0 : s.params.coverflow.stretch * (offsetMultiplier);
                        var translateX = s.isHorizontal() ? s.params.coverflow.stretch * (offsetMultiplier) : 0;
        
                        //Fix for ultra small values
                        if (Math.abs(translateX) < 0.001) translateX = 0;
                        if (Math.abs(translateY) < 0.001) translateY = 0;
                        if (Math.abs(translateZ) < 0.001) translateZ = 0;
                        if (Math.abs(rotateY) < 0.001) rotateY = 0;
                        if (Math.abs(rotateX) < 0.001) rotateX = 0;
        
                        var slideTransform = 'translate3d(' + translateX + 'px,' + translateY + 'px,' + translateZ + 'px)  rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
        
                        slide.transform(slideTransform);
                        slide[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
                        if (s.params.coverflow.slideShadows) {
                            //Set shadows
                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            if (shadowBefore.length) shadowBefore[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
                            if (shadowAfter.length) shadowAfter[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
                        }
                    }
        
                    //Set correct perspective for IE10
                    if (s.browser.ie) {
                        var ws = s.wrapper[0].style;
                        ws.perspectiveOrigin = center + 'px 50%';
                    }
                },
                setTransition: function (duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                }
            }
        };
        

        /*=========================
          Images Lazy Loading
          ===========================*/
        s.lazy = {
            initialImageLoaded: false,
            loadImageInSlide: function (index, loadInDuplicate) {
                if (typeof index === 'undefined') return;
                if (typeof loadInDuplicate === 'undefined') loadInDuplicate = true;
                if (s.slides.length === 0) return;
        
                var slide = s.slides.eq(index);
                var img = slide.find('.' + s.params.lazyLoadingClass + ':not(.' + s.params.lazyStatusLoadedClass + '):not(.' + s.params.lazyStatusLoadingClass + ')');
                if (slide.hasClass(s.params.lazyLoadingClass) && !slide.hasClass(s.params.lazyStatusLoadedClass) && !slide.hasClass(s.params.lazyStatusLoadingClass)) {
                    img = img.add(slide[0]);
                }
                if (img.length === 0) return;
        
                img.each(function () {
                    var _img = $(this);
                    _img.addClass(s.params.lazyStatusLoadingClass);
                    var background = _img.attr('data-background');
                    var src = _img.attr('data-src'),
                        srcset = _img.attr('data-srcset'),
                        sizes = _img.attr('data-sizes');
                    s.loadImage(_img[0], (src || background), srcset, sizes, false, function () {
                        if (typeof s === 'undefined' || s === null || !s) return;
                        if (background) {
                            _img.css('background-image', 'url("' + background + '")');
                            _img.removeAttr('data-background');
                        }
                        else {
                            if (srcset) {
                                _img.attr('srcset', srcset);
                                _img.removeAttr('data-srcset');
                            }
                            if (sizes) {
                                _img.attr('sizes', sizes);
                                _img.removeAttr('data-sizes');
                            }
                            if (src) {
                                _img.attr('src', src);
                                _img.removeAttr('data-src');
                            }
        
                        }
        
                        _img.addClass(s.params.lazyStatusLoadedClass).removeClass(s.params.lazyStatusLoadingClass);
                        slide.find('.' + s.params.lazyPreloaderClass + ', .' + s.params.preloaderClass).remove();
                        if (s.params.loop && loadInDuplicate) {
                            var slideOriginalIndex = slide.attr('data-swiper-slide-index');
                            if (slide.hasClass(s.params.slideDuplicateClass)) {
                                var originalSlide = s.wrapper.children('[data-swiper-slide-index="' + slideOriginalIndex + '"]:not(.' + s.params.slideDuplicateClass + ')');
                                s.lazy.loadImageInSlide(originalSlide.index(), false);
                            }
                            else {
                                var duplicatedSlide = s.wrapper.children('.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + slideOriginalIndex + '"]');
                                s.lazy.loadImageInSlide(duplicatedSlide.index(), false);
                            }
                        }
                        s.emit('onLazyImageReady', s, slide[0], _img[0]);
                    });
        
                    s.emit('onLazyImageLoad', s, slide[0], _img[0]);
                });
        
            },
            load: function () {
                var i;
                var slidesPerView = s.params.slidesPerView;
                if (slidesPerView === 'auto') {
                    slidesPerView = 0;
                }
                if (!s.lazy.initialImageLoaded) s.lazy.initialImageLoaded = true;
                if (s.params.watchSlidesVisibility) {
                    s.wrapper.children('.' + s.params.slideVisibleClass).each(function () {
                        s.lazy.loadImageInSlide($(this).index());
                    });
                }
                else {
                    if (slidesPerView > 1) {
                        for (i = s.activeIndex; i < s.activeIndex + slidesPerView ; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                    }
                    else {
                        s.lazy.loadImageInSlide(s.activeIndex);
                    }
                }
                if (s.params.lazyLoadingInPrevNext) {
                    if (slidesPerView > 1 || (s.params.lazyLoadingInPrevNextAmount && s.params.lazyLoadingInPrevNextAmount > 1)) {
                        var amount = s.params.lazyLoadingInPrevNextAmount;
                        var spv = slidesPerView;
                        var maxIndex = Math.min(s.activeIndex + spv + Math.max(amount, spv), s.slides.length);
                        var minIndex = Math.max(s.activeIndex - Math.max(spv, amount), 0);
                        // Next Slides
                        for (i = s.activeIndex + slidesPerView; i < maxIndex; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                        // Prev Slides
                        for (i = minIndex; i < s.activeIndex ; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                    }
                    else {
                        var nextSlide = s.wrapper.children('.' + s.params.slideNextClass);
                        if (nextSlide.length > 0) s.lazy.loadImageInSlide(nextSlide.index());
        
                        var prevSlide = s.wrapper.children('.' + s.params.slidePrevClass);
                        if (prevSlide.length > 0) s.lazy.loadImageInSlide(prevSlide.index());
                    }
                }
            },
            onTransitionStart: function () {
                if (s.params.lazyLoading) {
                    if (s.params.lazyLoadingOnTransitionStart || (!s.params.lazyLoadingOnTransitionStart && !s.lazy.initialImageLoaded)) {
                        s.lazy.load();
                    }
                }
            },
            onTransitionEnd: function () {
                if (s.params.lazyLoading && !s.params.lazyLoadingOnTransitionStart) {
                    s.lazy.load();
                }
            }
        };
        

        /*=========================
          Scrollbar
          ===========================*/
        s.scrollbar = {
            isTouched: false,
            setDragPosition: function (e) {
                var sb = s.scrollbar;
                var x = 0, y = 0;
                var translate;
                var pointerPosition = s.isHorizontal() ?
                    ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageX : e.pageX || e.clientX) :
                    ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageY : e.pageY || e.clientY) ;
                var position = (pointerPosition) - sb.track.offset()[s.isHorizontal() ? 'left' : 'top'] - sb.dragSize / 2;
                var positionMin = -s.minTranslate() * sb.moveDivider;
                var positionMax = -s.maxTranslate() * sb.moveDivider;
                if (position < positionMin) {
                    position = positionMin;
                }
                else if (position > positionMax) {
                    position = positionMax;
                }
                position = -position / sb.moveDivider;
                s.updateProgress(position);
                s.setWrapperTranslate(position, true);
            },
            dragStart: function (e) {
                var sb = s.scrollbar;
                sb.isTouched = true;
                e.preventDefault();
                e.stopPropagation();
        
                sb.setDragPosition(e);
                clearTimeout(sb.dragTimeout);
        
                sb.track.transition(0);
                if (s.params.scrollbarHide) {
                    sb.track.css('opacity', 1);
                }
                s.wrapper.transition(100);
                sb.drag.transition(100);
                s.emit('onScrollbarDragStart', s);
            },
            dragMove: function (e) {
                var sb = s.scrollbar;
                if (!sb.isTouched) return;
                if (e.preventDefault) e.preventDefault();
                else e.returnValue = false;
                sb.setDragPosition(e);
                s.wrapper.transition(0);
                sb.track.transition(0);
                sb.drag.transition(0);
                s.emit('onScrollbarDragMove', s);
            },
            dragEnd: function (e) {
                var sb = s.scrollbar;
                if (!sb.isTouched) return;
                sb.isTouched = false;
                if (s.params.scrollbarHide) {
                    clearTimeout(sb.dragTimeout);
                    sb.dragTimeout = setTimeout(function () {
                        sb.track.css('opacity', 0);
                        sb.track.transition(400);
                    }, 1000);
        
                }
                s.emit('onScrollbarDragEnd', s);
                if (s.params.scrollbarSnapOnRelease) {
                    s.slideReset();
                }
            },
            draggableEvents: (function () {
                if ((s.params.simulateTouch === false && !s.support.touch)) return s.touchEventsDesktop;
                else return s.touchEvents;
            })(),
            enableDraggable: function () {
                var sb = s.scrollbar;
                var target = s.support.touch ? sb.track : document;
                $(sb.track).on(sb.draggableEvents.start, sb.dragStart);
                $(target).on(sb.draggableEvents.move, sb.dragMove);
                $(target).on(sb.draggableEvents.end, sb.dragEnd);
            },
            disableDraggable: function () {
                var sb = s.scrollbar;
                var target = s.support.touch ? sb.track : document;
                $(sb.track).off(sb.draggableEvents.start, sb.dragStart);
                $(target).off(sb.draggableEvents.move, sb.dragMove);
                $(target).off(sb.draggableEvents.end, sb.dragEnd);
            },
            set: function () {
                if (!s.params.scrollbar) return;
                var sb = s.scrollbar;
                sb.track = $(s.params.scrollbar);
                if (s.params.uniqueNavElements && typeof s.params.scrollbar === 'string' && sb.track.length > 1 && s.container.find(s.params.scrollbar).length === 1) {
                    sb.track = s.container.find(s.params.scrollbar);
                }
                sb.drag = sb.track.find('.swiper-scrollbar-drag');
                if (sb.drag.length === 0) {
                    sb.drag = $('<div class="swiper-scrollbar-drag"></div>');
                    sb.track.append(sb.drag);
                }
                sb.drag[0].style.width = '';
                sb.drag[0].style.height = '';
                sb.trackSize = s.isHorizontal() ? sb.track[0].offsetWidth : sb.track[0].offsetHeight;
        
                sb.divider = s.size / s.virtualSize;
                sb.moveDivider = sb.divider * (sb.trackSize / s.size);
                sb.dragSize = sb.trackSize * sb.divider;
        
                if (s.isHorizontal()) {
                    sb.drag[0].style.width = sb.dragSize + 'px';
                }
                else {
                    sb.drag[0].style.height = sb.dragSize + 'px';
                }
        
                if (sb.divider >= 1) {
                    sb.track[0].style.display = 'none';
                }
                else {
                    sb.track[0].style.display = '';
                }
                if (s.params.scrollbarHide) {
                    sb.track[0].style.opacity = 0;
                }
            },
            setTranslate: function () {
                if (!s.params.scrollbar) return;
                var diff;
                var sb = s.scrollbar;
                var translate = s.translate || 0;
                var newPos;
        
                var newSize = sb.dragSize;
                newPos = (sb.trackSize - sb.dragSize) * s.progress;
                if (s.rtl && s.isHorizontal()) {
                    newPos = -newPos;
                    if (newPos > 0) {
                        newSize = sb.dragSize - newPos;
                        newPos = 0;
                    }
                    else if (-newPos + sb.dragSize > sb.trackSize) {
                        newSize = sb.trackSize + newPos;
                    }
                }
                else {
                    if (newPos < 0) {
                        newSize = sb.dragSize + newPos;
                        newPos = 0;
                    }
                    else if (newPos + sb.dragSize > sb.trackSize) {
                        newSize = sb.trackSize - newPos;
                    }
                }
                if (s.isHorizontal()) {
                    if (s.support.transforms3d) {
                        sb.drag.transform('translate3d(' + (newPos) + 'px, 0, 0)');
                    }
                    else {
                        sb.drag.transform('translateX(' + (newPos) + 'px)');
                    }
                    sb.drag[0].style.width = newSize + 'px';
                }
                else {
                    if (s.support.transforms3d) {
                        sb.drag.transform('translate3d(0px, ' + (newPos) + 'px, 0)');
                    }
                    else {
                        sb.drag.transform('translateY(' + (newPos) + 'px)');
                    }
                    sb.drag[0].style.height = newSize + 'px';
                }
                if (s.params.scrollbarHide) {
                    clearTimeout(sb.timeout);
                    sb.track[0].style.opacity = 1;
                    sb.timeout = setTimeout(function () {
                        sb.track[0].style.opacity = 0;
                        sb.track.transition(400);
                    }, 1000);
                }
            },
            setTransition: function (duration) {
                if (!s.params.scrollbar) return;
                s.scrollbar.drag.transition(duration);
            }
        };
        

        /*=========================
          Controller
          ===========================*/
        s.controller = {
            LinearSpline: function (x, y) {
                var binarySearch = (function() {
                    var maxIndex, minIndex, guess;
                    return function(array, val) {
                        minIndex = -1;
                        maxIndex = array.length;
                        while (maxIndex - minIndex > 1)
                            if (array[guess = maxIndex + minIndex >> 1] <= val) {
                                minIndex = guess;
                            } else {
                                maxIndex = guess;
                            }
                        return maxIndex;
                    };
                })();
                this.x = x;
                this.y = y;
                this.lastIndex = x.length - 1;
                // Given an x value (x2), return the expected y2 value:
                // (x1,y1) is the known point before given value,
                // (x3,y3) is the known point after given value.
                var i1, i3;
                var l = this.x.length;
        
                this.interpolate = function (x2) {
                    if (!x2) return 0;
        
                    // Get the indexes of x1 and x3 (the array indexes before and after given x2):
                    i3 = binarySearch(this.x, x2);
                    i1 = i3 - 1;
        
                    // We have our indexes i1 & i3, so we can calculate already:
                    // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
                    return ((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) / (this.x[i3] - this.x[i1]) + this.y[i1];
                };
            },
            //xxx: for now i will just save one spline function to to
            getInterpolateFunction: function(c){
                if(!s.controller.spline) s.controller.spline = s.params.loop ?
                    new s.controller.LinearSpline(s.slidesGrid, c.slidesGrid) :
                    new s.controller.LinearSpline(s.snapGrid, c.snapGrid);
            },
            setTranslate: function (translate, byController) {
               var controlled = s.params.control;
               var multiplier, controlledTranslate;
               function setControlledTranslate(c) {
                    // this will create an Interpolate function based on the snapGrids
                    // x is the Grid of the scrolled scroller and y will be the controlled scroller
                    // it makes sense to create this only once and recall it for the interpolation
                    // the function does a lot of value caching for performance
                    translate = c.rtl && c.params.direction === 'horizontal' ? -s.translate : s.translate;
                    if (s.params.controlBy === 'slide') {
                        s.controller.getInterpolateFunction(c);
                        // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
                        // but it did not work out
                        controlledTranslate = -s.controller.spline.interpolate(-translate);
                    }
        
                    if(!controlledTranslate || s.params.controlBy === 'container'){
                        multiplier = (c.maxTranslate() - c.minTranslate()) / (s.maxTranslate() - s.minTranslate());
                        controlledTranslate = (translate - s.minTranslate()) * multiplier + c.minTranslate();
                    }
        
                    if (s.params.controlInverse) {
                        controlledTranslate = c.maxTranslate() - controlledTranslate;
                    }
                    c.updateProgress(controlledTranslate);
                    c.setWrapperTranslate(controlledTranslate, false, s);
                    c.updateActiveIndex();
               }
               if (Array.isArray(controlled)) {
                   for (var i = 0; i < controlled.length; i++) {
                       if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                           setControlledTranslate(controlled[i]);
                       }
                   }
               }
               else if (controlled instanceof Swiper && byController !== controlled) {
        
                   setControlledTranslate(controlled);
               }
            },
            setTransition: function (duration, byController) {
                var controlled = s.params.control;
                var i;
                function setControlledTransition(c) {
                    c.setWrapperTransition(duration, s);
                    if (duration !== 0) {
                        c.onTransitionStart();
                        c.wrapper.transitionEnd(function(){
                            if (!controlled) return;
                            if (c.params.loop && s.params.controlBy === 'slide') {
                                c.fixLoop();
                            }
                            c.onTransitionEnd();
        
                        });
                    }
                }
                if (Array.isArray(controlled)) {
                    for (i = 0; i < controlled.length; i++) {
                        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                            setControlledTransition(controlled[i]);
                        }
                    }
                }
                else if (controlled instanceof Swiper && byController !== controlled) {
                    setControlledTransition(controlled);
                }
            }
        };
        

        /*=========================
          Hash Navigation
          ===========================*/
        s.hashnav = {
            onHashCange: function (e, a) {
                var newHash = document.location.hash.replace('#', '');
                var activeSlideHash = s.slides.eq(s.activeIndex).attr('data-hash');
                if (newHash !== activeSlideHash) {
                    s.slideTo(s.wrapper.children('.' + s.params.slideClass + '[data-hash="' + (newHash) + '"]').index());
                }
            },
            attachEvents: function (detach) {
                var action = detach ? 'off' : 'on';
                $(window)[action]('hashchange', s.hashnav.onHashCange);
            },
            setHash: function () {
                if (!s.hashnav.initialized || !s.params.hashnav) return;
                if (s.params.replaceState && window.history && window.history.replaceState) {
                    window.history.replaceState(null, null, ('#' + s.slides.eq(s.activeIndex).attr('data-hash') || ''));
                } else {
                    var slide = s.slides.eq(s.activeIndex);
                    var hash = slide.attr('data-hash') || slide.attr('data-history');
                    document.location.hash = hash || '';
                }
            },
            init: function () {
                if (!s.params.hashnav || s.params.history) return;
                s.hashnav.initialized = true;
                var hash = document.location.hash.replace('#', '');
                if (hash) {
                    var speed = 0;
                    for (var i = 0, length = s.slides.length; i < length; i++) {
                        var slide = s.slides.eq(i);
                        var slideHash = slide.attr('data-hash') || slide.attr('data-history');
                        if (slideHash === hash && !slide.hasClass(s.params.slideDuplicateClass)) {
                            var index = slide.index();
                            s.slideTo(index, speed, s.params.runCallbacksOnInit, true);
                        }
                    }
                }
                if (s.params.hashnavWatchState) s.hashnav.attachEvents();
            },
            destroy: function () {
                if (s.params.hashnavWatchState) s.hashnav.attachEvents(true);
            }
        };
        

        /*=========================
          History Api with fallback to Hashnav
          ===========================*/
        s.history = {
            init: function () {
                if (!s.params.history) return;
                if (!window.history || !window.history.pushState) {
                    s.params.history = false;
                    s.params.hashnav = true;
                    return;
                }
                s.history.initialized = true;
                this.paths = this.getPathValues();
                if (!this.paths.key && !this.paths.value) return;
                this.scrollToSlide(0, this.paths.value, s.params.runCallbacksOnInit);
                if (!s.params.replaceState) {
                    window.addEventListener('popstate', this.setHistoryPopState);
                }
            },
            setHistoryPopState: function() {
                s.history.paths = s.history.getPathValues();
                s.history.scrollToSlide(s.params.speed, s.history.paths.value, false);
            },
            getPathValues: function() {
                var pathArray = window.location.pathname.slice(1).split('/');
                var total = pathArray.length;
                var key = pathArray[total - 2];
                var value = pathArray[total - 1];
                return { key: key, value: value };
            },
            setHistory: function (key, index) {
                if (!s.history.initialized || !s.params.history) return;
                var slide = s.slides.eq(index);
                var value = this.slugify(slide.attr('data-history'));
                if (!window.location.pathname.includes(key)) {
                    value = key + '/' + value;
                }
                if (s.params.replaceState) {
                    window.history.replaceState(null, null, value);
                } else {
                    window.history.pushState(null, null, value);
                }
            },
            slugify: function(text) {
                return text.toString().toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w\-]+/g, '')
                    .replace(/\-\-+/g, '-')
                    .replace(/^-+/, '')
                    .replace(/-+$/, '');
            },
            scrollToSlide: function(speed, value, runCallbacks) {
                if (value) {
                    for (var i = 0, length = s.slides.length; i < length; i++) {
                        var slide = s.slides.eq(i);
                        var slideHistory = this.slugify(slide.attr('data-history'));
                        if (slideHistory === value && !slide.hasClass(s.params.slideDuplicateClass)) {
                            var index = slide.index();
                            s.slideTo(index, speed, runCallbacks);
                        }
                    }
                } else {
                    s.slideTo(0, speed, runCallbacks);
                }
            }
        };
        

        /*=========================
          Keyboard Control
          ===========================*/
        function handleKeyboard(e) {
            if (e.originalEvent) e = e.originalEvent; //jquery fix
            var kc = e.keyCode || e.charCode;
            // Directions locks
            if (!s.params.allowSwipeToNext && (s.isHorizontal() && kc === 39 || !s.isHorizontal() && kc === 40)) {
                return false;
            }
            if (!s.params.allowSwipeToPrev && (s.isHorizontal() && kc === 37 || !s.isHorizontal() && kc === 38)) {
                return false;
            }
            if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
                return;
            }
            if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea')) {
                return;
            }
            if (kc === 37 || kc === 39 || kc === 38 || kc === 40) {
                var inView = false;
                //Check that swiper should be inside of visible area of window
                if (s.container.parents('.' + s.params.slideClass).length > 0 && s.container.parents('.' + s.params.slideActiveClass).length === 0) {
                    return;
                }
                var windowScroll = {
                    left: window.pageXOffset,
                    top: window.pageYOffset
                };
                var windowWidth = window.innerWidth;
                var windowHeight = window.innerHeight;
                var swiperOffset = s.container.offset();
                if (s.rtl) swiperOffset.left = swiperOffset.left - s.container[0].scrollLeft;
                var swiperCoord = [
                    [swiperOffset.left, swiperOffset.top],
                    [swiperOffset.left + s.width, swiperOffset.top],
                    [swiperOffset.left, swiperOffset.top + s.height],
                    [swiperOffset.left + s.width, swiperOffset.top + s.height]
                ];
                for (var i = 0; i < swiperCoord.length; i++) {
                    var point = swiperCoord[i];
                    if (
                        point[0] >= windowScroll.left && point[0] <= windowScroll.left + windowWidth &&
                        point[1] >= windowScroll.top && point[1] <= windowScroll.top + windowHeight
                    ) {
                        inView = true;
                    }
        
                }
                if (!inView) return;
            }
            if (s.isHorizontal()) {
                if (kc === 37 || kc === 39) {
                    if (e.preventDefault) e.preventDefault();
                    else e.returnValue = false;
                }
                if ((kc === 39 && !s.rtl) || (kc === 37 && s.rtl)) s.slideNext();
                if ((kc === 37 && !s.rtl) || (kc === 39 && s.rtl)) s.slidePrev();
            }
            else {
                if (kc === 38 || kc === 40) {
                    if (e.preventDefault) e.preventDefault();
                    else e.returnValue = false;
                }
                if (kc === 40) s.slideNext();
                if (kc === 38) s.slidePrev();
            }
            s.emit('onKeyPress', s, kc);
        }
        s.disableKeyboardControl = function () {
            s.params.keyboardControl = false;
            $(document).off('keydown', handleKeyboard);
        };
        s.enableKeyboardControl = function () {
            s.params.keyboardControl = true;
            $(document).on('keydown', handleKeyboard);
        };
        

        /*=========================
          Mousewheel Control
          ===========================*/
        s.mousewheel = {
            event: false,
            lastScrollTime: (new window.Date()).getTime()
        };
        function isEventSupported() {
            var eventName = 'onwheel';
            var isSupported = eventName in document;
        
            if (!isSupported) {
                var element = document.createElement('div');
                element.setAttribute(eventName, 'return;');
                isSupported = typeof element[eventName] === 'function';
            }
        
            if (!isSupported &&
                document.implementation &&
                document.implementation.hasFeature &&
                    // always returns true in newer browsers as per the standard.
                    // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
                document.implementation.hasFeature('', '') !== true ) {
                // This is the only way to test support for the `wheel` event in IE9+.
                isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
            }
        
            return isSupported;
        }
        /**
         * Mouse wheel (and 2-finger trackpad) support on the web sucks.  It is
         * complicated, thus this doc is long and (hopefully) detailed enough to answer
         * your questions.
         *
         * If you need to react to the mouse wheel in a predictable way, this code is
         * like your bestest friend. * hugs *
         *
         * As of today, there are 4 DOM event types you can listen to:
         *
         *   'wheel'                -- Chrome(31+), FF(17+), IE(9+)
         *   'mousewheel'           -- Chrome, IE(6+), Opera, Safari
         *   'MozMousePixelScroll'  -- FF(3.5 only!) (2010-2013) -- don't bother!
         *   'DOMMouseScroll'       -- FF(0.9.7+) since 2003
         *
         * So what to do?  The is the best:
         *
         *   normalizeWheel.getEventType();
         *
         * In your event callback, use this code to get sane interpretation of the
         * deltas.  This code will return an object with properties:
         *
         *   spinX   -- normalized spin speed (use for zoom) - x plane
         *   spinY   -- " - y plane
         *   pixelX  -- normalized distance (to pixels) - x plane
         *   pixelY  -- " - y plane
         *
         * Wheel values are provided by the browser assuming you are using the wheel to
         * scroll a web page by a number of lines or pixels (or pages).  Values can vary
         * significantly on different platforms and browsers, forgetting that you can
         * scroll at different speeds.  Some devices (like trackpads) emit more events
         * at smaller increments with fine granularity, and some emit massive jumps with
         * linear speed or acceleration.
         *
         * This code does its best to normalize the deltas for you:
         *
         *   - spin is trying to normalize how far the wheel was spun (or trackpad
         *     dragged).  This is super useful for zoom support where you want to
         *     throw away the chunky scroll steps on the PC and make those equal to
         *     the slow and smooth tiny steps on the Mac. Key data: This code tries to
         *     resolve a single slow step on a wheel to 1.
         *
         *   - pixel is normalizing the desired scroll delta in pixel units.  You'll
         *     get the crazy differences between browsers, but at least it'll be in
         *     pixels!
         *
         *   - positive value indicates scrolling DOWN/RIGHT, negative UP/LEFT.  This
         *     should translate to positive value zooming IN, negative zooming OUT.
         *     This matches the newer 'wheel' event.
         *
         * Why are there spinX, spinY (or pixels)?
         *
         *   - spinX is a 2-finger side drag on the trackpad, and a shift + wheel turn
         *     with a mouse.  It results in side-scrolling in the browser by default.
         *
         *   - spinY is what you expect -- it's the classic axis of a mouse wheel.
         *
         *   - I dropped spinZ/pixelZ.  It is supported by the DOM 3 'wheel' event and
         *     probably is by browsers in conjunction with fancy 3D controllers .. but
         *     you know.
         *
         * Implementation info:
         *
         * Examples of 'wheel' event if you scroll slowly (down) by one step with an
         * average mouse:
         *
         *   OS X + Chrome  (mouse)     -    4   pixel delta  (wheelDelta -120)
         *   OS X + Safari  (mouse)     -  N/A   pixel delta  (wheelDelta  -12)
         *   OS X + Firefox (mouse)     -    0.1 line  delta  (wheelDelta  N/A)
         *   Win8 + Chrome  (mouse)     -  100   pixel delta  (wheelDelta -120)
         *   Win8 + Firefox (mouse)     -    3   line  delta  (wheelDelta -120)
         *
         * On the trackpad:
         *
         *   OS X + Chrome  (trackpad)  -    2   pixel delta  (wheelDelta   -6)
         *   OS X + Firefox (trackpad)  -    1   pixel delta  (wheelDelta  N/A)
         *
         * On other/older browsers.. it's more complicated as there can be multiple and
         * also missing delta values.
         *
         * The 'wheel' event is more standard:
         *
         * http://www.w3.org/TR/DOM-Level-3-Events/#events-wheelevents
         *
         * The basics is that it includes a unit, deltaMode (pixels, lines, pages), and
         * deltaX, deltaY and deltaZ.  Some browsers provide other values to maintain
         * backward compatibility with older events.  Those other values help us
         * better normalize spin speed.  Example of what the browsers provide:
         *
         *                          | event.wheelDelta | event.detail
         *        ------------------+------------------+--------------
         *          Safari v5/OS X  |       -120       |       0
         *          Safari v5/Win7  |       -120       |       0
         *         Chrome v17/OS X  |       -120       |       0
         *         Chrome v17/Win7  |       -120       |       0
         *                IE9/Win7  |       -120       |   undefined
         *         Firefox v4/OS X  |     undefined    |       1
         *         Firefox v4/Win7  |     undefined    |       3
         *
         */
        function normalizeWheel( /*object*/ event ) /*object*/ {
            // Reasonable defaults
            var PIXEL_STEP = 10;
            var LINE_HEIGHT = 40;
            var PAGE_HEIGHT = 800;
        
            var sX = 0, sY = 0,       // spinX, spinY
                pX = 0, pY = 0;       // pixelX, pixelY
        
            // Legacy
            if( 'detail' in event ) {
                sY = event.detail;
            }
            if( 'wheelDelta' in event ) {
                sY = -event.wheelDelta / 120;
            }
            if( 'wheelDeltaY' in event ) {
                sY = -event.wheelDeltaY / 120;
            }
            if( 'wheelDeltaX' in event ) {
                sX = -event.wheelDeltaX / 120;
            }
        
            // side scrolling on FF with DOMMouseScroll
            if( 'axis' in event && event.axis === event.HORIZONTAL_AXIS ) {
                sX = sY;
                sY = 0;
            }
        
            pX = sX * PIXEL_STEP;
            pY = sY * PIXEL_STEP;
        
            if( 'deltaY' in event ) {
                pY = event.deltaY;
            }
            if( 'deltaX' in event ) {
                pX = event.deltaX;
            }
        
            if( (pX || pY) && event.deltaMode ) {
                if( event.deltaMode === 1 ) {          // delta in LINE units
                    pX *= LINE_HEIGHT;
                    pY *= LINE_HEIGHT;
                } else {                             // delta in PAGE units
                    pX *= PAGE_HEIGHT;
                    pY *= PAGE_HEIGHT;
                }
            }
        
            // Fall-back if spin cannot be determined
            if( pX && !sX ) {
                sX = (pX < 1) ? -1 : 1;
            }
            if( pY && !sY ) {
                sY = (pY < 1) ? -1 : 1;
            }
        
            return {
                spinX: sX,
                spinY: sY,
                pixelX: pX,
                pixelY: pY
            };
        }
        if (s.params.mousewheelControl) {
            /**
             * The best combination if you prefer spinX + spinY normalization.  It favors
             * the older DOMMouseScroll for Firefox, as FF does not include wheelDelta with
             * 'wheel' event, making spin speed determination impossible.
             */
            s.mousewheel.event = (navigator.userAgent.indexOf('firefox') > -1) ?
                'DOMMouseScroll' :
                isEventSupported() ?
                    'wheel' : 'mousewheel';
        }
        function handleMousewheel(e) {
            if (e.originalEvent) e = e.originalEvent; //jquery fix
            var delta = 0;
            var rtlFactor = s.rtl ? -1 : 1;
        
            var data = normalizeWheel( e );
        
            if (s.params.mousewheelForceToAxis) {
                if (s.isHorizontal()) {
                    if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = data.pixelX * rtlFactor;
                    else return;
                }
                else {
                    if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = data.pixelY;
                    else return;
                }
            }
            else {
                delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? - data.pixelX * rtlFactor : - data.pixelY;
            }
        
            if (delta === 0) return;
        
            if (s.params.mousewheelInvert) delta = -delta;
        
            if (!s.params.freeMode) {
                if ((new window.Date()).getTime() - s.mousewheel.lastScrollTime > 60) {
                    if (delta < 0) {
                        if ((!s.isEnd || s.params.loop) && !s.animating) {
                            s.slideNext();
                            s.emit('onScroll', s, e);
                        }
                        else if (s.params.mousewheelReleaseOnEdges) return true;
                    }
                    else {
                        if ((!s.isBeginning || s.params.loop) && !s.animating) {
                            s.slidePrev();
                            s.emit('onScroll', s, e);
                        }
                        else if (s.params.mousewheelReleaseOnEdges) return true;
                    }
                }
                s.mousewheel.lastScrollTime = (new window.Date()).getTime();
        
            }
            else {
                //Freemode or scrollContainer:
                var position = s.getWrapperTranslate() + delta * s.params.mousewheelSensitivity;
                var wasBeginning = s.isBeginning,
                    wasEnd = s.isEnd;
        
                if (position >= s.minTranslate()) position = s.minTranslate();
                if (position <= s.maxTranslate()) position = s.maxTranslate();
        
                s.setWrapperTransition(0);
                s.setWrapperTranslate(position);
                s.updateProgress();
                s.updateActiveIndex();
        
                if (!wasBeginning && s.isBeginning || !wasEnd && s.isEnd) {
                    s.updateClasses();
                }
        
                if (s.params.freeModeSticky) {
                    clearTimeout(s.mousewheel.timeout);
                    s.mousewheel.timeout = setTimeout(function () {
                        s.slideReset();
                    }, 300);
                }
                else {
                    if (s.params.lazyLoading && s.lazy) {
                        s.lazy.load();
                    }
                }
                // Emit event
                s.emit('onScroll', s, e);
        
                // Stop autoplay
                if (s.params.autoplay && s.params.autoplayDisableOnInteraction) s.stopAutoplay();
        
                // Return page scroll on edge positions
                if (position === 0 || position === s.maxTranslate()) return;
            }
        
            if (e.preventDefault) e.preventDefault();
            else e.returnValue = false;
            return false;
        }
        s.disableMousewheelControl = function () {
            if (!s.mousewheel.event) return false;
            var target = s.container;
            if (s.params.mousewheelEventsTarged !== 'container') {
                target = $(s.params.mousewheelEventsTarged);
            }
            target.off(s.mousewheel.event, handleMousewheel);
            s.params.mousewheelControl = false;
            return true;
        };
        
        s.enableMousewheelControl = function () {
            if (!s.mousewheel.event) return false;
            var target = s.container;
            if (s.params.mousewheelEventsTarged !== 'container') {
                target = $(s.params.mousewheelEventsTarged);
            }
            target.on(s.mousewheel.event, handleMousewheel);
            s.params.mousewheelControl = true;
            return true;
        };
        

        /*=========================
          Parallax
          ===========================*/
        function setParallaxTransform(el, progress) {
            el = $(el);
            var p, pX, pY;
            var rtlFactor = s.rtl ? -1 : 1;
        
            p = el.attr('data-swiper-parallax') || '0';
            pX = el.attr('data-swiper-parallax-x');
            pY = el.attr('data-swiper-parallax-y');
            if (pX || pY) {
                pX = pX || '0';
                pY = pY || '0';
            }
            else {
                if (s.isHorizontal()) {
                    pX = p;
                    pY = '0';
                }
                else {
                    pY = p;
                    pX = '0';
                }
            }
        
            if ((pX).indexOf('%') >= 0) {
                pX = parseInt(pX, 10) * progress * rtlFactor + '%';
            }
            else {
                pX = pX * progress * rtlFactor + 'px' ;
            }
            if ((pY).indexOf('%') >= 0) {
                pY = parseInt(pY, 10) * progress + '%';
            }
            else {
                pY = pY * progress + 'px' ;
            }
        
            el.transform('translate3d(' + pX + ', ' + pY + ',0px)');
        }
        s.parallax = {
            setTranslate: function () {
                s.container.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(){
                    setParallaxTransform(this, s.progress);
        
                });
                s.slides.each(function () {
                    var slide = $(this);
                    slide.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
                        var progress = Math.min(Math.max(slide[0].progress, -1), 1);
                        setParallaxTransform(this, progress);
                    });
                });
            },
            setTransition: function (duration) {
                if (typeof duration === 'undefined') duration = s.params.speed;
                s.container.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(){
                    var el = $(this);
                    var parallaxDuration = parseInt(el.attr('data-swiper-parallax-duration'), 10) || duration;
                    if (duration === 0) parallaxDuration = 0;
                    el.transition(parallaxDuration);
                });
            }
        };
        

        /*=========================
          Zoom
          ===========================*/
        s.zoom = {
            // "Global" Props
            scale: 1,
            currentScale: 1,
            isScaling: false,
            gesture: {
                slide: undefined,
                slideWidth: undefined,
                slideHeight: undefined,
                image: undefined,
                imageWrap: undefined,
                zoomMax: s.params.zoomMax
            },
            image: {
                isTouched: undefined,
                isMoved: undefined,
                currentX: undefined,
                currentY: undefined,
                minX: undefined,
                minY: undefined,
                maxX: undefined,
                maxY: undefined,
                width: undefined,
                height: undefined,
                startX: undefined,
                startY: undefined,
                touchesStart: {},
                touchesCurrent: {}
            },
            velocity: {
                x: undefined,
                y: undefined,
                prevPositionX: undefined,
                prevPositionY: undefined,
                prevTime: undefined
            },
            // Calc Scale From Multi-touches
            getDistanceBetweenTouches: function (e) {
                if (e.targetTouches.length < 2) return 1;
                var x1 = e.targetTouches[0].pageX,
                    y1 = e.targetTouches[0].pageY,
                    x2 = e.targetTouches[1].pageX,
                    y2 = e.targetTouches[1].pageY;
                var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                return distance;
            },
            // Events
            onGestureStart: function (e) {
                var z = s.zoom;
                if (!s.support.gestures) {
                    if (e.type !== 'touchstart' || e.type === 'touchstart' && e.targetTouches.length < 2) {
                        return;
                    }
                    z.gesture.scaleStart = z.getDistanceBetweenTouches(e);
                }
                if (!z.gesture.slide || !z.gesture.slide.length) {
                    z.gesture.slide = $(this);
                    if (z.gesture.slide.length === 0) z.gesture.slide = s.slides.eq(s.activeIndex);
                    z.gesture.image = z.gesture.slide.find('img, svg, canvas');
                    z.gesture.imageWrap = z.gesture.image.parent('.' + s.params.zoomContainerClass);
                    z.gesture.zoomMax = z.gesture.imageWrap.attr('data-swiper-zoom') || s.params.zoomMax ;
                    if (z.gesture.imageWrap.length === 0) {
                        z.gesture.image = undefined;
                        return;
                    }
                }
                z.gesture.image.transition(0);
                z.isScaling = true;
            },
            onGestureChange: function (e) {
                var z = s.zoom;
                if (!s.support.gestures) {
                    if (e.type !== 'touchmove' || e.type === 'touchmove' && e.targetTouches.length < 2) {
                        return;
                    }
                    z.gesture.scaleMove = z.getDistanceBetweenTouches(e);
                }
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                if (s.support.gestures) {
                    z.scale = e.scale * z.currentScale;
                }
                else {
                    z.scale = (z.gesture.scaleMove / z.gesture.scaleStart) * z.currentScale;
                }
                if (z.scale > z.gesture.zoomMax) {
                    z.scale = z.gesture.zoomMax - 1 + Math.pow((z.scale - z.gesture.zoomMax + 1), 0.5);
                }
                if (z.scale < s.params.zoomMin) {
                    z.scale =  s.params.zoomMin + 1 - Math.pow((s.params.zoomMin - z.scale + 1), 0.5);
                }
                z.gesture.image.transform('translate3d(0,0,0) scale(' + z.scale + ')');
            },
            onGestureEnd: function (e) {
                var z = s.zoom;
                if (!s.support.gestures) {
                    if (e.type !== 'touchend' || e.type === 'touchend' && e.changedTouches.length < 2) {
                        return;
                    }
                }
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                z.scale = Math.max(Math.min(z.scale, z.gesture.zoomMax), s.params.zoomMin);
                z.gesture.image.transition(s.params.speed).transform('translate3d(0,0,0) scale(' + z.scale + ')');
                z.currentScale = z.scale;
                z.isScaling = false;
                if (z.scale === 1) z.gesture.slide = undefined;
            },
            onTouchStart: function (s, e) {
                var z = s.zoom;
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                if (z.image.isTouched) return;
                if (s.device.os === 'android') e.preventDefault();
                z.image.isTouched = true;
                z.image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                z.image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
            },
            onTouchMove: function (e) {
                var z = s.zoom;
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                s.allowClick = false;
                if (!z.image.isTouched || !z.gesture.slide) return;
        
                if (!z.image.isMoved) {
                    z.image.width = z.gesture.image[0].offsetWidth;
                    z.image.height = z.gesture.image[0].offsetHeight;
                    z.image.startX = s.getTranslate(z.gesture.imageWrap[0], 'x') || 0;
                    z.image.startY = s.getTranslate(z.gesture.imageWrap[0], 'y') || 0;
                    z.gesture.slideWidth = z.gesture.slide[0].offsetWidth;
                    z.gesture.slideHeight = z.gesture.slide[0].offsetHeight;
                    z.gesture.imageWrap.transition(0);
                    if (s.rtl) z.image.startX = -z.image.startX;
                    if (s.rtl) z.image.startY = -z.image.startY;
                }
                // Define if we need image drag
                var scaledWidth = z.image.width * z.scale;
                var scaledHeight = z.image.height * z.scale;
        
                if (scaledWidth < z.gesture.slideWidth && scaledHeight < z.gesture.slideHeight) return;
        
                z.image.minX = Math.min((z.gesture.slideWidth / 2 - scaledWidth / 2), 0);
                z.image.maxX = -z.image.minX;
                z.image.minY = Math.min((z.gesture.slideHeight / 2 - scaledHeight / 2), 0);
                z.image.maxY = -z.image.minY;
        
                z.image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                z.image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        
                if (!z.image.isMoved && !z.isScaling) {
                    if (s.isHorizontal() &&
                        (Math.floor(z.image.minX) === Math.floor(z.image.startX) && z.image.touchesCurrent.x < z.image.touchesStart.x) ||
                        (Math.floor(z.image.maxX) === Math.floor(z.image.startX) && z.image.touchesCurrent.x > z.image.touchesStart.x)
                        ) {
                        z.image.isTouched = false;
                        return;
                    }
                    else if (!s.isHorizontal() &&
                        (Math.floor(z.image.minY) === Math.floor(z.image.startY) && z.image.touchesCurrent.y < z.image.touchesStart.y) ||
                        (Math.floor(z.image.maxY) === Math.floor(z.image.startY) && z.image.touchesCurrent.y > z.image.touchesStart.y)
                        ) {
                        z.image.isTouched = false;
                        return;
                    }
                }
                e.preventDefault();
                e.stopPropagation();
        
                z.image.isMoved = true;
                z.image.currentX = z.image.touchesCurrent.x - z.image.touchesStart.x + z.image.startX;
                z.image.currentY = z.image.touchesCurrent.y - z.image.touchesStart.y + z.image.startY;
        
                if (z.image.currentX < z.image.minX) {
                    z.image.currentX =  z.image.minX + 1 - Math.pow((z.image.minX - z.image.currentX + 1), 0.8);
                }
                if (z.image.currentX > z.image.maxX) {
                    z.image.currentX = z.image.maxX - 1 + Math.pow((z.image.currentX - z.image.maxX + 1), 0.8);
                }
        
                if (z.image.currentY < z.image.minY) {
                    z.image.currentY =  z.image.minY + 1 - Math.pow((z.image.minY - z.image.currentY + 1), 0.8);
                }
                if (z.image.currentY > z.image.maxY) {
                    z.image.currentY = z.image.maxY - 1 + Math.pow((z.image.currentY - z.image.maxY + 1), 0.8);
                }
        
                //Velocity
                if (!z.velocity.prevPositionX) z.velocity.prevPositionX = z.image.touchesCurrent.x;
                if (!z.velocity.prevPositionY) z.velocity.prevPositionY = z.image.touchesCurrent.y;
                if (!z.velocity.prevTime) z.velocity.prevTime = Date.now();
                z.velocity.x = (z.image.touchesCurrent.x - z.velocity.prevPositionX) / (Date.now() - z.velocity.prevTime) / 2;
                z.velocity.y = (z.image.touchesCurrent.y - z.velocity.prevPositionY) / (Date.now() - z.velocity.prevTime) / 2;
                if (Math.abs(z.image.touchesCurrent.x - z.velocity.prevPositionX) < 2) z.velocity.x = 0;
                if (Math.abs(z.image.touchesCurrent.y - z.velocity.prevPositionY) < 2) z.velocity.y = 0;
                z.velocity.prevPositionX = z.image.touchesCurrent.x;
                z.velocity.prevPositionY = z.image.touchesCurrent.y;
                z.velocity.prevTime = Date.now();
        
                z.gesture.imageWrap.transform('translate3d(' + z.image.currentX + 'px, ' + z.image.currentY + 'px,0)');
            },
            onTouchEnd: function (s, e) {
                var z = s.zoom;
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                if (!z.image.isTouched || !z.image.isMoved) {
                    z.image.isTouched = false;
                    z.image.isMoved = false;
                    return;
                }
                z.image.isTouched = false;
                z.image.isMoved = false;
                var momentumDurationX = 300;
                var momentumDurationY = 300;
                var momentumDistanceX = z.velocity.x * momentumDurationX;
                var newPositionX = z.image.currentX + momentumDistanceX;
                var momentumDistanceY = z.velocity.y * momentumDurationY;
                var newPositionY = z.image.currentY + momentumDistanceY;
        
                //Fix duration
                if (z.velocity.x !== 0) momentumDurationX = Math.abs((newPositionX - z.image.currentX) / z.velocity.x);
                if (z.velocity.y !== 0) momentumDurationY = Math.abs((newPositionY - z.image.currentY) / z.velocity.y);
                var momentumDuration = Math.max(momentumDurationX, momentumDurationY);
        
                z.image.currentX = newPositionX;
                z.image.currentY = newPositionY;
        
                // Define if we need image drag
                var scaledWidth = z.image.width * z.scale;
                var scaledHeight = z.image.height * z.scale;
                z.image.minX = Math.min((z.gesture.slideWidth / 2 - scaledWidth / 2), 0);
                z.image.maxX = -z.image.minX;
                z.image.minY = Math.min((z.gesture.slideHeight / 2 - scaledHeight / 2), 0);
                z.image.maxY = -z.image.minY;
                z.image.currentX = Math.max(Math.min(z.image.currentX, z.image.maxX), z.image.minX);
                z.image.currentY = Math.max(Math.min(z.image.currentY, z.image.maxY), z.image.minY);
        
                z.gesture.imageWrap.transition(momentumDuration).transform('translate3d(' + z.image.currentX + 'px, ' + z.image.currentY + 'px,0)');
            },
            onTransitionEnd: function (s) {
                var z = s.zoom;
                if (z.gesture.slide && s.previousIndex !== s.activeIndex) {
                    z.gesture.image.transform('translate3d(0,0,0) scale(1)');
                    z.gesture.imageWrap.transform('translate3d(0,0,0)');
                    z.gesture.slide = z.gesture.image = z.gesture.imageWrap = undefined;
                    z.scale = z.currentScale = 1;
                }
            },
            // Toggle Zoom
            toggleZoom: function (s, e) {
                var z = s.zoom;
                if (!z.gesture.slide) {
                    z.gesture.slide = s.clickedSlide ? $(s.clickedSlide) : s.slides.eq(s.activeIndex);
                    z.gesture.image = z.gesture.slide.find('img, svg, canvas');
                    z.gesture.imageWrap = z.gesture.image.parent('.' + s.params.zoomContainerClass);
                }
                if (!z.gesture.image || z.gesture.image.length === 0) return;
        
                var touchX, touchY, offsetX, offsetY, diffX, diffY, translateX, translateY, imageWidth, imageHeight, scaledWidth, scaledHeight, translateMinX, translateMinY, translateMaxX, translateMaxY, slideWidth, slideHeight;
        
                if (typeof z.image.touchesStart.x === 'undefined' && e) {
                    touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
                    touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
                }
                else {
                    touchX = z.image.touchesStart.x;
                    touchY = z.image.touchesStart.y;
                }
        
                if (z.scale && z.scale !== 1) {
                    // Zoom Out
                    z.scale = z.currentScale = 1;
                    z.gesture.imageWrap.transition(300).transform('translate3d(0,0,0)');
                    z.gesture.image.transition(300).transform('translate3d(0,0,0) scale(1)');
                    z.gesture.slide = undefined;
                }
                else {
                    // Zoom In
                    z.scale = z.currentScale = z.gesture.imageWrap.attr('data-swiper-zoom') || s.params.zoomMax;
                    if (e) {
                        slideWidth = z.gesture.slide[0].offsetWidth;
                        slideHeight = z.gesture.slide[0].offsetHeight;
                        offsetX = z.gesture.slide.offset().left;
                        offsetY = z.gesture.slide.offset().top;
                        diffX = offsetX + slideWidth/2 - touchX;
                        diffY = offsetY + slideHeight/2 - touchY;
        
                        imageWidth = z.gesture.image[0].offsetWidth;
                        imageHeight = z.gesture.image[0].offsetHeight;
                        scaledWidth = imageWidth * z.scale;
                        scaledHeight = imageHeight * z.scale;
        
                        translateMinX = Math.min((slideWidth / 2 - scaledWidth / 2), 0);
                        translateMinY = Math.min((slideHeight / 2 - scaledHeight / 2), 0);
                        translateMaxX = -translateMinX;
                        translateMaxY = -translateMinY;
        
                        translateX = diffX * z.scale;
                        translateY = diffY * z.scale;
        
                        if (translateX < translateMinX) {
                            translateX =  translateMinX;
                        }
                        if (translateX > translateMaxX) {
                            translateX = translateMaxX;
                        }
        
                        if (translateY < translateMinY) {
                            translateY =  translateMinY;
                        }
                        if (translateY > translateMaxY) {
                            translateY = translateMaxY;
                        }
                    }
                    else {
                        translateX = 0;
                        translateY = 0;
                    }
                    z.gesture.imageWrap.transition(300).transform('translate3d(' + translateX + 'px, ' + translateY + 'px,0)');
                    z.gesture.image.transition(300).transform('translate3d(0,0,0) scale(' + z.scale + ')');
                }
            },
            // Attach/Detach Events
            attachEvents: function (detach) {
                var action = detach ? 'off' : 'on';
        
                if (s.params.zoom) {
                    var target = s.slides;
                    var passiveListener = s.touchEvents.start === 'touchstart' && s.support.passiveListener && s.params.passiveListeners ? {passive: true, capture: false} : false;
                    // Scale image
                    if (s.support.gestures) {
                        s.slides[action]('gesturestart', s.zoom.onGestureStart, passiveListener);
                        s.slides[action]('gesturechange', s.zoom.onGestureChange, passiveListener);
                        s.slides[action]('gestureend', s.zoom.onGestureEnd, passiveListener);
                    }
                    else if (s.touchEvents.start === 'touchstart') {
                        s.slides[action](s.touchEvents.start, s.zoom.onGestureStart, passiveListener);
                        s.slides[action](s.touchEvents.move, s.zoom.onGestureChange, passiveListener);
                        s.slides[action](s.touchEvents.end, s.zoom.onGestureEnd, passiveListener);
                    }
        
                    // Move image
                    s[action]('touchStart', s.zoom.onTouchStart);
                    s.slides.each(function (index, slide){
                        if ($(slide).find('.' + s.params.zoomContainerClass).length > 0) {
                            $(slide)[action](s.touchEvents.move, s.zoom.onTouchMove);
                        }
                    });
                    s[action]('touchEnd', s.zoom.onTouchEnd);
        
                    // Scale Out
                    s[action]('transitionEnd', s.zoom.onTransitionEnd);
                    if (s.params.zoomToggle) {
                        s.on('doubleTap', s.zoom.toggleZoom);
                    }
                }
            },
            init: function () {
                s.zoom.attachEvents();
            },
            destroy: function () {
                s.zoom.attachEvents(true);
            }
        };
        

        /*=========================
          Plugins API. Collect all and init all plugins
          ===========================*/
        s._plugins = [];
        for (var plugin in s.plugins) {
            var p = s.plugins[plugin](s, s.params[plugin]);
            if (p) s._plugins.push(p);
        }
        // Method to call all plugins event/method
        s.callPlugins = function (eventName) {
            for (var i = 0; i < s._plugins.length; i++) {
                if (eventName in s._plugins[i]) {
                    s._plugins[i][eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
            }
        };
        

        /*=========================
          Events/Callbacks/Plugins Emitter
          ===========================*/
        function normalizeEventName (eventName) {
            if (eventName.indexOf('on') !== 0) {
                if (eventName[0] !== eventName[0].toUpperCase()) {
                    eventName = 'on' + eventName[0].toUpperCase() + eventName.substring(1);
                }
                else {
                    eventName = 'on' + eventName;
                }
            }
            return eventName;
        }
        s.emitterEventListeners = {
        
        };
        s.emit = function (eventName) {
            // Trigger callbacks
            if (s.params[eventName]) {
                s.params[eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
            }
            var i;
            // Trigger events
            if (s.emitterEventListeners[eventName]) {
                for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
                    s.emitterEventListeners[eventName][i](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
            }
            // Trigger plugins
            if (s.callPlugins) s.callPlugins(eventName, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        };
        s.on = function (eventName, handler) {
            eventName = normalizeEventName(eventName);
            if (!s.emitterEventListeners[eventName]) s.emitterEventListeners[eventName] = [];
            s.emitterEventListeners[eventName].push(handler);
            return s;
        };
        s.off = function (eventName, handler) {
            var i;
            eventName = normalizeEventName(eventName);
            if (typeof handler === 'undefined') {
                // Remove all handlers for such event
                s.emitterEventListeners[eventName] = [];
                return s;
            }
            if (!s.emitterEventListeners[eventName] || s.emitterEventListeners[eventName].length === 0) return;
            for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
                if(s.emitterEventListeners[eventName][i] === handler) s.emitterEventListeners[eventName].splice(i, 1);
            }
            return s;
        };
        s.once = function (eventName, handler) {
            eventName = normalizeEventName(eventName);
            var _handler = function () {
                handler(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
                s.off(eventName, _handler);
            };
            s.on(eventName, _handler);
            return s;
        };
        

        // Accessibility tools
        s.a11y = {
            makeFocusable: function ($el) {
                $el.attr('tabIndex', '0');
                return $el;
            },
            addRole: function ($el, role) {
                $el.attr('role', role);
                return $el;
            },
        
            addLabel: function ($el, label) {
                $el.attr('aria-label', label);
                return $el;
            },
        
            disable: function ($el) {
                $el.attr('aria-disabled', true);
                return $el;
            },
        
            enable: function ($el) {
                $el.attr('aria-disabled', false);
                return $el;
            },
        
            onEnterKey: function (event) {
                if (event.keyCode !== 13) return;
                if ($(event.target).is(s.params.nextButton)) {
                    s.onClickNext(event);
                    if (s.isEnd) {
                        s.a11y.notify(s.params.lastSlideMessage);
                    }
                    else {
                        s.a11y.notify(s.params.nextSlideMessage);
                    }
                }
                else if ($(event.target).is(s.params.prevButton)) {
                    s.onClickPrev(event);
                    if (s.isBeginning) {
                        s.a11y.notify(s.params.firstSlideMessage);
                    }
                    else {
                        s.a11y.notify(s.params.prevSlideMessage);
                    }
                }
                if ($(event.target).is('.' + s.params.bulletClass)) {
                    $(event.target)[0].click();
                }
            },
        
            liveRegion: $('<span class="' + s.params.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>'),
        
            notify: function (message) {
                var notification = s.a11y.liveRegion;
                if (notification.length === 0) return;
                notification.html('');
                notification.html(message);
            },
            init: function () {
                // Setup accessibility
                if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                    s.a11y.makeFocusable(s.nextButton);
                    s.a11y.addRole(s.nextButton, 'button');
                    s.a11y.addLabel(s.nextButton, s.params.nextSlideMessage);
                }
                if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                    s.a11y.makeFocusable(s.prevButton);
                    s.a11y.addRole(s.prevButton, 'button');
                    s.a11y.addLabel(s.prevButton, s.params.prevSlideMessage);
                }
        
                $(s.container).append(s.a11y.liveRegion);
            },
            initPagination: function () {
                if (s.params.pagination && s.params.paginationClickable && s.bullets && s.bullets.length) {
                    s.bullets.each(function () {
                        var bullet = $(this);
                        s.a11y.makeFocusable(bullet);
                        s.a11y.addRole(bullet, 'button');
                        s.a11y.addLabel(bullet, s.params.paginationBulletMessage.replace(/{{index}}/, bullet.index() + 1));
                    });
                }
            },
            destroy: function () {
                if (s.a11y.liveRegion && s.a11y.liveRegion.length > 0) s.a11y.liveRegion.remove();
            }
        };
        

        /*=========================
          Init/Destroy
          ===========================*/
        s.init = function () {
            if (s.params.loop) s.createLoop();
            s.updateContainerSize();
            s.updateSlidesSize();
            s.updatePagination();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
                if (s.params.scrollbarDraggable) {
                    s.scrollbar.enableDraggable();
                }
            }
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                if (!s.params.loop) s.updateProgress();
                s.effects[s.params.effect].setTranslate();
            }
            if (s.params.loop) {
                s.slideTo(s.params.initialSlide + s.loopedSlides, 0, s.params.runCallbacksOnInit);
            }
            else {
                s.slideTo(s.params.initialSlide, 0, s.params.runCallbacksOnInit);
                if (s.params.initialSlide === 0) {
                    if (s.parallax && s.params.parallax) s.parallax.setTranslate();
                    if (s.lazy && s.params.lazyLoading) {
                        s.lazy.load();
                        s.lazy.initialImageLoaded = true;
                    }
                }
            }
            s.attachEvents();
            if (s.params.observer && s.support.observer) {
                s.initObservers();
            }
            if (s.params.preloadImages && !s.params.lazyLoading) {
                s.preloadImages();
            }
            if (s.params.zoom && s.zoom) {
                s.zoom.init();
            }
            if (s.params.autoplay) {
                s.startAutoplay();
            }
            if (s.params.keyboardControl) {
                if (s.enableKeyboardControl) s.enableKeyboardControl();
            }
            if (s.params.mousewheelControl) {
                if (s.enableMousewheelControl) s.enableMousewheelControl();
            }
            // Deprecated hashnavReplaceState changed to replaceState for use in hashnav and history
            if (s.params.hashnavReplaceState) {
                s.params.replaceState = s.params.hashnavReplaceState;
            }
            if (s.params.history) {
                if (s.history) s.history.init();
            }
            if (s.params.hashnav) {
                if (s.hashnav) s.hashnav.init();
            }
            if (s.params.a11y && s.a11y) s.a11y.init();
            s.emit('onInit', s);
        };
        
        // Cleanup dynamic styles
        s.cleanupStyles = function () {
            // Container
            s.container.removeClass(s.classNames.join(' ')).removeAttr('style');
        
            // Wrapper
            s.wrapper.removeAttr('style');
        
            // Slides
            if (s.slides && s.slides.length) {
                s.slides
                    .removeClass([
                      s.params.slideVisibleClass,
                      s.params.slideActiveClass,
                      s.params.slideNextClass,
                      s.params.slidePrevClass
                    ].join(' '))
                    .removeAttr('style')
                    .removeAttr('data-swiper-column')
                    .removeAttr('data-swiper-row');
            }
        
            // Pagination/Bullets
            if (s.paginationContainer && s.paginationContainer.length) {
                s.paginationContainer.removeClass(s.params.paginationHiddenClass);
            }
            if (s.bullets && s.bullets.length) {
                s.bullets.removeClass(s.params.bulletActiveClass);
            }
        
            // Buttons
            if (s.params.prevButton) $(s.params.prevButton).removeClass(s.params.buttonDisabledClass);
            if (s.params.nextButton) $(s.params.nextButton).removeClass(s.params.buttonDisabledClass);
        
            // Scrollbar
            if (s.params.scrollbar && s.scrollbar) {
                if (s.scrollbar.track && s.scrollbar.track.length) s.scrollbar.track.removeAttr('style');
                if (s.scrollbar.drag && s.scrollbar.drag.length) s.scrollbar.drag.removeAttr('style');
            }
        };
        
        // Destroy
        s.destroy = function (deleteInstance, cleanupStyles) {
            // Detach evebts
            s.detachEvents();
            // Stop autoplay
            s.stopAutoplay();
            // Disable draggable
            if (s.params.scrollbar && s.scrollbar) {
                if (s.params.scrollbarDraggable) {
                    s.scrollbar.disableDraggable();
                }
            }
            // Destroy loop
            if (s.params.loop) {
                s.destroyLoop();
            }
            // Cleanup styles
            if (cleanupStyles) {
                s.cleanupStyles();
            }
            // Disconnect observer
            s.disconnectObservers();
        
            // Destroy zoom
            if (s.params.zoom && s.zoom) {
                s.zoom.destroy();
            }
            // Disable keyboard/mousewheel
            if (s.params.keyboardControl) {
                if (s.disableKeyboardControl) s.disableKeyboardControl();
            }
            if (s.params.mousewheelControl) {
                if (s.disableMousewheelControl) s.disableMousewheelControl();
            }
            // Disable a11y
            if (s.params.a11y && s.a11y) s.a11y.destroy();
            // Delete history popstate
            if (s.params.history && !s.params.replaceState) {
                window.removeEventListener('popstate', s.history.setHistoryPopState);
            }
            if (s.params.hashnav && s.hashnav)  {
                s.hashnav.destroy();
            }
            // Destroy callback
            s.emit('onDestroy');
            // Delete instance
            if (deleteInstance !== false) s = null;
        };
        
        s.init();
        

    
        // Return swiper instance
        return s;
    };
    

    /*==================================================
        Prototype
    ====================================================*/
    Swiper.prototype = {
        isSafari: (function () {
            var ua = window.navigator.userAgent.toLowerCase();
            return (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0);
        })(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
        isArray: function (arr) {
            return Object.prototype.toString.apply(arr) === '[object Array]';
        },
        /*==================================================
        Browser
        ====================================================*/
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: (window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1) || (window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1),
            lteIE9: (function() {
                // create temporary DIV
                var div = document.createElement('div');
                // add content to tmp DIV which is wrapped into the IE HTML conditional statement
                div.innerHTML = '<!--[if lte IE 9]><i></i><![endif]-->';
                // return true / false value based on what will browser render
                return div.getElementsByTagName('i').length === 1;
            })()
        },
        /*==================================================
        Devices
        ====================================================*/
        device: (function () {
            var ua = window.navigator.userAgent;
            var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
            var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
            var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
            var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
            return {
                ios: ipad || iphone || ipod,
                android: android
            };
        })(),
        /*==================================================
        Feature Detection
        ====================================================*/
        support: {
            touch : (window.Modernizr && Modernizr.touch === true) || (function () {
                return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
            })(),
    
            transforms3d : (window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
                var div = document.createElement('div').style;
                return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
            })(),
    
            flexbox: (function () {
                var div = document.createElement('div').style;
                var styles = ('alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient').split(' ');
                for (var i = 0; i < styles.length; i++) {
                    if (styles[i] in div) return true;
                }
            })(),
    
            observer: (function () {
                return ('MutationObserver' in window || 'WebkitMutationObserver' in window);
            })(),
    
            passiveListener: (function () {
                var supportsPassive = false;
                try {
                    var opts = Object.defineProperty({}, 'passive', {
                        get: function() {
                            supportsPassive = true;
                        }
                    });
                    window.addEventListener('testPassiveListener', null, opts);
                } catch (e) {}
                return supportsPassive;
            })(),
    
            gestures: (function () {
                return 'ongesturestart' in window;
            })()
        },
        /*==================================================
        Plugins
        ====================================================*/
        plugins: {}
    };
    

    /*===========================
    Dom7 Library
    ===========================*/
    var Dom7 = (function () {
        var Dom7 = function (arr) {
            var _this = this, i = 0;
            // Create array-like object
            for (i = 0; i < arr.length; i++) {
                _this[i] = arr[i];
            }
            _this.length = arr.length;
            // Return collection with methods
            return this;
        };
        var $ = function (selector, context) {
            var arr = [], i = 0;
            if (selector && !context) {
                if (selector instanceof Dom7) {
                    return selector;
                }
            }
            if (selector) {
                // String
                if (typeof selector === 'string') {
                    var els, tempParent, html = selector.trim();
                    if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
                        var toCreate = 'div';
                        if (html.indexOf('<li') === 0) toCreate = 'ul';
                        if (html.indexOf('<tr') === 0) toCreate = 'tbody';
                        if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
                        if (html.indexOf('<tbody') === 0) toCreate = 'table';
                        if (html.indexOf('<option') === 0) toCreate = 'select';
                        tempParent = document.createElement(toCreate);
                        tempParent.innerHTML = selector;
                        for (i = 0; i < tempParent.childNodes.length; i++) {
                            arr.push(tempParent.childNodes[i]);
                        }
                    }
                    else {
                        if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
                            // Pure ID selector
                            els = [document.getElementById(selector.split('#')[1])];
                        }
                        else {
                            // Other selectors
                            els = (context || document).querySelectorAll(selector);
                        }
                        for (i = 0; i < els.length; i++) {
                            if (els[i]) arr.push(els[i]);
                        }
                    }
                }
                // Node/element
                else if (selector.nodeType || selector === window || selector === document) {
                    arr.push(selector);
                }
                //Array of elements or instance of Dom
                else if (selector.length > 0 && selector[0].nodeType) {
                    for (i = 0; i < selector.length; i++) {
                        arr.push(selector[i]);
                    }
                }
            }
            return new Dom7(arr);
        };
        Dom7.prototype = {
            // Classes and attriutes
            addClass: function (className) {
                if (typeof className === 'undefined') {
                    return this;
                }
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.add(classes[i]);
                    }
                }
                return this;
            },
            removeClass: function (className) {
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.remove(classes[i]);
                    }
                }
                return this;
            },
            hasClass: function (className) {
                if (!this[0]) return false;
                else return this[0].classList.contains(className);
            },
            toggleClass: function (className) {
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.toggle(classes[i]);
                    }
                }
                return this;
            },
            attr: function (attrs, value) {
                if (arguments.length === 1 && typeof attrs === 'string') {
                    // Get attr
                    if (this[0]) return this[0].getAttribute(attrs);
                    else return undefined;
                }
                else {
                    // Set attrs
                    for (var i = 0; i < this.length; i++) {
                        if (arguments.length === 2) {
                            // String
                            this[i].setAttribute(attrs, value);
                        }
                        else {
                            // Object
                            for (var attrName in attrs) {
                                this[i][attrName] = attrs[attrName];
                                this[i].setAttribute(attrName, attrs[attrName]);
                            }
                        }
                    }
                    return this;
                }
            },
            removeAttr: function (attr) {
                for (var i = 0; i < this.length; i++) {
                    this[i].removeAttribute(attr);
                }
                return this;
            },
            data: function (key, value) {
                if (typeof value === 'undefined') {
                    // Get value
                    if (this[0]) {
                        var dataKey = this[0].getAttribute('data-' + key);
                        if (dataKey) return dataKey;
                        else if (this[0].dom7ElementDataStorage && (key in this[0].dom7ElementDataStorage)) return this[0].dom7ElementDataStorage[key];
                        else return undefined;
                    }
                    else return undefined;
                }
                else {
                    // Set value
                    for (var i = 0; i < this.length; i++) {
                        var el = this[i];
                        if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
                        el.dom7ElementDataStorage[key] = value;
                    }
                    return this;
                }
            },
            // Transforms
            transform : function (transform) {
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
                }
                return this;
            },
            transition: function (duration) {
                if (typeof duration !== 'string') {
                    duration = duration + 'ms';
                }
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
                }
                return this;
            },
            //Events
            on: function (eventName, targetSelector, listener, capture) {
                function handleLiveEvent(e) {
                    var target = e.target;
                    if ($(target).is(targetSelector)) listener.call(target, e);
                    else {
                        var parents = $(target).parents();
                        for (var k = 0; k < parents.length; k++) {
                            if ($(parents[k]).is(targetSelector)) listener.call(parents[k], e);
                        }
                    }
                }
                var events = eventName.split(' ');
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof targetSelector === 'function' || targetSelector === false) {
                        // Usual events
                        if (typeof targetSelector === 'function') {
                            listener = arguments[1];
                            capture = arguments[2] || false;
                        }
                        for (j = 0; j < events.length; j++) {
                            this[i].addEventListener(events[j], listener, capture);
                        }
                    }
                    else {
                        //Live events
                        for (j = 0; j < events.length; j++) {
                            if (!this[i].dom7LiveListeners) this[i].dom7LiveListeners = [];
                            this[i].dom7LiveListeners.push({listener: listener, liveListener: handleLiveEvent});
                            this[i].addEventListener(events[j], handleLiveEvent, capture);
                        }
                    }
                }
    
                return this;
            },
            off: function (eventName, targetSelector, listener, capture) {
                var events = eventName.split(' ');
                for (var i = 0; i < events.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        if (typeof targetSelector === 'function' || targetSelector === false) {
                            // Usual events
                            if (typeof targetSelector === 'function') {
                                listener = arguments[1];
                                capture = arguments[2] || false;
                            }
                            this[j].removeEventListener(events[i], listener, capture);
                        }
                        else {
                            // Live event
                            if (this[j].dom7LiveListeners) {
                                for (var k = 0; k < this[j].dom7LiveListeners.length; k++) {
                                    if (this[j].dom7LiveListeners[k].listener === listener) {
                                        this[j].removeEventListener(events[i], this[j].dom7LiveListeners[k].liveListener, capture);
                                    }
                                }
                            }
                        }
                    }
                }
                return this;
            },
            once: function (eventName, targetSelector, listener, capture) {
                var dom = this;
                if (typeof targetSelector === 'function') {
                    targetSelector = false;
                    listener = arguments[1];
                    capture = arguments[2];
                }
                function proxy(e) {
                    listener(e);
                    dom.off(eventName, targetSelector, proxy, capture);
                }
                dom.on(eventName, targetSelector, proxy, capture);
            },
            trigger: function (eventName, eventData) {
                for (var i = 0; i < this.length; i++) {
                    var evt;
                    try {
                        evt = new window.CustomEvent(eventName, {detail: eventData, bubbles: true, cancelable: true});
                    }
                    catch (e) {
                        evt = document.createEvent('Event');
                        evt.initEvent(eventName, true, true);
                        evt.detail = eventData;
                    }
                    this[i].dispatchEvent(evt);
                }
                return this;
            },
            transitionEnd: function (callback) {
                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
                    i, j, dom = this;
                function fireCallBack(e) {
                    /*jshint validthis:true */
                    if (e.target !== this) return;
                    callback.call(this, e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            },
            // Sizing/Styles
            width: function () {
                if (this[0] === window) {
                    return window.innerWidth;
                }
                else {
                    if (this.length > 0) {
                        return parseFloat(this.css('width'));
                    }
                    else {
                        return null;
                    }
                }
            },
            outerWidth: function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins)
                        return this[0].offsetWidth + parseFloat(this.css('margin-right')) + parseFloat(this.css('margin-left'));
                    else
                        return this[0].offsetWidth;
                }
                else return null;
            },
            height: function () {
                if (this[0] === window) {
                    return window.innerHeight;
                }
                else {
                    if (this.length > 0) {
                        return parseFloat(this.css('height'));
                    }
                    else {
                        return null;
                    }
                }
            },
            outerHeight: function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins)
                        return this[0].offsetHeight + parseFloat(this.css('margin-top')) + parseFloat(this.css('margin-bottom'));
                    else
                        return this[0].offsetHeight;
                }
                else return null;
            },
            offset: function () {
                if (this.length > 0) {
                    var el = this[0];
                    var box = el.getBoundingClientRect();
                    var body = document.body;
                    var clientTop  = el.clientTop  || body.clientTop  || 0;
                    var clientLeft = el.clientLeft || body.clientLeft || 0;
                    var scrollTop  = window.pageYOffset || el.scrollTop;
                    var scrollLeft = window.pageXOffset || el.scrollLeft;
                    return {
                        top: box.top  + scrollTop  - clientTop,
                        left: box.left + scrollLeft - clientLeft
                    };
                }
                else {
                    return null;
                }
            },
            css: function (props, value) {
                var i;
                if (arguments.length === 1) {
                    if (typeof props === 'string') {
                        if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
                    }
                    else {
                        for (i = 0; i < this.length; i++) {
                            for (var prop in props) {
                                this[i].style[prop] = props[prop];
                            }
                        }
                        return this;
                    }
                }
                if (arguments.length === 2 && typeof props === 'string') {
                    for (i = 0; i < this.length; i++) {
                        this[i].style[props] = value;
                    }
                    return this;
                }
                return this;
            },
    
            //Dom manipulation
            each: function (callback) {
                for (var i = 0; i < this.length; i++) {
                    callback.call(this[i], i, this[i]);
                }
                return this;
            },
            html: function (html) {
                if (typeof html === 'undefined') {
                    return this[0] ? this[0].innerHTML : undefined;
                }
                else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].innerHTML = html;
                    }
                    return this;
                }
            },
            text: function (text) {
                if (typeof text === 'undefined') {
                    if (this[0]) {
                        return this[0].textContent.trim();
                    }
                    else return null;
                }
                else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].textContent = text;
                    }
                    return this;
                }
            },
            is: function (selector) {
                if (!this[0]) return false;
                var compareWith, i;
                if (typeof selector === 'string') {
                    var el = this[0];
                    if (el === document) return selector === document;
                    if (el === window) return selector === window;
    
                    if (el.matches) return el.matches(selector);
                    else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
                    else if (el.mozMatchesSelector) return el.mozMatchesSelector(selector);
                    else if (el.msMatchesSelector) return el.msMatchesSelector(selector);
                    else {
                        compareWith = $(selector);
                        for (i = 0; i < compareWith.length; i++) {
                            if (compareWith[i] === this[0]) return true;
                        }
                        return false;
                    }
                }
                else if (selector === document) return this[0] === document;
                else if (selector === window) return this[0] === window;
                else {
                    if (selector.nodeType || selector instanceof Dom7) {
                        compareWith = selector.nodeType ? [selector] : selector;
                        for (i = 0; i < compareWith.length; i++) {
                            if (compareWith[i] === this[0]) return true;
                        }
                        return false;
                    }
                    return false;
                }
    
            },
            index: function () {
                if (this[0]) {
                    var child = this[0];
                    var i = 0;
                    while ((child = child.previousSibling) !== null) {
                        if (child.nodeType === 1) i++;
                    }
                    return i;
                }
                else return undefined;
            },
            eq: function (index) {
                if (typeof index === 'undefined') return this;
                var length = this.length;
                var returnIndex;
                if (index > length - 1) {
                    return new Dom7([]);
                }
                if (index < 0) {
                    returnIndex = length + index;
                    if (returnIndex < 0) return new Dom7([]);
                    else return new Dom7([this[returnIndex]]);
                }
                return new Dom7([this[index]]);
            },
            append: function (newChild) {
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof newChild === 'string') {
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = newChild;
                        while (tempDiv.firstChild) {
                            this[i].appendChild(tempDiv.firstChild);
                        }
                    }
                    else if (newChild instanceof Dom7) {
                        for (j = 0; j < newChild.length; j++) {
                            this[i].appendChild(newChild[j]);
                        }
                    }
                    else {
                        this[i].appendChild(newChild);
                    }
                }
                return this;
            },
            prepend: function (newChild) {
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof newChild === 'string') {
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = newChild;
                        for (j = tempDiv.childNodes.length - 1; j >= 0; j--) {
                            this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
                        }
                        // this[i].insertAdjacentHTML('afterbegin', newChild);
                    }
                    else if (newChild instanceof Dom7) {
                        for (j = 0; j < newChild.length; j++) {
                            this[i].insertBefore(newChild[j], this[i].childNodes[0]);
                        }
                    }
                    else {
                        this[i].insertBefore(newChild, this[i].childNodes[0]);
                    }
                }
                return this;
            },
            insertBefore: function (selector) {
                var before = $(selector);
                for (var i = 0; i < this.length; i++) {
                    if (before.length === 1) {
                        before[0].parentNode.insertBefore(this[i], before[0]);
                    }
                    else if (before.length > 1) {
                        for (var j = 0; j < before.length; j++) {
                            before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
                        }
                    }
                }
            },
            insertAfter: function (selector) {
                var after = $(selector);
                for (var i = 0; i < this.length; i++) {
                    if (after.length === 1) {
                        after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
                    }
                    else if (after.length > 1) {
                        for (var j = 0; j < after.length; j++) {
                            after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
                        }
                    }
                }
            },
            next: function (selector) {
                if (this.length > 0) {
                    if (selector) {
                        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) return new Dom7([this[0].nextElementSibling]);
                        else return new Dom7([]);
                    }
                    else {
                        if (this[0].nextElementSibling) return new Dom7([this[0].nextElementSibling]);
                        else return new Dom7([]);
                    }
                }
                else return new Dom7([]);
            },
            nextAll: function (selector) {
                var nextEls = [];
                var el = this[0];
                if (!el) return new Dom7([]);
                while (el.nextElementSibling) {
                    var next = el.nextElementSibling;
                    if (selector) {
                        if($(next).is(selector)) nextEls.push(next);
                    }
                    else nextEls.push(next);
                    el = next;
                }
                return new Dom7(nextEls);
            },
            prev: function (selector) {
                if (this.length > 0) {
                    if (selector) {
                        if (this[0].previousElementSibling && $(this[0].previousElementSibling).is(selector)) return new Dom7([this[0].previousElementSibling]);
                        else return new Dom7([]);
                    }
                    else {
                        if (this[0].previousElementSibling) return new Dom7([this[0].previousElementSibling]);
                        else return new Dom7([]);
                    }
                }
                else return new Dom7([]);
            },
            prevAll: function (selector) {
                var prevEls = [];
                var el = this[0];
                if (!el) return new Dom7([]);
                while (el.previousElementSibling) {
                    var prev = el.previousElementSibling;
                    if (selector) {
                        if($(prev).is(selector)) prevEls.push(prev);
                    }
                    else prevEls.push(prev);
                    el = prev;
                }
                return new Dom7(prevEls);
            },
            parent: function (selector) {
                var parents = [];
                for (var i = 0; i < this.length; i++) {
                    if (selector) {
                        if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
                    }
                    else {
                        parents.push(this[i].parentNode);
                    }
                }
                return $($.unique(parents));
            },
            parents: function (selector) {
                var parents = [];
                for (var i = 0; i < this.length; i++) {
                    var parent = this[i].parentNode;
                    while (parent) {
                        if (selector) {
                            if ($(parent).is(selector)) parents.push(parent);
                        }
                        else {
                            parents.push(parent);
                        }
                        parent = parent.parentNode;
                    }
                }
                return $($.unique(parents));
            },
            find : function (selector) {
                var foundElements = [];
                for (var i = 0; i < this.length; i++) {
                    var found = this[i].querySelectorAll(selector);
                    for (var j = 0; j < found.length; j++) {
                        foundElements.push(found[j]);
                    }
                }
                return new Dom7(foundElements);
            },
            children: function (selector) {
                var children = [];
                for (var i = 0; i < this.length; i++) {
                    var childNodes = this[i].childNodes;
    
                    for (var j = 0; j < childNodes.length; j++) {
                        if (!selector) {
                            if (childNodes[j].nodeType === 1) children.push(childNodes[j]);
                        }
                        else {
                            if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) children.push(childNodes[j]);
                        }
                    }
                }
                return new Dom7($.unique(children));
            },
            remove: function () {
                for (var i = 0; i < this.length; i++) {
                    if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
                }
                return this;
            },
            add: function () {
                var dom = this;
                var i, j;
                for (i = 0; i < arguments.length; i++) {
                    var toAdd = $(arguments[i]);
                    for (j = 0; j < toAdd.length; j++) {
                        dom[dom.length] = toAdd[j];
                        dom.length++;
                    }
                }
                return dom;
            }
        };
        $.fn = Dom7.prototype;
        $.unique = function (arr) {
            var unique = [];
            for (var i = 0; i < arr.length; i++) {
                if (unique.indexOf(arr[i]) === -1) unique.push(arr[i]);
            }
            return unique;
        };
    
        return $;
    })();
    

    /*===========================
     Get Dom libraries
     ===========================*/
    var swiperDomPlugins = ['jQuery', 'Zepto', 'Dom7'];
    for (var i = 0; i < swiperDomPlugins.length; i++) {
    	if (window[swiperDomPlugins[i]]) {
    		addLibraryPlugin(window[swiperDomPlugins[i]]);
    	}
    }
    // Required DOM Plugins
    var domLib;
    if (typeof Dom7 === 'undefined') {
    	domLib = window.Dom7 || window.Zepto || window.jQuery;
    }
    else {
    	domLib = Dom7;
    }
    

    /*===========================
    Add .swiper plugin from Dom libraries
    ===========================*/
    function addLibraryPlugin(lib) {
        lib.fn.swiper = function (params) {
            var firstInstance;
            lib(this).each(function () {
                var s = new Swiper(this, params);
                if (!firstInstance) firstInstance = s;
            });
            return firstInstance;
        };
    }
    
    if (domLib) {
        if (!('transitionEnd' in domLib.fn)) {
            domLib.fn.transitionEnd = function (callback) {
                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
                    i, j, dom = this;
                function fireCallBack(e) {
                    /*jshint validthis:true */
                    if (e.target !== this) return;
                    callback.call(this, e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            };
        }
        if (!('transform' in domLib.fn)) {
            domLib.fn.transform = function (transform) {
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
                }
                return this;
            };
        }
        if (!('transition' in domLib.fn)) {
            domLib.fn.transition = function (duration) {
                if (typeof duration !== 'string') {
                    duration = duration + 'ms';
                }
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
                }
                return this;
            };
        }
        if (!('outerWidth' in domLib.fn)) {
            domLib.fn.outerWidth = function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins)
                        return this[0].offsetWidth + parseFloat(this.css('margin-right')) + parseFloat(this.css('margin-left'));
                    else
                        return this[0].offsetWidth;
                }
                else return null;
            };
        }
    }
    

    window.Swiper = Swiper;
})();

/*===========================
Swiper AMD Export
===========================*/
if (typeof(module) !== 'undefined')
{
    module.exports = window.Swiper;
}
else if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';
        return window.Swiper;
    });
}

//# sourceMappingURL=maps/swiper.js.map
