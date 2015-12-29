'use strict';

var tplEngine = {
  /*
   * 获取模板
   *
   * @param str 模板容器ID或模板字符串
   * @return str 最终结果
   */
  getTpl: function(str) {
    var ele = (typeof module === 'object' && module.exports) ? false : document.getElementById(str);

    if (ele) {
      var html = /textarea|input/i.test(ele.nodeName) ? ele.value : ele.innerHTML;
      return this.compileTpl(html);
    } else {
      return this.compileTpl(str);
    }
  },

  /*
   * 处理模板
   */
  dealTpl: function(str) {
    var _left = '{%';
    var _right = '%}';

    return String(str)

      // 转义
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      
      // 过滤回车，制表符，回车符
      .replace(/[\r|\t|\n]/g, '')

      // 替换内容
      .replace(new RegExp(_left+'=(.*?)'+_right, 'g'), "',typeof($1)==='undefined'?'':$1,'")

      // 替换左分隔符
      .replace(new RegExp(_left, 'g'), "');")

      // 替换右分隔符
      .replace(new RegExp(_right, 'g'), "template_array.push('");
  },

  /*
   * 编译模板
   */
  compileTpl: function(str) {
    var fnBody = [
      "var template_array=[];\n",
      "var fn=(function(data){\n",
        "var template_key='';\n",
        "for(key in data){\n",
          "template_key+=('var '+key+'=data[\"'+key+'\"];');\n",
        "}\n",
        "eval(template_key);\n",
        "template_array.push('"+this.dealTpl(str)+"');\n",
        "template_key=null;\n",
        "})(templateData);\n",
      "fn=null;\n",
      "return template_array.join('');"
    ].join('');

    return new Function('templateData', fnBody);
  }
};

/*
 * 模板引擎
 *
 * @param str 模板容器ID或模板字符串
 * @param data 数据
 *
 * @return 处理好的html
 */
function template(str, data) {
  if (Object.prototype.toString.call(data) === '[object Array]') {
    var html = '';

    for (var i = 0; i < data.length; i++) {
      html += tplEngine.getTpl(str)(data[i]);
    }

    return html;
  } else {
    return tplEngine.getTpl(str)(data);
  }
}

// test

var data = {
  tagCloud: [
    {selected: true, title: '这是一本设计模式书', text: '设计模式'},
    {selected: false, title: '这是一本Nodejs书', text: 'Node.js'},
    {selected: false, title: '这是一本javascript书', text: 'javascript'}
  ]
};

var str = [
  '<div>',
  '{% for (var i = 0; i < tagCloud.length; i++){ %}',
    '<a href="#" class="{% if (tagCloud[i].selected){ %}selected{% } %}" title="{%= tagCloud[i].title %}">{%= tagCloud[i].text %}</a>',
  '{% } %}',
  '</div>'
].join('');

var html = template(str, data);
console.log(html);



