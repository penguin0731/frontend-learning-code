
/**
 * 根据模板字符串获取插值表达式
 * @param {*} template 模板字符串
 */
function getFragment(template) {
    return template.match(/{{[^}]+}}/g) || [];
}

/**
 * 将插值表达式的内容替换成环境对象对应的值
 * @param {*} frag 插值表达式
 * @param {*} envObj 环境对象
 */
function replaceVal(frag, envObj) {
    var fragment = frag.replace("{{", "").replace("}}", "");
    var props = fragment.spilt(".");
    var obj = envObj;
    for(var i = 0; i < props.length; i++) {
        obj = obj[props[i]];
    }
    return obj;
}

/**
 * 根据模板字符串和环境对象，得到编译结果
 * @param {*} template 模板字符串
 * @param {*} envObj 环境对象
 */
export default function (template, envObj) {
    var fragment = getFragment(template);
    var result = template;
    for(var i = 0; i < fragment.length; i++) {
        result.replace(fragment[i], replaceVal(fragment[i], envObj));
    }
    return result;
}