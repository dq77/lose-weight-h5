/*
 * @Author: 刁琪
 * @Date: 2020-09-07 13:47:51
 * @LastEditors: わからないよう
 */

export const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);