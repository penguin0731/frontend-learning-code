import Async from '@/components/Async'
import { mount } from '@vue/test-utils'
import Vue from 'vue'

// 寻找__mocks__文件下的axios.js文件
jest.mock('axios');
describe('Async.vue', () => {
    // jest异步测试的三种方法
    // 1. Vue的nextTick函数
    it('获取name', done => {
        const wrapper = mount(Async);
        wrapper.findAll('button').at(0).trigger('click');
        Vue.nextTick(() => {
            expect(wrapper.findAll('h4').at(0).text()).toBe('cxj');
            done();
        });
    });
    // 2. 返回Promise
    it('获取name', () => {
        const wrapper = mount(Async);
        wrapper.findAll('button').at(0).trigger('click');
        return Promise.resolve().then(() => {
            expect(wrapper.findAll('h4').at(0).text()).toBe('cxj');
        });
    });
    // 3. async + await
    it('获取name', async () => {
        const wrapper = mount(Async);
        // 不能await点击事件
        await wrapper.vm.getName();
        expect(wrapper.findAll('h4').at(0).text()).toBe('cxj');
    });
})