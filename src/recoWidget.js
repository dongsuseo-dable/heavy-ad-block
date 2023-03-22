const widgetScript = document.createElement('script');
widgetScript.textContent = `
  var selector = "#web-component"; //write css selector
  var widget_id = "1oVgzJj7"; // put widget id [AD]:GlYqNRnl [RECO]:1oVgzJj7
  var input_position = ['before','after','last','replace'][2]; //choose 0,1,2,3

  var dable_el = document.createElement('div');
  dable_el.setAttribute('id', 'dablewidget_' + widget_id);
  dable_el.setAttribute('data-widget_id', widget_id);

  var dable_target = document.querySelector(selector);
  if (!dable_target) console.error("nothing found with this selector. check again : ", selector);

  var dable_execute = {
    'last' : function () {
      dable_target.appendChild(dable_el);
    },
    'before' : function () {
      dable_target.parentNode.insertBefore(dable_el, dable_target);
    },
    'after' : function () {
      dable_target.parentNode.insertBefore(dable_el, dable_target.nextSibling);
    },
    'replace' : function () {
      dable_target.parentNode.insertBefore(dable_el, dable_target.nextSibling); 
      dable_target.parentNode.removeChild(dable_target);
    },
  };
  dable_execute[input_position]();

  (function(d,a,b,l,e,_) {
    // d: window
    // a: document
    // b: "dable"
    // l: "script"

    if (d[b]&&Array.isArray(d[b].q)) {
      console.error("site contains old widget script. change it to new one or add log collection script at the top of the site.");
    } else if (d[b]&&!Array.isArray(d[b].q)) {
      return;
    }

    d[b] = function () {
      (d[b].q = d[b].q || []).push(arguments);
    };
    
    e = a.createElement(l);
    e.async = 1;
    e.charset = 'utf-8';
    e.src = '//static.dable.io/dist/plugin.min.js'; 
    
    _ = a.getElementsByTagName(l)[0];
    _.parentNode.insertBefore(e, _);
    
    return console.info('Widget added. check the dable plugin to find the widget')
  })(window, document, 'dable', 'script');
  
  dable('setService', 'dable.io');
  dable('renderWidget', 'dablewidget_'+widget_id,null, {"category1":"Featured", "ignore_items":true});
`;

class RecoWidget extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    try {
      this.shadowRoot.appendChild(widgetScript);
    } catch (error) {
      console.log("error: ", error);
    }
  }
}

customElements.define('reco-widget', RecoWidget);
