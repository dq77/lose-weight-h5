/*
 * @Author: 刁琪
 * @Date: 2020-07-23 14:45:53
 * @LastEditors: 刁琪
 * @LastEditTime: 2020-07-27 17:19:34
 */ 



/*  将日期格式化的插件，由Date类型的对象调用
 *  var date1 = new Date("sth").format("yyyy-MM-dd");
 * 
 * 接收的参数为字符串，例如 "yyyy.MM.dd"  "yyyy-dd-MM"
 * 返回的结果为字符串，例如 "2017.08.31"  "2018-16-01"
 * 
 */ 

export function dateFormat(date, format) {
  var o = {
    "M+" : date.getMonth()+1, //month
    "d+" : date.getDate(), //day
    "h+" : date.getHours(), //hour
    "m+" : date.getMinutes(), //minute
    "s+" : date.getSeconds() //second
  };
  if(/(y+)/.test(format)){
    format=format.replace(RegExp.$1,(date.getFullYear()+"").substr(4- RegExp.$1.length));
  };
  for(var k in o){
    if(new RegExp("("+ k +")").test(format)){
      format = format.replace(RegExp.$1, RegExp.$1.length===1? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
    };
  };
  return format;
}