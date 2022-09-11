import createNode from './vnode';
import render from './render';
import createResponsive from './dataResponsive';

/**
 * Vue构造函数
 * @param {*} options vue配置
 */
export default function Vue(options) {
    // 保存el和data配置
    this.$el = options && options.el;
    this.$data = options && options.data;
    // 根据el创建虚拟节点
    this.$vnode = createNode(document.querySelector(this.$el));
    // 将data中的数据代理打实例当中
    var _this = this;
    createResponsive(this.$data, this, function() {
        // 数据改变时，重新渲染视图
        _this.render();
    });

    this.render(); // 初始渲染
}

Vue.prototype.render = function() {
    render(this.$vnode, this);
}