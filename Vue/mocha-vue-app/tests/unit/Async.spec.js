import Async from '@/components/Async';
import { mount } from '@vue/test-utils';
import { expect } from 'chai';
import moxios from 'moxios';

// npm install moxios -D
describe('Async.vue', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    })

    it('获取name数据', done => {
        const wrapper = mount(Async);
        const name = 'cxj';
        wrapper.findAll('button').at(0).trigger('click');
        // 模拟请求
        moxios.wait(() => {
            // 获取请求
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    name
                }
            }).then(() => {
                expect(wrapper.findAll('h4').at(0).text()).to.be.equal(name);
                // 通知mocha测试结束
                done();
            })
        })
    });

    it('获取age数据', done => {
        const wrapper = mount(Async);
        const age = '18';
        wrapper.findAll('button').at(1).trigger('click');
        moxios.stubRequest('/age', {
            status: 200,
            response: {
                age
            }
        })

        moxios.wait(() => {
            expect(wrapper.findAll('h4').at(1).text()).to.be.equal(age);
            done();
        })
    })
})