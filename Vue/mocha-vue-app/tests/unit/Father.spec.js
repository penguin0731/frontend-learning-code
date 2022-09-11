import Father from '@/components/Father'
import Son from '@/components/Son'
import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
// mount和shallowMount的区别：
// mount会将子组件都渲染出来  包括子组件下的子组件
// shallowMount则不会



describe('Father.vue', () => {
    it('测试子组件触发show事件，展示信息', () => {
        const wrapper = shallowMount(Father);
        // exists 断言某个元素是否存在
        // 判断.info是否不存在
        expect(wrapper.find('.info').exists()).to.be.false;
        // 触发show事件
        wrapper.find(Son).vm.$emit('show');
        expect(wrapper.find('.info').exists()).to.be.true;
    })

    it('执行changeAge函数，数据age改变', () => {
        const wrapper = shallowMount(Father);
        wrapper.vm.changeAge();
        expect(wrapper.vm.age).to.be.equal(16);
    })
})