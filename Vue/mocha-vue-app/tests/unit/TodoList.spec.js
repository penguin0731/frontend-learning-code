import TodoList from '@/components/TodoList';
import { expect } from 'chai';
import { mount } from '@vue/test-utils'

// wrapper.vm  ==> data
// oInput.element ==> 元素
// oInput.trigger('input')
// oInput.setValue 等同于上面两句话
// wrapper.findAll
describe('TodoList.vue', () => {
    it('初始时数据mask为"",输入框内容为""', () => {
        const wrapper = mount(TodoList);
        const maskVal = wrapper.find('input').text();
        const maskData = wrapper.vm.mask;
        expect(maskVal).to.be.equal("");
        expect(maskData).to.be.equal("");
    });

    it('数据mask跟随输入框的内容改变', () => {
        const wrapper = mount(TodoList);
        const oInput = wrapper.find('input');
        // oInput.element.value = 'cxj';
        // oInput.trigger('input');
        // 等于
        oInput.setValue('cxj')
        expect(wrapper.vm.mask).to.be.equal('cxj')
    });

    it('添加任务', () => {
        const wrapper = mount(TodoList);
        const oBtn = wrapper.find('button');
        const length = wrapper.vm.maskList.length;
        oBtn.trigger('click');
        expect(wrapper.vm.maskList).lengthOf(length + 1);
        expect(wrapper.findAll('li')).lengthOf(length + 1);
        expect(wrapper.vm.mask).to.be.equal('');
    })
})