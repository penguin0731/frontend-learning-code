import TodoList from "@/components/TodoList";
import { mount } from "@vue/test-utils";

describe("TodoList.vue", () => {
  it('初始时数据mask为"",输入框内容为""', () => {
    const wrapper = mount(TodoList);
    const maskVal = wrapper.find("input").text();
    const maskData = wrapper.vm.mask;
    expect(maskVal).toBe("");
    expect(maskData).toBe("");
  });

  it("数据mask跟随输入框的内容改变", () => {
    const wrapper = mount(TodoList);
    const oInput = wrapper.find("input");
    // oInput.element.value = 'cxj';
    // oInput.trigger('input');
    // 等于
    oInput.setValue("cxj");
    expect(wrapper.vm.mask).toBe("cxj");
  });

  it("添加任务", () => {
    const wrapper = mount(TodoList);
    const oBtn = wrapper.find("button");
    const length = wrapper.vm.maskList.length;
    oBtn.trigger("click");
    // toHaveLength相当于macha的lengthOf
    expect(wrapper.vm.maskList).toHaveLength(length + 1);
    expect(wrapper.findAll("li")).toHaveLength(length + 1);
    expect(wrapper.vm.mask).toBe("");
  });
});
