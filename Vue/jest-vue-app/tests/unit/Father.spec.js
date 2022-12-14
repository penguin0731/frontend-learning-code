import Father from '@/components/Father'
import Son from '@/components/Son'
import { shallowMount } from '@vue/test-utils'



describe('Father.vue', () => {
    it('测试子组件触发show事件，展示信息', () => {
        const wrapper = shallowMount(Father);
        // exists 断言某个元素是否存在
        // 判断.info是否不存在
        expect(wrapper.find('.info').exists()).toBeFalse;
        // 触发show事件
        wrapper.find(Son).vm.$emit('show');
        expect(wrapper.find('.info').exists()).toBeTrue;
    })

    it('执行changeAge函数，数据age改变', () => {
        const wrapper = shallowMount(Father);
        wrapper.vm.changeAge();
        expect(wrapper.vm.age).toBe(16);
    })
})